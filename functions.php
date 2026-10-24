<?php
if (!defined('ABSPATH')) exit;

function mbz_trading_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('custom-logo');
  register_nav_menus(array('primary' => __('Primary Menu', 'mbz-trading')));
}
add_action('after_setup_theme', 'mbz_trading_setup');

function mbz_manifest() {
  $path = get_template_directory() . '/dist/.vite/manifest.json';
  if (!file_exists($path)) {
    $path = get_template_directory() . '/dist/manifest.json';
  }
  if (!file_exists($path)) return null;
  return json_decode(file_get_contents($path), true);
}

function mbz_trading_assets() {
  $manifest = mbz_manifest();
  if ($manifest) {
    $entry = $manifest['index.html'] ?? reset($manifest);
    if (!empty($entry['css'])) {
      foreach ($entry['css'] as $i => $css) {
        wp_enqueue_style('mbz-app-' . $i, get_template_directory_uri() . '/dist/' . $css, array(), null);
      }
    }
    if (!empty($entry['file'])) {
      wp_enqueue_script('mbz-app', get_template_directory_uri() . '/dist/' . $entry['file'], array(), null, true);
    }
    return;
  }
  wp_enqueue_style('mbz-trading-style', get_stylesheet_uri(), array(), '2.0.0');
}
add_action('wp_enqueue_scripts', 'mbz_trading_assets');

add_filter('script_loader_tag', function ($tag, $handle, $src) {
  if ($handle === 'mbz-app') {
    return '<script type="module" src="' . esc_url($src) . '"></script>';
  }
  return $tag;
}, 10, 3);

function mbz_bootstrap_data() {
  $wa = preg_replace('/\D+/', '', get_theme_mod('mbz_whatsapp', '923335173910'));
  $parts = array();
  $query = new WP_Query(array(
    'post_type' => 'toyota_part',
    'posts_per_page' => -1,
    'orderby' => 'title',
    'order' => 'ASC',
  ));
  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      $partno = get_post_meta(get_the_ID(), 'part_number', true);
      if (!$partno) $partno = get_the_title();
      $cat = get_post_meta(get_the_ID(), 'part_category', true);
      $parts[] = array(
        'partNumber' => $partno,
        'name' => get_the_title(),
        'category' => $cat ?: 'Other',
        'application' => wp_trim_words(wp_strip_all_tags(get_the_content()), 24),
      );
    }
    wp_reset_postdata();
  }
  $payload = array(
    'company' => get_theme_mod('mbz_company_name', 'MBZ TRADING'),
    'subtitle' => get_theme_mod('mbz_subtitle', 'AUTO SPARE PARTS'),
    'whatsapp' => $wa,
    'whatsappDisplay' => '+92-333-5173910',
    'email' => get_theme_mod('mbz_email', 'mbztrading0086@gmail.com'),
    'location' => get_theme_mod('mbz_location', 'Pakistan'),
    'heroHeading' => get_theme_mod('mbz_hero_heading', 'Your Reliable Partner for Genuine Parts'),
    'heroText' => get_theme_mod('mbz_hero_text', 'International sourcing and wholesale supply of automotive spare parts for business customers.'),
    'aboutHeading' => get_theme_mod('mbz_about_heading', 'MBZ TRADING – AUTO SPARE PARTS IMPORTER'),
    'aboutIntro' => get_theme_mod('mbz_about_intro', 'is an international auto spare parts importing and wholesale trading company specializing in sourcing and supplying automotive components to businesses worldwide.'),
    'parts' => $parts,
    'categories' => array_values(array_unique(array_map(function ($p) { return $p['category']; }, $parts))),
  );
  echo '<script>window.MBZ = ' . wp_json_encode($payload) . ';</script>';
}
add_action('wp_head', 'mbz_bootstrap_data');

function mbz_trading_customizer($wp_customize) {
  $wp_customize->add_section('mbz_business', array('title' => __('MBZ TRADING Business Settings', 'mbz-trading'), 'priority' => 30));
  $settings = array(
    'mbz_company_name' => array('Company name', 'MBZ TRADING'),
    'mbz_subtitle' => array('Subtitle under company name', 'AUTO SPARE PARTS'),
    'mbz_whatsapp' => array('WhatsApp number (international format, digits only)', '923335173910'),
    'mbz_email' => array('Business email', 'mbztrading0086@gmail.com'),
    'mbz_location' => array('Business location', 'Pakistan'),
    'mbz_hero_heading' => array('Home page heading', 'Your Reliable Partner for Genuine Parts'),
    'mbz_hero_text' => array('Home page description', 'International sourcing and wholesale supply of automotive spare parts for business customers.'),
    'mbz_about_heading' => array('About Us heading', 'MBZ TRADING – AUTO SPARE PARTS IMPORTER'),
    'mbz_about_intro' => array('About Us introduction', 'MBZ TRADING is an international auto spare parts importing and wholesale trading company specializing in sourcing and supplying automotive components to businesses worldwide.'),
  );
  foreach ($settings as $id => $data) {
    $wp_customize->add_setting($id, array('default' => $data[1], 'sanitize_callback' => 'sanitize_textarea_field'));
    $wp_customize->add_control($id, array(
      'label' => __($data[0], 'mbz-trading'),
      'section' => 'mbz_business',
      'type' => in_array($id, array('mbz_hero_text', 'mbz_about_intro')) ? 'textarea' : 'text',
    ));
  }
  $wp_customize->add_setting('mbz_accent', array('default' => '#d71920', 'sanitize_callback' => 'sanitize_hex_color'));
  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'mbz_accent', array(
    'label' => __('Accent colour', 'mbz-trading'),
    'section' => 'mbz_business',
  )));
}
add_action('customize_register', 'mbz_trading_customizer');

function mbz_trading_parts_cpt() {
  register_post_type('toyota_part', array(
    'labels' => array(
      'name' => 'Toyota Parts',
      'singular_name' => 'Toyota Part',
      'add_new_item' => 'Add New Toyota Part',
      'edit_item' => 'Edit Toyota Part',
    ),
    'public' => true,
    'show_in_rest' => true,
    'menu_icon' => 'dashicons-admin-tools',
    'supports' => array('title', 'editor', 'custom-fields'),
    'has_archive' => true,
    'rewrite' => array('slug' => 'toyota-parts'),
  ));
}
add_action('init', 'mbz_trading_parts_cpt');

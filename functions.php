<?php
if (!defined('ABSPATH')) exit;
function mbz_trading_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('custom-logo');
  register_nav_menus(array('primary' => __('Primary Menu', 'mbz-trading')));
}
add_action('after_setup_theme', 'mbz_trading_setup');
function mbz_trading_assets() { wp_enqueue_style('mbz-trading-style', get_stylesheet_uri(), array(), '1.1.0'); }
add_action('wp_enqueue_scripts', 'mbz_trading_assets');
function mbz_trading_customizer($wp_customize) {
  $wp_customize->add_section('mbz_business', array('title'=>__('MBZ TRADING Business Settings','mbz-trading'),'priority'=>30));
  $settings = array(
    'mbz_company_name'=>array('Company name','MBZ TRADING'),
    'mbz_subtitle'=>array('Subtitle under company name','AUTO SPARE PARTS'),
    'mbz_whatsapp'=>array('WhatsApp number (international format, digits only)','923335173910'),
    'mbz_email'=>array('Business email','mbztrading0086@gmail.com'),
    'mbz_location'=>array('Business location','Pakistan'),
    'mbz_hero_heading'=>array('Home page heading','Your Reliable Partner for Genuine Parts'),
    'mbz_hero_text'=>array('Home page description','International sourcing and wholesale supply of automotive spare parts for business customers.'),
    'mbz_about_heading'=>array('About Us heading','MBZ TRADING – AUTO SPARE PARTS IMPORTER'),
    'mbz_about_intro'=>array('About Us introduction','MBZ TRADING is an international auto spare parts importing and wholesale trading company specializing in sourcing and supplying automotive components to businesses worldwide.'),
  );
  foreach($settings as $id=>$data){
    $wp_customize->add_setting($id,array('default'=>$data[1],'sanitize_callback'=>'sanitize_textarea_field'));
    $wp_customize->add_control($id,array('label'=>__($data[0],'mbz-trading'),'section'=>'mbz_business','type'=>in_array($id,array('mbz_hero_text','mbz_about_intro'))?'textarea':'text'));
  }
  $wp_customize->add_setting('mbz_about_full',array('default'=>'Our Business\nWe import automotive spare parts from the UAE, Thailand, Indonesia and China.\n\nOur Product Range\nBody parts, electrical parts, suspension parts and engine parts.\n\nParts on Demand & Pre-Orders\nWe source specific parts according to customer requirements.\n\nB2B Wholesale & Bulk Supply\nWe serve wholesalers, distributors, retailers, importers and commercial buyers.\n\nGlobal Deliveries & International Supply\nWe support cross-border sourcing and international supply requirements.\n\nOur Commitment\nWe value professional service, competitive pricing, transparent communication and long-term business relationships.','sanitize_textarea_field'));
  $wp_customize->add_control('mbz_about_full',array('label'=>__('Full About Us content (editable)','mbz-trading'),'description'=>__('Use plain text. Separate paragraphs with blank lines.','mbz-trading'),'section'=>'mbz_business','type'=>'textarea','input_attrs'=>array('rows'=>18)));
  $wp_customize->add_setting('mbz_accent',array('default'=>'#d71920','sanitize_callback'=>'sanitize_hex_color'));
  $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize,'mbz_accent',array('label'=>__('Accent colour','mbz-trading'),'section'=>'mbz_business')));
}
add_action('customize_register','mbz_trading_customizer');
function mbz_trading_custom_css(){ $color=get_theme_mod('mbz_accent','#d71920'); if(!$color) $color='#d71920'; echo '<style>:root{--mbz-red:'.esc_attr($color).'}</style>'; }
add_action('wp_head','mbz_trading_custom_css');
function mbz_trading_parts_cpt(){
  register_post_type('toyota_part',array('labels'=>array('name'=>'Toyota Parts','singular_name'=>'Toyota Part','add_new_item'=>'Add New Toyota Part','edit_item'=>'Edit Toyota Part'),'public'=>true,'show_in_rest'=>true,'menu_icon'=>'dashicons-admin-tools','supports'=>array('title','editor','custom-fields'),'has_archive'=>true,'rewrite'=>array('slug'=>'toyota-parts')));
}
add_action('init','mbz_trading_parts_cpt');

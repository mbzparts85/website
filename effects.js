/* MBZ TRADING – effects: Lenis (smooth scroll), GSAP (animation), Three.js (3D).
   Everything is optional: if a library fails to load, the site still works normally. */
(function () {
  "use strict";
  var d = document, root = d.documentElement;
  var mq = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  var reduce = mq("(prefers-reduced-motion: reduce)");
  var fine = mq("(hover:hover) and (pointer:fine)");
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var hasG = !!window.gsap, hasST = hasG && !!window.ScrollTrigger;
  if (hasST) gsap.registerPlugin(ScrollTrigger);
  var lenis = null;

  /* ---------- Lenis smooth scrolling ---------- */
  if (window.Lenis && !reduce) {
    try {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      window.__lenis = lenis;
      if (hasST) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
      }
      d.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute("href").length < 2) return;
        var t = $(a.getAttribute("href"));
        if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -90 }); }
      });
    } catch (err) { lenis = null; }
  }

  /* ---------- Back-to-top ---------- */
  var top = d.createElement("button");
  top.className = "to-top"; top.type = "button"; top.setAttribute("aria-label", "Back to top"); top.textContent = "↑";
  d.body.appendChild(top);
  top.addEventListener("click", function () {
    if (lenis) lenis.scrollTo(0, { duration: 1.5 }); else window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 700); }, { passive: true });

  /* ---------- Page transitions (blue wipe) ---------- */
  var wipe = $(".page-wipe");
  if (wipe && hasG && !reduce) {
    if (root.classList.contains("pt-in")) {
      gsap.fromTo(wipe, { yPercent: 0 }, { yPercent: -100, duration: .7, delay: .05, ease: "power3.inOut",
        onComplete: function () { root.classList.remove("pt-in"); try { sessionStorage.removeItem("mbzPT"); } catch (e) {} } });
    }
    d.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      var h = a.getAttribute("href");
      if (!h || h.charAt(0) === "#" || a.target === "_blank" || a.host !== location.host || !/\.html?(\?|#|$)/.test(h)) return;
      e.preventDefault();
      try { sessionStorage.setItem("mbzPT", "1"); } catch (x) {}
      gsap.set(wipe, { yPercent: 100 });
      gsap.to(wipe, { yPercent: 0, duration: .55, ease: "power3.inOut", onComplete: function () { location.href = a.href; } });
    });
    window.addEventListener("pageshow", function (e) { if (e.persisted) { gsap.set(wipe, { yPercent: 100 }); root.classList.remove("pt-in"); } });
  }

  /* ---------- Intro + scroll reveals (GSAP) ---------- */
  var REVEAL = ".heading,.about-intro,.about-detail-card,.about-commitment,.cards article,.category-card,.contact-list>*,.brand-card,.brand-group>h3,.svc-item,.svc-center,.spec-panel,.stat,.quote-grid>*,.contact-grid>*,.cta-inner,.globe-copy,.globe-wrap,.brand-head>*,.region-row>*,.brand-chips";

  function counters() {
    $$(".stat b[data-count]").forEach(function (el) {
      var raw = el.getAttribute("data-count"), suf = el.getAttribute("data-suffix") || "";
      var target = raw === "products" ? Math.floor(((window.products || []).length) / 10) * 10 : parseFloat(raw);
      if (!hasST || reduce) { el.textContent = target + suf; return; }
      var o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: "top 94%", once: true, onEnter: function () {
        gsap.to(o, { v: target, duration: 1.8, ease: "power2.out", onUpdate: function () { el.textContent = Math.round(o.v) + suf; } });
      } });
    });
  }

  function initAnimations() {
    if (!hasG || reduce) { counters(); root.classList.remove("js-anim"); window.__mbzFx = true; return; }
    var delay = root.classList.contains("pt-in") ? .6 : .1;

    /* hero entrance */
    var heroEls = $$(".hero .badge,.hero h1 .h1-line,.hero .hero-grid>div:first-child>p,.hero .actions,.hero .trust-row,.hero-box");
    var pageEls = $$(".page-hero .tag,.page-hero h1,.page-hero p");
    [heroEls, pageEls].forEach(function (list) {
      if (!list.length) return;
      gsap.fromTo(list, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: .95, stagger: .12, delay: delay, ease: "power3.out", clearProps: "transform,opacity" });
    });

    /* scroll reveals */
    if (hasST) {
      var els = $$(REVEAL);
      gsap.set(els, { opacity: 0, y: 46 });
      root.classList.remove("js-anim");
      ScrollTrigger.batch(els, {
        start: "top 92%", once: true,
        onEnter: function (batch) {
          batch.forEach(function (b) { b.classList.add("rv"); });
          gsap.to(batch, { opacity: 1, y: 0, duration: .85, stagger: .1, ease: "power3.out", overwrite: true, clearProps: "transform,opacity",
            onComplete: function () { batch.forEach(function (b) { b.classList.remove("rv"); }); } });
        }
      });

      /* hero parallax */
      if ($(".hero") && !mq("(max-width:700px)")) {
        gsap.to(".hero .hero-grid", { yPercent: -7, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to("#hero3d", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      }

      /* "How it works": pinned, steps light up as you scroll */
      var how = $(".how");
      if (how) {
        var steps = $$(".step", how), line = $(".how-line i", how);
        var mm = gsap.matchMedia();
        mm.add("(min-width: 901px)", function () {
          steps.forEach(function (s) { s.classList.remove("on"); });
          ScrollTrigger.create({ trigger: how, start: "center center", end: "+=1300", pin: true, scrub: true,
            onUpdate: function (self) {
              var p = self.progress;
              gsap.set(line, { scaleX: p });
              steps.forEach(function (s, i) { s.classList.toggle("on", p >= i / steps.length - 0.001 + 0.02 || (i === 0 && p >= 0)); });
            } });
        });
        mm.add("(max-width: 900px)", function () {
          steps.forEach(function (s) { s.classList.add("on"); });
          gsap.set(steps, { opacity: 1 });
        });
      }
    } else { root.classList.remove("js-anim"); }

    counters();
    window.__mbzFx = true;
  }

  /* ---------- Markets ticker (GSAP marquee) ---------- */
  function ticker() {
    if (!hasG || reduce) return;
    $$(".ticker-track").forEach(function (t) {
      t.innerHTML += t.innerHTML;
      var tw = gsap.to(t, { xPercent: -50, duration: 32, ease: "none", repeat: -1 });
      var box = t.parentNode;
      box.addEventListener("mouseenter", function () { gsap.to(tw, { timeScale: .2, duration: .5 }); });
      box.addEventListener("mouseleave", function () { gsap.to(tw, { timeScale: 1, duration: .5 }); });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function magnetic() {
    if (!hasG || reduce || !fine) return;
    $$(".btn,.nav-cta").forEach(function (b) {
      b.classList.add("magnetic");
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .32 - 3, duration: .3, ease: "power2.out", overwrite: "auto" });
      });
      b.addEventListener("mouseleave", function () { gsap.to(b, { x: 0, y: 0, duration: .8, ease: "elastic.out(1,.4)", overwrite: "auto" }); });
    });
  }

  /* ---------- Smooth catalogue filtering ---------- */
  window.MBZFX = {
    animateCards: function (nodes) {
      if (!hasG || reduce || !nodes || !nodes.length) return;
      gsap.fromTo(nodes, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: { each: .04, from: "start" }, ease: "power2.out", clearProps: "transform,opacity" });
    }
  };

  /* ---------- Three.js: shared helpers ---------- */
  function makeRenderer(canvas, alpha, antialias) {
    try {
      var r = new THREE.WebGLRenderer({ canvas: canvas, antialias: antialias, alpha: alpha, powerPreference: "high-performance" });
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      r.setClearColor(0x000000, 0);
      return r;
    } catch (e) { canvas.style.display = "none"; return null; }
  }
  function visibleLoop(el, frame) {
    var on = false, raf = 0, last = performance.now();
    function tick(now) { var dt = Math.min((now - last) / 1000, .05); last = now; frame(dt, now / 1000); raf = requestAnimationFrame(tick); }
    function start() { if (on || d.hidden) return; on = true; last = performance.now(); raf = requestAnimationFrame(tick); }
    function stop() { on = false; cancelAnimationFrame(raf); }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }, { threshold: 0 }).observe(el);
    } else start();
    d.addEventListener("visibilitychange", function () { d.hidden ? stop() : (el.getBoundingClientRect().bottom > 0 && start()); });
  }

  /* ---------- Three.js: hero (particles + gear + wrench) ---------- */
  function hero3D() {
    var cv = $("#hero3d");
    if (!cv || !window.THREE || reduce) return;
    var T = THREE, hero = cv.parentNode, small = window.innerWidth < 700;
    var ren = makeRenderer(cv, true, !small); if (!ren) return;
    var scene = new T.Scene(), cam = new T.PerspectiveCamera(40, 1, .1, 100); cam.position.z = 9;
    scene.add(new T.AmbientLight(0x6f8fd0, .7));
    var key = new T.PointLight(0x2aa0ff, 3, 40); key.position.set(-4, 3, 6); scene.add(key);
    var rim = new T.DirectionalLight(0xffffff, 1.2); rim.position.set(4, 5, 4); scene.add(rim);
    var back = new T.PointLight(0x0a6cff, 2.2, 30); back.position.set(3, -3, -3); scene.add(back);

    var blue = new T.MeshStandardMaterial({ color: 0x1b86f2, metalness: .85, roughness: .28, emissive: 0x04204a });
    var steel = new T.MeshStandardMaterial({ color: 0xcdd8ea, metalness: .95, roughness: .22, emissive: 0x0a1424 });
    var ext = { depth: .5, bevelEnabled: true, bevelThickness: .06, bevelSize: .05, bevelSegments: 2, curveSegments: 28 };

    /* gear */
    var gear = new T.Group(), teeth = 14, ro = 2.1, ri = 1.78, st = Math.PI * 2 / teeth, s = new T.Shape();
    for (var i = 0; i < teeth; i++) {
      var a = i * st, pts = [[ri, a], [ro, a + st * .13], [ro, a + st * .37], [ri, a + st * .5], [ri, a + st * .75]];
      pts.forEach(function (p, k) { var x = Math.cos(p[1]) * p[0], y = Math.sin(p[1]) * p[0]; (i === 0 && k === 0) ? s.moveTo(x, y) : s.lineTo(x, y); });
    }
    s.closePath();
    var hole = new T.Path(); hole.absarc(0, 0, ri * .66, 0, Math.PI * 2, true); s.holes.push(hole);
    var gm = new T.Mesh(new T.ExtrudeGeometry(s, ext), blue); gm.geometry.center(); gear.add(gm);
    var hub = new T.Mesh(new T.CylinderGeometry(.42, .42, .62, 36), steel); hub.rotation.x = Math.PI / 2; gear.add(hub);
    for (var k = 0; k < 5; k++) {
      var sp = new T.Mesh(new T.BoxGeometry(.2, ri * .66, .3), steel), ang = k * Math.PI * 2 / 5;
      sp.position.set(Math.cos(ang) * ri * .33, Math.sin(ang) * ri * .33, 0); sp.rotation.z = ang - Math.PI / 2; gear.add(sp);
    }

    /* wrench */
    var wr = new T.Group();
    function ring(r, hr) { var sh = new T.Shape(); sh.absarc(0, 0, r, 0, Math.PI * 2, false); var h = new T.Path(); h.absarc(0, 0, hr, 0, Math.PI * 2, true); sh.holes.push(h); return new T.Mesh(new T.ExtrudeGeometry(sh, { depth: .26, bevelEnabled: true, bevelThickness: .04, bevelSize: .03, bevelSegments: 2, curveSegments: 6 }), steel); }
    var head = ring(.56, .27); head.geometry.center(); head.position.y = 1.25;
    var handle = new T.Mesh(new T.BoxGeometry(.34, 2.7, .26), steel); handle.position.y = -.2;
    var tail = ring(.34, .15); tail.geometry.center(); tail.position.y = -1.6;
    wr.add(head, handle, tail); wr.rotation.z = .95; wr.position.set(.6, -.7, 1.1);
    gear.add(wr);

    var holder = new T.Group(); holder.add(gear); scene.add(holder);

    /* particles */
    var N = small ? 260 : 700, pos = new Float32Array(N * 3), spd = new Float32Array(N), W = 14, H = 8;
    for (var n = 0; n < N; n++) { pos[n * 3] = (Math.random() - .5) * W * 2; pos[n * 3 + 1] = (Math.random() - .5) * H * 2; pos[n * 3 + 2] = Math.random() * 8 - 5; spd[n] = .12 + Math.random() * .35; }
    var pg = new T.BufferGeometry(); pg.setAttribute("position", new T.BufferAttribute(pos, 3));
    var c2 = d.createElement("canvas"); c2.width = c2.height = 64; var cx = c2.getContext("2d"), gr = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(.3, "rgba(80,170,255,.9)"); gr.addColorStop(1, "rgba(30,144,255,0)"); cx.fillStyle = gr; cx.fillRect(0, 0, 64, 64);
    var pm = new T.PointsMaterial({ size: .13, map: new T.CanvasTexture(c2), transparent: true, opacity: .8, depthWrite: false, blending: T.AdditiveBlending, sizeAttenuation: true });
    scene.add(new T.Points(pg, pm));

    var mx = 0, my = 0, tx = 0, ty = 0, lastY = window.scrollY, spin = 0;
    hero.addEventListener("pointermove", function (e) { var r = hero.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; });
    hero.addEventListener("pointerleave", function () { mx = my = 0; });

    function size() {
      var w = hero.clientWidth, h = hero.clientHeight; if (!w || !h) return;
      ren.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
      var vh = 2 * Math.tan(cam.fov * Math.PI / 360) * cam.position.z, vw = vh * cam.aspect;
      var sc = Math.max(.55, Math.min(1.35, vh / 6.6)) * (small ? .62 : 1.12);
      gear.scale.setScalar(sc);
      holder.position.set(small ? vw * .2 : vw * .24, small ? -vh * .2 : -vh * .02, 0);
    }
    size(); window.addEventListener("resize", size);

    visibleLoop(hero, function (dt, t) {
      var vy = window.scrollY - lastY; lastY = window.scrollY; spin += (vy * .0035 - spin) * .08;
      tx += (mx - tx) * .06; ty += (my - ty) * .06;
      gear.rotation.z += dt * .14 + spin;
      holder.rotation.y = tx * .7; holder.rotation.x = ty * .5;
      wr.position.y = -.7 + Math.sin(t * .9) * .08;
      var p = pg.attributes.position.array;
      for (var i = 0; i < N; i++) { p[i * 3 + 1] += spd[i] * dt; if (p[i * 3 + 1] > H) p[i * 3 + 1] = -H; }
      pg.attributes.position.needsUpdate = true;
      ren.render(scene, cam);
    });
  }

  /* ---------- Three.js: sourcing globe ---------- */
  function globe3D() {
    var cv = $("#globe3d");
    if (!cv || !window.THREE || reduce) return;
    var T = THREE, wrap = cv.parentNode, small = window.innerWidth < 700;
    var ren = makeRenderer(cv, true, true); if (!ren) return;
    var scene = new T.Scene(), cam = new T.PerspectiveCamera(34, 1, .1, 100); cam.position.z = 6.6;
    var R = 1.6, tilt = new T.Group(), globe = new T.Group(); tilt.add(globe); scene.add(tilt); tilt.rotation.x = .38;

    function ll(lat, lon, r) {
      var phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
      return new T.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
    }
    globe.add(new T.Mesh(new T.SphereGeometry(R * .99, 48, 48), new T.MeshBasicMaterial({ color: 0x030a1a })));
    var grid = new T.LineSegments(new T.WireframeGeometry(new T.SphereGeometry(R, 24, 16)), new T.LineBasicMaterial({ color: 0x1e90ff, transparent: true, opacity: .1 }));
    globe.add(grid);
    var n = small ? 1500 : 3400, dp = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) { var y = 1 - i / (n - 1) * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963; dp[i * 3] = Math.cos(th) * rr * R; dp[i * 3 + 1] = y * R; dp[i * 3 + 2] = Math.sin(th) * rr * R; }
    var dg = new T.BufferGeometry(); dg.setAttribute("position", new T.BufferAttribute(dp, 3));
    globe.add(new T.Points(dg, new T.PointsMaterial({ color: 0x2f94ff, size: .022, transparent: true, opacity: .85 })));
    scene.add(new T.Mesh(new T.SphereGeometry(R * 1.16, 48, 48), new T.ShaderMaterial({
      vertexShader: "varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "varying vec3 vN;void main(){float i=pow(0.72-dot(vN,vec3(0.0,0.0,1.0)),3.0);gl_FragColor=vec4(0.12,0.56,1.0,1.0)*i*0.55;}",
      side: T.BackSide, blending: T.AdditiveBlending, transparent: true, depthWrite: false })));
    tilt.position.y = -.05;

    var hub = { lat: 33.7, lon: 73.0 };               /* Islamabad */
    var src = [{ lat: 25.2, lon: 55.3 }, { lat: 13.75, lon: 100.5 }, { lat: -6.2, lon: 106.8 }, { lat: 31.2, lon: 121.5 }]; /* UAE, Thailand, Indonesia, China */
    var pulses = [];
    function dot(p, rad, col) { var m = new T.Mesh(new T.SphereGeometry(rad, 16, 16), new T.MeshBasicMaterial({ color: col })); m.position.copy(p); globe.add(m); return m; }
    var hp = ll(hub.lat, hub.lon, R); var hubDot = dot(hp, .06, 0xffffff);
    src.forEach(function (s, idx) {
      var p0 = ll(s.lat, s.lon, R); dot(p0, .04, 0x4db0ff);
      var ang = p0.angleTo(hp), ctrl = p0.clone().add(hp).normalize().multiplyScalar(R * (1 + ang * .95));
      var curve = new T.QuadraticBezierCurve3(p0, ctrl, hp);
      globe.add(new T.Mesh(new T.TubeGeometry(curve, 64, .01, 6, false), new T.MeshBasicMaterial({ color: 0x3aa8ff, transparent: true, opacity: .6 })));
      var pm = dot(p0, .035, 0xcfe9ff); pulses.push({ m: pm, c: curve, o: idx * .22 });
    });
    var base = -Math.atan2(ll(28, 88, R).x, ll(28, 88, R).z);   /* turn Asia towards the viewer */
    globe.rotation.y = base;

    var mx = 0, my = 0, tx = 0, ty = 0;
    wrap.addEventListener("pointermove", function (e) { var r = wrap.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; });
    wrap.addEventListener("pointerleave", function () { mx = my = 0; });
    function size() { var w = wrap.clientWidth; if (!w) return; ren.setSize(w, w, false); cam.aspect = 1; cam.updateProjectionMatrix(); }
    size(); window.addEventListener("resize", size);

    visibleLoop(wrap, function (dt, t) {
      tx += (mx - tx) * .05; ty += (my - ty) * .05;
      globe.rotation.y = base + Math.sin(t * .22) * .28 + tx * .5;
      tilt.rotation.x = .38 + ty * .3;
      pulses.forEach(function (p) { var u = (t * .32 + p.o) % 1; p.m.position.copy(p.c.getPoint(u)); p.m.scale.setScalar(.7 + Math.sin(u * Math.PI) * .9); });
      hubDot.scale.setScalar(1 + Math.sin(t * 3) * .25);
      ren.render(scene, cam);
    });
  }

  /* ---------- go ---------- */
  initAnimations();
  ticker();
  magnetic();
  hero3D();
  globe3D();
})();

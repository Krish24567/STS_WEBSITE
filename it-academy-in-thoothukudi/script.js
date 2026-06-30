/* =====================================================
   Samudhra Academy — main script
   ===================================================== */
(() => {
  "use strict";

  /* ---------- Data ---------- */
  const courses = [
    { img:"images/DevOps.jpeg", title:"DevOps Craft", duration:"12 weeks", level:"All levels", tools:["AWS","Docker","K8s","Terraform"], projects:6, featured:true },
    { img:"images/VibeCoding.jpeg", title:"AI Training", duration:"10 weeks", level:"All levels", tools:["ChatGPT","Claude","Cursor","Lovable"], projects:6 },
    { img:"images/DigitalMarketing.jpeg", title:"Digital Marketing", duration:"12 weeks", level:"All levels", tools:["SEO","Google Ads","SMM","AI Marketing"], projects:8 },
    { img:"images/CloudComputing.jpeg", title:"Cloud Computing", duration:"14 weeks", level:"Intermediate", tools:["AWS","Azure","GCP","Docker"], projects:5 },
    { img:"images/Java.jpeg", title:"Java Full Stack", duration:"16 weeks", level:"Intermediate", tools:["Java","Spring","React","MySQL"], projects:6 },
    { img:"images/DataAnalytics.jpeg", title:"Data Analytics", duration:"12 weeks", level:"All levels", tools:["Excel","SQL","Power BI","Python"], projects:8 }
  ];

  const why = [
    ["<i class=\"bi bi-people\"></i>","Industry Experts","Mentored by working senior engineers"],
    ["<i class=\"bi bi-laptop\"></i>","Real-Time Projects","Ship deployable, portfolio-grade work"],
    ["<i class=\"bi bi-briefcase\"></i>","Placement Support","Dedicated placement cell & partners"],
    ["<i class=\"bi bi-clipboard-data\"></i>","Interview Prep","Mock interviews & coding rounds"],
    ["<i class=\"bi bi-file-earmark-text\"></i>","Resume Building","ATS-friendly resumes that get callbacks"],
    ["<i class=\"bi bi-award\"></i>","Certification","Industry-recognised completion certificate"],
    ["<i class=\"bi bi-clock\"></i>","Flexible Timings","Weekday, weekend & fast-track batches"],
    ["<i class=\"bi bi-laptop\"></i>","Online + Offline","Hybrid classroom that fits your life"],
    ["<i class=\"bi bi-people\"></i>","Small Batch Size","Personal attention to every learner"],
    ["<i class=\"bi bi-compass\"></i>","1:1 Mentorship","Career & technical mentorship throughout"]
  ];

  const projects = [
    { n:"FinTrack Dashboard", img:"projects/fintrack.jpg", d:"A personal finance dashboard with charts, budgets and category insights.", tags:["React","Node","MongoDB","Chart.js"] },
    { n:"MediCare AI", img:"projects/medicare.jpg", d:"AI assistant that triages patient symptoms and suggests next steps.", tags:["Python","FastAPI","OpenAI","React"] },
    { n:"ShopMate E-Commerce", img:"projects/shopmate.jpg", d:"Full-stack store with cart, payments and admin dashboard.", tags:["Next.js","Stripe","Postgres"] },
    { n:"CloudOps CI/CD", img:"projects/cloudops.jpg", d:"Containerised microservices deployed on AWS with GitHub Actions.", tags:["Docker","K8s","AWS","Terraform"] },
    { n:"CyberShield", img:"projects/cybershield.jpg", d:"Vulnerability scanner with detailed remediation reports.", tags:["Python","Networking","OWASP"] },
    { n:"VisionML Studio", img:"projects/visionml.jpg", d:"Train and serve computer vision models from a single UI.", tags:["PyTorch","FastAPI","React"] }
  ];

  const steps = [
    ["Enrol","Counselling & track selection"],
    ["Training","Live, hands-on classroom"],
    ["Projects","Build real-world products"],
    ["Assessment","Mock interviews & reviews"],
    ["Placement","Direct hiring partner referrals"]
  ];

  const icon = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  const icons = {
    fileText: icon('<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
    messageSquare: icon('<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>'),
    github: icon('<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>'),
    linkedin: icon('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>'),
    wallet: icon('<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>'),
    rocket: icon('<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/>'),
  };

  const placement = [
    { icon: icons.fileText, title: "Resume Building", desc: "We build ATS-friendly resumes that get interviews at top companies." },
    { icon: icons.messageSquare, title: "Mock Interviews", desc: "Crack software job interviews in Tamil Nadu. Practice DSA, system design & HR rounds with real practitioners." },
    { icon: icons.github, title: "GitHub Optimization", desc: "Get noticed by recruiters hiring in Thoothukudi & Tamil Nadu. We make your GitHub repos stand out." },
    { icon: icons.linkedin, title: "LinkedIn Optimization", desc: "Get IT job offers in Tamil Nadu with a strong LinkedIn profile and outreach strategy." },
    { icon: icons.wallet, title: "Freelancing Guidance", desc: "Learn how to get freelance clients and earn as a developer from Thoothukudi." },
    { icon: icons.rocket, title: "Startup Project Mentoring", desc: "Have a startup idea? We help you build and launch your product in Tamil Nadu." }
  ];

  const reviews = [
    { q:"Samudhra Academy turned me from a beginner into a confident Full Stack developer. The mentorship and live projects made all the difference.", n:"Aarthi R.", r:"Full Stack Developer · Chennai" },
    { q:"The AI & ML track is world-class. Real datasets, real code reviews, real outcomes. I cracked my first offer within weeks of finishing.", n:"Karthik S.", r:"ML Engineer · Bengaluru" },
    { q:"Faculty here genuinely care. Small batches, deep doubt-clearing and constant placement support — that's rare.", n:"Divya P.", r:"Software Engineer · Coimbatore" },
    { q:"The placement cell is incredible. From resume to HR round, every step was guided. Highly recommended in Thoothukudi.", n:"Mohammed I.", r:"Cloud Engineer · Madurai" }
  ];

  /*const gallery = [
    ["Modern Classroom","4/5"],["Project Lab","4/3"],["Hackathon Day","1/1"],
    ["Mentorship Hour","3/4"],["Coding Bootcamp","4/3"],["Placement Drive","1/1"],
    ["Demo Day","4/5"],["Workshop","4/3"],["Graduation","3/4"]
  ];
*/
  const faculty = [
    { n:"Arun Kumar", r:"Lead — Full Stack", s:["React","Node","System Design"] },
    { n:"Sneha Devi", r:"Lead — AI / ML", s:["Python","PyTorch","NLP"] },
    { n:"Rajesh M.", r:"Lead — Cloud & DevOps", s:["AWS","Docker","K8s"] },
    { n:"Priya R.", r:"Lead — Data Science", s:["SQL","Pandas","Tableau"] },
    { n:"Vignesh K.", r:"Lead — Cyber Security", s:["OWASP","Pentesting","CTF"] },
    { n:"Lavanya S.", r:"Lead — UI / UX", s:["Figma","Design Systems","Research"] }
  ];

  const faqs = [
    ["Where is Samudhra Academy located?","We are based in Thoothukudi, Tamil Nadu. We offer both classroom and online live training."],
    ["Do you provide 100% placement support?","Yes — every learner gets resume building, mock interviews, HR training and direct referrals to our hiring partners."],
    ["Are there flexible batch timings?","We offer weekday, weekend and fast-track batches so working professionals and students can both join."],
    ["Will I work on real-time projects?","Yes. Every track includes multiple live projects that go onto your GitHub and resume."],
    ["Is there a certificate after completion?","Yes, an industry-recognised completion certificate is awarded after final assessment."],
    ["Can I get a free demo class?","Absolutely — book a free demo from the contact section and we'll arrange a session."]
  ];

  /* ---------- Helpers ---------- */
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const h = (html) => { const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstElementChild; };

  /* ---------- Inject content ---------- */
  const cg = $("#courseGrid");
  courses.forEach((c) => cg.append(h(`
    <article class="course reveal${c.featured ? " featured" : ""}">
      <div class="course-thumb">
        <img src="${c.img}" alt="${c.title}" loading="lazy" />
        <div class="course-overlay"></div>
        <div class="course-hero">
          <div>
            <h3>${c.title}</h3>
            <div class="course-meta">${c.duration} · ${c.level}</div>
          </div>
          ${c.featured ? '<span class="course-flag">Flagship</span>' : ''}
        </div>
      </div>
      <div class="course-body">
        <div class="course-tools">
          ${c.tools.map((t) => `<span>${t}</span>`).join('')}
        </div>
        <div class="course-bottom">
          <span>${c.projects} live projects</span>
          <a href="#contact" class="course-link">Learn More →</a>
        </div>
      </div>
    </article>`)));

  const wg = $("#whyGrid");
  why.forEach(([i,t,d]) => wg.append(h(`
    <div class="why reveal"><div class="ico">${i}</div><strong>${t}</strong><span>${d}</span></div>`)));

  const pg = $("#projectGrid");
  projects.forEach(p => pg.append(h(`
    <article class="project reveal">
      <div class="thumb"><img src="${p.img}" alt="${p.n} preview" loading="lazy" width="1024" height="576" /></div>
      <div class="body">
        <h3>${p.n}</h3><p>${p.d}</p>
        <div class="tags">${p.tags.map(t=>`<span class="tag">#${t.toLowerCase()}</span>`).join("")}</div>
      </div>
    </article>`)));

  const tl = $("#timeline");
  steps.forEach(([t,d]) => tl.append(h(`<li class="reveal"><strong>${t}</strong><span>${d}</span></li>`)));

  const plg = $("#placePanel");
  plg.innerHTML = `
    <div class="placement-panel glass-strong reveal">
      <div class="placement-intro">
        <span class="placement-label">Placement Support - Samudhra Academy Thoothukudi</span>
        <h2>100% Placement Support Across <span class="text-gradient">Tamil Nadu</span></h2>
        <p>Our students from Thoothukudi have secured jobs after completing Full Stack, Python, Data Science, AI and DevOps courses.</p>
      </div>
      <div class="place-grid">
        ${placement.map(p => `
          <div class="place-card reveal">
            <div class="place-icon">${p.icon}</div>
            <div>
              <strong style="font-size:0.9rem;">${p.title}</strong>
              <p style="font-size:0.8rem;">${p.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <a href="#contact" class="btn btn-primary">Talk to a counsellor</a>
    </div>`;

  const st = $("#sliderTrack"), sd = $("#sliderDots");
  reviews.forEach((r,i) => {
    st.append(h(`
      <div class="review" role="group" aria-roledescription="slide" aria-label="${i+1} of ${reviews.length}">
        <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote>“${r.q}”</blockquote>
        <div class="who"><div class="ava">${r.n[0]}</div><div><strong>${r.n}</strong><span>${r.r}</span></div></div>
      </div>`));
    sd.append(h(`<button class="s-dot${i===0?" active":""}" aria-label="Go to slide ${i+1}"></button>`));
  });

  /*const mg = $("#masonry");
  gallery.forEach(([n,ar]) => mg.append(h(`
    <button class="tile" aria-label="${n}"><div class="inner" style="--ar:${ar}">${n}</div></button>`)));*/

  const fg = $("#facultyGrid");
  faculty.forEach(f => fg.append(h(`
    <article class="fac reveal">
      <div class="av">${f.n.split(" ").map(x=>x[0]).join("")}</div>
      <strong>${f.n}</strong><div class="role">${f.r}</div>
      <div class="skills">${f.s.map(s=>`<span class="skill">${s}</span>`).join("")}</div>
    </article>`)));

  const fl = $("#faqList");
  faqs.forEach(([q,a],i) => {
    const item = h(`
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false" aria-controls="fa-${i}">${q}</button>
        <div class="faq-a" id="fa-${i}" role="region">${a}</div>
      </div>`);
    item.querySelector(".faq-q").addEventListener("click", () => {
      const open = item.classList.toggle("open");
      item.querySelector(".faq-q").setAttribute("aria-expanded", open);
    });
    fl.append(item);
  });

  /* ---------- Nav scroll + mobile toggle ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll(); window.addEventListener("scroll", onScroll, { passive:true });

  const tog = $("#navToggle"), links = $(".nav-links");
  tog.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    tog.setAttribute("aria-expanded", open);
  });
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open"); tog.setAttribute("aria-expanded","false");
  }));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:0.12, rootMargin:"0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));

  /* ---------- Animated counters ---------- */
  const cio = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count, suffix = el.dataset.suffix || "";
      const dur = 1600, start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t-start)/dur);
        const eased = 1 - Math.pow(1-p, 3);
        el.textContent = Math.floor(target*eased).toLocaleString() + (p===1?suffix:"");
        if (p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold:0.4 });
  $$("[data-count]").forEach(el => cio.observe(el));

  /* ---------- Slider ---------- */
  const track = $("#sliderTrack"), dots = $$(".s-dot");
  let idx = 0, total = reviews.length, timer;
  const goto = (n) => {
    idx = (n+total)%total;
    track.style.transform = `translateX(-${idx*100}%)`;
    dots.forEach((d,i) => d.classList.toggle("active", i===idx));
  };
  $("#prevBtn").addEventListener("click", () => { goto(idx-1); reset(); });
  $("#nextBtn").addEventListener("click", () => { goto(idx+1); reset(); });
  dots.forEach((d,i) => d.addEventListener("click", () => { goto(i); reset(); }));
  const auto = () => { timer = setInterval(() => goto(idx+1), 6000); };
  const reset = () => { clearInterval(timer); auto(); };
  auto();

  /* ---------- Lightbox ---------- */
  const lb = h(`<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
    <button class="lb-close" aria-label="Close">×</button><div class="lb-card"></div></div>`);
  document.body.append(lb);
  const lbCard = lb.querySelector(".lb-card");
  $$(".masonry .tile").forEach(t => t.addEventListener("click", () => {
    lbCard.textContent = t.textContent.trim();
    lb.classList.add("open");
  }));
  const closeLb = () => lb.classList.remove("open");
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

  /* ---------- Magnetic buttons ---------- */
  $$(".btn-magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x*0.18}px, ${y*0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });

  /* ---------- Mouse glow ---------- */
  const glow = $("#mouseGlow");
  if (matchMedia("(pointer:fine)").matches) {
    let raf;
    window.addEventListener("mousemove", e => {
      glow.style.opacity = "1";
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      });
    });
    window.addEventListener("mouseleave", () => glow.style.opacity = "0");
  }

  /* ---------- Contact form ---------- 
  const cf = $("#contactForm"), fs = $("#formStatus");
  cf.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(cf));
    if (!data.name || !data.email || !data.phone || !data.course) {
      fs.style.color = "#DC2626"; fs.textContent = "Please fill in all required fields.";
      return;
    }
    fs.style.color = "var(--c-success)";
    fs.textContent = `Thank you, ${data.name.split(" ")[0]}! We'll reach you on ${data.phone} shortly.`;
    cf.reset();
  });

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();

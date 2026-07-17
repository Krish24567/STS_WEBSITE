// ================================
// STICKY NAV
// ================================
const header = document.getElementById("siteHeader");
const onScroll = () => {
  if (window.scrollY > 30) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll);
onScroll();

function showSuccess(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: { background: "#1E9E63" }
  }).showToast();
}

function showError(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: { background: "#DC2626" }
  }).showToast();
}

// ================================
// MOBILE MENU
// ================================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  menuBtn.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ================================
// SUBJECTS BASED ON GRADE (with "All Subjects" option)
// ================================
const gradeSelect = document.getElementById("grade");
const subjectContainer = document.getElementById("subjectContainer");

const SUBJECTS_BY_RANGE = {
  primary: ["English", "Tamil", "Mathematics", "Science", "EVS"],
  middle: ["English", "Tamil", "Mathematics", "Science", "Social Science"],
  senior: [
    "Physics", "Chemistry", "Mathematics", "Biology", "Computer Science",
    "Accountancy", "Commerce", "Economics", "Business Maths"
  ],
};

function subjectsForGrade(grade) {
  if (grade >= 1 && grade <= 5) return SUBJECTS_BY_RANGE.primary;
  if (grade >= 6 && grade <= 10) return SUBJECTS_BY_RANGE.middle;
  if (grade >= 11 && grade <= 12) return SUBJECTS_BY_RANGE.senior;
  return [];
}

gradeSelect.addEventListener("change", () => {
  const grade = parseInt(gradeSelect.value);
  const subjects = subjectsForGrade(grade);

  if (subjects.length === 0) { subjectContainer.innerHTML = ""; return; }

  let html = `<span class="subject-title">Select Subject(s)</span><div class="subject-grid">`;
  html += `<label class="all-subjects">
             <input type="checkbox" value="__all__" data-role="all">
             All Subjects
           </label>`;
  subjects.forEach(s => {
    html += `<label><input type="checkbox" value="${s}" data-role="one">${s}</label>`;
  });
  html += `</div>`;
  subjectContainer.innerHTML = html;

  const allBox = subjectContainer.querySelector('input[data-role="all"]');
  const oneBoxes = subjectContainer.querySelectorAll('input[data-role="one"]');

  const setChecked = (input, checked) => {
    input.checked = checked;
    input.closest("label").classList.toggle("checked", checked);
  };

  allBox.addEventListener("change", () => {
    oneBoxes.forEach(cb => setChecked(cb, allBox.checked));
    allBox.closest("label").classList.toggle("checked", allBox.checked);
  });

  oneBoxes.forEach(cb => {
    cb.addEventListener("change", () => {
      cb.closest("label").classList.toggle("checked", cb.checked);
      const allOn = Array.from(oneBoxes).every(x => x.checked);
      setChecked(allBox, allOn);
    });
  });
});

// ================================
// EMAILJS - TUTOR FORM
// ================================
const tutorForm = document.getElementById("tutorForm");

tutorForm.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_jy1go68", "template_btaavj6", this)
    .then(() => {
      showSuccess("Tutor Application Submitted Successfully!");
      tutorForm.reset();
    })
    .catch((error) => {
      console.error(error);
      showError("Failed to submit application.");
    });
});

// ================================
// EMAILJS - STUDENT FORM
// ================================
const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const checkedSubjects = Array.from(
    document.querySelectorAll('#subjectContainer input[data-role="one"]:checked')
  ).map(cb => cb.value);

  document.getElementById("selectedSubjects").value = checkedSubjects.join(", ");

  emailjs.sendForm("service_jy1go68", "template_skufeno", this)
    .then(() => {
      showSuccess("Admission Enquiry Submitted Successfully!");
      studentForm.reset();
      subjectContainer.innerHTML = "";
    })
    .catch((error) => {
      console.error(error);
      showError("Failed to submit enquiry.");
    });
});

// ================================
// ACTIVE NAV LINK + SLIDING INDICATOR
// ================================
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const navIndicator = document.querySelector(".nav-indicator");

function moveIndicator(link) {
  if (!navIndicator || !link || window.innerWidth <= 760) return;
  const parentRect = link.closest(".nav-links").getBoundingClientRect();
  const rect = link.getBoundingClientRect();
  navIndicator.style.width = rect.width + "px";
  navIndicator.style.left = (rect.left - parentRect.left) + "px";
  navIndicator.style.opacity = "1";
}

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });
  navItems.forEach(link => {
    const isActive = link.getAttribute("href") === "#" + current;
    link.classList.toggle("active", isActive);
    if (isActive) moveIndicator(link);
  });
});

window.addEventListener("load", () => {
  const active = document.querySelector(".nav-links a.active");
  if (active) moveIndicator(active);
});
window.addEventListener("resize", () => {
  const active = document.querySelector(".nav-links a.active");
  if (active) moveIndicator(active);
});

// ================================
// SCROLL REVEAL
// ================================
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("in"), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(item => revealObserver.observe(item));

// ================================
// ANIMATED STAT COUNTERS
// ================================
const statNums = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.4 });
statNums.forEach(el => statObserver.observe(el));

// ================================
// LEDGER PANEL BAR FILL (hero widget)
// ================================
const ledgerBars = document.querySelectorAll(".l-bar");
const ledgerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("filled"), i * 150);
      ledgerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
ledgerBars.forEach(bar => ledgerObserver.observe(bar));

console.log("✅ Samudhra Academy — redesigned site loaded");

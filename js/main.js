document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  renderAdvocateContent();
  initNavigation();
  initComplianceToggle();
  initAppointmentForm();
  initScrollReveal();
  processStudioPortraits();
});

const RESIDENCE_MAPS_URL =
  "https://www.google.com/maps/place/Skymoon+IT+Point/@25.6121935,85.0336459,15z/data=!4m10!1m2!2m1!1sVijay+Vihar+Colony+Near+St+Karens+Secondary+School+Khagaul+Road+Danapur+Patna+801503!3m6!1s0x39ed57e8643400b7:0x532077b95ecd2ab!8m2!3d25.6121935!4d85.0439456!15sClRWaWpheSBWaWhhciBDb2xvbnkgTmVhciBTdCBLYXJlbnMgU2Vjb25kYXJ5IFNjaG9vbCBLaGFnYXVsIFJvYWQgRGFuYXB1ciBQYXRuYSA4MDE1MDNaViJUdmlqYXkgdmloYXIgY29sb255IG5lYXIgc3Qga2FyZW5zIHNlY225kYXJ5IHNjaG9vbCBraGFnYXVsIHJvYWQgZGFuYXB1ciBwYXRuYSA4MDE1MDNaViJUdmlqYXkgdmloYXIgY29sb255IG5lYXIgc3Qga2FyZW5zIHNlY29uZGFyeSBzY2hvb2wga2hhZ2F1bCByb2FkIGRhbmFwdXIgcGF0bmEgODAxNTAzkgEbZWR1Y2F0aW9uYWxfdGVzdGluZ19zZXJ2aWNlmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJ1WDJGSE1YRm5SUkFC4AEA-gEECAAQKQ!16s%2Fg%2F11h7fqxl12?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D";

function normalizeCollegeName(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/\bS\.?\s*D\.?\s*Jain(?:\s+College)?(?:\s*,?\s*Ara)?\b/gi, "H. D. Jain College, Ara")
    .replace(/\bS\.?\s*B\.?\s*Jain(?:\s+College)?(?:\s*,?\s*Ara)?\b/gi, "H. D. Jain College, Ara")
    .replace(/\bD\.?\s*J\.?\s*Jain(?:\s+College)?(?:\s*,?\s*Ara)?\b/gi, "H. D. Jain College, Ara")
    .replace(/\bH\.?\s*D\.?\s*Jain(?:\s+College)?(?:\s*,?\s*Ara)?\b/gi, "H. D. Jain College, Ara");
}

function cleanText(text) {
  if (typeof text !== "string") return text;
  return normalizeCollegeName(text)
    .replace(/\(\s*Exact degree title pending confirmation prior to public release\.?\s*\)/gi, "")
    .replace(/\bExact degree title pending confirmation prior to public release\.?\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Cycle between 3 color themes (Chamber, Parchment, Slate)
 */
function initThemeSwitcher() {
  const btn = document.getElementById("themeSwitcherBtn");
  const labelEl = document.getElementById("themeSwitcherLabel");
  const themes = [
    { id: "chamber", name: "Chamber" },
    { id: "parchment", name: "Parchment" },
    { id: "slate", name: "Slate" }
  ];

  let savedId = "chamber";
  try {
    const stored = localStorage.getItem("akp_portfolio_theme");
    if (stored && themes.some((t) => t.id === stored)) {
      savedId = stored;
    }
  } catch {
    // Ignore storage restriction
  }

  const applyTheme = (themeId) => {
    if (themeId === "chamber") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
    const current = themes.find((t) => t.id === themeId) || themes[0];
    if (labelEl) {
      labelEl.textContent = `Theme: ${current.name}`;
    }
    if (btn) {
      btn.setAttribute("data-active-theme", current.id);
    }
  };

  applyTheme(savedId);

  if (!btn) return;
  btn.addEventListener("click", () => {
    const activeId = btn.getAttribute("data-active-theme") || "chamber";
    const idx = themes.findIndex((t) => t.id === activeId);
    const nextTheme = themes[(idx + 1) % themes.length];
    applyTheme(nextTheme.id);
    try {
      localStorage.setItem("akp_portfolio_theme", nextTheme.id);
    } catch {
      // Ignore storage error
    }
  });
}

/**
 * Populate all DOM sections from centralized ADVOCATE_DATA
 */
function renderAdvocateContent() {
  if (typeof ADVOCATE_DATA === "undefined") return;

  const { compliance, personal, credentials, practiceAreas, courtsAndForums, contact, disclaimer } =
    ADVOCATE_DATA;

  // Compliance Checklist
  const checklistEl = document.getElementById("verificationChecklist");
  if (checklistEl && compliance && Array.isArray(compliance.verificationChecklist)) {
    checklistEl.innerHTML = compliance.verificationChecklist
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  }

  // Hero
  setText("heroLabel", personal.heroLabel);
  setText("heroName", personal.fullName.toUpperCase());
  setText("heroDesignation", personal.designation);
  setText("heroIntro", personal.shortIntro);
  setText("heroEnrollment", credentials.barEnrollmentNumber);
  setText("heroEnrollmentYear", `Enrolled Year: ${credentials.enrollmentYear}`);
  setText("heroCourt", personal.primaryCourt);
  setText("heroLanguages", personal.languages.join(" & "));
  setText("heroExperience", `${personal.experienceText}*`);

  // About
  const bioContainer = document.getElementById("bioParagraphs");
  if (bioContainer) {
    const paras = personal.biographyParagraphs
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
    const note = `<p class="bio-note">${escapeHtml(personal.independentPracticeNote)} ${escapeHtml(
      personal.districtCourtNote
    )}</p>`;
    bioContainer.innerHTML = paras + note;
  }

  setText("aboutEnrollment", credentials.barEnrollmentNumber);
  setText("aboutLanguages", personal.languages.join(", "));

  const eduGrid = document.getElementById("aboutEducationGrid");
  if (eduGrid) {
    eduGrid.innerHTML = credentials.education
      .map(
        (edu) => `
        <div class="edu-item">
          <span class="edu-level">${escapeHtml(edu.level)}</span>
          <p class="edu-qual">${escapeHtml(edu.qualification)}</p>
          <p class="edu-inst">${escapeHtml(edu.institution)}</p>
        </div>`
      )
      .join("");
  }

  // Practice Areas
  const practiceGrid = document.getElementById("practiceGrid");
  if (practiceGrid) {
    practiceGrid.innerHTML = practiceAreas
      .map(
        (area) => `
        <article class="practice-card reveal">
          <div>
            <div class="practice-card-top">
              <div class="practice-icon-box" aria-hidden="true">${area.iconSvg}</div>
              <span class="practice-num">${escapeHtml(area.number)}</span>
            </div>
            <h3 class="practice-title">${escapeHtml(area.title)}</h3>
            <p class="practice-desc">${escapeHtml(area.description)}</p>
          </div>
          <div class="practice-matters">
            <span class="matters-label">Matters Handled</span>
            <ul class="matters-list">
              ${area.matters.map((m) => `<li>${escapeHtml(m)}</li>`).join("")}
            </ul>
          </div>
        </article>`
      )
      .join("");
  }

  // Courts & Forums
  setText(
    "courtsScopeNote",
    `Forums of appearance as supplied by the advocate. ${personal.districtCourtNote}`
  );
  const forumsList = document.getElementById("forumsList");
  if (forumsList) {
    forumsList.innerHTML = courtsAndForums
      .map(
        (forum) => `
        <div class="forum-row reveal">
          <div>
            <h3 class="forum-name">${escapeHtml(forum.name)}</h3>
            <p class="forum-scope">${escapeHtml(forum.scope)}</p>
            <p class="forum-note">${escapeHtml(forum.statusNote)}</p>
          </div>
          <div>
            <span class="status-pill ${forum.verified ? "verified" : "pending"}">
              ${forum.verified ? "✓ Confirmed Forum" : "◷ Pending Pre-Publication Detail"}
            </span>
          </div>
        </div>`
      )
      .join("");
  }

  // Professional Credentials Table
  const credentialsList = document.getElementById("credentialsList");
  if (credentialsList) {
    const rows = [
      {
        term: "Full Name",
        val: personal.fullName,
        sub: "Practising Advocate"
      },
      {
        term: "Bar Enrollment Number",
        val: credentials.barEnrollmentNumber,
        sub: `Enrolled in the year ${credentials.enrollmentYear}`
      },
      {
        term: "Enrollment Year",
        val: credentials.enrollmentYear,
        sub: "State Bar Roll Enrollment"
      },
      {
        term: "Graduation",
        val: credentials.education[0].qualification,
        sub: credentials.education[0].institution
      },
      {
        term: "Postgraduate Qualification",
        val: credentials.education[1].qualification,
        sub: `${credentials.education[1].institution} ${credentials.education[1].verificationNote || ""}`
      },
      {
        term: "Languages",
        val: personal.languages.join(" · "),
        sub: "Oral advocacy and legal drafting"
      },
      {
        term: "Practice Structure",
        val: "Independent Practice",
        sub: personal.independentPracticeNote
      }
    ];

    credentialsList.innerHTML = rows
      .map(
        (r) => `
        <div class="credential-row">
          <dt class="credential-term">${escapeHtml(r.term)}</dt>
          <dd>
            <span class="credential-val">${escapeHtml(r.val)}</span>
            <span class="credential-sub">${escapeHtml(r.sub)}</span>
          </dd>
        </div>`
      )
      .join("");
  }

  // Contact & Chamber Details
  const chamberEl = document.getElementById("chamberAddress");
  if (chamberEl) {
    chamberEl.innerHTML = contact.chamberLines.map((line) => escapeHtml(line)).join("<br />");
  }

  const mapsContainer = document.getElementById("mapsStatusContainer");
  if (mapsContainer) {
    if (contact.googleMaps.verified && contact.googleMaps.url) {
      mapsContainer.innerHTML = `<a href="${escapeHtml(
        contact.googleMaps.url
      )}" target="_blank" rel="noopener noreferrer" class="maps-link">View Verified Chamber Location ↗</a>`;
    } else {
      mapsContainer.innerHTML = `<p class="maps-note">${escapeHtml(contact.googleMaps.note)}</p>`;
    }
  }

  const addOfficeCard = document.getElementById("additionalOfficeCard");
  const addOfficeEl = document.getElementById("additionalOfficeAddress");
  if (addOfficeCard && addOfficeEl) {
    if (contact.additionalOfficeApproved) {
      addOfficeEl.innerHTML = contact.additionalOfficeLines
        .map((line) => escapeHtml(line))
        .join("<br />");
    } else {
      addOfficeCard.style.display = "none";
    }
  }

  const residenceMapsUrl =
    (contact && (contact.residenceMapsUrl || contact.additionalOfficeMapsUrl)) ||
    RESIDENCE_MAPS_URL;

  const residenceMapsContainer = document.getElementById("residenceMapsStatusContainer");
  if (residenceMapsContainer && residenceMapsUrl) {
    residenceMapsContainer.innerHTML = `<a href="${escapeHtml(
      residenceMapsUrl
    )}" target="_blank" rel="noopener noreferrer" class="maps-link">View Residence Location on Google Maps ↗</a>`;
  }

  const addMapsContainer = document.getElementById("additionalMapsStatusContainer");
  if (addMapsContainer && residenceMapsUrl) {
    addMapsContainer.innerHTML = `<a href="${escapeHtml(
      residenceMapsUrl
    )}" target="_blank" rel="noopener noreferrer" class="maps-link">View Residence / Office Location on Google Maps ↗</a>`;
  }

  const phoneLink = document.getElementById("phoneLink");
  if (phoneLink) {
    phoneLink.textContent = contact.phoneDisplay;
    phoneLink.href = contact.phoneHref;
  }

  const whatsappLink = document.getElementById("whatsappLink");
  if (whatsappLink) {
    whatsappLink.textContent = contact.whatsappDisplay;
    whatsappLink.href = contact.whatsappHref;
  }

  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.textContent = contact.email;
    emailLink.href = `mailto:${contact.email}`;
  }

  if (contact.chamberHours) {
    setText("chamberDays", contact.chamberHours.days);
    setText("chamberTiming", contact.chamberHours.timing);
  }

  if (contact.additionalOfficeHours) {
    setText("additionalOfficeDays", contact.additionalOfficeHours.days);
    setText("additionalOfficeTiming", contact.additionalOfficeHours.timing);
  }

  // Legal Disclaimer
  setText("disclaimerHeading", disclaimer.heading);
  const disclaimerPoints = document.getElementById("disclaimerPoints");
  if (disclaimerPoints) {
    disclaimerPoints.innerHTML = disclaimer.points
      .map(
        (pt, i) => `
        <li>
          <span class="disclaimer-index">0${i + 1}.</span>
          <span>${escapeHtml(pt)}</span>
        </li>`
      )
      .join("");
  }

  // Footer
  setText("footerAddress", `${personal.designation} · ${contact.chamberLines.join(" ")}`);
  setText("copyrightYear", disclaimer.copyrightYear);
}

/**
 * Request an Appointment Form Handler
 * Sends structured appointment enquiries directly to abhay.arpit@gmail.com
 * via FormSubmit AJAX endpoint + provides a direct Gmail / Mailto fallback.
 */
function initAppointmentForm() {
  const form = document.getElementById("appointmentForm");
  const submitBtn = document.getElementById("submitEnquiryBtn");
  const feedbackEl = document.getElementById("formFeedback");
  const dateInput = document.getElementById("appointmentDate");

  if (!form || !submitBtn || !feedbackEl) return;

  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedbackEl.hidden = true;
    feedbackEl.className = "form-feedback";

    const fullName = document.getElementById("fullName");
    const mobileNumber = document.getElementById("mobileNumber");
    const emailAddress = document.getElementById("emailAddress");
    const caseType = document.getElementById("caseType");
    const appointmentDate = document.getElementById("appointmentDate");
    const consultationMode = document.getElementById("consultationMode");
    const legalIssue = document.getElementById("legalIssue");
    const bciConsent = document.getElementById("bciConsent");

    const fields = [fullName, mobileNumber, emailAddress, caseType, appointmentDate, legalIssue];
    let hasError = false;

    fields.forEach((field) => {
      if (!field) return;
      field.classList.remove("invalid");
      if (!field.value.trim()) {
        field.classList.add("invalid");
        hasError = true;
      }
    });

    if (emailAddress && emailAddress.value.trim()) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.value.trim());
      if (!emailOk) {
        emailAddress.classList.add("invalid");
        hasError = true;
      }
    }

    if (hasError || !bciConsent || !bciConsent.checked) {
      feedbackEl.hidden = false;
      feedbackEl.classList.add("error");
      feedbackEl.textContent =
        "Please complete all required fields with a valid email address and confirm the Bar Council disclaimer checkbox before submitting.";
      return;
    }

    const recipientEmail =
      typeof ADVOCATE_DATA !== "undefined" && ADVOCATE_DATA.contact && ADVOCATE_DATA.contact.email
        ? ADVOCATE_DATA.contact.email
        : "abhay.arpit@gmail.com";

    const payload = {
      _subject: `Appointment Enquiry — ${caseType.value} (${fullName.value.trim()})`,
      _template: "table",
      _captcha: "false",
      "Full Name": fullName.value.trim(),
      "Mobile Number": mobileNumber.value.trim(),
      "Email Address": emailAddress.value.trim(),
      "Case Type": caseType.value,
      "Appointment Date Preference": appointmentDate.value,
      "Preferred Consultation Mode": consultationMode ? consultationMode.value : "Offline",
      "Brief Description of Legal Issue": legalIssue.value.trim()
    };

    submitBtn.disabled = true;
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Dispatching Enquiry...</span>";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Submission failed");
      }

      feedbackEl.hidden = false;
      feedbackEl.classList.add("success");
      feedbackEl.innerHTML = `
        <strong>Enquiry Submitted Directly.</strong>
        <p>Your appointment enquiry has been sent to <strong>${escapeHtml(
          recipientEmail
        )}</strong>. If this is the first time submitting from this domain, please check the inbox for a one-time activation email.</p>
      `;
      form.reset();
    } catch {
      feedbackEl.hidden = false;
      feedbackEl.classList.add("error");
      feedbackEl.innerHTML = `
        <strong>Direct Submission Could Not Be Completed.</strong>
        <p>Please check your internet connection or ensure the site is running over HTTP/HTTPS (not a blocked local file), and try submitting again.</p>
      `;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  });
}

/**
 * Sticky scroll state, active section highlighting, and mobile drawer toggle
 */
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const desktopLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  const onScroll = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 24);
    }

    let currentId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
      if (window.scrollY >= top) {
        currentId = sec.getAttribute("id") || "";
      }
    });

    desktopLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = !mobileNav.hasAttribute("hidden");
      if (isOpen) {
        mobileNav.setAttribute("hidden", "");
        mobileBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileNav.removeAttribute("hidden");
        mobileBtn.setAttribute("aria-expanded", "true");
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        mobileBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
}

/**
 * Toggle pre-publication compliance checklist
 */
function initComplianceToggle() {
  const toggleBtn = document.getElementById("checklistToggle");
  const panel = document.getElementById("checklistPanel");
  const chevron = document.getElementById("toggleChevron");

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener("click", () => {
    const isHidden = panel.hasAttribute("hidden");
    if (isHidden) {
      panel.removeAttribute("hidden");
      toggleBtn.setAttribute("aria-expanded", "true");
      if (chevron) chevron.innerHTML = "▴";
    } else {
      panel.setAttribute("hidden", "");
      toggleBtn.setAttribute("aria-expanded", "false");
      if (chevron) chevron.innerHTML = "▾";
    }
  });
}

/**
 * IntersectionObserver scroll reveal
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/**
 * Neutralizes the red curtain background in the advocate's photograph into a
 * subtle dark charcoal-navy studio backdrop using HTML5 Canvas while preserving
 * the advocate's exact facial features, glasses, and formal attire.
 */
function processStudioPortraits() {
  const images = document.querySelectorAll('img[data-studio-portrait="true"]');
  if (!images.length) return;

  const sourceImg = new Image();
  sourceImg.src = "assets/advocate-portrait.jpg";

  sourceImg.onload = () => {
    try {
      const maxWidth = 900;
      const scale = Math.min(1, maxWidth / sourceImg.width);
      const w = Math.round(sourceImg.width * scale);
      const h = Math.round(sourceImg.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(sourceImg, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        const ny = y / h;
        for (let x = 0; x < w; x++) {
          const nx = x / w;
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          const dx = (nx - 0.5) / 0.36;
          const dy = (ny - 0.56) / 0.44;
          const radialDist = Math.sqrt(dx * dx + dy * dy);

          const redDominance = r - Math.max(g, b);
          const isRedCurtain = r > 95 && redDominance > 42 && g < 110 && b < 110;
          const isTopCurtainStrip = ny < 0.22 && (r > 135 || redDominance > 25);

          const bgR = Math.round(14 + (1 - ny) * 10);
          const bgG = Math.round(25 + (1 - ny) * 14);
          const bgB = Math.round(34 + (1 - ny) * 18);

          let blend = 0;
          if (isRedCurtain || isTopCurtainStrip) {
            blend = radialDist > 0.72 ? 0.94 : 0.72;
          } else if (radialDist > 1.08) {
            blend = Math.min(0.88, (radialDist - 1.08) * 1.45);
          }

          if (blend > 0) {
            data[idx] = Math.round(r * (1 - blend) + bgR * blend);
            data[idx + 1] = Math.round(g * (1 - blend) + bgG * blend);
            data[idx + 2] = Math.round(b * (1 - blend) + bgB * blend);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const processedDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      images.forEach((img) => {
        img.src = processedDataUrl;
      });
    } catch {
      // Fallback gracefully to original image if canvas pixel access is restricted on file://
    }
  };
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = cleanText(value);
}

function escapeHtml(str) {
  return cleanText(String(str))
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, ">")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

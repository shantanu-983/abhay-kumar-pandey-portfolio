/**
 * Centralized Source-of-Truth Data File
 * Advocate: Abhay Kumar Pandey, Patna High Court
 * Governed by Bar Council of India Rule 36 (Development Preview)
 */
const ADVOCATE_DATA = {
  compliance: {
    isDevelopmentPreview: true,
    bannerText:
      "DEVELOPMENT PREVIEW — Pending Bar Council of India Rule 36 verification and advocate approval prior to public deployment.",
    verificationChecklist: [
      "Confirm exact postgraduate degree title (Chemistry — H.D. Jain College, Ara) before publishing formal degree letters.",
      "Confirm exact full expansion of 'BLT' and formal tribunal names prior to public deployment.",
      "Confirm exact wording for practice before the Supreme Court of India.",
      "Verify Google Maps destination link for Lawyers' Association, Room No. 2, Patna High Court.",
      "Verify 21+ years standing figure and publication approval for Bar Enrollment No. BR2436/2005.",
      "Verify BCI Rule 36 permission before keeping the Appointment Enquiry form enabled on the public site."
    ]
  },

  personal: {
    fullName: "Abhay Kumar Pandey",
    monogram: "AKP",
    designation: "Advocate, Patna High Court",
    primaryCourt: "Patna High Court",
    heroLabel: "ADVOCATE | PATNA HIGH COURT",
    experienceText: "21+ Years of Standing at the Bar",
    experienceVerified: false,
    languages: ["Hindi", "English"],
    independentPracticeNote: "Independent legal practice; not associated with any law firm.",
    districtCourtNote:
      "Practice is confined to the High Court, appellate forums, and tribunals; does not practise in District Courts.",
    shortIntro:
      "Independent legal practitioner based in Patna, Bihar, appearing before the Patna High Court and statutory tribunals across civil, criminal, constitutional, service, family, and property matters.",
    biographyParagraphs: [
      "Abhay Kumar Pandey is an independent Advocate practising primarily before the Patna High Court in Patna, Bihar. Enrolled at the Bar in 2005, his practice encompasses litigation and representation across constitutional writ jurisdiction, criminal appeals and bail matters, civil suits, government service disputes, family proceedings, and land ownership litigation.",
      "Maintaining an independent chambers practice at the Lawyers' Association, Room No. 2, Patna High Court, he conducts proceedings in both Hindi and English without affiliation to any law firm."
    ]
  },

  credentials: {
    barEnrollmentNumber: "BR2436/2005",
    enrollmentYear: "2005",
    education: [
      {
        level: "Graduation",
        qualification: "B.Sc., LL.B.",
        institution: "Maharaja College, Ara"
      },
      {
        level: "Postgraduate Qualification",
        qualification: "Chemistry",
        institution: "H.D. Jain College, Ara",
        verificationNote: "Exact degree title pending confirmation prior to public release."
      }
    ]
  },

  practiceAreas: [
    {
      number: "01",
      title: "Criminal Law",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3v18M3 7h18M5 7l-2 6h4l-2-6zm14 0l-2 6h4l-2-6zM8 21h8"/></svg>',
      description:
        "Representation in regular and anticipatory bail applications as well as criminal appellate proceedings before the High Court.",
      matters: ["Bail matters", "Criminal appeals"]
    },
    {
      number: "02",
      title: "Civil Law",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      description:
        "Handling of civil litigation, appellate remedies, and contested property disputes in accordance with procedural law.",
      matters: ["Property disputes", "Civil suits"]
    },
    {
      number: "03",
      title: "Constitutional Law",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>',
      description:
        "Drafting and arguing writ petitions involving enforcement of fundamental rights and judicial review of administrative action.",
      matters: ["Writ petitions", "Fundamental rights"]
    },
    {
      number: "04",
      title: "Service Law",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      description:
        "Representation in service-related proceedings concerning recruitment, seniority, disciplinary action, and pensionary benefits of government employees.",
      matters: ["Government employee matters"]
    },
    {
      number: "05",
      title: "Family Law",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      description:
        "Legal representation in matrimonial proceedings including divorce petitions and statutory maintenance claims.",
      matters: ["Divorce", "Maintenance"]
    },
    {
      number: "06",
      title: "Land and Property Law",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      description:
        "Proceedings relating to land title, possession, mutation disputes, and statutory ownership determinations.",
      matters: ["Land disputes", "Ownership matters"]
    }
  ],

  courtsAndForums: [
    {
      name: "Patna High Court",
      scope: "Patna, Bihar — Primary Forum of Practice",
      statusNote: "Confirmed primary court of regular practice.",
      verified: true
    },
    {
      name: "Supreme Court of India",
      scope: "New Delhi — Appellate Practice",
      statusNote: "Confirmed appellate forum of appearance.",
      verified: true
    },
    {
      name: "Bihar Land Tribunal (BLT)",
      scope: "Patna, Bihar — Statutory Tribunal Forum",
      statusNote: "Confirmed tribunal practice.",
      verified: true
    },
    {
      name: "Work Contract Tribunal",
      scope: "Statutory Tribunal Forum",
      statusNote: "Confirmed tribunal practice.",
      verified: true
    },
    {
      name: "Teachers Tribunal",
      scope: "Statutory Tribunal Forum",
      statusNote: "Confirmed tribunal practice.",
      verified: true
    }
  ],

  contact: {
    phoneDisplay: "+91 99052 11594",
    phoneHref: "tel:+919905211594",
    whatsappDisplay: "+91 99052 11594",
    whatsappHref: "https://wa.me/919905211594",
    email: "abhay.arpit@gmail.com",
    chamberLines: [
      "Lawyers' Association, Room No. 2,",
      "Patna High Court, Patna,",
      "Bihar, India"
    ],
    chamberHours: {
      days: "Monday to Friday",
      timing: "10:30 AM – 4:30 PM"
    },
    additionalOfficeApproved: true,
    additionalOfficeLines: [
      "Vijay Vihar Colony, Near St Karens Secondary School,", "Khagaul Road, Danapur, Patna, Bihar – 801503"
    ],
    additionalOfficeHours: {
      days: "Monday to Friday",
      timing: "5:00 PM – 8:30 PM"
    },
    googleMaps: {
      verified: true,
      url: "https://www.google.com/maps/search/?api=1&query=Lawyers+Association+Room+No+2+Patna+High+Court+Patna+Bihar",
      note: ""
    },
    additionalOfficeMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Vijay+Vihar+Colony+Near+St+Karens+Secondary+School+Khagaul+Road+Danapur+Patna+801503",
  },

  disclaimer: {
    heading: "Bar Council of India Rule 36 — Professional & Legal Disclaimer",
    points: [
      "This website is intended solely to provide basic, factual, and permitted professional information about Advocate Abhay Kumar Pandey in compliance with the rules of the Bar Council of India.",
      "The content presented on this website does not constitute legal advice, legal opinion, solicitation, or advertisement of any nature.",
      "Accessing, browsing, or communicating through the contact details listed on this website does not create or establish an advocate-client relationship.",
      "Visitors are advised not to transmit any confidential, privileged, or case-sensitive documents or information through this website or via unverified electronic channels."
    ],
    copyrightYear: "2026"
  }
};

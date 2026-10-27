/* ============================================================
   كل محتوى الموقع هنا — عدّلي النصوص واللينكات والصور من هذا الملف فقط
   • الصور: ضعيها في فولدر images واكتبي اسم الملف (لو الصورة مش موجودة بيظهر مكانها لون بديل)
   • *كلمة بين نجمتين* = كلمة مميزة باللون السماوي في العنوان
   • واتساب: اكتبي الرقم بالكود الدولي (مثال 201012345678) أو لينك كامل
   ============================================================ */
var siteConfig = {
  name: "Yalla Coding",
  logo: "images/logo.png",
  social: {
    facebook: "https://www.facebook.com/share/1J1hppCDKQ/?mibextid=wwXIfr",   // غيّريها للينكات صفحاتك
    instagram: "https://www.instagram.com/yalla.coding?exln=OW5zcHU5dWRud2Jh&utm_source=qr",
    tiktok: "https://www.tiktok.com/@yalla_coding26?_r=1&_t=ZS-9Ao1ehO1yIa",
    youtube: "https://youtube.com/@yallacoding_40?si=yGv8Onm0ls-UUjE2",
    whatsapp: "201034930096"
  },
  hero: {
    title: "ابدأ رحلتك في *البرمجة* مع *Yalla Coding*",
    text: "كورسات برمجة لجميع الأعمار، بأسلوب بسيط وممتع.",
    button: "استكشف الكورسات",
    image: "images/hero.png", 
    tagline: "From User To *Creator*"
  },
  coursesTitle: "كورساتنا",
  coursesText: "اختار المسار المناسب وابدأ من هنا",
  contactText: "للحجز أو الاستفسار يمكنك التواصل من خلال واتساب",
  cta: { title: "جاهز تبدأ؟", text: "تواصل معانا وهنساعدك تختار الكورس المناسب.", button: "احجز وتواصل معانا" },
  footer: ""
};

/* كل عنصر: id (فريد) + title، واختياري: subtitle, badge, image, button
   وإما children (مستوى جواه) أو linkAr (PDF عربي) + linkEn (PDF إنجليزي). theme:"dark" لخلفية كحلي */
var coursesData = { courses: [
  
  { id: "prog", title: "كورسات البرمجة", subtitle: "من 6 سنوات لحد 13+", image: "images/prog.jpg", theme: "dark", children: [
    { id: "a69", title: "المبرمج الصغير", badge: "من 6 إلى 9 سنوات", subtitle: "نتعلم أساسيات البرمجة وصناعة الألعاب والقصص", image: "images/age-6-9.jpg", children: [
      { id: "sc1", title: "Scratch Level 1", badge: "المستوى 1", image: "images/scratch-1.jpg", linkAr: "https://drive.google.com/file/d/19SQuQBDyoLqMz5NF1_rGAywqm7yY-wmi/view?usp=sharing", linkEn: "https://drive.google.com/file/d/1ibyho5NKfq26TQ-lk5nePQPgliWlDf2o/view?usp=sharing" },
      { id: "sc2", title: "Scratch Level 2", badge: "المستوى 2", image: "images/scratch-2.jpg", linkAr: "https://drive.google.com/file/d/1A2w3KFg_vyAu8qUXPMjFkU62Efh1pqxF/view?usp=sharing", linkEn: "https://drive.google.com/file/d/1HL07GXFz8cyVQzfajNwQ9jprJ5EWAU1N/view?usp=sharing" }
    ]},
    { id: "a1012", title: "المبرمج المبدع", badge: "من 10 إلى 12 سنة", subtitle: "نبني مشاريع تفاعلية بالبلوكات", image: "images/age-10-12.jpg", children: [
      { id: "pb1", title: "Pictoblox Level 1", subtitle: "Game Builder", badge: "المستوى 1", image: "images/pictoblox-1.jpg", linkAr: "https://drive.google.com/file/d/1iFXRw7FRCbM5ryu-X9-BktCGPgmrdVuj/view?usp=sharing", linkEn: "https://drive.google.com/file/d/1cX4f_joIu3Zg6wmA6jIP_iJTuzt5OmcL/view?usp=sharing" },
      { id: "pb2", title: "Pictoblox Level 2", subtitle: "AI Creator", badge: "المستوى 2", image: "images/pictoblox-2.jpg", linkAr: "https://drive.google.com/file/d/1F75X8CyQjeyAlaTIb5bszoMhwKI6wFV0/view?usp=sharing", linkEn: "https://drive.google.com/file/d/1ZekJ8FzCrDisNzp3b7n-HyMEYWrK1MQm/view?usp=sharing" }  
    ]},
    { id: "a13", title: "المبرمج المحترف", badge: "13 سنة فأكثر", subtitle: "نتعلم Python من الصفر ونبني مشاريع حقيقية", image: "images/age-13.jpg", children: [
      { id: "py", title: "Python Programming", badge: "13+ سنة", image: "images/python.jpg", linkAr: "https://drive.google.com/file/d/14mAPHYxlPmkKzDReHE1HDugtiZUy-GKE/view?usp=sharing", linkEn: "https://drive.google.com/file/d/1qbwlUfIq4jWCLqhKjfqZW35WEZPADVI8/view?usp=sharing" }
    ]}
  ]}
]};

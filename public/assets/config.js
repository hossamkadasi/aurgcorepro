(() => {
  "use strict";
  window.SURGIBOARD_CONFIG = Object.freeze({
    appName: "SurgiBoard Global",
    version: "2.0.0-alpha.1",
    releaseChannel: "clinical-pilot",
    supabaseUrl: "https://ckcnuqnkbhbdyfpoxppd.supabase.co",
    supabasePublishableKey: "sb_publishable_jAw3dKsn-UgItRN8NarFwg_ayDg01wA",
    functions: Object.freeze({
      questionPack: "question-pack",
      adminMetrics: "admin-metrics"
    }),
    packMaxQuestions: 50,
    demoFallback: true,
    officialFormats: Object.freeze({
      arab_preliminary: Object.freeze({ papers: 2, questionsPerPaper: 100, minutesPerPaper: 150, language: "English", verified: true }),
      arab_final: Object.freeze({ papers: 2, questionsPerPaper: 100, minutesPerPaper: 150, language: "English", verified: true })
    })
  });
})();

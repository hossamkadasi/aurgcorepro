"use strict";
const CONFIG = window.SURGIBOARD_CONFIG || {};
  const DEMO_QUESTIONS = Array.isArray(window.SURGIBOARD_DEMO_QUESTIONS) ? window.SURGIBOARD_DEMO_QUESTIONS : [];
  const PATHWAYS = Object.freeze([
    { id:"global_core", nameEn:"Global Core Surgery", nameAr:"الجراحة العامة العالمية", shortEn:"Global Core", shortAr:"المسار العالمي", status:"editorial", descriptionEn:"A unified core curriculum designed to map into regional and international examinations.", descriptionAr:"منهج أساسي موحّد قابل للمواءمة مع الامتحانات الإقليمية والعالمية." },
    { id:"arab_preliminary", nameEn:"Arab Board Preliminary", nameAr:"البورد العربي — الامتحان الأولي", shortEn:"Arab Preliminary", shortAr:"العربي الأولي", status:"verified", descriptionEn:"Basic sciences, perioperative principles and core General Surgery knowledge.", descriptionAr:"العلوم الأساسية ومبادئ ما حول الجراحة والمعرفة الأساسية في الجراحة العامة." },
    { id:"arab_final", nameEn:"Arab Board Final Knowledge", nameAr:"البورد العربي — النهائي المعرفي", shortEn:"Arab Final", shortAr:"العربي النهائي", status:"verified", descriptionEn:"Advanced clinical reasoning and management for the final knowledge examination.", descriptionAr:"استدلال سريري وتدبير متقدم للامتحان النهائي المعرفي." },
    { id:"yemeni_board", nameEn:"Yemeni Board in General Surgery", nameAr:"البورد اليمني في الجراحة العامة", shortEn:"Yemeni Board", shortAr:"البورد اليمني", status:"provisional", descriptionEn:"Configurable preparation pathway pending a fully verified official written blueprint.", descriptionAr:"مسار تحضيري قابل للتخصيص حتى توفر مخطط رسمي مكتوب ومفصّل." },
    { id:"professional_masters", nameEn:"Professional Master’s in General Surgery", nameAr:"الماجستير المهني في الجراحة العامة", shortEn:"Professional Master", shortAr:"الماجستير المهني", status:"provisional", descriptionEn:"Structured written-exam preparation with configurable institutional settings.", descriptionAr:"تحضير منظم للامتحان الكتابي مع إعدادات مؤسسية قابلة للتخصيص." }
  ]);
  const GLOBAL_DOMAINS = Object.freeze([
    "Basic Sciences","Perioperative & Critical Care","Emergency General Surgery","Trauma","Upper Gastrointestinal","Hepatopancreatobiliary","Colorectal","Breast & Endocrine","Vascular","Hernia & Abdominal Wall","Pediatric Surgery & Urology","Surgical Oncology"
  ]);
  const NAV_ITEMS = Object.freeze([
    {id:"home",icon:"⌂",en:"Home",ar:"الرئيسية",subEn:"Platform overview",subAr:"نظرة عامة"},
    {id:"dashboard",icon:"◫",en:"Dashboard",ar:"لوحة التعلم",subEn:"Adaptive daily plan",subAr:"الخطة اليومية"},
    {id:"qbank",icon:"▤",en:"QBank Builder",ar:"بناء بنك الأسئلة",subEn:"Custom study sets",subAr:"جلسات مخصصة"},
    {id:"mocks",icon:"◷",en:"Mock Exams",ar:"الامتحانات التجريبية",subEn:"Verified templates",subAr:"محاكاة الامتحان"},
    {id:"performance",icon:"⌁",en:"Performance",ar:"تحليل الأداء",subEn:"Readiness & mastery",subAr:"الجاهزية والإتقان"},
    {id:"review",icon:"↺",en:"Review Queue",ar:"طابور المراجعة",subEn:"Spaced repetition",subAr:"التكرار المتباعد"},
    {id:"offline",icon:"⇩",en:"Offline Packs",ar:"الحزم دون اتصال",subEn:"Controlled copies",subAr:"نسخ محكومة"},
    {id:"profile",icon:"◎",en:"Profile & Security",ar:"الملف والأمان",subEn:"Pathway and account",subAr:"المسار والحساب"},
    {id:"admin",icon:"◇",en:"Editorial",ar:"التحرير والمراجعة",subEn:"Role protected",subAr:"محمي بالصلاحيات",staffOnly:true}
  ]);

  const I18N = Object.freeze({
    en:{
      brandSubtitle:"General Surgery Board Intelligence",online:"Online",offline:"Offline",signIn:"Sign in",account:"Account",signOut:"Sign out",
      globalEyebrow:"GLOBAL · EVIDENCE-GOVERNED · OFFLINE-FIRST",hero:"One surgical knowledge platform. Multiple examination pathways.",
      heroBody:"Board-style General Surgery learning with bilingual explanations, adaptive review, verified exam templates and controlled offline packs.",
      start:"Start learning",explore:"Explore pathways",readiness:"Readiness estimate",attempted:"Attempted",accuracy:"Accuracy",coverage:"Coverage",
      pathwayHeading:"Choose an examination pathway",pathwayBody:"One deduplicated master bank is mapped to the curriculum and format of each examination.",
      verified:"Verified format",provisional:"Configurable / provisional",editorial:"Editorial master plan",whyDifferent:"Built to outperform a static book library",
      integrityTitle:"Content integrity is a product feature",integrityBody:"Commercial MCQ books guide curriculum and style only unless licensed. Production questions require provenance, rights clearance, similarity screening and specialist review.",
      noData:"No learning data yet",estimated:"Learning estimate — not an official pass prediction",demo:"DEMO / UNPUBLISHED",production:"Published bank item",
      syncComplete:"Sync complete",syncPending:"Pending sync",authRequired:"Sign in to access protected question packs and cross-device progress.",
      emptyPublished:"No specialist-reviewed questions have been published for this pathway yet.",save:"Save",cancel:"Cancel",continue:"Continue",loading:"Loading…"
    },
    ar:{
      brandSubtitle:"الذكاء التحضيري لبورد الجراحة العامة",online:"متصل",offline:"دون اتصال",signIn:"تسجيل الدخول",account:"الحساب",signOut:"تسجيل الخروج",
      globalEyebrow:"عالمي · محكوم بالدليل · يعمل دون اتصال",hero:"منصة معرفة جراحية واحدة لمسارات امتحانية متعددة.",
      heroBody:"تعلم بأسلوب امتحانات الجراحة العامة مع شرح عربي وإنجليزي ومراجعة تكيفية وقوالب امتحان موثقة وحزم محكومة دون اتصال.",
      start:"ابدأ التعلم",explore:"استكشف المسارات",readiness:"تقدير الجاهزية",attempted:"المحاولات",accuracy:"الدقة",coverage:"التغطية",
      pathwayHeading:"اختر مسار الامتحان",pathwayBody:"يُربط بنك موحد غير مكرر بمنهج وصيغة كل امتحان.",
      verified:"صيغة موثقة",provisional:"قابل للتخصيص / مؤقت",editorial:"خطة تحريرية عالمية",whyDifferent:"مصمم ليتفوق على مكتبة كتب ثابتة",
      integrityTitle:"نزاهة المحتوى جزء من المنتج",integrityBody:"تُستخدم كتب MCQ التجارية لتوجيه المنهج والأسلوب فقط ما لم تكن مرخصة. يتطلب نشر السؤال إثبات المصدر وتصفية الحقوق وفحص التشابه ومراجعة اختصاصي.",
      noData:"لا توجد بيانات تعلم بعد",estimated:"تقدير تعليمي وليس تنبؤًا رسميًا بالنجاح",demo:"تجريبي / غير منشور",production:"سؤال منشور من البنك",
      syncComplete:"اكتملت المزامنة",syncPending:"بانتظار المزامنة",authRequired:"سجل الدخول للوصول إلى حزم الأسئلة المحمية ومزامنة التقدم بين الأجهزة.",
      emptyPublished:"لا توجد أسئلة مراجعة تخصصيًا ومنشورة لهذا المسار حتى الآن.",save:"حفظ",cancel:"إلغاء",continue:"متابعة",loading:"جارٍ التحميل…"
    }
  });

  const dom = {};
  const state = {
    lang: localStorage.getItem("sb-lang") === "ar" ? "ar" : "en",
    route: "home",
    pathway: localStorage.getItem("sb-pathway") || "global_core",
    supabase: null,
    authSession: null,
    user: null,
    profile: null,
    db: null,
    packs: [],
    attempts: [],
    sessions: [],
    bookmarks: new Set(),
    notes: safeJson(localStorage.getItem("sb-notes"), {}),
    flags: new Set(safeJson(localStorage.getItem("sb-flags"), [])),
    activeSession: null,
    lastResult: null,
    adminMetrics: null,
    outboxCount: 0,
    syncing: false,
    timerId: null,
    qbankConfig: { source:"auto", mode:"tutor", count:10, difficulty:"all", system:"all", status:"all" }
  };

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheDom();
    setDocumentLanguage();
    bindGlobalEvents();
    state.db = await openDatabase();
    await loadLocalState();
    restoreActiveSession();
    initializeSupabase();
    await refreshIdentity();
    await refreshRemoteLearningData();
    state.route = routeFromHash();
    renderNavigation();
    render();
    registerServiceWorker();
    updateNetworkStatus();
    if (navigator.onLine) void syncOutbox();
    dom.app.setAttribute("aria-busy", "false");
  }

  function cacheDom() {
    dom.app = document.getElementById("app");
    dom.viewRoot = document.getElementById("viewRoot");
    dom.mainNav = document.getElementById("mainNav");
    dom.mobileNav = document.getElementById("mobileNav");
    dom.networkBadge = document.getElementById("networkBadge");
    dom.syncButton = document.getElementById("syncButton");
    dom.languageButton = document.getElementById("languageButton");
    dom.accountButton = document.getElementById("accountButton");
    dom.accountLabel = document.getElementById("accountLabel");
    dom.sidebarStatus = document.getElementById("sidebarStatus");
    dom.authDialog = document.getElementById("authDialog");
    dom.authForm = document.getElementById("authForm");
    dom.authTabs = document.getElementById("authTabs");
    dom.authTitle = document.getElementById("authTitle");
    dom.authDescription = document.getElementById("authDescription");
    dom.authEmail = document.getElementById("authEmail");
    dom.authPassword = document.getElementById("authPassword");
    dom.authPasswordField = document.getElementById("authPasswordField");
    dom.authNameField = document.getElementById("authNameField");
    dom.authName = document.getElementById("authName");
    dom.authMessage = document.getElementById("authMessage");
    dom.authSubmit = document.getElementById("authSubmit");
    dom.actionDialog = document.getElementById("actionDialog");
    dom.actionDialogContent = document.getElementById("actionDialogContent");
    dom.toastRegion = document.getElementById("toastRegion");
    dom.watermark = document.getElementById("watermark");
  }

  function bindGlobalEvents() {
    window.addEventListener("hashchange", () => { state.route = routeFromHash(); renderNavigation(); render(); });
    window.addEventListener("online", () => { updateNetworkStatus(); void syncOutbox(); });
    window.addEventListener("offline", updateNetworkStatus);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyboard);
    dom.languageButton.addEventListener("click", toggleLanguage);
    dom.accountButton.addEventListener("click", () => state.user ? navigate("profile") : openAuth("signin"));
    dom.syncButton.addEventListener("click", () => void syncOutbox(true));
    dom.authTabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-auth-mode]");
      if (button) setAuthMode(button.dataset.authMode);
    });
    dom.authForm.addEventListener("submit", handleAuthSubmit);
    document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog")?.close()));
  }

  function handleDocumentClick(event) {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      const route = routeButton.dataset.route;
      if (route === "admin" && !isStaff()) { toast(t("authRequired"), "warning"); if (!state.user) openAuth("signin"); else navigate("profile"); return; }
      navigate(route);
      return;
    }
    const action = event.target.closest("[data-action]");
    if (!action) return;
    const name = action.dataset.action;
    const handlers = {
      selectPathway: () => selectPathway(action.dataset.pathway),
      openAuth: () => openAuth(action.dataset.mode || "signin"),
      signOut: () => void signOut(),
      startDailyPlan: () => startDailyPlan(action.dataset.plan),
      startBuilder: () => startBuilderSession(),
      selectSource: () => { state.qbankConfig.source = action.dataset.source; renderQBank(); },
      selectMode: () => { state.qbankConfig.mode = action.dataset.mode; renderQBank(); },
      answerOption: () => selectAnswer(Number(action.dataset.index)),
      setConfidence: () => setConfidence(Number(action.dataset.value)),
      submitAnswer: () => submitAnswer(),
      sessionNext: () => moveSession(1),
      sessionPrevious: () => moveSession(-1),
      sessionGo: () => goToQuestion(Number(action.dataset.index)),
      finishSession: () => finishSession(),
      toggleFlag: () => toggleFlag(currentQuestion()?.id),
      toggleBookmark: () => void toggleBookmark(currentQuestion()),
      toggleExplanationLanguage: () => { if (state.activeSession) { state.activeSession.explanationLang = state.activeSession.explanationLang === "ar" ? "en" : "ar"; renderSession(); } },
      reviewQuestion: () => startReviewForQuestion(action.dataset.questionId),
      downloadPack: () => void downloadQuestionPack(action.dataset.pathway || state.pathway, Number(action.dataset.limit || 30)),
      startPack: () => startPack(action.dataset.packId),
      deletePack: () => void deletePack(action.dataset.packId),
      startMock: () => void startMock(action.dataset.pathway, Number(action.dataset.count || 100), Number(action.dataset.minutes || 150)),
      reportQuestion: () => openReportDialog(currentQuestion()),
      saveProfile: () => void saveProfile(),
      refreshAdmin: () => void loadAdminMetrics(true),
      showResultReview: () => startResultReview(),
      closeActionDialog: () => dom.actionDialog.close(),
      resumeSession: () => navigate("session")
    };
    handlers[name]?.();
  }

  function handleKeyboard(event) {
    if (dom.authDialog.open || dom.actionDialog.open || state.route !== "session" || !state.activeSession) return;
    const tag = event.target.tagName;
    if (["INPUT","TEXTAREA","SELECT"].includes(tag)) return;
    const key = event.key.toLowerCase();
    if (["1","2","3","4","5"].includes(key)) selectAnswer(Number(key) - 1);
    else if (key === "arrowright" && document.documentElement.dir === "ltr") moveSession(1);
    else if (key === "arrowleft" && document.documentElement.dir === "ltr") moveSession(-1);
    else if (key === "arrowleft" && document.documentElement.dir === "rtl") moveSession(1);
    else if (key === "arrowright" && document.documentElement.dir === "rtl") moveSession(-1);
    else if (key === "b") void toggleBookmark(currentQuestion());
    else if (key === "f") toggleFlag(currentQuestion()?.id);
    else if (key === "enter") submitAnswer();
  }

  function initializeSupabase() {
    try {
      if (!window.supabase?.createClient || !CONFIG.supabaseUrl || !CONFIG.supabasePublishableKey) return;
      state.supabase = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabasePublishableKey, {
        auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true},
        global:{headers:{"x-client-info":`surgiboard-global/${CONFIG.version || "dev"}`}}
      });
      state.supabase.auth.onAuthStateChange((_event, session) => {
        state.authSession = session;
        state.user = session?.user || null;
        window.setTimeout(async () => {
          await refreshIdentity();
          await refreshRemoteLearningData();
          renderNavigation();
          render();
        }, 0);
      });
    } catch (error) {
      console.error("Supabase initialization failed", error);
    }
  }

  async function refreshIdentity() {
    if (!state.supabase) { updateAccountUi(); return; }
    try {
      const { data:{ session } } = await state.supabase.auth.getSession();
      state.authSession = session;
      if (!session) { state.user = null; state.profile = null; updateAccountUi(); return; }
      const { data:{ user }, error:userError } = await state.supabase.auth.getUser();
      if (userError) throw userError;
      state.user = user;
      await ensureProfile();
      updateAccountUi();
      await registerDevice();
    } catch (error) {
      console.error("Identity refresh failed", error);
      state.user = null; state.profile = null; updateAccountUi();
    }
  }

  async function ensureProfile() {
    if (!state.user || !state.supabase) return;
    const { data, error } = await state.supabase.from("profiles").select("id,display_name,country_code,training_level,preferred_language,primary_pathway,role,last_seen_at").eq("id", state.user.id).maybeSingle();
    if (error) throw error;
    if (data) {
      state.profile = data;
      if (data.primary_pathway) state.pathway = data.primary_pathway;
      if (data.preferred_language === "ar" || data.preferred_language === "en") state.lang = data.preferred_language;
      setDocumentLanguage();
      await state.supabase.from("profiles").update({last_seen_at:new Date().toISOString()}).eq("id", state.user.id);
      return;
    }
    const displayName = state.user.user_metadata?.display_name || state.user.email?.split("@")[0] || "Surgical trainee";
    const profile = {id:state.user.id,display_name:displayName,preferred_language:state.lang,primary_pathway:state.pathway,role:"student",last_seen_at:new Date().toISOString()};
    const { data:created, error:createError } = await state.supabase.from("profiles").insert(profile).select("id,display_name,country_code,training_level,preferred_language,primary_pathway,role,last_seen_at").single();
    if (createError) throw createError;
    state.profile = created;
  }

  async function registerDevice() {
    if (!state.user || !state.supabase || !window.crypto?.subtle) return;
    try {
      const raw = [navigator.userAgent,navigator.language,screen.width,screen.height].join("|");
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
      const hash = [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2,"0")).join("");
      const device = {user_id:state.user.id,device_fingerprint_hash:hash,device_family:mobileFamily(),platform:navigator.platform || "web",app_version:CONFIG.version,last_seen_at:new Date().toISOString()};
      const { data:existing } = await state.supabase.from("user_devices").select("id").eq("user_id",state.user.id).eq("device_fingerprint_hash",hash).maybeSingle();
      if (existing?.id) await state.supabase.from("user_devices").update(device).eq("id",existing.id);
      else await state.supabase.from("user_devices").insert(device);
    } catch (error) { console.warn("Device registration skipped", error); }
  }

  async function refreshRemoteLearningData() {
    if (!state.user || !state.supabase) return;
    try {
      const [attemptResult, sessionResult, bookmarkResult] = await Promise.all([
        state.supabase.from("question_attempts").select("client_event_id,question_id,selected_option,is_correct,confidence,response_ms,pathway,attempted_at").order("attempted_at",{ascending:false}).limit(500),
        state.supabase.from("study_sessions").select("client_session_id,pathway,mode,started_at,ended_at,question_count,correct_count,duration_seconds").order("started_at",{ascending:false}).limit(100),
        state.supabase.from("bookmarks").select("question_id")
      ]);
      if (!attemptResult.error) {
        const existingAttempts = new Map(state.attempts.map((item) => [item.client_event_id, item]));
        for (const attempt of attemptResult.data || []) {
          const normalized = {...(existingAttempts.get(attempt.client_event_id)||{}),...attempt,source:"remote"};
          await idbPut("attempts", normalized);
        }
      }
      if (!sessionResult.error) for (const session of sessionResult.data || []) await idbPut("sessions", session);
      if (!bookmarkResult.error) for (const item of bookmarkResult.data || []) await idbPut("bookmarks", {key:item.question_id,question_id:item.question_id,remote:true});
      await loadLocalState();
    } catch (error) { console.warn("Remote learning data refresh failed", error); }
  }

  async function loadLocalState() {
    if (!state.db) return;
    state.packs = (await idbAll("packs")).filter((pack) => !pack.revoked_at);
    state.outboxCount = (await idbAll("outbox")).length;
    state.attempts = await idbAll("attempts");
    state.sessions = await idbAll("sessions");
    state.bookmarks = new Set((await idbAll("bookmarks")).map((item) => item.question_id));
  }

  function renderNavigation() {
    const items = NAV_ITEMS.filter((item) => !item.staffOnly || isStaff());
    dom.mainNav.innerHTML = items.map((item) => navItemMarkup(item, false)).join("");
    const mobileItems = ["home","dashboard","qbank","mocks","performance"].map((id) => items.find((item) => item.id === id)).filter(Boolean);
    dom.mobileNav.innerHTML = mobileItems.map((item) => navItemMarkup(item, true)).join("");
    const pending = state.outboxCount;
    dom.sidebarStatus.innerHTML = `<strong>${escapeHtml(CONFIG.releaseChannel || "Clinical pilot")}</strong><p>${state.user ? `${escapeHtml(state.profile?.display_name || state.user.email || "Account")} · ${escapeHtml(roleLabel())}` : (state.lang === "ar" ? "وضع العرض التجريبي. الحزم الإنتاجية تتطلب تسجيل الدخول." : "Demonstration mode. Production packs require sign-in.")}</p><p id="outboxStatus">${state.lang === "ar" ? "عناصر المزامنة" : "Sync queue"}: ${pending}</p>`;
    updateAccountUi();
  }

  function navItemMarkup(item, mobile) {
    const active = state.route === item.id || (item.id === "qbank" && ["session","results"].includes(state.route));
    if (mobile) return `<button type="button" data-route="${item.id}" class="${active ? "active" : ""}"><span aria-hidden="true">${item.icon}</span>${escapeHtml(item[state.lang])}</button>`;
    return `<button type="button" data-route="${item.id}" class="nav-button ${active ? "active" : ""}"><span class="nav-icon" aria-hidden="true">${item.icon}</span><span class="nav-copy"><strong>${escapeHtml(item[state.lang])}</strong><small>${escapeHtml(item[state.lang === "ar" ? "subAr" : "subEn"])}</small></span></button>`;
  }

  function render() {
    clearTimer();
    const renderers = {
      home:renderHome,dashboard:renderDashboard,qbank:renderQBank,mocks:renderMocks,performance:renderPerformance,
      review:renderReviewQueue,offline:renderOffline,profile:renderProfile,admin:renderAdmin,session:renderSession,results:renderResults
    };
    (renderers[state.route] || renderHome)();
    document.getElementById("workspace")?.focus({preventScroll:true});
  }

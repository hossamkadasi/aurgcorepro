"use strict";
function renderHome() {
    const metrics = computeLearningMetrics();
    dom.viewRoot.innerHTML = `
      <section class="hero">
        <div class="hero-content"><span class="eyebrow">${t("globalEyebrow")}</span><h1>${t("hero")}</h1><p>${t("heroBody")}</p>
          <div class="button-row" style="margin-top:24px"><button class="button button-primary" data-route="dashboard">${t("start")} →</button><button class="button button-secondary" data-action="openPathways">${t("explore")}</button></div>
        </div>
        <aside class="hero-panel"><div><span class="eyebrow">${t("readiness")}</span><div class="hero-score"><strong>${metrics.readiness}</strong><span>/ 100<br>${t("estimated")}</span></div></div>
          <div class="hero-mini-grid"><div><strong>${metrics.total}</strong><small>${t("attempted")}</small></div><div><strong>${metrics.accuracy}%</strong><small>${t("accuracy")}</small></div><div><strong>${metrics.coverage}%</strong><small>${t("coverage")}</small></div></div>
        </aside>
      </section>
      <section id="pathwaySection" class="section"><div class="section-heading"><div><span class="eyebrow">EXAM PATHWAYS</span><h2>${t("pathwayHeading")}</h2><p>${t("pathwayBody")}</p></div></div><div class="card-grid">${PATHWAYS.map(pathwayCard).join("")}</div></section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">LEARNING SYSTEM</span><h2>${t("whyDifferent")}</h2></div></div>
        <div class="card-grid four">
          ${featureCard("◎",state.lang === "ar" ? "خطة تكيفية يومية" : "Adaptive daily plan",state.lang === "ar" ? "أسئلة جديدة ومراجعات مستحقة ونقاط ضعف واختبار زمني." : "New items, due reviews, weak-topic work and timed sets.")}
          ${featureCard("⌁",state.lang === "ar" ? "ذكاء الأداء" : "Performance intelligence",state.lang === "ar" ? "إتقان الموضوعات ومعايرة الثقة وأخطاء الثقة العالية." : "Topic mastery, confidence calibration and high-confidence errors.")}
          ${featureCard("◷",state.lang === "ar" ? "محاكاة موثقة" : "Verified mock formats",state.lang === "ar" ? "قوالب البورد العربي موثقة، والمسارات غير الموثقة قابلة للتخصيص." : "Verified Arab Board templates; unverified formats remain configurable.")}
          ${featureCard("⇩",state.lang === "ar" ? "دراسة محكومة دون اتصال" : "Controlled offline study",state.lang === "ar" ? "حزم محدودة وموقعة وموسومة بالمستخدم ومنتهية الصلاحية." : "Limited, signed, watermarked and expiring user-issued packs.")}
        </div>
      </section>
      <section class="section integrity-banner"><span class="integrity-icon">✓</span><div><h3>${t("integrityTitle")}</h3><p>${t("integrityBody")}</p></div></section>`;
    dom.viewRoot.querySelector('[data-action="openPathways"]')?.addEventListener("click", () => document.getElementById("pathwaySection")?.scrollIntoView({behavior:"smooth"}));
  }

  function pathwayCard(pathway) {
    const selected = state.pathway === pathway.id;
    const statusText = pathway.status === "verified" ? t("verified") : pathway.status === "provisional" ? t("provisional") : t("editorial");
    const statusClass = pathway.status === "verified" ? "tag-green" : pathway.status === "provisional" ? "tag-gold" : "tag-teal";
    return `<button type="button" class="pathway-card ${selected ? "selected" : ""}" data-action="selectPathway" data-pathway="${pathway.id}"><h3>${escapeHtml(state.lang === "ar" ? pathway.nameAr : pathway.nameEn)}</h3><p>${escapeHtml(state.lang === "ar" ? pathway.descriptionAr : pathway.descriptionEn)}</p><footer><span class="tag ${statusClass}">${escapeHtml(statusText)}</span><span aria-hidden="true">→</span></footer></button>`;
  }

  function featureCard(icon, title, body) { return `<article class="card"><span class="plan-icon">${icon}</span><h3 style="margin:12px 0 0;color:var(--navy-900);font-size:13px">${escapeHtml(title)}</h3><p style="margin:7px 0 0;color:var(--muted);font-size:10px;line-height:1.6">${escapeHtml(body)}</p></article>`; }

  function renderDashboard() {
    const metrics = computeLearningMetrics();
    const pathway = getPathway(state.pathway);
    const plan = buildDailyPlan(metrics);
    const systemStats = computeSystemStats();
    dom.viewRoot.innerHTML = `${pageHeader("LEARNING COMMAND CENTRE",state.lang === "ar" ? `خطتك لمسار ${pathway.nameAr}` : `Your ${pathway.nameEn} plan`,state.lang === "ar" ? "خطة متكيفة مبنية على المحاولات الحالية، وليست توقعًا رسميًا بالنجاح." : "An adaptive plan based on current learning evidence, not an official pass prediction.",`${state.activeSession?`<button class="button button-primary" data-action="resumeSession">${state.lang === "ar" ? "استئناف الجلسة" : "Resume session"}</button>`:""}<button class="button button-secondary" data-route="qbank">${state.lang === "ar" ? "جلسة مخصصة" : "Build a session"}</button>`)}
      <div class="metrics-grid">
        ${metricCard(t("readiness"),`${metrics.readiness}/100`,t("estimated"))}
        ${metricCard(t("accuracy"),`${metrics.accuracy}%`,metrics.total ? `${metrics.correct}/${metrics.total}` : t("noData"))}
        ${metricCard(t("coverage"),`${metrics.coverage}%`,`${metrics.coveredDomains}/${GLOBAL_DOMAINS.length} ${state.lang === "ar" ? "مجالًا" : "domains"}`)}
        ${metricCard(state.lang === "ar" ? "المراجعات المستحقة" : "Reviews due",String(metrics.reviewDue),state.lang === "ar" ? "تكرار متباعد" : "Spaced repetition")}
      </div>
      <div class="dashboard-grid section">
        <section class="panel"><h2>${state.lang === "ar" ? "الخطة التكيفية اليوم" : "Today’s adaptive plan"}</h2><p class="panel-subtitle">${metrics.total ? (state.lang === "ar" ? "تتغير الأولوية حسب الأخطاء والثقة والوقت." : "Priority changes with errors, confidence and response time.") : (state.lang === "ar" ? "ابدأ بجلسة تجريبية لتكوين أول خط أساس." : "Start a demo session to establish a learning baseline.")}</p><div class="plan-list">${plan.map(planRow).join("")}</div></section>
        <section class="panel"><h2>${state.lang === "ar" ? "مكونات الجاهزية" : "Readiness components"}</h2><p class="panel-subtitle">${t("estimated")}</p>
          ${coverageBar(state.lang === "ar" ? "الدقة الحديثة" : "Recent accuracy",metrics.accuracy,"",false)}
          ${coverageBar(state.lang === "ar" ? "تغطية المنهج" : "Blueprint coverage",metrics.coverage,"",false)}
          ${coverageBar(state.lang === "ar" ? "معايرة الثقة" : "Confidence calibration",metrics.calibration,"",metrics.calibration < 40)}
          ${coverageBar(state.lang === "ar" ? "الأداء الزمني" : "Timed efficiency",metrics.timedEfficiency,"",metrics.timedEfficiency < 40)}
        </section>
      </div>
      <section class="panel section"><div class="section-heading"><div><span class="eyebrow">BLUEPRINT</span><h2>${state.lang === "ar" ? "تغطية المجالات" : "Domain coverage"}</h2></div><button class="button button-small button-secondary" data-route="performance">${state.lang === "ar" ? "تحليل كامل" : "Full analysis"}</button></div>
        <div class="card-grid two">${GLOBAL_DOMAINS.map((domain) => { const item=systemStats[domain]||{attempts:0,accuracy:0}; return coverageBar(domain,item.accuracy,`${item.attempts} ${state.lang === "ar" ? "محاولة" : "attempts"}`,item.attempts>0&&item.accuracy<60); }).join("")}</div>
      </section>`;
  }

  function planRow(item) { return `<div class="plan-row"><span class="plan-icon">${item.icon}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.subtitle)}</small></span><button class="button button-small ${item.priority ? "button-navy" : "button-secondary"}" data-action="startDailyPlan" data-plan="${item.id}">${state.lang === "ar" ? "ابدأ" : "Start"}</button></div>`; }

  function renderQBank() {
    const questions = availableQuestions(state.qbankConfig.source);
    const systems = [...new Set(questions.map((question) => question.system).filter(Boolean))].sort();
    const filtered = filterQuestions(questions);
    const sourceLabel = state.qbankConfig.source === "demo" ? (state.lang === "ar" ? "العرض التجريبي" : "Demonstration") : state.qbankConfig.source === "offline" ? (state.lang === "ar" ? "الحزم المحفوظة" : "Saved offline packs") : (state.lang === "ar" ? "أفضل مصدر متاح" : "Best available source");
    dom.viewRoot.innerHTML = `${pageHeader("QUESTION BANK",state.lang === "ar" ? "أنشئ جلسة دقيقة لهدفك" : "Build a precise study session",state.lang === "ar" ? "البنك الرئيسي لا يُرسل إلى المتصفح. تدخل الأسئلة الإنتاجية فقط عبر حزم محمية." : "The master bank is never shipped to the browser. Production questions enter only through protected packs.",`<button class="button button-secondary" data-action="downloadPack" data-pathway="${state.pathway}" data-limit="30">${state.lang === "ar" ? "تنزيل حزمة محمية" : "Download protected pack"}</button>`)}
      <div class="builder-grid">
        <section class="panel filter-panel"><h2>${state.lang === "ar" ? "إعداد الجلسة" : "Session configuration"}</h2>
          <label class="field"><span>${state.lang === "ar" ? "المسار" : "Pathway"}</span><select id="builderPathway">${PATHWAYS.map((p)=>`<option value="${p.id}" ${p.id===state.pathway?"selected":""}>${escapeHtml(state.lang==="ar"?p.nameAr:p.nameEn)}</option>`).join("")}</select></label>
          <div class="field"><span>${state.lang === "ar" ? "مصدر الأسئلة" : "Question source"}</span><div class="source-selector"><button class="source-option ${state.qbankConfig.source==="auto"?"selected":""}" data-action="selectSource" data-source="auto"><strong>${state.lang === "ar" ? "تلقائي" : "Automatic"}</strong><small>${state.lang === "ar" ? "حزمة صالحة ثم العرض التجريبي" : "Valid pack, then demo fallback"}</small></button><button class="source-option ${state.qbankConfig.source==="demo"?"selected":""}" data-action="selectSource" data-source="demo"><strong>Demo</strong><small>${t("demo")}</small></button></div></div>
          <div class="field"><span>${state.lang === "ar" ? "النمط" : "Mode"}</span><div class="source-selector">${["tutor","timed","exam"].map((mode)=>`<button class="source-option ${state.qbankConfig.mode===mode?"selected":""}" data-action="selectMode" data-mode="${mode}"><strong>${modeLabel(mode)}</strong><small>${modeDescription(mode)}</small></button>`).join("")}</div></div>
          <label class="field"><span>${state.lang === "ar" ? "المجال" : "Domain"}</span><select id="builderSystem"><option value="all">${state.lang === "ar" ? "كل المجالات" : "All domains"}</option>${systems.map((system)=>`<option value="${escapeAttr(system)}" ${state.qbankConfig.system===system?"selected":""}>${escapeHtml(system)}</option>`).join("")}</select></label>
          <label class="field"><span>${state.lang === "ar" ? "الصعوبة" : "Difficulty"}</span><select id="builderDifficulty"><option value="all">${state.lang === "ar" ? "كل المستويات" : "All levels"}</option><option value="1" ${state.qbankConfig.difficulty==="1"?"selected":""}>${state.lang === "ar" ? "سهل" : "Easy"}</option><option value="2" ${state.qbankConfig.difficulty==="2"?"selected":""}>${state.lang === "ar" ? "متوسط" : "Moderate"}</option><option value="3" ${state.qbankConfig.difficulty==="3"?"selected":""}>${state.lang === "ar" ? "صعب" : "Hard"}</option></select></label>
          <label class="field"><span>${state.lang === "ar" ? "عدد الأسئلة" : "Question count"}</span><input id="builderCount" type="number" min="1" max="100" value="${Math.min(state.qbankConfig.count,Math.max(1,filtered.length))}"></label>
          <button class="button button-navy button-full" data-action="startBuilder" ${filtered.length?"":"disabled"}>${state.lang === "ar" ? "ابدأ الجلسة" : "Start session"} · ${Math.min(state.qbankConfig.count,filtered.length)}</button>
        </section>
        <section><div class="integrity-banner"><span class="integrity-icon">i</span><div><h3>${escapeHtml(sourceLabel)}</h3><p>${state.qbankConfig.source==="demo" || (!validPacks().length && state.qbankConfig.source==="auto") ? t("demo") : t("production")}. ${filtered.length} ${state.lang === "ar" ? "سؤالًا متاحًا وفق المرشحات الحالية." : "questions available with current filters."}</p></div></div>
          <div class="preview-stack section">${filtered.slice(0,12).map((question,index)=>questionPreview(question,index)).join("") || emptyCard(t("emptyPublished"))}</div>
        </section>
      </div>`;
    document.getElementById("builderPathway")?.addEventListener("change",(event)=>selectPathway(event.target.value,false));
    document.getElementById("builderSystem")?.addEventListener("change",(event)=>{state.qbankConfig.system=event.target.value;renderQBank();});
    document.getElementById("builderDifficulty")?.addEventListener("change",(event)=>{state.qbankConfig.difficulty=event.target.value;renderQBank();});
    document.getElementById("builderCount")?.addEventListener("change",(event)=>{state.qbankConfig.count=clamp(Number(event.target.value)||10,1,100);});
  }

  function questionPreview(question,index) { return `<article class="preview-item"><span class="preview-number">${String(index+1).padStart(2,"0")}</span><div><h3>${escapeHtml(question.system || "General Surgery")} · ${escapeHtml(question.topic || "Core")}</h3><p>${escapeHtml(trimText(localizedStem(question),120))}</p></div><span class="tag ${question.is_demo?"demo-label":"tag-green"}">${question.is_demo?t("demo"):t("production")}</span></article>`; }

  function startBuilderSession() {
    const questions = filterQuestions(availableQuestions(state.qbankConfig.source));
    const count = clamp(Number(document.getElementById("builderCount")?.value || state.qbankConfig.count),1,100);
    if (!questions.length) { toast(t("emptyPublished"),"warning"); return; }
    startSession(shuffle(questions).slice(0,count),state.qbankConfig.mode,state.pathway,{label:state.lang==="ar"?"جلسة مخصصة":"Custom session"});
  }

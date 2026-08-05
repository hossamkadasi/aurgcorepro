"use strict";
function renderSession() {
    const session = state.activeSession;
    const question = currentQuestion();
    if (!session || !question) { navigate("qbank"); return; }
    const answer = session.answers[question.id] || {};
    const revealed = Boolean(answer.submitted) && ["tutor","offline","review"].includes(session.mode);
    const currentIndex = session.index;
    const elapsed = Math.max(0,Math.floor((Date.now()-session.questionStartedAt)/1000));
    const totalElapsed = Math.max(0,Math.floor((Date.now()-session.startedMs)/1000));
    const options = normalizedOptions(question);
    dom.viewRoot.innerHTML = `
      <div class="page-header"><div><span class="eyebrow">${escapeHtml(modeLabel(session.mode))} · ${escapeHtml(getPathway(session.pathway).shortEn)}</span><h1 style="font-size:28px">${escapeHtml(session.label)}</h1><p>${currentIndex+1}/${session.questions.length} · <span id="questionTimer">${formatTime(elapsed)}</span> · <span id="wholeTimer">${formatTime(totalElapsed)}</span></p></div><div class="header-actions"><button class="button button-secondary" data-action="finishSession">${state.lang==="ar"?"إنهاء الجلسة":"Finish session"}</button></div></div>
      <div class="session-layout"><aside class="session-side"><div class="session-meta"><div><small>${state.lang==="ar"?"تمت الإجابة":"Answered"}</small><strong>${Object.values(session.answers).filter((item)=>item.submitted).length}/${session.questions.length}</strong></div><div><small>${state.lang==="ar"?"النمط":"Mode"}</small><strong>${escapeHtml(modeLabel(session.mode))}</strong></div></div><div class="progress" style="margin-top:12px"><span style="width:${((currentIndex+1)/session.questions.length)*100}%"></span></div><div class="question-map">${session.questions.map((item,index)=>`<button data-action="sessionGo" data-index="${index}" class="${index===currentIndex?"current":""} ${session.answers[item.id]?.submitted?"answered":""} ${state.flags.has(item.id)?"flagged":""}">${index+1}</button>`).join("")}</div><p class="fine-print">1–5: answer · Enter: submit · B: bookmark · F: flag</p></aside>
      <div><article class="question-card"><div class="question-top"><span class="tag ${question.is_demo?"demo-label":"tag-green"}">${question.is_demo?t("demo"):t("production")}</span><span class="tag">${escapeHtml(question.question_code || shortId(question.id))}</span><span class="tag">${difficultyLabel(question.difficulty)}</span><span class="tag tag-teal">${escapeHtml(question.cognitive_level || "application")}</span><div class="question-actions"><button class="${state.flags.has(question.id)?"active":""}" data-action="toggleFlag" aria-label="Flag">⚑</button><button class="${state.bookmarks.has(question.id)?"active":""}" data-action="toggleBookmark" aria-label="Bookmark">☆</button><button data-action="reportQuestion" aria-label="Report">!</button></div></div>
        ${question.context_en||question.context_ar?`<p class="question-context">${escapeHtml(state.lang==="ar"?(question.context_ar||question.context_en):(question.context_en||question.context_ar))}</p>`:""}<h2 class="question-stem">${escapeHtml(localizedStem(question))}</h2>
        <div class="answer-list">${options.map((option,index)=>answerOptionMarkup(option,index,answer,question,revealed)).join("")}</div>
        ${!answer.submitted?`<div class="confidence-row"><span>${state.lang==="ar"?"الثقة قبل الإرسال":"Confidence before submission"}</span><div class="confidence-options">${[1,3,5].map((value)=>`<button data-action="setConfidence" data-value="${value}" class="${answer.confidence===value?"active":""}">${confidenceLabel(value)}</button>`).join("")}</div></div>`:""}
        <div class="session-footer"><button class="button button-secondary" data-action="sessionPrevious" ${currentIndex===0?"disabled":""}>← ${state.lang==="ar"?"السابق":"Previous"}</button>${!answer.submitted?`<button class="button button-navy" data-action="submitAnswer" ${Number.isInteger(answer.selected)?"":"disabled"}>${state.lang==="ar"?"إرسال الإجابة":"Submit answer"}</button>`:`<button class="button button-navy" data-action="sessionNext">${currentIndex===session.questions.length-1?(state.lang==="ar"?"النتيجة":"Results"):(state.lang==="ar"?"التالي":"Next")} →</button>`}</div>
      </article>${revealed?explanationMarkup(question,answer):""}</div></div>`;
    startTimer();
  }

  function answerOptionMarkup(option,index,answer,question,revealed) {
    const selected = answer.selected === index;
    const correct = index === Number(question.correct_option);
    const classes = [selected?"selected":"",revealed&&correct?"correct":"",revealed&&selected&&!correct?"wrong":""].filter(Boolean).join(" ");
    const mark = revealed&&correct?"✓":revealed&&selected&&!correct?"×":"";
    return `<button class="answer-option ${classes}" data-action="answerOption" data-index="${index}" ${answer.submitted && session.mode !== "exam"?"disabled":""}><span class="option-letter">${String.fromCharCode(65+index)}</span><span class="option-copy">${escapeHtml(localizedOption(option))}</span><span class="answer-mark">${mark}</span></button>`;
  }

  function explanationMarkup(question,answer) {
    const lang = state.activeSession?.explanationLang || state.lang;
    const explanation = lang === "ar" ? question.explanation_ar || question.explanation_en : question.explanation_en || question.explanation_ar;
    const rationales = normalizedOptions(question).map((option,index)=>({index,text:lang==="ar"?(option.rationale_ar||option.rationale_en):(option.rationale_en||option.rationale_ar)})).filter((item)=>item.text && item.index!==Number(question.correct_option));
    return `<article class="explanation-card"><div class="section-heading"><div><span class="eyebrow">${answer.correct?(state.lang==="ar"?"إجابة صحيحة":"CORRECT"):(state.lang==="ar"?"إجابة غير صحيحة":"INCORRECT")}</span><h2>${state.lang==="ar"?"الشرح التعليمي":"Teaching explanation"}</h2></div><button class="button button-small button-secondary" data-action="toggleExplanationLanguage">${lang==="ar"?"EN":"AR"}</button></div><p dir="${lang==="ar"?"rtl":"ltr"}">${escapeHtml(explanation || "Explanation pending specialist review.")}</p>
      ${rationales.length?`<div class="rationale-list">${rationales.map((item)=>`<div class="rationale"><strong>${String.fromCharCode(65+item.index)}</strong><span>${escapeHtml(item.text)}</span></div>`).join("")}</div>`:""}
      <div class="learning-grid"><div class="learning-note"><strong>${state.lang==="ar"?"نقطة سريرية":"Clinical pearl"}</strong><p>${escapeHtml(lang==="ar"?(question.clinical_pearl_ar||question.clinical_pearl_en):(question.clinical_pearl_en||question.clinical_pearl_ar)||"—")}</p></div><div class="learning-note"><strong>${state.lang==="ar"?"فخ الامتحان":"Exam trap"}</strong><p>${escapeHtml(lang==="ar"?(question.exam_trap_ar||question.exam_trap_en):(question.exam_trap_en||question.exam_trap_ar)||"—")}</p></div><div class="learning-note"><strong>${state.lang==="ar"?"هدف التعلم":"Learning objective"}</strong><p>${escapeHtml(question.learning_objective||"—")}</p></div></div>
      <div class="field"><span>${state.lang==="ar"?"ملاحظتك الخاصة":"Private note"}</span><textarea id="questionNote" placeholder="${state.lang==="ar"?"اكتب ملاحظة للمراجعة…":"Write a review note…"}">${escapeHtml(state.notes[question.id]||"")}</textarea></div></article>`;
  }

  function selectAnswer(index) {
    const question = currentQuestion(); if (!question || !state.activeSession) return;
    const existing = state.activeSession.answers[question.id] || {};
    if (existing.submitted && state.activeSession.mode !== "exam") return;
    const updated = {...existing,selected:index,confidence:existing.confidence||3};
    if (existing.submitted && state.activeSession.mode === "exam") updated.correct = index === Number(question.correct_option);
    state.activeSession.answers[question.id] = updated;
    persistActiveSession();
    renderSession();
  }

  function setConfidence(value) {
    const question=currentQuestion(); if(!question||!state.activeSession)return;
    const existing=state.activeSession.answers[question.id]||{}; if(existing.submitted)return;
    state.activeSession.answers[question.id]={...existing,confidence:value}; persistActiveSession(); renderSession();
  }

  async function submitAnswer() {
    const session=state.activeSession; const question=currentQuestion(); if(!session||!question)return;
    const existing=session.answers[question.id]||{}; if(existing.submitted||!Number.isInteger(existing.selected))return;
    const responseMs=Math.min(3600000,Math.max(0,Date.now()-session.questionStartedAt));
    const correct=existing.selected===Number(question.correct_option);
    if (session.mode === "exam") {
      session.answers[question.id]={...existing,submitted:true,correct,response_ms:existing.response_ms||responseMs,client_event_id:existing.client_event_id||uuid()};
      persistActiveSession();
    } else {
      const attempt={client_event_id:uuid(),question_id:question.id,selected_option:existing.selected,is_correct:correct,confidence:existing.confidence||3,response_ms:responseMs,pathway:session.pathway,attempted_at:new Date().toISOString(),system:question.system,topic:question.topic,is_demo:Boolean(question.is_demo),source:"local"};
      session.answers[question.id]={...existing,submitted:true,correct,response_ms:responseMs,client_event_id:attempt.client_event_id,persisted:true};
      state.attempts.push(attempt); await idbPut("attempts",attempt);
      if (!question.is_demo && isUuid(question.id)) await enqueue("attempt",attempt);
      persistActiveSession();
    }
    if (["tutor","offline","review"].includes(session.mode)) renderSession();
    else if (session.index < session.questions.length-1) { session.index+=1; session.questionStartedAt=Date.now(); persistActiveSession(); renderSession(); }
    else finishSession();
  }

  function moveSession(delta) {
    const session=state.activeSession; if(!session)return;
    saveCurrentNote();
    if(delta>0 && session.index===session.questions.length-1){finishSession();return;}
    session.index=clamp(session.index+delta,0,session.questions.length-1); session.questionStartedAt=Date.now(); persistActiveSession(); renderSession();
  }
  function goToQuestion(index){if(!state.activeSession)return;saveCurrentNote();state.activeSession.index=clamp(index,0,state.activeSession.questions.length-1);state.activeSession.questionStartedAt=Date.now();persistActiveSession();renderSession();}
  function saveCurrentNote(){const q=currentQuestion();const area=document.getElementById("questionNote");if(q&&area){state.notes[q.id]=area.value;localStorage.setItem("sb-notes",JSON.stringify(state.notes));}}

  async function finishSession() {
    const session=state.activeSession; if(!session)return; saveCurrentNote(); clearTimer();
    if (session.mode === "exam") {
      for (const question of session.questions) {
        const answer = session.answers[question.id];
        if (!answer?.submitted || !Number.isInteger(answer.selected)) continue;
        answer.correct = answer.selected === Number(question.correct_option);
        if (!answer.persisted) {
          const attempt={client_event_id:answer.client_event_id||uuid(),question_id:question.id,selected_option:answer.selected,is_correct:answer.correct,confidence:answer.confidence||3,response_ms:Math.min(3600000,Math.max(0,answer.response_ms||0)),pathway:session.pathway,attempted_at:new Date().toISOString(),system:question.system,topic:question.topic,is_demo:Boolean(question.is_demo),source:"local"};
          answer.client_event_id=attempt.client_event_id; answer.persisted=true;
          state.attempts.push(attempt); await idbPut("attempts",attempt);
          if (!question.is_demo && isUuid(question.id)) await enqueue("attempt",attempt);
        }
      }
    }
    const submitted=Object.values(session.answers).filter((answer)=>answer.submitted); const correct=submitted.filter((answer)=>answer.correct).length;
    const endedAt=new Date().toISOString(); const duration=Math.max(0,Math.floor((Date.now()-session.startedMs)/1000));
    const sessionRecord={client_session_id:session.clientSessionId,pathway:session.pathway,mode:session.mode==="exam"?"mock":session.mode,started_at:new Date(session.startedMs).toISOString(),ended_at:endedAt,question_count:session.questions.length,correct_count:correct,duration_seconds:Math.min(duration,604800),is_demo:session.questions.every((q)=>q.is_demo)};
    state.sessions.push(sessionRecord); await idbPut("sessions",sessionRecord);
    if (!sessionRecord.is_demo) await enqueue("session",sessionRecord);
    state.lastResult={session,submitted:submitted.length,correct,score:Math.round((correct/Math.max(1,session.questions.length))*100),duration,unanswered:session.questions.length-submitted.length,finishedAt:endedAt};
    state.activeSession=null; localStorage.removeItem("sb-active-session"); navigate("results"); if(navigator.onLine)void syncOutbox();
  }

  function renderResults() {
    const result=state.lastResult; if(!result){navigate("dashboard");return;}
    const systemRows=result.session.questions.reduce((acc,question)=>{const key=question.system||"General Surgery";const answer=result.session.answers[question.id];acc[key]??={total:0,correct:0};acc[key].total+=1;if(answer?.correct)acc[key].correct+=1;return acc;},{});
    const highConfidenceErrors=result.session.questions.filter((q)=>{const a=result.session.answers[q.id];return a?.submitted&&!a.correct&&(a.confidence||3)>=5;});
    const avgMs=Object.values(result.session.answers).filter(a=>a.submitted).reduce((sum,a)=>sum+(a.response_ms||0),0)/Math.max(1,result.submitted);
    dom.viewRoot.innerHTML=`<section class="results-hero"><div class="score-ring" style="--score:${result.score*3.6}deg"><strong>${result.score}%</strong><small>${state.lang==="ar"?"النتيجة":"SCORE"}</small></div><div><span class="eyebrow">SESSION COMPLETE</span><h1>${state.lang==="ar"?"تحليل الجلسة":"Session intelligence"}</h1><p>${result.correct} ${state.lang==="ar"?"صحيحة من":"correct of"} ${result.session.questions.length} · ${result.unanswered} ${state.lang==="ar"?"دون إجابة":"unanswered"} · ${formatTime(result.duration)}</p><div class="button-row" style="margin-top:15px"><button class="button button-primary" data-action="showResultReview">${state.lang==="ar"?"راجع الأسئلة":"Review questions"}</button><button class="button button-secondary" data-route="dashboard">${state.lang==="ar"?"العودة للخطة":"Back to plan"}</button></div></div></section>
      <div class="metrics-grid section">${metricCard(t("accuracy"),`${result.score}%`,`${result.correct}/${result.session.questions.length}`)}${metricCard(state.lang==="ar"?"متوسط الوقت":"Average time",formatTime(Math.round(avgMs/1000)),state.lang==="ar"?"لكل سؤال":"per question")}${metricCard(state.lang==="ar"?"أخطاء بثقة عالية":"High-confidence errors",String(highConfidenceErrors.length),state.lang==="ar"?"أولوية مراجعة":"review priority")}${metricCard(state.lang==="ar"?"غير مجاب":"Unanswered",String(result.unanswered),result.unanswered?"Needs follow-up":"Complete")}</div>
      <div class="dashboard-grid section"><section class="panel"><h2>${state.lang==="ar"?"الأداء حسب المجال":"Performance by domain"}</h2><div class="chart">${Object.entries(systemRows).map(([system,row])=>chartRow(system,Math.round(row.correct/row.total*100),`${row.correct}/${row.total}`)).join("")}</div></section><section class="panel"><h2>${state.lang==="ar"?"الإجراء التالي":"Recommended next action"}</h2><div class="plan-list">${highConfidenceErrors.length?planRow({id:"review",icon:"!",title:state.lang==="ar"?"صحح المفاهيم الواثقة الخاطئة":"Correct high-confidence misconceptions",subtitle:`${highConfidenceErrors.length} ${state.lang==="ar"?"أسئلة ذات أولوية":"priority questions"}`,priority:true}):planRow({id:"weak",icon:"↺",title:state.lang==="ar"?"راجع أضعف مجال":"Review the weakest domain",subtitle:state.lang==="ar"?"حافظ على الاستدعاء طويل المدى":"Protect long-term retention",priority:true})}</div></section></div>`;
  }

  function startResultReview(){const result=state.lastResult;if(!result)return;const questions=result.session.questions.filter(q=>result.session.answers[q.id]?.submitted);startSession(questions,"tutor",result.session.pathway,{label:state.lang==="ar"?"مراجعة الجلسة":"Session review",preloadedAnswers:result.session.answers});}

  function renderMocks() {
    const arabPre=CONFIG.officialFormats?.arab_preliminary; const arabFinal=CONFIG.officialFormats?.arab_final;
    dom.viewRoot.innerHTML=`${pageHeader("MOCK EXAM CENTRE",state.lang==="ar"?"محاكاة الامتحان دون اختراع الصيغة":"Simulate the exam without inventing its format",state.lang==="ar"?"القوالب الموثقة تظهر كموثقة، والمسارات غير المكتملة تبقى قابلة للتخصيص بوضوح.":"Verified templates are marked verified; incomplete public formats remain explicitly configurable.")}
      <div class="card-grid two">
        ${mockCard("arab_preliminary",state.lang==="ar"?"البورد العربي — الأولي":"Arab Board Preliminary",arabPre?.verified?`${arabPre.papers} papers · ${arabPre.questionsPerPaper} MCQs · ${arabPre.minutesPerPaper} min each`:"Verified template",100,150,true)}
        ${mockCard("arab_final",state.lang==="ar"?"البورد العربي — النهائي المعرفي":"Arab Board Final Knowledge",arabFinal?.verified?`${arabFinal.papers} papers · ${arabFinal.questionsPerPaper} MCQs · ${arabFinal.minutesPerPaper} min each`:"Verified template",100,150,true)}
        ${mockCard("yemeni_board",state.lang==="ar"?"البورد اليمني":"Yemeni Board",state.lang==="ar"?"صيغة كتابية قابلة للتخصيص حتى ورود مصدر رسمي مفصل":"Configurable written format pending a detailed official source",50,90,false)}
        ${mockCard("professional_masters",state.lang==="ar"?"الماجستير المهني":"Professional Master’s",state.lang==="ar"?"صيغة كتابية مؤقتة قابلة للتخصيص":"Provisional configurable written template",50,90,false)}
      </div>
      <section class="section integrity-banner"><span class="integrity-icon">✓</span><div><h3>${state.lang==="ar"?"سلوك امتحاني حقيقي":"True exam behaviour"}</h3><p>${state.lang==="ar"?"لا يظهر التصحيح أو الشرح حتى إنهاء الورقة. يتم حفظ الحالة محليًا، وتستعاد الجلسة بعد انقطاع الصفحة.":"Answers and explanations remain hidden until paper completion. State is autosaved locally and can recover after interruption."}</p></div></section>`;
  }

  function mockCard(pathway,title,subtitle,count,minutes,verified){return `<article class="mock-card"><span class="tag ${verified?"tag-green":"tag-gold"}">${verified?t("verified"):t("provisional")}</span><h3 style="margin-top:12px">${escapeHtml(title)}</h3><p>${escapeHtml(subtitle)}</p><footer><span class="tag">${count} MCQs · ${minutes} min</span><button class="button button-small button-navy" data-action="startMock" data-pathway="${pathway}" data-count="${count}" data-minutes="${minutes}">${state.lang==="ar"?"ابدأ":"Start"}</button></footer></article>`;}

  async function startMock(pathway,count,minutes){
    selectPathway(pathway,false); let questions=validQuestionsForPathway(pathway);
    if(questions.filter(q=>!q.is_demo).length<count&&state.user&&navigator.onLine){
      const batches=Math.min(2,Math.ceil(count/(CONFIG.packMaxQuestions||50))); for(let i=0;i<batches;i+=1){await downloadQuestionPack(pathway,Math.min(CONFIG.packMaxQuestions||50,count),false);} questions=validQuestionsForPathway(pathway);
    }
    const unique=[...new Map(questions.map(q=>[q.id,q])).values()];
    if(!unique.length){toast(t("emptyPublished"),"warning");return;}
    const selected=shuffle(unique).slice(0,Math.min(count,unique.length));
    if(selected.length<count)toast(state.lang==="ar"?`المتاح حاليًا ${selected.length} سؤالًا؛ ستعمل المحاكاة بالمحتوى المتاح.`:`${selected.length} questions are currently available; the simulator will use available content.`,"warning");
    startSession(selected,"exam",pathway,{label:state.lang==="ar"?"ورقة امتحانية":"Mock examination",timeLimitSeconds:minutes*60});
  }

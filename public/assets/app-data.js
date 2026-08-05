"use strict";
function availableQuestions(source="auto") { if(source==="demo")return DEMO_QUESTIONS.map(normalizeQuestion);const production=validPacks().flatMap(pack=>pack.questions||[]).map(normalizeQuestion);if(source==="offline")return production;return production.length?production:DEMO_QUESTIONS.map(normalizeQuestion); }
  function validPacks(){return state.packs.filter(pack=>!pack.revoked_at&&new Date(pack.expires_at)>new Date()&&Array.isArray(pack.questions));}
  function validQuestionsForPathway(pathway){const production=validPacks().filter(pack=>pack.pathway===pathway).flatMap(pack=>pack.questions||[]).map(normalizeQuestion);return production.length?production:DEMO_QUESTIONS.filter(q=>q.pathways.includes(pathway)).map(normalizeQuestion);}
  function filterQuestions(questions){return questions.filter(q=>(state.qbankConfig.system==="all"||q.system===state.qbankConfig.system)&&(state.qbankConfig.difficulty==="all"||String(q.difficulty)===state.qbankConfig.difficulty)&&(q.pathways?.includes(state.pathway)||q.pathway===state.pathway||q.is_demo));}
  function findQuestion(id){return availableQuestions("auto").find(q=>q.id===id)||DEMO_QUESTIONS.map(normalizeQuestion).find(q=>q.id===id);}
  function normalizeQuestion(raw){const question={...raw};question.options=normalizedOptions(raw);question.correct_option=Number(raw.correct_option);question.pathways=Array.isArray(raw.pathways)?raw.pathways:raw.pathway?[raw.pathway]:[state.pathway];question.difficulty=Number(raw.difficulty||2);question.is_demo=Boolean(raw.is_demo||String(raw.id).startsWith("demo-"));return question;}
  function normalizedOptions(question){if(!Array.isArray(question?.options))return[];return question.options.map(option=>typeof option==="string"?{text_en:option,text_ar:option}:option||{});}
  function localizedStem(question){return state.lang==="ar"?(question.stem_ar||question.stem_en||""):(question.stem_en||question.stem_ar||"");}
  function localizedOption(option){return state.lang==="ar"?(option.text_ar||option.text_en||option.text||""):(option.text_en||option.text_ar||option.text||"");}
  function currentQuestion(){return state.activeSession?.questions[state.activeSession.index]||null;}

  function computeLearningMetrics(){const attempts=state.attempts;const total=attempts.length;const correct=attempts.filter(a=>a.is_correct).length;const accuracy=total?Math.round(correct/total*100):0;const coveredDomains=new Set(attempts.map(a=>a.system).filter(Boolean)).size;const coverage=Math.round(coveredDomains/GLOBAL_DOMAINS.length*100);const calibration=calibrationScore(attempts);const timedEfficiency=timeEfficiency(attempts);const readiness=Math.round(accuracy*.35+coverage*.25+calibration*.2+timedEfficiency*.2);const queue=buildReviewQueue();return{total,correct,accuracy,coveredDomains,coverage,calibration,timedEfficiency,readiness,reviewDue:queue.filter(item=>new Date(item.dueAt)<=new Date()).length,highConfidenceErrors:attempts.filter(a=>!a.is_correct&&(a.confidence||3)>=5).length};}
  function computeSystemStats(){const stats={};for(const attempt of state.attempts){const key=attempt.system||"Unmapped";stats[key]??={attempts:0,correct:0,accuracy:0};stats[key].attempts+=1;if(attempt.is_correct)stats[key].correct+=1;}for(const row of Object.values(stats))row.accuracy=row.attempts?Math.round(row.correct/row.attempts*100):0;return stats;}
  function confidenceCalibration(){const out={1:{count:0,correct:0,accuracy:0},3:{count:0,correct:0,accuracy:0},5:{count:0,correct:0,accuracy:0}};for(const attempt of state.attempts){const level=(attempt.confidence||3)>=5?5:(attempt.confidence||3)<=1?1:3;out[level].count+=1;if(attempt.is_correct)out[level].correct+=1;}for(const item of Object.values(out))item.accuracy=item.count?Math.round(item.correct/item.count*100):0;return out;}
  function calibrationScore(attempts){if(!attempts.length)return 0;let score=0;for(const a of attempts){const expected=(a.confidence||3)/5;const actual=a.is_correct?1:0;score+=1-Math.abs(expected-actual);}return Math.round(score/attempts.length*100);}
  function timeEfficiency(attempts){const timed=attempts.filter(a=>Number.isFinite(a.response_ms)&&a.response_ms>0);if(!timed.length)return 0;const target=90000;const avg=timed.reduce((sum,a)=>sum+a.response_ms,0)/timed.length;return clamp(Math.round(target/Math.max(target*.45,avg)*100),0,100);}
  function buildReviewQueue(){const latest=new Map();for(const attempt of [...state.attempts].sort((a,b)=>new Date(a.attempted_at)-new Date(b.attempted_at)))latest.set(attempt.question_id,attempt);const now=Date.now();return [...latest.values()].map(attempt=>{const confidence=attempt.confidence||3;const highError=!attempt.is_correct&&confidence>=5;const intervalDays=attempt.is_correct?(confidence>=5?7:confidence>=3?3:1):0;const dueAt=new Date(new Date(attempt.attempted_at).getTime()+intervalDays*86400000).toISOString();return{attempt,question:findQuestion(attempt.question_id),dueAt,priority:highError?"!":attempt.is_correct?Math.max(1,6-confidence):"↑",reason:highError?(state.lang==="ar"?"خطأ بثقة عالية":"High-confidence error"):attempt.is_correct?(state.lang==="ar"?"تعزيز الاستدعاء":"Retention reinforcement"):(state.lang==="ar"?"إجابة غير صحيحة":"Incorrect answer"),sort:(highError?100:attempt.is_correct?10:70)+(new Date(dueAt)<=new Date()?20:0)};}).filter(item=>new Date(item.dueAt).getTime()<=now+86400000).sort((a,b)=>b.sort-a.sort);}
  function weakestSystem(){const stats=computeSystemStats();const rows=Object.entries(stats).filter(([,r])=>r.attempts>0).sort((a,b)=>a[1].accuracy-b[1].accuracy);return rows[0]?.[0]||GLOBAL_DOMAINS[0];}
  function buildDailyPlan(metrics){return[{id:"new",icon:"+",title:state.lang==="ar"?"أسئلة جديدة":"New questions",subtitle:metrics.total?(state.lang==="ar"?"وسّع تغطية المنهج":"Expand blueprint coverage"):(state.lang==="ar"?"أنشئ خط الأساس الأول":"Establish your baseline"),priority:!metrics.total},{id:"review",icon:"↺",title:state.lang==="ar"?"المراجعات المستحقة":"Due reviews",subtitle:`${metrics.reviewDue} ${state.lang==="ar"?"عنصرًا مستحقًا":"items due"}`,priority:metrics.reviewDue>0},{id:"weak",icon:"!",title:state.lang==="ar"?"أضعف موضوع":"Weakest domain",subtitle:weakestSystem(),priority:metrics.total>0&&metrics.accuracy<70},{id:"timed",icon:"◷",title:state.lang==="ar"?"مجموعة زمنية":"Timed set",subtitle:state.lang==="ar"?"درّب السرعة واتخاذ القرار":"Train speed and decision-making",priority:false}];}

  function startTimer(){clearTimer();state.timerId=window.setInterval(()=>{const session=state.activeSession;if(!session||state.route!=="session"){clearTimer();return;}const qEl=document.getElementById("questionTimer");const wEl=document.getElementById("wholeTimer");const qSeconds=Math.floor((Date.now()-session.questionStartedAt)/1000);const total=Math.floor((Date.now()-session.startedMs)/1000);if(qEl)qEl.textContent=formatTime(qSeconds);if(wEl)wEl.textContent=formatTime(total);if(session.timeLimitSeconds&&total>=session.timeLimitSeconds){toast(state.lang==="ar"?"انتهى وقت الورقة":"Paper time expired","warning");finishSession();}},1000);}
  function clearTimer(){if(state.timerId){clearInterval(state.timerId);state.timerId=null;}}

  function pageHeader(eyebrow,title,body,actions=""){return `<header class="page-header"><div><span class="eyebrow">${escapeHtml(eyebrow)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(body||"")}</p></div>${actions?`<div class="header-actions">${actions}</div>`:""}</header>`;}
  function metricCard(label,value,note){return `<article class="metric-card"><small>${escapeHtml(label)}</small><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(note||"")}</span></article>`;}
  function adminStat(label,value){return `<article class="admin-stat"><small>${escapeHtml(label)}</small><strong>${escapeHtml(String(value))}</strong></article>`;}
  function coverageBar(label,value,note,danger){const val=clamp(Number(value)||0,0,100);return `<div class="coverage-row"><div class="coverage-head"><span>${escapeHtml(label)}</span><span>${val}% ${escapeHtml(note||"")}</span></div><div class="progress ${danger?"progress-red":""}"><span style="width:${val}%"></span></div></div>`;}
  function chartRow(label,value,note){const val=clamp(Number(value)||0,0,100);return `<div class="chart-row"><span class="chart-label" title="${escapeAttr(label)}">${escapeHtml(label)}</span><span class="chart-track"><span style="width:${val}%"></span></span><strong>${escapeHtml(String(note??`${val}%`))}</strong></div>`;}
  function emptyCard(message){return `<div class="empty-state" style="min-height:190px"><div><span class="plan-icon" style="margin:auto">·</span><p>${escapeHtml(message)}</p></div></div>`;}
  function securityRow(label,ok){return `<div class="gate-row"><span>${ok?"✓":"○"}</span><span>${escapeHtml(label)}</span><strong class="${ok?"ok":"pending"}">${ok?(state.lang==="ar"?"مفعّل":"Active"):(state.lang==="ar"?"يتطلب إعدادًا":"Setup")}</strong></div>`;}

  function getPathway(id){return PATHWAYS.find(pathway=>pathway.id===id)||PATHWAYS[0];}
  function roleLabel(){const role=state.profile?.role||"guest";const labels={admin:{en:"Administrator",ar:"مسؤول"},editor:{en:"Editor",ar:"محرر"},reviewer:{en:"Reviewer",ar:"مراجع"},student:{en:"Student",ar:"متعلم"},guest:{en:"Guest",ar:"زائر"}};return labels[role]?.[state.lang]||role;}
  function isStaff(){return ["admin","editor","reviewer"].includes(state.profile?.role);}
  function modeLabel(mode){const labels={tutor:{en:"Tutor",ar:"تعليمي"},timed:{en:"Timed",ar:"زمني"},exam:{en:"Exam",ar:"امتحان"},mock:{en:"Mock",ar:"محاكاة"},review:{en:"Review",ar:"مراجعة"},offline:{en:"Offline",ar:"دون اتصال"}};return labels[mode]?.[state.lang]||mode;}
  function modeDescription(mode){const text={tutor:{en:"Immediate teaching feedback",ar:"شرح مباشر بعد الإجابة"},timed:{en:"Answer then move forward",ar:"إجابة ثم انتقال مباشر"},exam:{en:"Review only after completion",ar:"المراجعة بعد الإنهاء فقط"}};return text[mode]?.[state.lang]||"";}
  function difficultyLabel(value){const n=Number(value);return n<=1?(state.lang==="ar"?"سهل":"Easy"):n>=3?(state.lang==="ar"?"صعب":"Hard"):(state.lang==="ar"?"متوسط":"Moderate");}
  function confidenceLabel(value){return value<=1?(state.lang==="ar"?"منخفضة":"Low"):value>=5?(state.lang==="ar"?"عالية":"High"):(state.lang==="ar"?"متوسطة":"Medium");}
  function planTitle(plan){const labels={new:{en:"New question set",ar:"مجموعة أسئلة جديدة"},review:{en:"Due review set",ar:"مجموعة المراجعات المستحقة"},weak:{en:"Weak-topic set",ar:"مجموعة نقاط الضعف"},timed:{en:"Timed mini-set",ar:"مجموعة زمنية قصيرة"}};return labels[plan]?.[state.lang]||"Study set";}
  function functionErrorMessage(error){const message=error?.message||"Function request failed";return state.lang==="ar"?`تعذر إصدار الحزمة: ${message}`:`Could not issue pack: ${message}`;}
  function mobileFamily(){return /iPhone|iPad|Android/i.test(navigator.userAgent)?"mobile":"desktop";}
  function updateWatermark(){const pack=validPacks()[0];dom.watermark.textContent=pack?.watermark||"";}

  function t(key){return I18N[state.lang][key]||I18N.en[key]||key;}
  function escapeHtml(value){return String(value??"").replace(/[&<>"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[char]);}
  function escapeAttr(value){return escapeHtml(value).replace(/'/g,"&#39;");}
  function trimText(value,max){const text=String(value||"");return text.length>max?`${text.slice(0,max-1)}…`:text;}
  function clamp(value,min,max){return Math.min(max,Math.max(min,value));}
  function formatTime(seconds){const n=Math.max(0,Math.floor(Number(seconds)||0));return `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;}
  function formatDate(value){if(!value)return"—";try{return new Intl.DateTimeFormat(state.lang==="ar"?"ar-YE":"en-GB",{year:"numeric",month:"short",day:"numeric"}).format(new Date(value));}catch{return String(value);}}
  function shortId(value){return String(value||"").slice(0,8).toUpperCase();}
  function isUuid(value){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value));}
  function uuid(){return crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==="x"?r:(r&3|8)).toString(16);});}
  function shuffle(input){const array=[...input];for(let i=array.length-1;i>0;i-=1){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}return array;}
  function safeJson(value,fallback){try{return value?JSON.parse(value):fallback;}catch{return fallback;}}
  function structuredCloneSafe(value){try{return structuredClone(value);}catch{return JSON.parse(JSON.stringify(value));}}
  function pick(object,keys){return Object.fromEntries(keys.filter(key=>object[key]!==undefined).map(key=>[key,object[key]]));}
  function toast(message,type="info"){const node=document.createElement("div");node.className=`toast ${type}`;node.textContent=message;dom.toastRegion.appendChild(node);setTimeout(()=>node.remove(),4200);}
  
  async function registerServiceWorker(){if("serviceWorker" in navigator){try{await navigator.serviceWorker.register("./sw.js",{scope:"./"});}catch(error){console.warn("Service worker registration failed",error);}}updateWatermark();}


  function persistActiveSession(){
    if (!state.activeSession) return;
    try { localStorage.setItem("sb-active-session", JSON.stringify(state.activeSession)); } catch (error) { console.warn("Could not persist active session", error); }
  }
  function restoreActiveSession(){
    const saved=safeJson(localStorage.getItem("sb-active-session"),null);
    if(!saved||!Array.isArray(saved.questions)||!saved.questions.length)return;
    if(Date.now()-Number(saved.startedMs||0)>24*60*60*1000){localStorage.removeItem("sb-active-session");return;}
    saved.questionStartedAt=Date.now();
    state.activeSession=saved;
  }

  function openDatabase(){return new Promise((resolve)=>{if(!("indexedDB"in window)){resolve(null);return;}const request=indexedDB.open("surgiboard-global",2);request.onupgradeneeded=()=>{const db=request.result;const stores=[{name:"packs",key:"pack_id"},{name:"attempts",key:"client_event_id"},{name:"sessions",key:"client_session_id"},{name:"bookmarks",key:"key"},{name:"outbox",key:"id"},{name:"meta",key:"key"}];for(const item of stores)if(!db.objectStoreNames.contains(item.name))db.createObjectStore(item.name,{keyPath:item.key});};request.onsuccess=()=>resolve(request.result);request.onerror=()=>{console.warn("IndexedDB unavailable",request.error);resolve(null);};});}
  function idbTransaction(store,mode="readonly"){if(!state.db)return null;return state.db.transaction(store,mode).objectStore(store);}
  function idbAll(store){return new Promise(resolve=>{const objectStore=idbTransaction(store);if(!objectStore){resolve([]);return;}const request=objectStore.getAll();request.onsuccess=()=>resolve(request.result||[]);request.onerror=()=>resolve([]);});}
  function idbPut(store,value){return new Promise((resolve,reject)=>{const objectStore=idbTransaction(store,"readwrite");if(!objectStore){resolve(value);return;}const request=objectStore.put(value);request.onsuccess=()=>resolve(value);request.onerror=()=>reject(request.error);});}
  function idbDelete(store,key){return new Promise((resolve,reject)=>{const objectStore=idbTransaction(store,"readwrite");if(!objectStore){resolve();return;}const request=objectStore.delete(key);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error);});}

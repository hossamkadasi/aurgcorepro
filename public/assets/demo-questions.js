(() => {
  "use strict";
  const DEMO_WARNING = "Demonstration item — unpublished, not specialist-approved, and not for clinical decision-making.";
  const questions = [
    {
      id:"demo-appendicitis-imaging",question_code:"DEMO-001",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_preliminary","arab_final","yemeni_board","professional_masters"],system:"Emergency General Surgery",topic:"Acute appendicitis",subtopic:"Imaging in pregnancy",difficulty:2,cognitive_level:"application",
      stem_en:"A 24-year-old woman at 18 weeks of pregnancy has right lower-quadrant pain and localized tenderness. Ultrasound is nondiagnostic. She is haemodynamically stable. Which investigation is the most appropriate next step?",
      stem_ar:"امرأة عمرها 24 عامًا في الأسبوع الثامن عشر من الحمل تعاني من ألم في الربع السفلي الأيمن مع إيلام موضّع. كان التصوير بالموجات فوق الصوتية غير حاسم، وهي مستقرة ديناميكيًا. ما الفحص الأنسب تاليًا؟",
      options:[
        {text_en:"MRI of the abdomen without gadolinium",text_ar:"MRI للبطن دون غادولينيوم",rationale_en:"MRI avoids ionising radiation and is the preferred second-line cross-sectional test after nondiagnostic ultrasound in a stable pregnant patient.",rationale_ar:"يتيح MRI تقييمًا مقطعيًا دون إشعاع مؤين ويُعد الفحص الثاني المفضل بعد موجات فوق صوتية غير حاسمة لدى الحامل المستقرة."},
        {text_en:"Repeat ultrasound after 48 hours",text_ar:"إعادة الموجات فوق الصوتية بعد 48 ساعة",rationale_en:"Delaying investigation risks progression and perforation when clinical suspicion remains significant.",rationale_ar:"تأخير التقييم قد يسمح بتطور الالتهاب والانثقاب عندما يبقى الاشتباه السريري مرتفعًا."},
        {text_en:"Diagnostic colonoscopy",text_ar:"تنظير قولون تشخيصي",rationale_en:"Colonoscopy does not evaluate the appendix safely or effectively in this acute setting.",rationale_ar:"تنظير القولون لا يقيّم الزائدة بأمان أو فعالية في هذا السياق الحاد."},
        {text_en:"Plain abdominal radiography",text_ar:"صورة بسيطة للبطن",rationale_en:"Plain radiography has low diagnostic yield for appendicitis and uses ionising radiation.",rationale_ar:"الصورة البسيطة منخفضة الحساسية لالتهاب الزائدة وتستخدم إشعاعًا مؤينًا."}
      ],correct_option:0,
      explanation_en:"After an inconclusive ultrasound, MRI without gadolinium provides high diagnostic accuracy without fetal ionising-radiation exposure. CT remains an option when MRI is unavailable and diagnostic delay is unsafe.",
      explanation_ar:"بعد موجات فوق صوتية غير حاسمة، يوفّر MRI دون غادولينيوم دقة تشخيصية مرتفعة دون تعريض الجنين لإشعاع مؤين. ويمكن استخدام CT عند تعذر MRI إذا كان تأخير التشخيص غير آمن.",
      clinical_pearl_en:"Pregnancy changes the differential diagnosis, but it should not justify diagnostic delay.",clinical_pearl_ar:"الحمل يغيّر التشخيص التفريقي لكنه لا يبرر تأخير التشخيص.",
      exam_trap_en:"Assuming CT is absolutely forbidden in pregnancy; the correct principle is minimising radiation while preventing dangerous delay.",exam_trap_ar:"الاعتقاد أن CT ممنوع مطلقًا في الحمل؛ المبدأ هو تقليل الإشعاع مع تجنب التأخير الخطر.",
      learning_objective:"Select sequential imaging for suspected appendicitis during pregnancy.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    },
    {
      id:"demo-acute-cholecystitis",question_code:"DEMO-002",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_preliminary","arab_final","yemeni_board","professional_masters"],system:"Hepatopancreatobiliary",topic:"Acute calculous cholecystitis",subtopic:"Definitive management",difficulty:2,cognitive_level:"management",
      stem_en:"A fit 46-year-old woman is admitted with ultrasound-confirmed acute calculous cholecystitis. Symptoms began 36 hours ago. There is no organ failure or bile-duct obstruction. What is the preferred definitive management?",
      stem_ar:"امرأة سليمة تبلغ 46 عامًا أُدخلت بسبب التهاب مرارة حصوي حاد مثبت بالموجات فوق الصوتية، وبدأت الأعراض قبل 36 ساعة. لا يوجد فشل أعضاء أو انسداد بالقناة الصفراوية. ما التدبير النهائي المفضل؟",
      options:[
        {text_en:"Early laparoscopic cholecystectomy during the index admission",text_ar:"استئصال مرارة بالمنظار مبكرًا خلال الدخول الحالي",rationale_en:"For a fit patient with uncomplicated acute cholecystitis, index-admission laparoscopic cholecystectomy reduces recurrent events and readmission.",rationale_ar:"لدى المريضة المناسبة جراحيًا مع التهاب غير معقد، يقلل الاستئصال المبكر خلال الدخول الحالي من النكس وإعادة الإدخال."},
        {text_en:"Antibiotics followed by elective surgery after three months",text_ar:"مضادات حيوية ثم جراحة اختيارية بعد ثلاثة أشهر",rationale_en:"Routine delayed surgery exposes the patient to recurrent biliary events without improving outcomes in a fit patient.",rationale_ar:"التأجيل الروتيني يعرّض المريضة لنكس المضاعفات الصفراوية دون فائدة مثبتة لدى المريضة الملائمة للجراحة."},
        {text_en:"Percutaneous cholecystostomy as first-line treatment",text_ar:"تفميم المرارة عبر الجلد كعلاج أول",rationale_en:"Percutaneous drainage is generally reserved for selected high-risk or critically ill patients who cannot tolerate surgery.",rationale_ar:"يُحجز التصريف عبر الجلد عادة لمرضى مختارين مرتفعي الخطورة أو شديدي الاعتلال غير القادرين على تحمل الجراحة."},
        {text_en:"ERCP before cholecystectomy in every case",text_ar:"ERCP قبل الاستئصال في كل الحالات",rationale_en:"ERCP is indicated for suspected or confirmed common-bile-duct stones or cholangitis, not routine uncomplicated cholecystitis.",rationale_ar:"يُستخدم ERCP عند الاشتباه بحصيات القناة الجامعة أو التهاب الأقنية، وليس روتينيًا في التهاب المرارة غير المعقد."}
      ],correct_option:0,
      explanation_en:"Early laparoscopic cholecystectomy during the same admission is definitive treatment for most surgically fit patients. Antibiotics and supportive care accompany, rather than replace, source control.",
      explanation_ar:"الاستئصال المبكر بالمنظار خلال الدخول نفسه هو العلاج النهائي لمعظم المرضى الملائمين للجراحة. العلاج الداعم والمضادات الحيوية ترافق السيطرة على المصدر ولا تستبدلها.",
      clinical_pearl_en:"Index-admission surgery prevents the recurrent attacks that often occur while waiting for delayed surgery.",clinical_pearl_ar:"الجراحة خلال الدخول الحالي تمنع النوبات المتكررة التي قد تحدث أثناء انتظار الجراحة المؤجلة.",
      exam_trap_en:"Choosing percutaneous drainage merely because inflammation is acute.",exam_trap_ar:"اختيار التصريف عبر الجلد لمجرد أن الالتهاب حاد.",
      learning_objective:"Choose definitive treatment timing for uncomplicated acute calculous cholecystitis.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    },
    {
      id:"demo-septic-shock",question_code:"DEMO-003",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_preliminary","arab_final","yemeni_board","professional_masters"],system:"Perioperative & Critical Care",topic:"Septic shock",subtopic:"Vasopressor therapy",difficulty:2,cognitive_level:"management",
      stem_en:"A patient with postoperative intra-abdominal sepsis remains hypotensive with a mean arterial pressure of 55 mmHg after initial balanced crystalloid resuscitation. Which vasopressor is preferred first line?",
      stem_ar:"مريض لديه إنتان داخل البطن بعد الجراحة وما زال منخفض الضغط بمتوسط ضغط شرياني 55 مم زئبق بعد الإنعاش الأولي بمحلول بلوري متوازن. ما المقبض الوعائي المفضل أولًا؟",
      options:[
        {text_en:"Norepinephrine",text_ar:"نورإبينفرين",rationale_en:"Norepinephrine provides effective vasoconstriction with a lower arrhythmia burden than dopamine and is the standard first-line vasopressor in septic shock.",rationale_ar:"يوفر النورإبينفرين تقبضًا وعائيًا فعالًا مع اضطرابات نظم أقل من الدوبامين ويعد المقبض الأول في الصدمة الإنتانية."},
        {text_en:"Dopamine",text_ar:"دوبامين",rationale_en:"Dopamine causes more tachyarrhythmias and is reserved for selected circumstances rather than routine first-line use.",rationale_ar:"يسبب الدوبامين اضطرابات نظم تسرعية أكثر ولا يُستخدم روتينيًا كخيار أول."},
        {text_en:"Phenylephrine",text_ar:"فينيل إفرين",rationale_en:"Pure alpha-agonism may reduce stroke volume and is not the standard initial vasopressor for septic shock.",rationale_ar:"التنبيه الألفاوي الصرف قد يقلل حجم الضربة وليس الخيار القياسي الأول في الصدمة الإنتانية."},
        {text_en:"Dobutamine",text_ar:"دوبوتامين",rationale_en:"Dobutamine is an inotrope for selected low-cardiac-output states, not a primary vasopressor for isolated vasodilatory hypotension.",rationale_ar:"الدوبوتامين مقوٍ للعضلة القلبية في حالات مختارة بانخفاض النتاج وليس مقبضًا أوليًا لانخفاض الضغط التوسعي."}
      ],correct_option:0,
      explanation_en:"Norepinephrine is the preferred first-line vasopressor when hypotension persists after appropriate initial fluid resuscitation. Source control, antibiotics and reassessment of fluid responsiveness proceed in parallel.",
      explanation_ar:"النورإبينفرين هو المقبض الوعائي الأول عند استمرار انخفاض الضغط بعد الإنعاش الأولي المناسب. ويجب أن تتزامن معه السيطرة على المصدر والمضادات الحيوية وإعادة تقييم الاستجابة للسوائل.",
      clinical_pearl_en:"Vasopressors should not delay urgent surgical source control.",clinical_pearl_ar:"يجب ألا تؤخر المقبضات الوعائية السيطرة الجراحية العاجلة على المصدر.",
      exam_trap_en:"Continuing large, unassessed fluid boluses despite persistent vasodilatory shock.",exam_trap_ar:"الاستمرار ببلعات سوائل كبيرة غير مقيّمة رغم استمرار الصدمة التوسعية.",
      learning_objective:"Select first-line vasopressor therapy for septic shock.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    },
    {
      id:"demo-trauma-pelvis",question_code:"DEMO-004",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_preliminary","arab_final","yemeni_board","professional_masters"],system:"Trauma",topic:"Pelvic trauma",subtopic:"Initial haemorrhage control",difficulty:2,cognitive_level:"management",
      stem_en:"A haemodynamically unstable patient has a suspected open-book pelvic fracture after a road-traffic collision. What immediate mechanical intervention should be performed during initial resuscitation?",
      stem_ar:"مريض غير مستقر ديناميكيًا يُشتبه بوجود كسر حوض من نوع الكتاب المفتوح بعد حادث مروري. ما الإجراء الميكانيكي الفوري خلال الإنعاش الأولي؟",
      options:[
        {text_en:"Apply a pelvic binder over the greater trochanters",text_ar:"وضع حزام حوض فوق المدورين الكبيرين",rationale_en:"Correct binder placement reduces pelvic volume and can tamponade venous and cancellous bleeding while definitive haemorrhage control is arranged.",rationale_ar:"الوضع الصحيح للحزام يقلل حجم الحوض وقد يساهم في دك النزف الوريدي والعظمي حتى ترتيب السيطرة النهائية."},
        {text_en:"Place the binder over the iliac crests",text_ar:"وضع الحزام فوق عرفي الحرقفة",rationale_en:"A high binder position is ineffective; it must be centred at the greater trochanters.",rationale_ar:"الوضع المرتفع غير فعال؛ يجب أن يتمركز الحزام عند المدورين الكبيرين."},
        {text_en:"Repeatedly spring the pelvis to confirm instability",text_ar:"تكرار ضغط الحوض لتأكيد عدم الثبات",rationale_en:"Repeated pelvic manipulation may disrupt clot and worsen haemorrhage.",rationale_ar:"التلاعب المتكرر بالحوض قد يفك الخثرة ويزيد النزف."},
        {text_en:"Delay stabilization until CT is completed",text_ar:"تأخير التثبيت حتى إكمال CT",rationale_en:"Mechanical stabilization is immediate and should not wait for cross-sectional imaging in an unstable patient.",rationale_ar:"التثبيت الميكانيكي إجراء فوري ولا ينتظر التصوير المقطعي لدى المريض غير المستقر."}
      ],correct_option:0,
      explanation_en:"A pelvic binder should be applied early at the level of the greater trochanters. It is a temporising haemorrhage-control measure, not definitive treatment.",
      explanation_ar:"يجب وضع حزام الحوض مبكرًا عند مستوى المدورين الكبيرين. وهو إجراء مؤقت للسيطرة على النزف وليس علاجًا نهائيًا.",
      clinical_pearl_en:"The anatomical level matters more than how tightly the binder is pulled.",clinical_pearl_ar:"المستوى التشريحي للحزام أهم من شدة شده.",
      exam_trap_en:"Placing the binder around the waist rather than the greater trochanters.",exam_trap_ar:"وضع الحزام حول الخصر بدل المدورين الكبيرين.",
      learning_objective:"Apply immediate mechanical stabilization in unstable pelvic trauma.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    },
    {
      id:"demo-thyroid-nerve",question_code:"DEMO-005",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_preliminary","yemeni_board","professional_masters"],system:"Breast & Endocrine",topic:"Thyroid surgery",subtopic:"Recurrent laryngeal nerve",difficulty:2,cognitive_level:"application",
      stem_en:"During thyroidectomy, which structure is the most reliable surgical landmark for identifying the recurrent laryngeal nerve near its laryngeal entry?",
      stem_ar:"أثناء استئصال الغدة الدرقية، ما البنية الأكثر موثوقية لتحديد العصب الحنجري الراجع قرب دخوله إلى الحنجرة؟",
      options:[
        {text_en:"The cricothyroid joint and inferior constrictor region",text_ar:"منطقة المفصل الحلقي الدرقي والعضلة العاصرة السفلية",rationale_en:"The nerve enters the larynx close to the cricothyroid joint deep to the inferior constrictor, providing a consistent distal landmark.",rationale_ar:"يدخل العصب الحنجرة قرب المفصل الحلقي الدرقي عميقًا للعضلة العاصرة السفلية، ما يوفر علامة بعيدة ثابتة نسبيًا."},
        {text_en:"The superior thyroid artery at its origin",text_ar:"منشأ الشريان الدرقي العلوي",rationale_en:"This landmark relates more closely to the external branch of the superior laryngeal nerve.",rationale_ar:"ترتبط هذه العلامة أكثر بالفرع الخارجي للعصب الحنجري العلوي."},
        {text_en:"The midline raphe of the strap muscles",text_ar:"الرفاء المتوسط لعضلات الشريط",rationale_en:"The midline is useful for access but does not identify the recurrent laryngeal nerve.",rationale_ar:"الخط المتوسط مفيد للدخول لكنه لا يحدد العصب الحنجري الراجع."},
        {text_en:"The upper pole of the parotid gland",text_ar:"القطب العلوي للغدة النكفية",rationale_en:"The parotid gland is unrelated to the cervical course of the recurrent laryngeal nerve.",rationale_ar:"الغدة النكفية لا ترتبط بالمسار العنقي للعصب الحنجري الراجع."}
      ],correct_option:0,
      explanation_en:"The distal recurrent laryngeal nerve has a consistent relationship to the cricothyroid joint and inferior constrictor. Surgeons commonly combine several landmarks and direct visual identification rather than relying on a single relationship.",
      explanation_ar:"للعصب الحنجري الراجع في جزئه البعيد علاقة ثابتة نسبيًا بالمفصل الحلقي الدرقي والعضلة العاصرة السفلية. ويجمع الجراح عادة عدة علامات مع الرؤية المباشرة بدل الاعتماد على علاقة واحدة.",
      clinical_pearl_en:"Visual identification remains the foundation; nerve monitoring is an adjunct, not a substitute.",clinical_pearl_ar:"التحديد البصري هو الأساس، ومراقبة العصب وسيلة مساعدة وليست بديلًا.",
      exam_trap_en:"Confusing the recurrent laryngeal nerve with the external branch of the superior laryngeal nerve.",exam_trap_ar:"الخلط بين العصب الحنجري الراجع والفرع الخارجي للعصب الحنجري العلوي.",
      learning_objective:"Use distal anatomical landmarks to identify the recurrent laryngeal nerve.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    },
    {
      id:"demo-colorectal-leak",question_code:"DEMO-006",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_final","yemeni_board","professional_masters"],system:"Colorectal",topic:"Anastomotic leak",subtopic:"Postoperative diagnosis",difficulty:3,cognitive_level:"clinical_reasoning",
      stem_en:"On postoperative day 5 after a low anterior resection, a stable patient develops persistent tachycardia, fever and increasing pelvic pain. What is the most appropriate diagnostic test?",
      stem_ar:"في اليوم الخامس بعد استئصال أمامي منخفض، ظهرت لدى مريض مستقر تسرع قلب مستمر وحمى وألم حوضي متزايد. ما الفحص التشخيصي الأنسب؟",
      options:[
        {text_en:"Contrast-enhanced CT of the abdomen and pelvis, with rectal contrast when appropriate",text_ar:"CT مع حقن وريدي للبطن والحوض وإضافة تباين شرجي عند الملاءمة",rationale_en:"CT evaluates extraluminal gas, collections and anastomotic contrast leak and helps plan drainage or surgery in a stable patient.",rationale_ar:"يقيّم CT الغاز خارج اللمعة والتجمعات وتسرب التباين من المفاغرة ويساعد في تخطيط التصريف أو الجراحة لدى المريض المستقر."},
        {text_en:"Plain abdominal radiograph alone",text_ar:"صورة بسيطة للبطن فقط",rationale_en:"Plain radiography lacks sufficient sensitivity and cannot define a collection or guide source control.",rationale_ar:"الصورة البسيطة غير كافية الحساسية ولا تحدد تجمعًا أو تساعد في خطة السيطرة على المصدر."},
        {text_en:"Elective colonoscopy after six weeks",text_ar:"تنظير قولون اختياري بعد ستة أسابيع",rationale_en:"The current presentation requires urgent assessment, not delayed elective investigation.",rationale_ar:"الحالة الحالية تحتاج تقييمًا عاجلًا وليس فحصًا اختياريًا مؤجلًا."},
        {text_en:"No imaging because postoperative fever is expected",text_ar:"عدم إجراء تصوير لأن الحمى متوقعة بعد الجراحة",rationale_en:"Persistent tachycardia and localized pain after colorectal anastomosis are warning signs that require investigation.",rationale_ar:"تسرع القلب المستمر والألم الموضّع بعد مفاغرة قولونية علامات إنذار تستوجب التقييم."}
      ],correct_option:0,
      explanation_en:"In a stable patient, contrast-enhanced CT is the principal investigation for suspected colorectal anastomotic leak. Haemodynamic instability or generalized peritonitis should trigger immediate operative source control rather than imaging delay.",
      explanation_ar:"لدى المريض المستقر، يُعد CT مع التباين الفحص الأساسي عند الاشتباه بتسرب مفاغرة قولونية. أما عدم الاستقرار أو التهاب الصفاق المعمم فيستدعي السيطرة الجراحية العاجلة دون تأخير للتصوير.",
      clinical_pearl_en:"New unexplained tachycardia may precede dramatic abdominal findings.",clinical_pearl_ar:"قد يسبق تسرع القلب غير المفسر العلامات البطنية الواضحة.",
      exam_trap_en:"Treating day-five tachycardia as simple postoperative pain or ileus.",exam_trap_ar:"اعتبار تسرع القلب في اليوم الخامس مجرد ألم أو شلل أمعاء بعد الجراحة.",
      learning_objective:"Investigate suspected colorectal anastomotic leak according to physiological stability.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    },
    {
      id:"demo-groin-hernia",question_code:"DEMO-007",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_preliminary","yemeni_board","professional_masters"],system:"Hernia & Abdominal Wall",topic:"Groin hernia anatomy",subtopic:"Inferior epigastric vessels",difficulty:1,cognitive_level:"recall",
      stem_en:"An indirect inguinal hernia enters the inguinal canal in which relationship to the inferior epigastric vessels?",
      stem_ar:"يدخل الفتق الأربي غير المباشر القناة الأربية بأي علاقة مع الأوعية الشرسوفية السفلية؟",
      options:[
        {text_en:"Lateral to the inferior epigastric vessels",text_ar:"وحشيًا للأوعية الشرسوفية السفلية",rationale_en:"An indirect hernia passes through the deep inguinal ring, which lies lateral to the inferior epigastric vessels.",rationale_ar:"يمر الفتق غير المباشر عبر الحلقة الأربية العميقة الواقعة وحشيًا للأوعية الشرسوفية السفلية."},
        {text_en:"Medial to the inferior epigastric vessels",text_ar:"إنسيًا للأوعية الشرسوفية السفلية",rationale_en:"A direct hernia protrudes medially through Hesselbach triangle.",rationale_ar:"يبرز الفتق المباشر إنسيًا عبر مثلث هسل باخ."},
        {text_en:"Posterior to the femoral vein",text_ar:"خلف الوريد الفخذي",rationale_en:"This does not describe the deep inguinal ring or the inguinal canal relationship.",rationale_ar:"هذه العلاقة لا تصف الحلقة الأربية العميقة أو القناة الأربية."},
        {text_en:"Through the obturator canal",text_ar:"عبر القناة السدادية",rationale_en:"That is the route of an obturator hernia, not an inguinal hernia.",rationale_ar:"هذا مسار الفتق السدادي وليس الفتق الأربي."}
      ],correct_option:0,
      explanation_en:"The inferior epigastric vessels are the key landmark: indirect hernias are lateral and direct hernias are medial.",
      explanation_ar:"الأوعية الشرسوفية السفلية علامة أساسية: الفتق غير المباشر وحشي لها، والمباشر إنسي لها.",
      clinical_pearl_en:"Think MDs do not LIe: Medial Direct, Lateral Indirect.",clinical_pearl_ar:"قاعدة تذكّر: المباشر إنسي وغير المباشر وحشي.",
      exam_trap_en:"Using the pubic tubercle relationship, which distinguishes inguinal from femoral rather than direct from indirect.",exam_trap_ar:"استخدام العلاقة بالحديبة العانية التي تميز الأربي عن الفخذي لا المباشر عن غير المباشر.",
      learning_objective:"Differentiate direct and indirect inguinal hernias anatomically.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    },
    {
      id:"demo-vascular-acute-limb",question_code:"DEMO-008",is_demo:true,provenance:"demo",review_status:"draft",version:1,
      pathways:["global_core","arab_final","yemeni_board","professional_masters"],system:"Vascular",topic:"Acute limb ischaemia",subtopic:"Immediate management",difficulty:2,cognitive_level:"management",
      stem_en:"A patient presents with sudden severe leg pain, pallor and absent pedal pulses from suspected acute arterial occlusion. While urgent vascular assessment is arranged, what immediate medication is generally indicated unless contraindicated?",
      stem_ar:"مريض حضر بألم ساق مفاجئ شديد وشحوب وغياب النبضات القدمية بسبب اشتباه انسداد شرياني حاد. أثناء ترتيب التقييم الوعائي العاجل، ما الدواء الفوري المطلوب عادة ما لم توجد موانع؟",
      options:[
        {text_en:"Intravenous unfractionated heparin",text_ar:"هيبارين غير مجزأ وريدي",rationale_en:"Immediate systemic anticoagulation limits thrombus propagation while definitive revascularization is planned.",rationale_ar:"يحد منع التخثر الجهازي الفوري من امتداد الخثرة حتى التخطيط لإعادة التروية النهائية."},
        {text_en:"Oral warfarin loading",text_ar:"جرعة تحميل وارفارين فموية",rationale_en:"Warfarin has delayed onset and may initially be prothrombotic; it is not the emergency anticoagulant of choice.",rationale_ar:"بدء الوارفارين بطيء وقد يكون مولدًا للتخثر في البداية، لذا ليس العلاج الإسعافي المفضل."},
        {text_en:"Aspirin alone",text_ar:"أسبرين فقط",rationale_en:"Antiplatelet therapy alone does not provide the immediate systemic anticoagulation required in acute limb ischaemia.",rationale_ar:"مضاد الصفيحات وحده لا يوفر منع التخثر الجهازي الفوري المطلوب في نقص التروية الحاد."},
        {text_en:"Delay all medication until angiography",text_ar:"تأخير كل الأدوية حتى تصوير الأوعية",rationale_en:"Delaying anticoagulation can allow thrombus propagation unless bleeding or another contraindication is present.",rationale_ar:"تأخير منع التخثر قد يسمح بامتداد الخثرة ما لم يوجد نزف أو مانع آخر."}
      ],correct_option:0,
      explanation_en:"Immediate intravenous unfractionated heparin is generally started when acute limb ischaemia is suspected, unless contraindicated. Limb viability then determines the urgency and method of revascularization.",
      explanation_ar:"يبدأ الهيبارين غير المجزأ وريديًا عادة فور الاشتباه بنقص تروية طرف حاد ما لم توجد موانع. وتحدد حيوية الطرف سرعة وطريقة إعادة التروية.",
      clinical_pearl_en:"Anticoagulation is immediate; revascularization strategy depends on neurological deficit and limb viability.",clinical_pearl_ar:"منع التخثر فوري، أما استراتيجية إعادة التروية فتتحدد بالعجز العصبي وحيوية الطرف.",
      exam_trap_en:"Waiting for complete imaging before preventing thrombus propagation.",exam_trap_ar:"انتظار اكتمال التصوير قبل منع امتداد الخثرة.",
      learning_objective:"Initiate immediate medical treatment for suspected acute limb ischaemia.",reference_data:[{title:"Demo curriculum map",note:DEMO_WARNING}],published_at:null,reviewed_at:null
    }
  ];
  window.SURGIBOARD_DEMO_QUESTIONS = Object.freeze(questions.map((question) => Object.freeze(question)));
})();

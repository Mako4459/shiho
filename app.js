const STORAGE_KEY = "shihoAppDataV2";
const LEGACY_KEYS = ["shihoUnifiedData","shihoshoshi","shihoData"];
const SUBJECTS = ["民法", "不動産登記法", "商法・会社法", "商業登記法", "民事訴訟法", "民事保全法", "民事執行法", "供託法", "司法書士法", "憲法", "刑法", "不動産登記規則"];
const LEVELS = [{value:1,label:"未理解"},{value:2,label:"不安"},{value:3,label:"普通"},{value:4,label:"自信あり"}];
function autoKnowledge(subject, topic){
  const s = String(subject||"");
  const t = String(topic||"");
  const text = s + " " + t;
  if(/留置権/.test(text)) return "【条文】民法295条。要件は、①他人の物を占有していること、②その物に関して生じた債権であること、③弁済期にあること。効力は、弁済を受けるまで目的物を留置できること。優先弁済権はない点を質権・抵当権と比較する。";
  if(/連帯債務/.test(text)) return "連帯債務は、各債務者が全額について履行義務を負う関係。絶対効・相対効、求償関係、免除・相殺・混同などの効果の帰属が頻出。改正民法では相対効が原則で、絶対効になる場面を正確に整理する。";
  if(/保証|連帯保証/.test(text)) return "保証は主たる債務に従属する人的担保。催告の抗弁権・検索の抗弁権、連帯保証ではこれらがない点が重要。根保証では極度額・元本確定期日などを確認する。";
  if(/抵当権/.test(text) && /根抵当/.test(text)) return "根抵当権は一定範囲の不特定債権を極度額の限度で担保する。債権の範囲、債務者、極度額、元本確定事由、確定前後の変更可否を抵当権と比較する。";
  if(/根抵当/.test(text)) return "根抵当権は、継続的取引から生じる不特定債権を極度額の範囲で担保する担保物権。極度額、債権の範囲、債務者、元本確定事由、確定前後の変更の可否が重要。";
  if(/抵当権/.test(text)) return "抵当権は、債務者または第三者が占有を移さずに不動産等を担保に供する担保物権。被担保債権の特定、物上代位、法定地上権、共同抵当、順位変更を整理する。";
  if(/仮登記/.test(text)) return "仮登記は本登記の順位を保全する登記。1号仮登記は物権変動が既に生じているが添付情報等が不足する場合、2号仮登記は将来の物権変動請求権を保全する場合。";
  if(/所有権移転/.test(text)) return "所有権移転登記では、登記原因、権利者・義務者、登記識別情報、印鑑証明書、住所証明情報、第三者許可・同意の要否を確認する。";
  if(/所有権保存/.test(text)) return "所有権保存登記は、初めて所有権の登記をする手続。申請適格者、表題部所有者、相続人からの申請、登録免許税を整理する。";
  if(/役員変更|取締役|監査役|代表取締役/.test(text)) return "役員変更登記は、就任・辞任・任期満了・重任・退任事由により添付書面が変わる。就任承諾書、議事録、印鑑証明書の要否を類型別に整理する。";
  if(/設立/.test(text) && /会社|株式会社|商業登記/.test(text)) return "株式会社設立登記は、定款、発起人の決定、役員就任、払込み、資本金、登録免許税を一連で整理する。定款認証、発起設立・募集設立の違いも確認する。";
  if(/相続/.test(text)) return "相続では、相続人、相続分、遺産分割、相続放棄、遺言、登記原因日付、添付情報の整理が重要。相続登記では戸籍一式、住所証明情報、遺産分割協議書等を確認する。";
  if(/遺言/.test(text)) return "遺言は方式、効力、撤回、遺贈、遺留分との関係が重要。自筆証書・公正証書・秘密証書の方式差と、登記・相続手続への影響を整理する。";
  if(/民法/.test(s)) return "民法では、要件・効果・第三者対抗要件・取消し/解除/無効の違いを意識する。条文番号、判例の結論、類似制度との比較が得点源になる。";
  if(/不動産登記/.test(s)) return "不動産登記法では、登記の目的、原因、申請人、添付情報、登録免許税をセットで整理する。単独申請・共同申請、主登記・付記登記の区別が重要。";
  if(/商業登記|会社法|商法/.test(s)) return "商業登記では、登記事項、添付書面、決議機関、議事録、就任承諾書、印鑑証明書の要否を整理する。会社法上の手続と登記手続を対応させる。";
  return "関連知識は未登録です。編集画面から条文・要件・比較ポイントを追加できます。";
}
function defaultTemplates(){
  return [
    {id:"t001",type:"template",category:"不動産登記",title:"所有権保存登記",body:"登記の目的　所有権保存\n原因　年月日新築\n所有者　住所　氏名\n添付情報　住所証明情報　代理権限証明情報\n登録免許税　金○円",level:1,knowledge:"所有権保存登記は、初めて所有権の登記をする場面。申請適格者、表題部所有者、相続人からの申請を整理する。",mistakes:0,reviewCount:0,lastViewed:"",lastReviewed:"",createdAt:""},
    {id:"t002",type:"template",category:"不動産登記",title:"所有権移転登記・売買",body:"登記の目的　所有権移転\n原因　年月日売買\n権利者　住所　氏名\n義務者　住所　氏名\n添付情報　登記原因証明情報　登記識別情報　印鑑証明書　住所証明情報　代理権限証明情報\n登録免許税　金○円",level:1,knowledge:"売買による所有権移転は共同申請。登記識別情報、印鑑証明書、住所証明情報、登記原因証明情報の役割を確認する。",mistakes:0,reviewCount:0,lastViewed:"",lastReviewed:"",createdAt:""},
    {id:"t003",type:"template",category:"不動産登記",title:"抵当権設定登記",body:"登記の目的　抵当権設定\n原因　年月日金銭消費貸借年月日設定\n債権額　金○円\n利息　年○％\n損害金　年○％\n債務者　住所　氏名\n抵当権者　住所　氏名\n設定者　住所　氏名\n添付情報　登記原因証明情報　登記識別情報　印鑑証明書　代理権限証明情報\n登録免許税　金○円",level:1,knowledge:"抵当権設定では、債権額・利息・損害金・債務者・抵当権者・設定者を整理する。共同申請が原則。",mistakes:0,reviewCount:0,lastViewed:"",lastReviewed:"",createdAt:""},
    {id:"t004",type:"template",category:"不動産登記",title:"相続による所有権移転登記",body:"登記の目的　所有権移転\n原因　年月日相続\n相続人　住所　氏名\n添付情報　登記原因証明情報　住所証明情報　代理権限証明情報\n登録免許税　金○円",level:1,knowledge:"相続登記では、被相続人の死亡日、相続人、戸籍一式、遺産分割協議書の要否、住所証明情報を確認する。",mistakes:0,reviewCount:0,lastViewed:"",lastReviewed:"",createdAt:""},
    {id:"t005",type:"template",category:"商業登記",title:"株式会社設立登記",body:"登記の事由　株式会社設立\n登記すべき事項　商号　本店　目的　発行可能株式総数　資本金の額　役員に関する事項等\n登録免許税　金○円\n添付書類　定款　発起人決定書　就任承諾書　払込み証明書　印鑑証明書　委任状",level:1,knowledge:"設立登記は、定款、発起人決定、役員就任、払込み、資本金、登録免許税を一連で整理する。",mistakes:0,reviewCount:0,lastViewed:"",lastReviewed:"",createdAt:""},
    {id:"t006",type:"template",category:"商業登記",title:"役員変更登記",body:"登記の事由　取締役変更\n登記すべき事項　年月日次の者就任　取締役　氏名\n登録免許税　金○円\n添付書類　株主総会議事録　就任承諾書　印鑑証明書　委任状",level:1,knowledge:"役員変更は、就任・辞任・任期満了・重任で添付書面が変わる。印鑑証明書の要否が頻出。",mistakes:0,reviewCount:0,lastViewed:"",lastReviewed:"",createdAt:""}
  ];
}
function defaultComparisons(){
  return [
    {id:"c001",title:"留置権 vs 同時履行の抗弁権",left:"留置権",right:"同時履行の抗弁権",points:[{label:"根拠",left:"民法295条",right:"民法533条"},{label:"必要なもの",left:"他人の物の占有",right:"双務契約上の対立債務"},{label:"効力",left:"物を留置できる",right:"履行を拒絶できる"},{label:"注意",left:"優先弁済権なし",right:"占有不要"}]},
    {id:"c002",title:"抵当権 vs 根抵当権",left:"抵当権",right:"根抵当権",points:[{label:"被担保債権",left:"特定債権",right:"一定範囲の不特定債権"},{label:"極度額",left:"不要",right:"必要"},{label:"元本確定",left:"通常問題になりにくい",right:"重要論点"},{label:"登記",left:"債権額を意識",right:"極度額・債権の範囲を意識"}]},
    {id:"c003",title:"1号仮登記 vs 2号仮登記",left:"1号仮登記",right:"2号仮登記",points:[{label:"場面",left:"物権変動は既に発生",right:"将来の請求権を保全"},{label:"典型",left:"添付情報不足等",right:"売買予約等"},{label:"目的",left:"本登記の順位保全",right:"本登記の順位保全"},{label:"注意",left:"本登記手続とのつながり",right:"請求権の内容を確認"}]},
    {id:"c004",title:"取締役会設置会社 vs 非設置会社",left:"取締役会設置会社",right:"非設置会社",points:[{label:"業務執行決定",left:"取締役会",right:"原則として取締役"},{label:"代表取締役",left:"原則選定が必要",right:"各自代表が原則"},{label:"登記添付",left:"取締役会議事録が問題に",right:"株主総会・互選等を確認"},{label:"注意",left:"機関設計と議事録",right:"定款規定を確認"}]}
  ];
}
function repairData(data){
  data = data || {};
  data.version = 3;
  data.problems = (data.problems || []).map((p,i)=>{
    const np = normalizeProblem(p,i);
    if(!np) return null;
    if(!np.knowledge || np.knowledge.includes("未登録")) np.knowledge = autoKnowledge(np.subject, np.topic);
    return np;
  }).filter(Boolean);
  if(!Array.isArray(data.templates) || data.templates.length === 0) data.templates = (window.__FORCE_TEMPLATES__ || defaultTemplates());
  else data.templates = data.templates.map(normalizeTemplate).filter(Boolean);
  if(!Array.isArray(data.comparisons) || data.comparisons.length === 0) data.comparisons = defaultComparisons();
  return data;
}


function nowISO(){ return new Date().toISOString(); }
function fmtDate(v){ if(!v) return "未記録"; const d=new Date(v); if(Number.isNaN(d.getTime())) return "未記録"; return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; }
function uid(prefix){ return prefix+"_"+Date.now()+"_"+Math.random().toString(36).slice(2,8); }
function safeParse(s,f=null){ try{return JSON.parse(s)}catch{return f} }
function normalizeProblem(x,i=0){ if(!x||typeof x!=="object") return null; const topic=x.topic||x.title||x.name||x.question||""; if(!topic) return null; return {id:String(x.id||uid("p"+i)),type:"problem",subject:x.subject||x.category||x.kamoku||"未分類",topic,level:Number(x.level||x.understanding||1),memo:x.memo||x.note||x.description||"",knowledge:x.knowledge||x.relatedKnowledge||x.related||x.info||autoKnowledge(x.subject||x.category||x.kamoku||"", topic),mistakes:Number(x.mistakes||x.wrongCount||0),reviewCount:Number(x.reviewCount||0),lastViewed:x.lastViewed||"",lastReviewed:x.lastReviewed||"",createdAt:x.createdAt||x.date||nowISO()}; }
function normalizeTemplate(x,i=0){ if(!x||typeof x!=="object") return null; const title=x.title||x.topic||x.name||""; const body=x.body||x.template||x.content||x.text||""; if(!title&&!body) return null; return {id:String(x.id||uid("t"+i)),type:"template",category:x.category||x.subject||"ひな形",title:title||"無題ひな形",body,level:Number(x.level||x.understanding||1),knowledge:x.knowledge||x.relatedKnowledge||"",memo:x.memo||"",mistakes:Number(x.mistakes||0),reviewCount:Number(x.reviewCount||0),lastViewed:x.lastViewed||"",lastReviewed:x.lastReviewed||"",createdAt:x.createdAt||nowISO()}; }
function loadData(){
  const current=safeParse(localStorage.getItem(STORAGE_KEY));
  if(current && Array.isArray(current.problems)){ if(!Array.isArray(current.templates)||current.templates.length===0){ current.templates=FORCE_TEMPLATES; localStorage.setItem(STORAGE_KEY,JSON.stringify(current)); }
    const repaired = repairData(current);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(repaired));
    return repaired;
  }
  let data=JSON.parse(JSON.stringify(INITIAL_DATA));
  for(const key of LEGACY_KEYS){
    const v=safeParse(localStorage.getItem(key));
    if(!v) continue;
    if(Array.isArray(v)) data.problems=v.map(normalizeProblem).filter(Boolean);
    if(v.problems) data.problems=v.problems.map(normalizeProblem).filter(Boolean);
    if(v.templates) data.templates=v.templates.map(normalizeTemplate).filter(Boolean);
    if(v.comparisons) data.comparisons=v.comparisons;
  }
  data = repairData(data);
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
  return data;
}
function saveData(data){ localStorage.setItem(STORAGE_KEY,JSON.stringify(data)); }
function score(p){ const lv=Number(p.level||1), mistakes=Number(p.mistakes||0), reviews=Number(p.reviewCount||0); let days=999; const bd=p.lastViewed||p.lastReviewed||p.createdAt; if(bd){const t=new Date(bd).getTime(); if(!Number.isNaN(t)) days=Math.floor((Date.now()-t)/86400000);} return (5-lv)*100+mistakes*20+Math.min(days,90)-reviews*5; }

function levelCountLabel(label, value, list){
  const arr = Array.isArray(list) ? list : [];
  if(String(value) === "all") return `${label} ${arr.length}`;
  return `${label} ${arr.filter(x => String(x.level || 1) === String(value)).length}`;
}



function downloadBackup(data){
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `shiho-backup-${new Date().toISOString().slice(0,10)}.json`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

function App(){
  const [data,setData]=React.useState(()=>{ const d=loadData(); if(!Array.isArray(d.templates)||d.templates.length===0){ d.templates=FORCE_TEMPLATES; saveData(d); } return d; });
  const [tab,setTab]=React.useState("problems");
  const [detail,setDetail]=React.useState(null);
  const [searchInput,setSearchInput]=React.useState("");
  const [search,setSearch]=React.useState("");
  const [levelFilter,setLevelFilter]=React.useState("all");
  const [editing,setEditing]=React.useState(null);
  React.useEffect(()=>saveData(data),[data]);

  function updateProblem(id, patch){ setData(d=>({...d,problems:d.problems.map(p=>p.id===id?{...p,...patch}:p)})); }
  function updateTemplate(id, patch){ setData(d=>({...d,templates:d.templates.map(t=>t.id===id?{...t,...patch}:t)})); }
  function openProblem(p){ updateProblem(p.id,{lastViewed:nowISO()}); setDetail({type:"problem",id:p.id}); }
  function openTemplate(t){ setData(d=>{ const exists=(d.templates||[]).some(x=>x.id===t.id); const list=exists?d.templates:[...(d.templates||[]),t]; return {...d,templates:list.map(x=>x.id===t.id?{...x,lastViewed:nowISO()}:x)}; }); setDetail({type:"template",id:t.id}); }
  function currentDetail(){ if(!detail) return null; return detail.type==="problem"?data.problems.find(p=>p.id===detail.id):data.templates.find(t=>t.id===detail.id); }

  const q=search.trim().toLowerCase();
  const filteredProblems=data.problems.filter(p=>(levelFilter==="all"||String(p.level)===String(levelFilter))&&(!q||[p.subject,p.topic,p.memo,p.knowledge].join(" ").toLowerCase().includes(q)));
  const templateSource=(Array.isArray(data.templates)&&data.templates.length>0)?data.templates:FORCE_TEMPLATES; const filteredTemplates=templateSource.filter(t=>(levelFilter==="all"||String(t.level)===String(levelFilter))&&(!q||[t.category,t.title,t.body,t.knowledge].join(" ").toLowerCase().includes(q)));
  const today=data.problems.slice().sort((a,b)=>score(b)-score(a)).slice(0,10);

  const problemCountSource = Array.isArray(data.problems) ? data.problems : [];
  const templateCountSource = (Array.isArray(data.templates) && data.templates.length > 0)
    ? data.templates
    : (typeof FORCE_TEMPLATES !== "undefined" ? FORCE_TEMPLATES : []);
  const activeCountSource = tab === "templates" ? templateCountSource : problemCountSource;

  const d=currentDetail();
  if(d) return <Detail item={d} type={detail.type} onBack={()=>setDetail(null)} updateProblem={updateProblem} updateTemplate={updateTemplate} setEditing={setEditing} />;

  return <div className="app">
    <div className="header"><div className="title"><small>JUDICIAL SCRIVENER</small><b>苦手分野 管理ノート</b></div><div className="row"><button className="hbtn" onClick={()=>downloadBackup(data)}>⬇</button><button className="hbtn" onClick={()=>setTab("today")}>📌</button><button className="hbtn" onClick={()=>setEditing({type:"newProblem"})}>＋</button></div></div>
    <div className="tabs">{["problems","templates","compare","today"].map(t=><button key={t} className={"tab "+(tab===t?"active":"")} onClick={()=>setTab(t)}>{{problems:"一覧",templates:"ひな形",compare:"横断比較",today:"今日"}[t]}</button>)}</div>
    {(tab==="problems"||tab==="templates")&&<div className="tabs">{[{value:"all",label:"全て"},...LEVELS].map(l=><button key={l.value} className={"tab "+(String(levelFilter)===String(l.value)?"active":"")} onClick={()=>setLevelFilter(l.value)}>{levelCountLabel(l.label,l.value,activeCountSource)}</button>)}</div>}
    {(tab==="problems"||tab==="templates")&&<div style={{padding:"8px 12px",background:"#0a1628"}}><div className="row"><input className="input" value={searchInput} onChange={e=>setSearchInput(e.target.value)} placeholder="検索語を入力" /><button className="btn gold" onClick={()=>setSearch(searchInput)}>検索</button><button className="btn" onClick={()=>{setSearchInput("");setSearch("");}}>クリア</button></div></div>}
    <div className="body">
      {tab==="problems"&&filteredProblems.map(p=><ProblemCard key={p.id} p={p} onClick={()=>openProblem(p)} />)}
      {tab==="templates"&&filteredTemplates.map(t=><TemplateCard key={t.id} t={t} onClick={()=>openTemplate(t)} />)}
      {tab==="compare"&&data.comparisons.map(c=><CompareCard key={c.id} c={c} />)}
      {tab==="today"&&today.map(p=><ProblemCard key={p.id} p={p} onClick={()=>openProblem(p)} today />)}
      {editing&&<EditModal editing={editing} setEditing={setEditing} data={data} setData={setData} />}
    </div>
    <div className="bottom"><button className={tab==="problems"?"active":""} onClick={()=>setTab("problems")}>一覧</button><button className={tab==="templates"?"active":""} onClick={()=>setTab("templates")}>ひな形</button><button className={tab==="compare"?"active":""} onClick={()=>setTab("compare")}>比較</button><button className={tab==="today"?"active":""} onClick={()=>setTab("today")}>今日</button></div>
  </div>;
}
function ProblemCard({p,onClick,today}){ return <div className="card" onClick={onClick}><div className="meta"><span>{p.subject}</span><span className="badge">{LEVELS.find(l=>l.value==p.level)?.label||"未理解"}</span>{today&&<span className="badge">優先度</span>}</div><div className="card-title">{p.topic}</div>{p.memo&&<div className="sub">{p.memo}</div>}<div className="last">最後に見た日: {fmtDate(p.lastViewed)}</div><div className="sub">復習: {p.reviewCount||0} ／ 間違え: {p.mistakes||0}</div></div>; }
function TemplateCard({t,onClick}){ return <div className="card" onClick={onClick}><div className="meta"><span>{t.category}</span><span className="badge">{LEVELS.find(l=>l.value==t.level)?.label||"未理解"}</span></div><div className="card-title">{t.title}</div><div className="last">最後に見た日: {fmtDate(t.lastViewed)}</div></div>; }
function CompareCard({c}){ return <div className="card"><div className="card-title">{c.title}</div><table className="table" style={{marginTop:10}}><thead><tr><th>項目</th><th>{c.left}</th><th>{c.right}</th></tr></thead><tbody>{c.points.map((p,i)=><tr key={i}><td>{p.label}</td><td>{p.left}</td><td>{p.right}</td></tr>)}</tbody></table></div>; }
function LevelButtons({value,onChange}){ return <div className="levels">{LEVELS.map(l=><button key={l.value} className={"level "+(value==l.value?"active":"")} onClick={()=>onChange(l.value)}>{l.label}</button>)}</div>; }
function Detail({item,type,onBack,updateProblem,updateTemplate,setEditing}){ const isP=type==="problem"; const update=isP?updateProblem:updateTemplate; const title=isP?item.topic:item.title; function reviewed(){update(item.id,{reviewCount:Number(item.reviewCount||0)+1,lastReviewed:nowISO(),lastViewed:nowISO()});} return <div className="app"><div className="header"><button className="btn" onClick={onBack}>← 一覧</button><button className="hbtn" onClick={()=>setEditing({type:isP?"problem":"template",id:item.id})}>編集</button></div><div className="body detail"><div className="card"><div className="meta"><span>{isP?item.subject:item.category}</span><span className="badge">{LEVELS.find(l=>l.value==item.level)?.label}</span></div><h2>{title}</h2><div className="last">最後に見た日: {fmtDate(item.lastViewed)}</div><div className="sub">復習: {item.reviewCount||0} ／ 間違え: {item.mistakes||0}</div><div className="section-title">理解度</div><LevelButtons value={item.level} onChange={v=>update(item.id,{level:v})} />{isP&&item.memo&&<><div className="section-title">メモ</div><div className="pre">{item.memo}</div></>}{!isP&&<><div className="section-title">ひな形</div><div className="pre">{item.body}</div></>}<div className="section-title">関連知識</div><div className="pre">{item.knowledge||"未登録"}</div><div className="row" style={{marginTop:14}}><button className="btn gold" onClick={reviewed}>今日復習した</button><button className="btn" onClick={()=>update(item.id,{mistakes:Number(item.mistakes||0)+1})}>間違え＋1</button></div></div></div></div>; }
function EditModal({editing,setEditing,data,setData}){ const isNew=editing.type==="newProblem"; const isProblem=editing.type==="problem"||isNew; const original=isNew?{subject:SUBJECTS[0],topic:"",level:1,memo:"",knowledge:""}:isProblem?data.problems.find(p=>p.id===editing.id):data.templates.find(t=>t.id===editing.id); const [form,setForm]=React.useState(original||{}); function set(k,v){setForm(f=>({...f,[k]:v}));} function save(){ if(isNew){const p=normalizeProblem({...form,id:uid("p"),createdAt:nowISO()}); setData(d=>({...d,problems:[p,...d.problems]}));} else if(isProblem){setData(d=>({...d,problems:d.problems.map(p=>p.id===form.id?form:p)}));} else {setData(d=>({...d,templates:d.templates.map(t=>t.id===form.id?form:t)}));} setEditing(null);} return <div style={{position:"fixed",inset:0,zIndex:50,background:"#0f1923",padding:14,overflowY:"auto"}}><div className="card"><h2>{isNew?"問題を追加":"内容編集"}</h2>{isProblem?<><div className="section-title">科目</div><select className="input" value={form.subject} onChange={e=>set("subject",e.target.value)}>{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select><div className="section-title">テーマ</div><input className="input" value={form.topic||""} onChange={e=>set("topic",e.target.value)} /><div className="section-title">メモ</div><textarea className="input" value={form.memo||""} onChange={e=>set("memo",e.target.value)} /></>:<><div className="section-title">分類</div><input className="input" value={form.category||""} onChange={e=>set("category",e.target.value)} /><div className="section-title">タイトル</div><input className="input" value={form.title||""} onChange={e=>set("title",e.target.value)} /><div className="section-title">ひな形</div><textarea className="input" value={form.body||""} onChange={e=>set("body",e.target.value)} /></>}<div className="section-title">理解度</div><LevelButtons value={form.level} onChange={v=>set("level",v)} /><div className="section-title">関連知識</div><textarea className="input" value={form.knowledge||""} onChange={e=>set("knowledge",e.target.value)} /><div className="row" style={{marginTop:14}}><button className="btn gold" onClick={save}>保存</button><button className="btn" onClick={()=>setEditing(null)}>キャンセル</button></div></div></div> }
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
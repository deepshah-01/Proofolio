const initialSkills = [
  {id:'python',name:'Python',symbol:'Py',className:'py',level:'Strong',score:84,area:'Programming language',source:'Smart Pantry API',sourceType:'github',description:'Built REST endpoints and data validation for a recipe recommendation service.',evidence:'api/routes/recipes.py',range:'Lines 18–46',excerpt:'@router.get("/recipes")\ndef get_recipes(\n    ingredient: str | None = None,\n    db: Session = Depends(get_db),\n):\n    return recipe_service.search(db, ingredient)',levelText:'Intermediate',status:'supported'},
  {id:'javascript',name:'JavaScript',symbol:'JS',className:'js',level:'Strong',score:78,area:'Programming language',source:'Campus Connect',sourceType:'github',description:'Implemented interactive features and client-side form validation.',evidence:'src/components/EventForm.jsx',range:'Lines 32–61',excerpt:'const handleSubmit = async (event) => {\n  event.preventDefault();\n  const result = validateEvent(formState);\n  if (!result.ok) return setErrors(result.errors);\n  await createEvent(formState);\n};',levelText:'Intermediate',status:'supported'},
  {id:'react',name:'React',symbol:'R',className:'re',level:'Strong',score:76,area:'Frontend framework',source:'Campus Connect',sourceType:'github',description:'Composed reusable UI components and managed form and page state.',evidence:'src/pages/EventsPage.jsx',range:'Lines 11–39',excerpt:'export function EventsPage() {\n  const [events, setEvents] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    eventApi.list().then(setEvents).finally(() => setLoading(false));\n  }, []);',levelText:'Intermediate',status:'supported'},
  {id:'sql',name:'SQL',symbol:'DB',className:'sql',level:'Growing',score:62,area:'Data querying',source:'Smart Pantry API',sourceType:'github',description:'Used relational queries and ORM relationships to retrieve project data.',evidence:'api/models/recipe.py',range:'Lines 7–24',excerpt:'class Recipe(Base):\n    __tablename__ = "recipes"\n\n    id = Column(Integer, primary_key=True)\n    name = Column(String, nullable=False)\n    ingredients = relationship("Ingredient", back_populates="recipe")',levelText:'Developing',status:'partial'},
  {id:'git',name:'Git & GitHub',symbol:'⌘',className:'git',level:'Strong',score:81,area:'Developer tools',source:'Campus Connect',sourceType:'github',description:'Project history and README show regular version control and collaboration workflows.',evidence:'README.md',range:'Project overview',excerpt:'## Team workflow\n1. Create a feature branch from `main`.\n2. Open a pull request with a short testing note.\n3. Request review from one teammate before merging.',levelText:'Intermediate',status:'supported'},
  {id:'api',name:'API design',symbol:'↔',className:'sql',level:'Growing',score:59,area:'Backend development',source:'Smart Pantry API',sourceType:'github',description:'Designed REST routes with request validation and clear response shapes.',evidence:'api/routes/recipes.py',range:'Lines 8–46',excerpt:'@router.get("/recipes/{recipe_id}")\ndef get_recipe(recipe_id: int, db: Session = Depends(get_db)):\n    recipe = recipe_service.get(db, recipe_id)\n    if recipe is None:\n        raise HTTPException(status_code=404, detail="Recipe not found")',levelText:'Developing',status:'partial'},
  {id:'testing',name:'Software testing',symbol:'✓',className:'re',level:'Emerging',score:28,area:'Quality assurance',source:'Resume · Aarav_Shah.pdf',sourceType:'resume',description:'Testing is listed as an interest on your resume. Add a test suite to demonstrate it in practice.',evidence:'Resume · Projects section',range:'Page 1',excerpt:'Interested in learning automated testing and test-driven development. Familiar with the basics of software quality assurance.',levelText:'Self-reported',status:'gap'},
  {id:'communication',name:'Team communication',symbol:'↗',className:'git',level:'Growing',score:53,area:'Professional skill',source:'Resume · Aarav_Shah.pdf',sourceType:'resume',description:'Your resume mentions collaboration. A project write-up or review history could make this easier to assess.',evidence:'Resume · Summary',range:'Page 1',excerpt:'Collaborated with a four-person student team to design and deliver a campus events platform.',levelText:'Self-reported',status:'partial'}
];

const projects = [
  {name:'Smart Pantry API',kind:'Backend · Personal project',symbol:'⌘',skills:'Python · SQL · API design'},
  {name:'Campus Connect',kind:'Full stack · Team project',symbol:'✳',skills:'React · JavaScript · Git'},
  {name:'Aarav_Shah.pdf',kind:'Resume · Uploaded sample',symbol:'▤',skills:'Testing · Communication'}
];

const roleProfiles = {
  'Junior Software Engineer': [
    {skill:'Python',status:'supported',why:'Cited API endpoint and validation logic',sid:'python'},
    {skill:'JavaScript',status:'supported',why:'Interactive event form with validation',sid:'javascript'},
    {skill:'React',status:'supported',why:'Reusable page components and state',sid:'react'},
    {skill:'SQL & data modeling',status:'partial',why:'ORM relationships in recipe model',sid:'sql'},
    {skill:'API development',status:'partial',why:'REST routes with input handling',sid:'api'},
    {skill:'Version control',status:'supported',why:'Project workflow documented in README',sid:'git'},
    {skill:'Automated testing',status:'gap',why:'Resume mention only; no test files found',sid:'testing'},
    {skill:'Team collaboration',status:'gap',why:'Resume mention only; add a review or team artifact',sid:'communication'}
  ],
  'Frontend Developer': [
    {skill:'React',status:'supported',why:'Reusable page components and state',sid:'react'},
    {skill:'JavaScript',status:'supported',why:'Interactive event form with validation',sid:'javascript'},
    {skill:'Responsive UI',status:'partial',why:'Project includes UI pages; add responsive examples',sid:'react'},
    {skill:'API integration',status:'partial',why:'Event API list and create calls',sid:'api'},
    {skill:'Accessibility',status:'gap',why:'No accessibility checks found in submitted work',sid:'testing'},
    {skill:'CSS',status:'partial',why:'UI implementation present; limited style evidence',sid:'react'},
    {skill:'Version control',status:'supported',why:'Project workflow documented in README',sid:'git'},
    {skill:'Team collaboration',status:'gap',why:'Resume mention only; add a review or team artifact',sid:'communication'}
  ],
  'Data Analyst': [
    {skill:'SQL',status:'partial',why:'Relational queries and ORM relationships',sid:'sql'},
    {skill:'Python',status:'supported',why:'Data retrieval and service logic',sid:'python'},
    {skill:'Data visualization',status:'gap',why:'No chart or reporting examples found',sid:'api'},
    {skill:'Data cleaning',status:'gap',why:'No reproducible data preparation evidence',sid:'python'},
    {skill:'Communication',status:'gap',why:'Resume mention only; add a project write-up',sid:'communication'},
    {skill:'Git',status:'supported',why:'Project workflow documented in README',sid:'git'}
  ]
};

const learningTasks = [
  {title:'Add tests to your recipe API',sub:'Write 3 endpoint tests with pytest and cover a not-found case.',duration:'75 min',type:'PROJECT TASK',done:false},
  {title:'Model a many-to-many relationship',sub:'Add tags to recipes and query them with a join table.',duration:'60 min',type:'HANDS-ON',done:false},
  {title:'Make a small contribution',sub:'Open a pull request with a clear description and testing note.',duration:'90 min',type:'REAL-WORLD',done:true},
  {title:'Document one design choice',sub:'Explain why your API returns a 404 for a missing recipe.',duration:'45 min',type:'REFLECTION',done:false}
];

const state = {skills:initialSkills.map(x=>({...x})), page:'overview', filter:'all', role:'Junior Software Engineer', selectedRole:'Junior Software Engineer', pendingResumeFile:null, parsedResume:null, authRole:'student', auth:null};
const $ = (selector,root=document)=>root.querySelector(selector);
const $$ = (selector,root=document)=>Array.from(root.querySelectorAll(selector));
const escapeHtml = value => String(value).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const symbol = skill => `<span class="skill-symbol ${escapeHtml(skill.className)}">${escapeHtml(skill.symbol)}</span>`;
const skillById = id => state.skills.find(skill=>skill.id===id) || state.skills[0];

function renderOverview(){
  const evidenceCount=state.skills.filter(skill=>skill.sourceType==='github').length;
  $('#nav-skill-count').textContent=state.skills.length;
  $('#stat-skill-count').textContent=String(evidenceCount).padStart(2,'0');
  $('#all-skill-count').textContent=state.skills.length;
  $('#passport-skill-count').textContent=String(evidenceCount).padStart(2,'0');
  const previewCount=$('.preview-foot span:first-child');
  if(previewCount)previewCount.textContent=`${evidenceCount} skills linked to work`;
  $('#overview-skill-list').innerHTML=state.skills.slice(0,5).map(skill=>`<div class="skill-row" data-skill="${skill.id}">${symbol(skill)}<span class="skill-row-copy"><strong>${escapeHtml(skill.name)}</strong><small>${escapeHtml(skill.source)}</small></span><span class="skill-level"><strong>${escapeHtml(skill.level)}</strong><small>${skill.sourceType==='resume'?'Resume mention':`${skill.score}% evidence`}</small></span></div>`).join('');
  renderPassport();
}

function renderSkills(){
  const query=($('#skill-search')?.value||'').trim().toLowerCase();
  let list=state.skills.filter(skill=>{
    const matchesFilter=state.filter==='all'||(state.filter==='strong'?skill.score>=70:skill.score<70);
    return matchesFilter&&(!query||`${skill.name} ${skill.source} ${skill.description}`.toLowerCase().includes(query));
  });
  $('#skills-grid').innerHTML=list.length?list.map(skill=>`<article class="skill-card" data-skill="${skill.id}"><div class="skill-card-top">${symbol(skill)}<span class="skill-card-title"><strong>${escapeHtml(skill.name)}</strong><small>${escapeHtml(skill.area)}</small></span><span class="evidence-pill ${skill.sourceType==='resume'?'self':''}">${skill.sourceType==='resume'?'Self-reported':'Evidence-backed'}</span></div><p class="skill-card-desc">${escapeHtml(skill.description)}</p><div class="skill-card-evidence"><i class="source-dot ${skill.sourceType==='resume'?'resume':''}"></i><b>${escapeHtml(skill.source)}</b><span>· ${escapeHtml(skill.range)}</span><span class="card-arrow">↗</span></div></article>`).join(''):`<div class="empty-state"><strong>No skills found</strong>Try another search or filter.</div>`;
}

function renderRole(){
  const requirements=roleProfiles[state.role]||roleProfiles['Junior Software Engineer'];
  const supported=requirements.filter(r=>r.status==='supported').length;
  const partial=requirements.filter(r=>r.status==='partial').length;
  const score=Math.round((supported+partial*.5)/requirements.length*100);
  $('#selected-role-title').textContent=state.role;
  $('#role-match-score').innerHTML=`${score}<span>%</span>`;
  const readinessStat=$('#readiness-stat');
  if(readinessStat)readinessStat.innerHTML=`${score}<span class="percent">%</span>`;
  const selectedRoleStat=$('#selected-role-stat');
  if(selectedRoleStat)selectedRoleStat.textContent=state.role;
  const roleGapCount=$('#role-gap-count');
  if(roleGapCount)roleGapCount.textContent=`${requirements.length-supported} to strengthen`;
  const progress=$('#readiness-progress span');
  if(progress)progress.style.width=`${score}%`;
  const readiness=$('#readiness-score');
  if(readiness)readiness.innerHTML=`${score}<small>%</small>`;
  const passportRoleScore=$('#passport-role-score');
  if(passportRoleScore)passportRoleScore.innerHTML=`${score}<span>%</span>`;
  const passportRoleLabel=$('#passport-role-label');
  if(passportRoleLabel)passportRoleLabel.textContent=`Match · ${state.role}`;
  const roleReadinessLabel=$('#readiness-role-name');
  if(roleReadinessLabel)roleReadinessLabel.textContent=state.role;
  const roleOverviewName=$('#role-overview-name');
  if(roleOverviewName)roleOverviewName.textContent=state.role;
  const matchCoverage=$('#role-match-coverage');
  if(matchCoverage)matchCoverage.textContent=`Your profile supports ${supported} of ${requirements.length} core skills for this role. ${requirements.length-supported} requirements need stronger evidence.`;
  const ring=$('.ring-value');
  if(ring)ring.style.strokeDashoffset=String(307.9*(1-score/100));
  $('#requirements-list').innerHTML=requirements.map(item=>{
    const skill=skillById(item.sid); const label=item.status==='supported'?'Supported':item.status==='partial'?'Partial':'Gap';
    return `<div class="requirement-row"><div class="requirement-name">${symbol(skill)}<strong>${escapeHtml(item.skill)}</strong></div><div class="requirement-evidence">${escapeHtml(item.why)} · <a href="#" data-skill="${skill.id}">View evidence ↗</a></div><div class="requirement-status"><span class="status-pill ${item.status}">${item.status==='supported'?'✓':item.status==='partial'?'◷':'+'} ${label}</span></div></div>`;
  }).join('');
}

function renderPlan(){
  $('#plan-list').innerHTML=learningTasks.map((task,index)=>`<div class="plan-item"><span class="plan-number">${String(index+1).padStart(2,'0')}</span><span class="plan-copy"><strong>${escapeHtml(task.title)}</strong><small>${escapeHtml(task.sub)}</small></span><span class="plan-duration">◷ ${escapeHtml(task.duration)}</span><button class="plan-check ${task.done?'done':''}" data-task="${index}" aria-label="${task.done?'Mark incomplete':'Mark complete'}">${task.done?'✓':''}</button></div>`).join('');
}

function renderPassport(){
  $('#passport-skill-list').innerHTML=state.skills.filter(x=>x.sourceType!=='resume').slice(0,6).map(skill=>`<div class="passport-skill" data-skill="${skill.id}">${symbol(skill)}<span><strong>${escapeHtml(skill.name)}</strong><small>${escapeHtml(skill.source)} · ${escapeHtml(skill.range)}</small></span><span class="arrow">↗</span></div>`).join('');
  const resumeClaims=state.skills.filter(skill=>skill.sourceType==='resume');
  $('#passport-claims-wrap').hidden=resumeClaims.length===0;
  $('#passport-claims-list').innerHTML=resumeClaims.map(skill=>`<span class="passport-claim" title="${escapeHtml(skill.range)}">${escapeHtml(skill.name)}</span>`).join('');
  $('#project-cards').innerHTML=projects.map(p=>`<div class="project-card"><span class="project-card-icon">${p.symbol}</span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.kind)}<br>${escapeHtml(p.skills)}</small></div>`).join('');
}

function showPage(name){
  if(!$('#page-'+name))return;
  if(name==='candidates'&&state.auth?.role!=='recruiter')return;
  if(['overview','skills','roles','learning'].includes(name)&&state.auth?.role==='recruiter')return;
  state.page=name;
  $$('.page-view').forEach(page=>page.classList.toggle('active',page.id==='page-'+name));
  $$('.nav-link').forEach(link=>link.classList.toggle('active',link.dataset.page===name));
  const title={overview:'Overview',skills:'My skills',roles:'Role match',learning:'Learning plan',passport:'Public view',candidates:'Candidate pool'}[name]||'Overview';
  $('#breadcrumb-page').textContent=title;
  $('#sidebar').classList.remove('open');
  if(name==='skills')renderSkills(); if(name==='roles')renderRole(); if(name==='learning')renderPlan(); if(name==='passport')renderPassport(); if(name==='candidates')renderCandidates();
  window.scrollTo({top:0,behavior:'smooth'});
}

const demoAccounts={student:{email:'student@proofolio.demo',password:'StudentDemo!23',name:'Aarav Shah'},recruiter:{email:'recruiter@proofolio.demo',password:'RecruiterDemo!23',name:'Maya Recruiter'}};
function updateAuthRole(role){
  state.authRole=role;
  $$('.auth-role-tab').forEach(tab=>{const active=tab.dataset.authRole===role;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));});
  const account=demoAccounts[role];$('#login-email').value=account.email;$('#login-password').value=account.password;
  $('#demo-login').innerHTML=`Continue as a ${role} <span>↗</span>`;
  $('#auth-credentials').innerHTML=`Demo ${role} · <strong>${account.email}</strong><br />Password · <strong>${account.password}</strong>`;
  $('#login-error').hidden=true;
}
function setAuthenticated(user){
  state.auth=user;document.body.classList.toggle('recruiter-mode',user.role==='recruiter');
  $('#auth-screen').hidden=true;$('.app-shell').hidden=false;
  $('.recruiter-nav').hidden=user.role!=='recruiter';
  const display=user.display_name||demoAccounts[user.role].name;
  $('.profile-name strong').textContent=display;$('.profile-name small').textContent=user.role==='recruiter'?'Recruiter demo':'Student demo';
  const initials=display.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase();
  $('.avatar-small').textContent=initials;$('.top-avatar').textContent=initials;
  showPage(user.role==='recruiter'?'candidates':'overview');
}
function showLogin(){
  state.auth=null;document.body.classList.remove('recruiter-mode');$('.app-shell').hidden=true;$('#auth-screen').hidden=false;updateAuthRole(state.authRole||'student');
}
async function authRequest(path,payload){
  const response=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not sign in. Try again.');return result;
}
async function signIn(demo){
  const error=$('#login-error');error.hidden=true;
  try{
    const user=await authRequest(demo?'/api/auth/demo':'/api/auth/login',demo?{role:state.authRole}:{role:state.authRole,email:$('#login-email').value.trim(),password:$('#login-password').value});
    setAuthenticated(user);
  }catch(err){error.textContent=err instanceof TypeError?'Could not connect to Proofolio. Start it with `python server.py`.':err.message;error.hidden=false;}
}
async function signOut(){
  try{await fetch('/api/auth/logout',{method:'POST'});}catch(_error){}
  state.authRole='student';showLogin();
}
const sampleCandidates=[{name:'Aarav Shah',initials:'AS',headline:'Computer Science student · Pune, India',role:'Software Engineer',score:74,skills:'Python, React, SQL, API design',evidence:'6 skills linked to 3 project samples',summary:'Strong foundation in backend and frontend work, with source-linked project evidence.'}];
function renderCandidates(){
  const query=($('#candidate-search')?.value||'').trim().toLowerCase(),role=$('#candidate-role-filter')?.value||'all';
  const items=sampleCandidates.filter(candidate=>(role==='all'||candidate.role===role)&&(!query||`${candidate.name} ${candidate.headline} ${candidate.role} ${candidate.skills}`.toLowerCase().includes(query)));
  $('#candidate-list').innerHTML=items.length?items.map(candidate=>`<article class="candidate-card"><div class="candidate-card-top"><span class="avatar candidate-avatar">${candidate.initials}</span><div class="candidate-identity"><h2>${candidate.name}</h2><p>${candidate.headline}</p></div><span class="candidate-score"><strong>${candidate.score}%</strong><small>evidence match</small></span></div><div class="candidate-role-line"><span>Target role</span><strong>${candidate.role}</strong></div><p class="candidate-summary">${candidate.summary}</p><div class="candidate-skills">${candidate.skills.split(', ').map(skill=>`<span>${skill}</span>`).join('')}</div><div class="candidate-card-foot"><span>✓ ${candidate.evidence}</span><button class="button button-primary" data-page="passport">Review passport <span>→</span></button></div></article>`).join(''):'<div class="empty-state"><strong>No candidates match</strong>Change the search or role filter.</div>';
}

function openModal(title,subtitle,body,actions=''){
  $('#modal').innerHTML=`<div class="modal-head"><div><h2 id="modal-title">${title}</h2><p>${subtitle}</p></div><button class="modal-close" data-close aria-label="Close">×</button></div>${body}${actions}`;
  $('#modal-backdrop').classList.add('open');
  $('#modal').scrollTop=0;
}
function closeModal(){ $('#modal-backdrop').classList.remove('open'); state.parsedResume=null; state.pendingResumeFile=null; }
function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2600);}

function showEvidence(skill){
  const github=skill.sourceType==='github';
  const sourceIcon=github?'⌘':'▤';
  const snippet=github?`<div class="evidence-code">${skill.excerpt.split('\n').map((line,i)=>`<span class="line-num">${String(i+18).padStart(2,'0')}</span>${escapeHtml(line)}`).join('\n')}</div>`:`<div class="evidence-quote">“${escapeHtml(skill.excerpt)}”</div>`;
  openModal('Evidence for '+escapeHtml(skill.name),'A closer look at the work behind this skill.',`<div class="evidence-detail"><div class="evidence-skill-head">${symbol(skill)}<span><h3>${escapeHtml(skill.name)}</h3><p>${escapeHtml(skill.levelText)} · ${skill.score}% evidence coverage</p></span></div><p class="evidence-summary">${escapeHtml(skill.description)}</p><div class="evidence-block"><div class="evidence-block-head"><strong>${sourceIcon} ${escapeHtml(skill.evidence)}</strong><span>${escapeHtml(skill.range)}</span></div>${snippet}</div><div class="modal-tag-row"><span class="modal-tag">${github?'Repository evidence':'Self-reported in resume'}</span><span class="modal-tag">${github?'Source link available':'Needs work sample'}</span></div><div class="modal-tip"><strong>How to read this:</strong> Evidence supports that this skill appears in the submitted work. It does not independently verify who authored the work.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Close</button><button class="button button-primary" data-page="learning">Build this skill <span>→</span></button></div>');
}

function openAddWork(){
  state.pendingResumeFile=null;
  state.parsedResume=null;
  openModal('Import a resume','Extract text and skill mentions, then review every result before adding it.',`<div class="modal-body"><label class="form-label" for="resume-file">Resume file</label><label class="upload-zone" for="resume-file" id="resume-drop-zone"><span>⇧</span><strong id="resume-file-prompt">Choose a resume to parse</strong><small>PDF, DOCX or TXT · Up to 10 MB</small><input id="resume-file" type="file" accept=".pdf,.docx,.txt,.md" /></label><div class="resume-file-meta" id="resume-file-meta" hidden><strong id="resume-file-name"></strong><span id="resume-file-size"></span><button class="resume-remove" id="clear-resume-button" aria-label="Remove selected resume">×</button></div><p class="form-help">Text is extracted locally by the Proofolio service. Scanned-image OCR is not enabled.</p><div class="modal-tip"><strong>Review before adding:</strong> The parser finds terms and cites their page and line. Resume mentions remain self-reported; they do not become verified skills.</div><div class="resume-error" id="resume-import-error" hidden></div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="parse-resume-button">Parse resume <span>→</span></button></div>');
}

function formatFileSize(bytes){
  if(bytes<1024)return `${bytes} B`;
  if(bytes<1024*1024)return `${(bytes/1024).toFixed(0)} KB`;
  return `${(bytes/(1024*1024)).toFixed(1)} MB`;
}

function setResumeFile(file){
  if(!file)return;
  const error=$('#resume-import-error');
  if(error){error.hidden=true;error.textContent='';}
  state.pendingResumeFile=file;
  const prompt=$('#resume-file-prompt');
  const meta=$('#resume-file-meta');
  const name=$('#resume-file-name');
  const size=$('#resume-file-size');
  if(prompt)prompt.textContent='Resume selected';
  if(meta)meta.hidden=false;
  if(name)name.textContent=file.name;
  if(size)size.textContent=formatFileSize(file.size);
}

function showResumeError(message){
  openModal('Resume could not be parsed',escapeHtml(message),`<div class="modal-body"><p class="evidence-summary">Your file was not added to the profile. Check the file and try again.</p><div class="modal-tip"><strong>Supported:</strong> text-based PDF, DOCX, and TXT files up to 10 MB. Scanned PDF images need OCR, which is not included yet.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Close</button><button class="button button-primary" id="retry-resume-button">Try again</button></div>');
}

async function parseSelectedResume(){
  const file=state.pendingResumeFile;
  if(!file){showToast('Choose a resume file first.');return;}
  if(file.size>10*1024*1024){showToast('The file is over 10 MB. Choose a smaller resume.');return;}
  const formData=new FormData();
  formData.append('resume',file,file.name);
  openModal('Reading resume','Extracting text and checking for supported skill terms.',`<div class="scan-state"><div class="scan-spinner"></div><strong>Building a source-linked review</strong><p>The file is held in memory only while it is parsed.</p></div>`);
  try{
    const response=await fetch('/api/parse-resume',{method:'POST',body:formData});
    const result=await response.json();
    if(!response.ok)throw new Error(result.error||'The resume could not be parsed.');
    state.parsedResume=result;
    openResumeReview(result);
  }catch(error){
    showResumeError(error instanceof TypeError?'Could not reach the local parser. Start the app with `python server.py` and open http://127.0.0.1:5000.':error.message);
  }
}

function openResumeReview(result){
  const contact=result.contact||{};
  const contactRows=[['Possible name · review',contact.name],['Email',contact.email],['Phone',contact.phone]].filter(([,value])=>value);
  const fileDetails=result.page_count?`${result.file_type} · ${result.page_count} page${result.page_count===1?'':'s'}`:`${result.file_type} · text-line references`;
  const contactCards=contactRows.length?contactRows.map(([label,value])=>`<div class="parse-summary-card"><span>${label}</span><strong title="${escapeHtml(value)}">${escapeHtml(value)}</strong></div>`).join(''):`<div class="parse-summary-card"><span>Contact details</span><strong>Review manually</strong></div>`;
  const skillCards=result.skills.length?result.skills.map(skill=>{const location=skill.page?`Page ${skill.page} · line ${skill.line}`:`Text line ${skill.line}`;return `<article class="parsed-skill"><div class="parsed-skill-top"><strong>${escapeHtml(skill.name)}</strong><span class="parsed-skill-source">Resume mention</span></div><p>${escapeHtml(skill.excerpt)}</p><span class="parsed-citation">${location}</span></article>`;}).join(''):`<div class="parsed-empty">No supported skill terms were found. You can still review the detected resume sections below.</div>`;
  const sections=result.sections.length?result.sections.map(section=>`<article class="parsed-section-card"><header><strong>${escapeHtml(section.name)}</strong><span>${section.page?`Page ${section.page}`:`Line ${section.line}`}</span></header><p>${escapeHtml(section.excerpt||'Section heading found; no following text was available.')}</p></article>`).join(''):`<div class="parsed-empty">No standard section headings detected. Review the text and skill mentions manually.</div>`;
  openModal('Resume review',`${escapeHtml(result.file_name)} · ${fileDetails}`,`<div class="parse-result"><div class="parse-summary">${contactCards}<div class="parse-summary-card"><span>Skill terms</span><strong>${result.skills.length} found</strong></div><div class="parse-summary-card"><span>Text extracted</span><strong>${result.character_count.toLocaleString()} characters</strong></div></div><div class="parse-section-title">Skill mentions <small>Each item points to source text</small></div><div class="parsed-skill-list">${skillCards}</div><div class="parse-section-title">Sections detected <small>Headings, not quality ratings</small></div><div class="parsed-sections">${sections}</div><div class="parsed-disclaimer">These terms were found in the resume. They are self-reported and stay separate from skills supported by project work.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Discard</button><button class="button button-primary" id="add-resume-claims-button">Add resume mentions</button></div>');
}

function addResumeClaims(){
  const parsed=state.parsedResume;
  if(!parsed)return;
  if(parsed.skills.length===0){
    closeModal();
    showToast('Resume reviewed. No supported skill terms were found.');
    return;
  }
  const visualByName={Python:['Py','py'],JavaScript:['JS','js'],TypeScript:['TS','js'],React:['R','re'],SQL:['DB','sql'],Git:['⌘','git'],HTML:['H','git'],CSS:['C','git']};
  let added=0;
  for(const mention of parsed.skills){
    const id=`resume-${mention.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;
    const existing=state.skills.find(skill=>skill.id===id);
    const [symbolName,className]=visualByName[mention.name]||['CV','git'];
    const location=mention.page?`Page ${mention.page}`:`Text line ${mention.line}`;
    const range=mention.page?`${location} · Line ${mention.line}`:location;
    const record={id,name:mention.name,symbol:symbolName,className,level:'Resume mention',score:20,area:'Resume claim',source:`Resume · ${parsed.file_name}`,sourceType:'resume',description:'This term appears in the resume. Add a project sample to support it with work evidence.',evidence:`Resume · ${location}`,range,excerpt:mention.excerpt,levelText:'Self-reported',status:'gap'};
    if(existing)Object.assign(existing,record);else{state.skills.push(record);added++;}
  }
  renderOverview();renderSkills();renderRole();renderPassport();
  state.parsedResume=null;
  state.pendingResumeFile=null;
  closeModal();
  showToast(added?`${added} resume mention${added===1?'':'s'} added. They remain unverified.`:'Those resume mentions are already in the profile.');
}

function openRolePicker(){
  const choices=['Junior Software Engineer','Frontend Developer','Data Analyst'];
  openModal('Choose a target role','We’ll compare your evidence against the role requirements.',`<div class="modal-body">${choices.map((role,index)=>`<label class="role-choice ${role===state.role?'selected':''}"><span class="role-choice-icon">${index===0?'⌘':index===1?'✳':'▤'}</span><span><strong>${role}</strong><small>${index===0?'Build and maintain software systems':index===1?'Create accessible, responsive interfaces':'Turn data into useful insights'}</small></span><input type="radio" name="role" value="${role}" ${role===state.role?'checked':''}></label>`).join('')}</div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-role-button">Use this role</button></div>');
}

function openEditProfile(){
  openModal('Your profile details','These details appear in your shareable passport.',`<div class="modal-body"><label class="form-label" for="profile-name-input">Name</label><input class="form-input" id="profile-name-input" value="Aarav Shah" /><label class="form-label" for="profile-headline-input">Headline</label><input class="form-input" id="profile-headline-input" value="Computer Science student · Pune, India" /><label class="form-label" for="profile-github-input">GitHub profile</label><input class="form-input" id="profile-github-input" value="https://github.com/aaravshah" /><div class="modal-tip">Your passport is private in this prototype. Sharing is only a preview action.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-profile-button">Save changes</button></div>');
}

document.addEventListener('click',event=>{
  const authTab=event.target.closest('[data-auth-role]');if(authTab){updateAuthRole(authTab.dataset.authRole);return;}
  if(event.target.id==='demo-login'){signIn(true);return;}
  if(event.target.id==='signout-button'){signOut();return;}
  const pageLink=event.target.closest('[data-page]'); if(pageLink){showPage(pageLink.dataset.page);closeModal();return;}
  const nav=event.target.closest('.nav-link'); if(nav){showPage(nav.dataset.page);return;}
  const skillTarget=event.target.closest('[data-skill]'); if(skillTarget){event.preventDefault();showEvidence(skillById(skillTarget.dataset.skill));return;}
  const close=event.target.closest('[data-close]'); if(close){closeModal();return;}
  if(event.target.id==='modal-backdrop'){closeModal();return;}
  const filter=event.target.closest('[data-filter]');if(filter){state.filter=filter.dataset.filter;$$('.filter-pill').forEach(x=>x.classList.toggle('active',x===filter));renderSkills();return;}
  if(event.target.id==='add-work-button'||event.target.id==='skills-add-work'){openAddWork();return;}
  if(event.target.id==='edit-role-button'){openRolePicker();return;}
  if(event.target.id==='edit-profile-button'){openEditProfile();return;}
  if(event.target.id==='mobile-menu'){$('#sidebar').classList.toggle('open');return;}
  if(event.target.id==='notification-button'){showToast('You’re all caught up.');return;}
  if(event.target.id==='profile-button'){showToast(state.auth?.role==='recruiter'?'Recruiter demo workspace':'Student demo workspace');return;}
  if(event.target.id==='copy-link-button'||event.target.id==='share-button'){
    const link='https://proofolio.example/passport/aarav-shah';
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(link).catch(()=>{});
    $('#share-confirm').classList.add('show');showToast('Demo passport link copied.');return;
  }
  const taskButton=event.target.closest('[data-task]');if(taskButton){const task=learningTasks[Number(taskButton.dataset.task)];task.done=!task.done;renderPlan();showToast(task.done?'Nice work — step marked complete.':'Step moved back to your plan.');return;}
  if(event.target.id==='parse-resume-button'){parseSelectedResume();return;}
  if(event.target.id==='retry-resume-button'){parseSelectedResume();return;}
  if(event.target.id==='add-resume-claims-button'){addResumeClaims();return;}
  if(event.target.id==='clear-resume-button'){
    state.pendingResumeFile=null;
    const fileInput=$('#resume-file');if(fileInput)fileInput.value='';
    const meta=$('#resume-file-meta');if(meta)meta.hidden=true;
    const prompt=$('#resume-file-prompt');if(prompt)prompt.textContent='Choose a resume to parse';
    return;
  }
  if(event.target.id==='save-role-button'){
    const checked=$('input[name="role"]:checked');if(checked){state.role=checked.value;state.selectedRole=state.role;closeModal();renderRole();showToast('Role match updated for '+state.role+'.');}return;
  }
  if(event.target.id==='save-profile-button'){
    const name=$('#profile-name-input').value.trim()||'Aarav Shah';
    $$('.passport-person h2').forEach(node=>node.textContent=name);
    closeModal();showToast('Profile details saved for this preview.');return;
  }
});

document.addEventListener('submit',event=>{if(event.target.id==='login-form'){event.preventDefault();signIn(false);}});
document.addEventListener('input',event=>{if(event.target.id==='skill-search')renderSkills();if(event.target.id==='candidate-search')renderCandidates();});
document.addEventListener('change',event=>{if(event.target.id==='candidate-role-filter')renderCandidates();});
document.addEventListener('change',event=>{if(event.target.id==='resume-file')setResumeFile(event.target.files?.[0]);});
document.addEventListener('dragover',event=>{if(event.target.closest('#resume-drop-zone')){event.preventDefault();$('#resume-drop-zone').classList.add('dragging');}});
document.addEventListener('dragleave',event=>{if(event.target.closest('#resume-drop-zone'))$('#resume-drop-zone').classList.remove('dragging');});
document.addEventListener('drop',event=>{const zone=event.target.closest('#resume-drop-zone');if(!zone)return;event.preventDefault();zone.classList.remove('dragging');setResumeFile(event.dataTransfer?.files?.[0]);});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();});

renderOverview();renderSkills();renderRole();renderPlan();renderCandidates();
updateAuthRole('student');
(async()=>{try{const response=await fetch('/api/auth/session');if(!response.ok)throw new Error('No active demo session');setAuthenticated(await response.json());}catch(_error){showLogin();}})();

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

let projects = [
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

const defaultCompany={name:'ByteBanyan Systems',industry:'Software & technology',description:'A sample product engineering team building dependable tools for growing businesses.',website:'https://bytebanyan.example',location:'Pune, India',contactName:'Maya Recruiter',officialEmail:'careers@bytebanyan.example'};
const defaultProfile={name:'Aarav Shah',headline:'Computer Science student · Pune, India',college:'Vishwakarma Institute of Technology',branch:'Computer Science',graduationYear:'2027',email:'aarav.shah@example.com',phone:'',github:'https://github.com/aaravshah'};
const defaultOpportunities=[
  {id:'intern-backend',title:'Backend Engineering Intern',company:'ByteBanyan Systems',type:'internship',description:'Work with a small product team to build and document API features. Interns pair with an engineer and contribute through reviewed changes.',skills:['Python','SQL','API design','Git & GitHub'],branches:['Computer Science','Information Technology'],graduationYear:'2027',qualification:'Currently pursuing a bachelor’s degree in computing.',experience:'0–1 years · Student projects welcome',location:'Pune · Hybrid',compensation:'₹20,000 / month',openings:2,deadline:'2026-12-15'},
  {id:'fullstack-associate',title:'Associate Software Engineer',company:'ByteBanyan Systems',type:'full-time',description:'Join the platform team to build backend services and clear, maintainable product interfaces.',skills:['Python','JavaScript','React','Git & GitHub'],branches:['Computer Science','Information Technology'],graduationYear:'2027',qualification:'Bachelor’s degree in Computer Science or a related field.',experience:'New graduates · 0–1 years',location:'Pune · On-site',compensation:'₹6–8 LPA',openings:3,deadline:'2027-01-10'},
  {id:'intern-product-ui',title:'Product UI Intern',company:'CanvasLoop Studio',type:'internship',description:'Help improve a collaboration product through accessible interface components and thoughtful user flows.',skills:['React','JavaScript','CSS','Team communication'],branches:['Computer Science','Information Technology','Design'],graduationYear:'2027',qualification:'Students graduating in 2027 with a portfolio or project work.',experience:'No prior employment required',location:'Remote · India',compensation:'₹15,000 / month',openings:1,deadline:'2026-11-30'}
];
const state = {skills:initialSkills.map(x=>({...x})), page:'overview', filter:'all', role:'Junior Software Engineer', selectedRole:'Junior Software Engineer', pendingResumeFile:null, parsedResume:null, authRole:'student', auth:null, profile:{...defaultProfile}, company:{...defaultCompany}, opportunities:defaultOpportunities.map(x=>({...x,skills:[...x.skills],branches:[...x.branches]})), applications:[], opportunityType:'all', selectedOpportunityId:null, selectedCandidateJob:'intern-backend'};
const $ = (selector,root=document)=>root.querySelector(selector);
const $$ = (selector,root=document)=>Array.from(root.querySelectorAll(selector));
const escapeHtml = value => String(value).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const symbol = skill => `<span class="skill-symbol ${escapeHtml(skill.className)}">${escapeHtml(skill.symbol)}</span>`;
const skillById = id => state.skills.find(skill=>skill.id===id) || state.skills[0] || {id:'no-evidence',name:'No evidence yet',symbol:'+',className:'git',level:'Not added',score:0,area:'Skill claim',source:'No source submitted',sourceType:'resume',description:'Add a reviewed resume claim or a project to begin building the Skill Passport.',evidence:'No evidence',range:'Not available',excerpt:'',levelText:'Not added',status:'gap'};

function renderOverview(){
  const welcome=$('#page-overview .welcome-row h1');if(welcome)welcome.innerHTML=`Good morning, ${escapeHtml(state.profile.name.split(' ')[0])} <span class="wave">✦</span>`;
  const previewName=$('.preview-name');if(previewName)previewName.textContent=state.profile.name;
  const previewRole=$('.preview-role');if(previewRole)previewRole.textContent=state.profile.headline;
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
  const profile=state.profile;
  $('.passport-person h2').textContent=profile.name;$('.passport-person>p').textContent=profile.headline;
  $('.passport-academic').textContent=`${profile.college} · ${profile.branch} · Class of ${profile.graduationYear}`;
  $('.passport-links span:first-child').textContent=`⌘ ${profile.github.replace(/^https?:\/\//,'')}`;$('.passport-links span:last-child').textContent=`✉ ${profile.email}`;
  $('.avatar-xl').textContent=profile.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase();
  $('#passport-skill-list').innerHTML=state.skills.filter(x=>x.sourceType!=='resume').slice(0,6).map(skill=>`<div class="passport-skill" data-skill="${skill.id}">${symbol(skill)}<span><strong>${escapeHtml(skill.name)}</strong><small>${escapeHtml(skill.source)} · ${escapeHtml(skill.range)}</small></span><span class="arrow">↗</span></div>`).join('');
  const resumeClaims=state.skills.filter(skill=>skill.sourceType==='resume');
  $('#passport-claims-wrap').hidden=resumeClaims.length===0;
  $('#passport-claims-list').innerHTML=resumeClaims.map(skill=>`<span class="passport-claim" title="${escapeHtml(skill.range)}">${escapeHtml(skill.name)}</span>`).join('');
  $('#project-cards').innerHTML=projects.map(p=>`<div class="project-card"><span class="project-card-icon">${p.symbol}</span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.kind)}<br>${escapeHtml(p.skills)}</small></div>`).join('');
}

function showPage(name){
  if(!$('#page-'+name))return;
  const recruiterPages=['company-dashboard','candidates','manage-jobs','company'];
  const studentPages=['overview','skills','roles','learning','opportunities','applications'];
  if(recruiterPages.includes(name)&&state.auth?.role!=='recruiter')return;
  if(studentPages.includes(name)&&state.auth?.role!=='student')return;
  state.page=name;
  $$('.page-view').forEach(page=>page.classList.toggle('active',page.id==='page-'+name));
  $$('.nav-link').forEach(link=>link.classList.toggle('active',link.dataset.page===name));
  const title={overview:'Overview',skills:'My skills',roles:'Role match',learning:'Learning plan',passport:'Public view','company-dashboard':'Company dashboard',candidates:'Candidate matching',opportunities:'Opportunities',applications:'Applications',company:'Company profile','manage-jobs':'Manage opportunities'}[name]||'Overview';
  $('#breadcrumb-page').textContent=title;
  $('#sidebar').classList.remove('open');
  if(name==='skills')renderSkills(); if(name==='roles')renderRole(); if(name==='learning')renderPlan(); if(name==='passport')renderPassport(); if(name==='company-dashboard')renderCompanyDashboard(); if(name==='candidates')renderCandidates(); if(name==='opportunities')renderOpportunities(); if(name==='applications')renderApplications(); if(name==='company')renderCompany(); if(name==='manage-jobs')renderManagedOpportunities();
  window.scrollTo({top:0,behavior:'smooth'});
}

const demoAccounts={student:{email:'student@proofolio.demo',password:'StudentDemo!23',name:'Aarav Shah'},recruiter:{email:'recruiter@proofolio.demo',password:'RecruiterDemo!23',name:'Maya Recruiter'}};
let authMode='landing';
function updateAuthRole(role){
  state.authRole = role;
  $$('.auth-role-tab').forEach(tab => {
    const active = tab.dataset.authRole === role;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  const registering = authMode === 'register';
  const titleEl = $('#auth-form-title');
  if (titleEl) {
    titleEl.textContent = registering
      ? `Create your ${role === 'student' ? 'student' : 'company'} account`
      : `Sign in as ${role === 'student' ? 'a student' : 'a company'}`;
  }

  const account = demoAccounts[role];
  $('#login-email').value = account.email;
  $('#login-password').value = account.password;
  $('#demo-login').innerHTML = `Continue as a ${role === 'student' ? 'student' : 'company'} <span>↗</span>`;
  $('#auth-credentials').innerHTML = `Demo ${role === 'student' ? 'student' : 'company'} · <strong>${account.email}</strong><br />Password · <strong>${account.password}</strong>`;
  $('#student-registration-fields').hidden = role !== 'student';
  $('#company-registration-fields').hidden = role !== 'recruiter';
  $('#login-error').hidden = true;
  $('#register-error').hidden = true;
}
function showAuthMode(mode){
  authMode=mode;
  $('#role-selection').hidden=mode!=='landing';
  $('#auth-panel').hidden=mode==='landing';
  if(mode==='landing')return;
  const registering=mode==='register';
  $('#login-form').hidden=registering;
  $('#register-form').hidden=!registering;
  $('#demo-area').hidden=registering;
  $('#auth-form-title').textContent=registering?`Create your ${state.authRole==='student'?'student':'company'} account`:`Sign in as ${state.authRole==='student'?'a student':'a company'}`;
  $('#auth-form-copy').textContent=registering?'Your local account is private to this Proofolio installation.':'Use your local account or explore the clearly labelled demo.';
  $('#toggle-auth-mode').textContent=registering?'Already have an account? Sign in':'New here? Create a local account';
  updateAuthRole(state.authRole);
}
function normaliseOpportunity(item){return {...item,id:String(item.id),type:item.type==='full_time'?'full-time':item.type,skills:Array.isArray(item.skills)?item.skills:[],branches:Array.isArray(item.branches)?item.branches:[],graduationYear:item.graduationYear?String(item.graduationYear):'',company:item.company||'Company',experience:item.experience||'Not specified',qualification:item.qualification||'See details',openings:Number(item.openings)||1};}
function passportSkillRecord(item){const visualByName={Python:['Py','py'],JavaScript:['JS','js'],TypeScript:['TS','js'],React:['R','re'],SQL:['DB','sql'],Git:['⌘','git'],HTML:['H','git'],CSS:['C','git']};const [symbolName,className]=visualByName[item.name]||['SK','git'];const linked=item.evidence_status==='evidence_linked'||item.evidence_status==='independently_verified';return {id:`db-skill-${item.id}`,name:item.name,symbol:symbolName,className,level:linked?'Evidence linked':'Claimed',score:linked?75:20,area:item.category||'Skill',source:item.citation||'Student passport',sourceType:linked?'github':'resume',description:item.description||'Student-reported skill claim.',evidence:item.citation||'No evidence linked',range:linked?'Project evidence':'Self-reported',excerpt:item.description||'',levelText:linked?'Evidence-linked':'Self-reported',status:linked?'supported':'gap'};}
async function hydratePassport(){
  try{const response=await fetch('/api/me/passport');if(!response.ok)return;const passport=await response.json();state.skills=passport.skills.map(passportSkillRecord);projects=passport.projects.map(project=>({name:project.title,kind:'Student project',symbol:'✳',skills:project.technologies.join(' · '),description:project.description,repositoryUrl:project.repository_url,deploymentUrl:project.deployment_url}));}catch(_error){}
}
async function hydrateWorkspaceData(user){
  if(user.demo)return;
  try{
    if(user.role==='student'){
      const [opportunities,applications]=await Promise.all([fetch('/api/opportunities'),fetch('/api/me/applications')]);
      if(opportunities.ok)state.opportunities=(await opportunities.json()).items.map(normaliseOpportunity);
      if(applications.ok)state.applications=(await applications.json()).items;
      await hydratePassport();
    }else{
      const opportunities=await fetch('/api/company/opportunities');
      if(opportunities.ok){state.opportunities=(await opportunities.json()).items.map(normaliseOpportunity);state.selectedCandidateJob=state.opportunities[0]?.id||null;}
    }
  }catch(_error){showToast('Could not refresh saved workspace data.');}
}
async function setAuthenticated(user){
  state.auth=user;document.body.classList.toggle('recruiter-mode',user.role==='recruiter');
  if(!user.demo){
    try{const response=await fetch('/api/me/profile');if(response.ok){const profile=await response.json();if(profile.role==='student')state.profile={...state.profile,name:profile.full_name,college:profile.college,branch:profile.branch,graduationYear:String(profile.graduation_year),email:profile.email,headline:`${profile.degree} student · ${profile.college}`};if(profile.role==='recruiter')state.company={...state.company,name:profile.name,industry:profile.industry,description:profile.description,website:profile.website,location:profile.location,contactName:profile.contact_name,officialEmail:profile.official_email};}}catch(_error){}
  }
  if(user.role==='recruiter'&&!user.demo){
    try{const profileResponse=await fetch('/api/me/profile');if(profileResponse.ok){const profile=await profileResponse.json();state.company.verificationStatus=profile.verification_status;}}catch(_error){}
  }
  await hydrateWorkspaceData(user);
  $('#auth-screen').hidden=true;$('.app-shell').hidden=false;
  $('.recruiter-nav').hidden=user.role!=='recruiter';
  const display=user.display_name||demoAccounts[user.role].name;
  $('.profile-name strong').textContent=display;$('.profile-name small').textContent=user.role==='recruiter'?(user.demo?'Recruiter demo':'Company workspace'):(user.demo?'Student demo':'Student workspace');
  const initials=display.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase();
  $('.avatar-small').textContent=initials;$('.top-avatar').textContent=initials;
  const candidateEyebrow=$('#page-candidates .eyebrow');if(candidateEyebrow)candidateEyebrow.innerHTML=`<span class="eyebrow-dot"></span> RECRUITER WORKSPACE${user.demo?' · DEMO DATA':''}`;
  renderOverview();renderPassport();renderCompany();showPage(user.role==='recruiter'?'company-dashboard':'overview');
}
function showLogin(){
  state.auth=null;document.body.classList.remove('recruiter-mode');$('.app-shell').hidden=true;$('#auth-screen').hidden=false;showAuthMode('landing');
}
async function authRequest(path,payload){
  const response=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not sign in. Try again.');return result;
}
async function patchRequest(path,payload){
  const response=await fetch(path,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not save changes.');return result;
}
async function signIn(demo){
  const error=$('#login-error');error.hidden=true;
  try{
    const user=await authRequest(demo?'/api/auth/demo':'/api/auth/login',demo?{role:state.authRole}:{role:state.authRole,email:$('#login-email').value.trim(),password:$('#login-password').value});
    await setAuthenticated(user);
  }catch(err){error.textContent=err instanceof TypeError?'Could not connect to Proofolio. Start it with `python server.py`.':err.message;error.hidden=false;}
}
async function registerAccount(){
  const error=$('#register-error');error.hidden=true;
  const common={role:state.authRole,email:$('#register-email').value.trim(),password:$('#register-password').value};
  const details=state.authRole==='student'?{full_name:$('#register-full-name').value.trim(),college:$('#register-college').value.trim(),degree:$('#register-degree').value.trim(),branch:$('#register-branch').value.trim(),current_year:$('#register-current-year').value.trim(),graduation_year:$('#register-graduation-year').value.trim()}:{recruiter_name:$('#register-recruiter-name').value.trim(),company_name:$('#register-company-name').value.trim(),industry:$('#register-industry').value.trim()};
  try{const user=await authRequest('/api/auth/register',{...common,...details});await setAuthenticated(user);}catch(err){error.textContent=err instanceof TypeError?'Could not connect to Proofolio. Start it with `python server.py`.':err.message;error.hidden=false;}
}
async function savePersistentStudentProfile(){
  const next={...state.profile,name:$('#profile-name-input').value.trim()||state.profile.name,headline:$('#profile-headline-input').value.trim(),college:$('#profile-college-input').value.trim(),branch:$('#profile-branch-input').value.trim(),graduationYear:$('#profile-year-input').value,phone:$('#profile-phone-input').value.trim(),github:$('#profile-github-input').value.trim()};
  try{await patchRequest('/api/me/profile',{full_name:next.name,college:next.college,branch:next.branch,graduation_year:next.graduationYear});state.profile=next;renderOverview();renderPassport();$('.profile-name strong').textContent=next.name;closeModal();showToast('Profile updated.');}catch(error){showToast(error.message||'Could not save profile changes.');}
}
async function savePersistentCompanyProfile(){
  const previousName=state.company.name;const updated={};for(const key of Object.keys(defaultCompany))updated[key]=$('#company-'+key).value.trim();
  try{await patchRequest('/api/me/profile',{name:updated.name,industry:updated.industry,description:updated.description,website:updated.website,location:updated.location,contact_name:updated.contactName,official_email:updated.officialEmail});state.company=updated;state.opportunities.forEach(job=>{if(job.company===previousName)job.company=updated.name;});renderCompany();renderManagedOpportunities();closeModal();showToast('Company profile updated.');}catch(error){showToast(error.message||'Could not save company changes.');}
}
async function signOut(){
  try{await fetch('/api/auth/logout',{method:'POST'});}catch(_error){}
  state.authRole='student';showLogin();
}
function persistDemoData(){
  try{localStorage.setItem('proofolio-demo-state',JSON.stringify({company:state.company,opportunities:state.opportunities,applications:state.applications,profile:state.profile}));}catch(_error){/* The prototype remains usable if browser storage is unavailable. */}
}
function restoreDemoData(){
  try{const saved=JSON.parse(localStorage.getItem('proofolio-demo-state')||'null');if(!saved)return;
    if(saved.company&&typeof saved.company==='object')state.company={...defaultCompany,...saved.company};
    if(Array.isArray(saved.opportunities)&&saved.opportunities.length)state.opportunities=saved.opportunities;
    if(Array.isArray(saved.applications))state.applications=saved.applications;
    if(saved.profile&&typeof saved.profile==='object')state.profile={...defaultProfile,...saved.profile};
  }catch(_error){/* Ignore malformed or unavailable browser storage and keep sample defaults. */}
}
function profileCandidate(){return {name:state.profile.name,initials:state.profile.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase(),headline:state.profile.headline,branch:state.profile.branch,graduationYear:state.profile.graduationYear};}
function matchForOpportunity(candidate,job){
  const eligible=(!job.branches?.length||job.branches.includes(candidate.branch))&&(!job.graduationYear||String(job.graduationYear)===String(candidate.graduationYear));
  const detail=job.skills.map(name=>{const found=state.skills.find(skill=>skill.name.toLowerCase()===name.toLowerCase()&&skill.sourceType!=='resume');return {name,skill:found,status:found?.status==='supported'?'supported':found?'partial':'gap'};});
  const points=detail.reduce((sum,item)=>sum+(item.status==='supported'?1:item.status==='partial'?0.5:0),0);
  return {eligible,score:Math.round(points/Math.max(detail.length,1)*100),detail,matched:detail.filter(x=>x.status==='supported'),partial:detail.filter(x=>x.status==='partial'),missing:detail.filter(x=>x.status==='gap')};
}
function statusClass(value){return String(value||'Submitted').toLowerCase().replace(/\s+/g,'-');}
function opportunityIsOpen(job){return !job.deadline||new Date(`${job.deadline}T23:59:59`)>=new Date();}
const applicationStages=['Submitted','Under Review','Shortlisted','Interview','Selected','Rejected'];
async function renderPersistentCandidates(){
  const job=state.opportunities.find(item=>item.id===state.selectedCandidateJob)||state.opportunities[0];
  const selector=$('#candidate-job-filter');
  if(selector)selector.innerHTML=state.opportunities.map(item=>`<option value="${escapeHtml(item.id)}" ${item.id===job?.id?'selected':''}>${escapeHtml(item.title)} · ${escapeHtml(item.company)}</option>`).join('');
  if(!job){$('#candidate-list').innerHTML='<div class="empty-state"><strong>No opportunities yet</strong>Publish an opportunity to review consented applicants.</div>';return;}
  try{
    const response=await fetch(`/api/company/opportunities/${encodeURIComponent(job.id)}/matches`);
    if(!response.ok)throw new Error('Could not load candidate matches.');
    const applications=(await response.json()).items;
    const query=($('#candidate-search')?.value||'').trim().toLowerCase();
    const filtered=applications.filter(item=>!query||`${item.name} ${item.branch} ${item.college}`.toLowerCase().includes(query));
    const options=['Submitted','Under Review','Shortlisted','Interview Scheduled','Selected','Rejected'];
    $('#candidate-list').innerHTML=filtered.length?filtered.map(item=>{const factors=item.factors.map(factor=>`<div class="match-requirement ${factor.status==='evidence_linked'?'supported':factor.status==='claimed'?'partial':'gap'}"><span class="match-status-icon">${factor.status==='evidence_linked'?'✓':factor.status==='claimed'?'◷':'+'}</span><span><strong>${escapeHtml(factor.skill)}</strong><small>${escapeHtml(factor.citation||'No submitted evidence')}</small></span><em>${factor.status==='evidence_linked'?'Evidence linked':factor.status==='claimed'?'Claimed':'Missing'}</em></div>`).join('');return `<article class="candidate-card match-candidate"><div class="candidate-card-top"><span class="avatar candidate-avatar">${escapeHtml(item.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase())}</span><div class="candidate-identity"><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.degree)} · ${escapeHtml(item.college)} · Class of ${escapeHtml(item.graduationYear)}</p></div><span class="candidate-score ${item.eligible?'':'ineligible'}"><strong>${item.eligible?`${item.score}%`:'Not eligible'}</strong><small>evidence match</small></span></div><div class="candidate-role-line"><span>Opportunity</span><strong>${escapeHtml(job.title)} · ${escapeHtml(job.company)}</strong></div><div class="eligibility-row ${item.eligible?'eligible':'ineligible'}"><span>${item.eligible?'✓':'!'}</span>${item.eligible?'Meets the branch and graduation-year requirements.':'Does not meet the listed branch or graduation-year requirements.'}</div><div class="match-breakdown"><div class="match-breakdown-head"><strong>Requirement evidence</strong><span>Resume-only claims do not add score.</span></div>${factors}</div><div class="candidate-card-foot"><span>${item.applicationId?`Application status · ${escapeHtml(item.applicationStatus)}`:'Potential match · contact details remain private'}</span><div class="candidate-actions">${item.applicationId?`<label class="status-select-label">Update status<select class="application-status-select" data-persistent-application-id="${escapeHtml(item.applicationId)}">${options.map(status=>`<option value="${escapeHtml(status)}" ${item.applicationStatus===status?'selected':''}>${escapeHtml(status)}</option>`).join('')}</select></label>`:'<span class="applied-badge">No application yet</span>'}</div></div></article>`;}).join(''):'<div class="empty-state"><strong>No candidate profiles yet</strong>Registered students with Skill Passport claims will appear here.</div>';
  }catch(error){$('#candidate-list').innerHTML=`<div class="empty-state"><strong>Could not load applicants</strong>${escapeHtml(error.message)}</div>`;}
}
function renderCandidates(){
  if(state.auth&&!state.auth.demo&&state.auth.role==='recruiter'){renderPersistentCandidates();return;}
  const query=($('#candidate-search')?.value||'').trim().toLowerCase();
  const job=state.opportunities.find(item=>item.id===state.selectedCandidateJob)||state.opportunities.find(item=>item.id===$('#candidate-job-filter')?.value)||state.opportunities[0];state.selectedCandidateJob=job?.id;
  const selector=$('#candidate-job-filter');if(selector&&job)selector.innerHTML=state.opportunities.map(item=>`<option value="${escapeHtml(item.id)}" ${item.id===job.id?'selected':''}>${escapeHtml(item.title)} · ${escapeHtml(item.company)}</option>`).join('');
  const candidate=profileCandidate();const needle=`${candidate.name} ${candidate.headline} ${candidate.branch} ${state.skills.map(x=>x.name).join(' ')}`.toLowerCase();
  if(!job){$('#candidate-list').innerHTML='<div class="empty-state"><strong>No active opportunities</strong>Post an opportunity to see candidate matches.</div>';return;}
  if(query&&!needle.includes(query)){$('#candidate-list').innerHTML='<div class="empty-state"><strong>No candidates match</strong>Change the search or selected opportunity.</div>';return;}
  const result=matchForOpportunity(candidate,job);const application=state.applications.find(item=>item.opportunityId===job.id);
  const evidenceList=result.detail.map(item=>`<div class="match-requirement ${item.status}"><span class="match-status-icon">${item.status==='supported'?'✓':item.status==='partial'?'◷':'+'}</span><span><strong>${escapeHtml(item.name)}</strong><small>${item.skill?`${escapeHtml(item.skill.source)} · ${escapeHtml(item.skill.range)}`:'No submitted project evidence found'}</small></span><em>${item.status==='supported'?'Supported':item.status==='partial'?'Partial':'Gap'}</em></div>`).join('');
  const options=applicationStages.map(stage=>`<option value="${stage}" ${application?.status===stage?'selected':''}>${stage}</option>`).join('');
  $('#candidate-list').innerHTML=`<article class="candidate-card match-candidate"><div class="candidate-card-top"><span class="avatar candidate-avatar">${escapeHtml(candidate.initials)}</span><div class="candidate-identity"><h2>${escapeHtml(candidate.name)}</h2><p>${escapeHtml(candidate.headline)} · Class of ${escapeHtml(candidate.graduationYear)}</p></div><span class="candidate-score ${result.eligible?'':'ineligible'}"><strong>${result.eligible?`${result.score}%`:'Not eligible'}</strong><small>${result.eligible?'evidence overlap':'eligibility rules'}</small></span></div><div class="candidate-role-line"><span>Opportunity</span><strong>${escapeHtml(job.title)} · ${escapeHtml(job.company)}</strong></div><div class="eligibility-row ${result.eligible?'eligible':'ineligible'}"><span>${result.eligible?'✓':'!'}</span>${result.eligible?`Meets the listed branch and graduation-year rules (${escapeHtml(candidate.branch)}, ${escapeHtml(candidate.graduationYear)}).`:`Does not meet this opportunity’s listed branch or graduation-year criteria.`}</div><div class="match-breakdown"><div class="match-breakdown-head"><strong>Requirement evidence</strong><span>${result.matched.length} supported · ${result.partial.length} partial · ${result.missing.length} gaps</span></div>${evidenceList}</div><div class="candidate-summary">${result.eligible?'Score is calculated from requirement coverage: supported work = full credit, partial work = half credit, resume-only mentions = no evidence credit.':'Eligibility is checked before the match score is used for review.'}</div><div class="candidate-card-foot"><span>${application?`Application status · ${escapeHtml(application.status)}`:'Synthetic student profile · demo data'}</span><div class="candidate-actions"><button class="button button-outline" data-page="passport">Review passport</button>${application?`<label class="status-select-label">Update status<select class="application-status-select" data-application-id="${escapeHtml(application.id)}">${options}</select></label>`:''}</div></div></article>`;
}
function opportunityMatch(job){return matchForOpportunity(profileCandidate(),job);}
function renderOpportunities(){
  const jobs=state.opportunities.filter(job=>state.opportunityType==='all'||job.type===state.opportunityType)
    .sort((a,b)=>{const left=opportunityMatch(a),right=opportunityMatch(b);return Number(right.eligible)-Number(left.eligible)||right.score-left.score;});
  $('#opportunity-list').innerHTML=jobs.length?jobs.map(job=>{
    const match=opportunityMatch(job),applied=state.applications.some(item=>item.opportunityId===job.id);
    const open=opportunityIsOpen(job);
    return `<article class="opportunity-card"><div class="opportunity-card-head"><span class="opportunity-icon">${job.type==='internship'?'✳':'↗'}</span><span class="opportunity-type">${job.type==='internship'?'INTERNSHIP':'FULL-TIME'}</span><span class="candidate-score ${match.eligible?'':'ineligible'}"><strong>${match.eligible?`${match.score}%`:'Not eligible'}</strong><small>${match.eligible?'evidence match':'eligibility'}</small></span></div><span class="opportunity-company">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</span><h2>${escapeHtml(job.title)}</h2><p>${escapeHtml(job.description)}</p><div class="opportunity-skills">${job.skills.map(skill=>`<span>${escapeHtml(skill)}</span>`).join('')}</div><div class="opportunity-meta"><span>◷ ${escapeHtml(job.compensation||'Compensation not listed')}</span><span>${escapeHtml(job.experience||'Experience not specified')}</span><span>Deadline · ${escapeHtml(job.deadline)}</span></div><div class="opportunity-match-reason">${!open?'Applications closed':!match.eligible?'Eligibility rules do not match your current profile.':`${match.matched.length} supported · ${match.partial.length} partial · ${match.missing.length} evidence gaps`}</div><div class="opportunity-actions"><button class="button button-outline" data-opportunity-details="${escapeHtml(job.id)}">View details</button>${applied?'<span class="applied-badge">✓ Applied</span>':`<button class="button button-primary" data-apply-opportunity="${escapeHtml(job.id)}" ${!match.eligible||!open?'disabled':''}>Apply now <span>→</span></button>`}</div></article>`;
  }).join(''):'<div class="empty-state"><strong>No opportunities in this list</strong>Try a different opportunity type.</div>';
}
function renderApplications(){
  $('#application-count').textContent=state.applications.length;
  $('#application-list').innerHTML=state.applications.length?state.applications.map(item=>{const job=state.opportunities.find(role=>role.id===item.opportunityId);return `<article class="application-card"><div><span class="opportunity-type">${job?.type==='internship'?'INTERNSHIP':'FULL-TIME'}</span><h2>${escapeHtml(item.title||job?.title||'Opportunity')}</h2><p>${escapeHtml(item.company||job?.company||'Company')} · Applied ${escapeHtml(item.appliedAt||'recently')}</p></div><span class="application-status ${statusClass(item.status)}">${escapeHtml(item.status)}</span><button class="button button-outline" data-opportunity-details="${escapeHtml(item.opportunityId)}">View role</button></article>`;}).join(''):'<div class="empty-state"><strong>No applications yet</strong>Explore an opportunity and apply when its requirements look right for you.</div>';
}
async function renderCompanyDashboard(){
  const company=state.company;const card=$('#company-setup-card');const stats=$('#company-stats-grid');if(!card||!stats)return;
  const verification=company.verificationStatus||'unverified';const ready=Boolean(company.name&&company.officialEmail&&company.industry&&company.location);
  card.innerHTML=`<div><strong>${escapeHtml(company.name||'Complete your company profile')}</strong><p>${ready?'Your profile has the core details needed to publish opportunities.':'Add your industry, location, and official contact details before publishing.'} Verification status: ${escapeHtml(verification.replace(/_/g,' '))}.</p></div><span class="company-setup-status ${ready?'ready':''}">${ready?'Profile ready':'Profile incomplete'}</span>`;
  let applications=state.applications.length;let shortlisted=state.applications.filter(item=>item.status==='Shortlisted').length;let matches=state.opportunities.length;
  if(!state.auth?.demo){try{const result=await Promise.all(state.opportunities.map(job=>fetch(`/api/company/opportunities/${encodeURIComponent(job.id)}/matches`).then(response=>response.ok?response.json():{items:[]})));applications=result.reduce((sum,item)=>sum+item.items.filter(candidate=>candidate.applicationId).length,0);shortlisted=result.reduce((sum,item)=>sum+item.items.filter(candidate=>candidate.applicationStatus==='Shortlisted').length,0);matches=result.reduce((sum,item)=>sum+item.items.filter(candidate=>candidate.eligible).length,0);}catch(_error){}}
  const active=state.opportunities.filter(job=>opportunityIsOpen(job)).length;
  stats.innerHTML=[['Active opportunities',active],['Potential matches',matches],['Applications',applications],['Shortlisted',shortlisted]].map(([label,value])=>`<article class="company-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></article>`).join('');
}
function renderCompany(){const company=state.company;const status=(company.verificationStatus||'demo only').replace(/_/g,' ');$('#company-profile-card').innerHTML=`<div class="company-mark">${escapeHtml(company.name.slice(0,1).toUpperCase())}</div><div class="company-profile-content"><span class="verified-badge">COMPANY · ${escapeHtml(status).toUpperCase()}</span><h2>${escapeHtml(company.name)}</h2><p>${escapeHtml(company.industry)} · ${escapeHtml(company.location)}</p><p class="company-description">${escapeHtml(company.description)}</p><div class="company-profile-details"><span>⌕ ${escapeHtml(company.website)}</span><span>✉ ${escapeHtml(company.officialEmail)}</span><span>Contact · ${escapeHtml(company.contactName)}</span></div></div>`;}
async function renderManagedOpportunities(){
  const target=$('#managed-opportunity-list');if(!target)return;
  let applicationCounts={};
  if(!state.auth?.demo&&state.auth?.role==='recruiter'){try{const results=await Promise.all(state.opportunities.map(job=>fetch(`/api/company/opportunities/${encodeURIComponent(job.id)}/matches`).then(response=>response.ok?response.json():{items:[]})));state.opportunities.forEach((job,index)=>{applicationCounts[job.id]=results[index].items.filter(item=>item.applicationId).length;});}catch(_error){}}
  target.innerHTML=state.opportunities.length?state.opportunities.map(job=>{const apps=state.auth?.demo?state.applications.filter(item=>item.opportunityId===job.id):Array(applicationCounts[job.id]||0);return `<article class="managed-opportunity-card"><div><span class="opportunity-type">${job.type==='internship'?'INTERNSHIP':'FULL-TIME'} · ${job.openings} OPENING${job.openings===1?'':'S'}</span><h2>${escapeHtml(job.title)}</h2><p>${escapeHtml(job.company)} · ${escapeHtml(job.location)} · ${escapeHtml(job.experience||'Experience not specified')} · Closes ${escapeHtml(job.deadline)}</p></div><div class="managed-opportunity-count"><strong>${apps.length}</strong><span>applications</span></div><div class="managed-opportunity-actions"><button class="button button-outline" data-manage-job="${escapeHtml(job.id)}">Review matches</button><button class="button button-outline" data-opportunity-details="${escapeHtml(job.id)}">Preview</button></div></article>`;}).join(''):'<div class="empty-state"><strong>No opportunities posted</strong>Post an internship or full-time opportunity to begin matching candidates.</div>';
}
function openOpportunityDetails(id){
  const job=state.opportunities.find(item=>item.id===id);if(!job)return;
  state.selectedOpportunityId=id;
  const match=opportunityMatch(job),applied=state.applications.some(item=>item.opportunityId===id),open=opportunityIsOpen(job);
  const skillReasons=match.detail.map(item=>`<div class="match-requirement ${item.status}"><span class="match-status-icon">${item.status==='supported'?'✓':item.status==='partial'?'◷':'+'}</span><span><strong>${escapeHtml(item.name)}</strong><small>${item.skill?`${escapeHtml(item.skill.source)} · ${escapeHtml(item.skill.range)}`:'No project evidence in the current sample'}</small></span><em>${item.status==='supported'?'Supported':item.status==='partial'?'Partial':'Gap'}</em></div>`).join('');
  const company=job.company===state.company.name
    ? `<p>${escapeHtml(state.company.industry)} · ${escapeHtml(state.company.location)} · ${escapeHtml(state.company.website)}</p><p>${escapeHtml(state.company.description)}</p>`
    : '<p>Company details are not available for this other sample listing.</p>';
  openModal(escapeHtml(job.title),`${escapeHtml(job.company)} · ${job.type==='internship'?'Internship':'Full-time placement'}`,`<div class="opportunity-detail-body"><p class="opportunity-detail-description">${escapeHtml(job.description)}</p><div class="opportunity-detail-section company-detail"><h3>Company details</h3>${company}</div><div class="opportunity-detail-facts"><div><span>Location</span><strong>${escapeHtml(job.location)}</strong></div><div><span>Compensation</span><strong>${escapeHtml(job.compensation||'Not listed')}</strong></div><div><span>Experience</span><strong>${escapeHtml(job.experience||'Not specified')}</strong></div><div><span>Deadline</span><strong>${escapeHtml(job.deadline)}${open?'':' · Closed'}</strong></div><div><span>Openings</span><strong>${escapeHtml(job.openings)}</strong></div><div><span>Eligible branches</span><strong>${escapeHtml(job.branches.join(', '))}</strong></div><div><span>Graduation year</span><strong>${escapeHtml(job.graduationYear||'Not specified')}</strong></div></div><div class="opportunity-detail-section"><h3>Qualifications</h3><p>${escapeHtml(job.qualification)}</p></div><div class="opportunity-detail-section"><h3>Required skills</h3><div class="opportunity-skills">${job.skills.map(skill=>`<span>${escapeHtml(skill)}</span>`).join('')}</div></div><div class="opportunity-detail-section"><h3>Your match · ${match.eligible?`${match.score}%`:'Not eligible'}</h3><p>${match.eligible?`${match.matched.length} supported, ${match.partial.length} partial, ${match.missing.length} gaps. Resume-only mentions do not count as work evidence.`:'Your current branch or graduation year does not meet the listed eligibility rules.'}</p><div class="match-breakdown">${skillReasons}</div></div><div class="parsed-disclaimer">Sample opportunity for demonstration only. Match score is deterministic guidance; it is not an AI hiring decision.</div></div>`,`<div class="modal-actions"><button class="button button-outline" data-close>Close</button>${applied?'<span class="applied-badge">✓ Application submitted</span>':`<button class="button button-primary" data-confirm-apply="${escapeHtml(job.id)}" ${!match.eligible||!open?'disabled':''}>Apply now</button>`}</div>`);
}
async function submitApplication(id){
  const job=state.opportunities.find(item=>item.id===id);if(!job||state.applications.some(item=>item.opportunityId===id))return;
  const match=opportunityMatch(job);if(!opportunityIsOpen(job)){showToast('The application deadline has passed.');return;}if(!match.eligible){showToast('Your profile does not meet the listed eligibility rules.');return;}
  if(!state.auth?.demo){try{await authRequest(`/api/opportunities/${encodeURIComponent(id)}/applications`,{consent:true});await hydrateWorkspaceData(state.auth);closeModal();renderApplications();renderOpportunities();showToast('Application submitted.');return;}catch(error){showToast(error.message||'Could not submit the application.');return;}}
  const today=new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric'}).format(new Date());
  state.applications.push({id:`application-${Date.now()}`,opportunityId:id,title:job.title,company:job.company,status:'Submitted',appliedAt:today,candidate:{...profileCandidate(),email:state.profile.email,phone:state.profile.phone,college:state.profile.college}});persistDemoData();closeModal();renderApplications();renderOpportunities();renderManagedOpportunities();renderCandidates();showToast('Application submitted in this local demo.');
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
  const fileDetails=result.page_count?`${result.file_type} · ${result.page_count} page${result.page_count===1?'':'s'}`:`${result.file_type} · text-line references`;
  const contactCards=`<div class="resume-contact-edit"><label class="form-label" for="resume-contact-name">Name · edit if needed</label><input class="form-input" id="resume-contact-name" value="${escapeHtml(contact.name||state.profile.name)}" /><label class="form-label" for="resume-contact-email">Email · edit if needed</label><input class="form-input" id="resume-contact-email" type="email" value="${escapeHtml(contact.email||state.profile.email)}" /><label class="form-label" for="resume-contact-phone">Phone · edit if needed</label><input class="form-input" id="resume-contact-phone" type="tel" value="${escapeHtml(contact.phone||'')}" /><small>Extracted text can be wrong. Confirm these details before saving.</small></div>`;
  const skillCards=result.skills.length?result.skills.map((skill,index)=>{const location=skill.page?`Page ${skill.page} · line ${skill.line}`:`Text line ${skill.line}`;return `<article class="parsed-skill"><div class="parsed-skill-top"><label class="parsed-skill-choice"><input type="checkbox" class="resume-skill-check" data-skill-index="${index}" checked /><strong>${escapeHtml(skill.name)}</strong></label><span class="parsed-skill-source">Resume mention</span></div><p>${escapeHtml(skill.excerpt)}</p><span class="parsed-citation">${location}</span></article>`;}).join(''):`<div class="parsed-empty">No supported skill terms were found. You can still review the detected resume sections below.</div>`;
  const sections=result.sections.length?result.sections.map(section=>`<article class="parsed-section-card"><header><strong>${escapeHtml(section.name)}</strong><span>${section.page?`Page ${section.page}`:`Line ${section.line}`}</span></header><p>${escapeHtml(section.excerpt||'Section heading found; no following text was available.')}</p></article>`).join(''):`<div class="parsed-empty">No standard section headings detected. Review the text and skill mentions manually.</div>`;
  openModal('Resume review',`${escapeHtml(result.file_name)} · ${fileDetails}`,`<div class="parse-result"><div class="parse-summary"><div class="parse-summary-card"><span>Skill terms</span><strong>${result.skills.length} found</strong></div><div class="parse-summary-card"><span>Text extracted</span><strong>${result.character_count.toLocaleString()} characters</strong></div></div><div class="parse-section-title">Contact details <small>Correct before saving</small></div>${contactCards}<div class="parse-section-title">Skill mentions <small>Uncheck any incorrect match</small></div><div class="parsed-skill-list">${skillCards}</div><div class="parse-section-title">Sections detected <small>Headings, not quality ratings</small></div><div class="parsed-sections">${sections}</div><div class="parsed-disclaimer">Resume terms stay self-reported and separate from project evidence. Resume contents are not stored by the parser.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Discard</button><button class="button button-primary" id="add-resume-claims-button">Save reviewed details</button></div>');
}

async function addResumeClaims(){
  const parsed=state.parsedResume;
  if(!parsed)return;
  state.profile.name=$('#resume-contact-name').value.trim()||state.profile.name;
  state.profile.email=$('#resume-contact-email').value.trim()||state.profile.email;
  state.profile.phone=$('#resume-contact-phone').value.trim()||state.profile.phone||'';
  $('.profile-name strong').textContent=state.profile.name;const profileInitials=state.profile.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase();$('.avatar-small').textContent=profileInitials;$('.top-avatar').textContent=profileInitials;
  parsed.skills=parsed.skills.filter((_skill,index)=>$(`.resume-skill-check[data-skill-index="${index}"]`)?.checked);
  if(!state.auth?.demo&&parsed.skills.length){
    try{await Promise.all(parsed.skills.map(mention=>authRequest('/api/me/skills',{name:mention.name,category:'Resume mention',source:'resume',evidence_status:'self_reported',description:'This term was reviewed from the submitted resume.',citation:mention.page?`Resume page ${mention.page}, line ${mention.line}`:`Resume line ${mention.line}`})));await hydratePassport();}catch(error){showToast(error.message||'Could not save the reviewed skill claims.');return;}
  }
  persistDemoData();
  if(parsed.skills.length===0){
    renderOverview();renderPassport();
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

function openProjectComposer(){
  openModal('Add project evidence','Projects can support skills, but are not independently verified by adding a link.',`<form class="modal-body" id="project-form"><label class="form-label" for="project-title">Project title</label><input class="form-input" id="project-title" required maxlength="160" /><label class="form-label" for="project-description">What did you build?</label><textarea class="form-input form-textarea" id="project-description" required maxlength="2000"></textarea><label class="form-label" for="project-technologies">Technologies <small>comma-separated</small></label><input class="form-input" id="project-technologies" required placeholder="Python, SQL, React" /><label class="form-label" for="project-repository">Repository URL <small>optional</small></label><input class="form-input" id="project-repository" type="url" placeholder="https://github.com/..." /><label class="form-label" for="project-deployment">Live deployment URL <small>optional</small></label><input class="form-input" id="project-deployment" type="url" placeholder="https://..." /><label class="form-label" for="project-outcomes">Outcomes <small>optional</small></label><input class="form-input" id="project-outcomes" maxlength="1000" /><p class="form-help">Skills linked to this project are marked evidence-linked. They are not independently verified.</p><button type="submit" hidden></button></form>`,`<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-project-button">Save project</button></div>`);
}
async function saveProject(){
  const form=$('#project-form');if(!form?.reportValidity())return;
  const value=id=>$('#'+id).value.trim();
  const payload={title:value('project-title'),description:value('project-description'),technologies:value('project-technologies').split(',').map(item=>item.trim()).filter(Boolean),repository_url:value('project-repository'),deployment_url:value('project-deployment'),outcomes:value('project-outcomes')};
  if(!state.auth?.demo){try{await authRequest('/api/me/projects',payload);await hydratePassport();renderOverview();renderSkills();renderRole();renderPassport();closeModal();showToast('Project evidence added.');}catch(error){showToast(error.message||'Could not save the project.');}return;}
  projects.unshift({name:payload.title,kind:'Student project',symbol:'✳',skills:payload.technologies.join(' · ')});payload.technologies.forEach(name=>{if(!state.skills.some(skill=>skill.name.toLowerCase()===name.toLowerCase()))state.skills.push(passportSkillRecord({id:`demo-${name}`,name,category:'Project technology',source:'project',evidence_status:'evidence_linked',description:`Linked to project: ${payload.title}`,citation:payload.title}));});renderOverview();renderPassport();closeModal();showToast('Demo project evidence added.');
}

function openRolePicker(){
  const choices=['Junior Software Engineer','Frontend Developer','Data Analyst'];
  openModal('Choose a target role','We’ll compare your evidence against the role requirements.',`<div class="modal-body">${choices.map((role,index)=>`<label class="role-choice ${role===state.role?'selected':''}"><span class="role-choice-icon">${index===0?'⌘':index===1?'✳':'▤'}</span><span><strong>${role}</strong><small>${index===0?'Build and maintain software systems':index===1?'Create accessible, responsive interfaces':'Turn data into useful insights'}</small></span><input type="radio" name="role" value="${role}" ${role===state.role?'checked':''}></label>`).join('')}</div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-role-button">Use this role</button></div>');
}

function openEditProfile(){
  const p=state.profile;
  openModal('Your profile details','Update the sample profile shared with recruiters.',`<div class="modal-body"><label class="form-label" for="profile-name-input">Name</label><input class="form-input" id="profile-name-input" value="${escapeHtml(p.name)}" /><label class="form-label" for="profile-headline-input">Headline and location</label><input class="form-input" id="profile-headline-input" value="${escapeHtml(p.headline)}" /><label class="form-label" for="profile-college-input">College / university</label><input class="form-input" id="profile-college-input" value="${escapeHtml(p.college)}" /><label class="form-label" for="profile-branch-input">Course / branch</label><input class="form-input" id="profile-branch-input" value="${escapeHtml(p.branch)}" /><label class="form-label" for="profile-year-input">Graduation year</label><input class="form-input" id="profile-year-input" type="number" min="2020" max="2040" value="${escapeHtml(p.graduationYear)}" /><label class="form-label" for="profile-email-input">Email</label><input class="form-input" id="profile-email-input" type="email" value="${escapeHtml(p.email)}" /><label class="form-label" for="profile-phone-input">Phone</label><input class="form-input" id="profile-phone-input" type="tel" value="${escapeHtml(p.phone||'')}" /><label class="form-label" for="profile-github-input">GitHub profile</label><input class="form-input" id="profile-github-input" value="${escapeHtml(p.github)}" /><div class="modal-tip">Sample profile fields are saved in this browser for the demo. They are not sent to an employer unless you apply.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-profile-button">Save changes</button></div>');
}

function openCompanyEditor(){
  const c=state.company;const fields=[['name','Company name'],['industry','Industry'],['description','Company description'],['website','Official website'],['location','Location'],['contactName','Contact person'],['officialEmail','Official email']];
  const controls=fields.map(([key,label])=>`<label class="form-label" for="company-${key}">${label}</label>${key==='description'?`<textarea class="form-input form-textarea" id="company-${key}" rows="3">${escapeHtml(c[key])}</textarea>`:`<input class="form-input" id="company-${key}" ${key==='officialEmail'?'type="email"':''} value="${escapeHtml(c[key])}" />`}`).join('');
  openModal('Company profile','These sample details appear with your demo opportunities.',`<div class="modal-body">${controls}<div class="modal-tip">Company identity and email are not verified in this prototype.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-company-button">Save profile</button></div>');
}
function openOpportunityComposer(){
  openModal('Post an opportunity','Create a sample listing with requirements students can review.',`<form class="modal-body" id="opportunity-form"><label class="form-label" for="job-title">Opportunity title</label><input class="form-input" id="job-title" required maxlength="90" placeholder="e.g. Software Engineering Intern" /><div class="form-two-col"><div><label class="form-label" for="job-type">Type</label><select class="form-input" id="job-type"><option value="internship">Internship</option><option value="full-time">Full-time placement</option></select></div><div><label class="form-label" for="job-openings">Openings</label><input class="form-input" id="job-openings" type="number" min="1" max="100" value="1" required /></div></div><label class="form-label" for="job-description">Description</label><textarea class="form-input form-textarea" id="job-description" rows="3" required maxlength="700"></textarea><label class="form-label" for="job-skills">Required skills <small>comma-separated</small></label><input class="form-input" id="job-skills" required placeholder="Python, SQL, React" /><div class="form-two-col"><div><label class="form-label" for="job-branches">Eligible branches <small>comma-separated</small></label><input class="form-input" id="job-branches" value="Computer Science, Information Technology" required /></div><div><label class="form-label" for="job-year">Graduation year</label><input class="form-input" id="job-year" type="number" min="2020" max="2040" value="2027" required /></div></div><label class="form-label" for="job-qualification">Qualification criteria</label><input class="form-input" id="job-qualification" required placeholder="Degree / academic criteria" /><label class="form-label" for="job-experience">Experience criteria</label><input class="form-input" id="job-experience" required placeholder="e.g. 0–1 years; student projects welcome" /><div class="form-two-col"><div><label class="form-label" for="job-location">Location / remote</label><input class="form-input" id="job-location" required placeholder="Pune · Hybrid" /></div><div><label class="form-label" for="job-compensation">Stipend / salary</label><input class="form-input" id="job-compensation" placeholder="Optional" /></div></div><label class="form-label" for="job-deadline">Application deadline</label><input class="form-input" id="job-deadline" type="date" required /><p class="form-help">This listing is local demo data. Posting does not publish a real vacancy.</p><button type="submit" hidden></button></form>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-opportunity-button">Publish demo opportunity</button></div>');
}
function confirmApplication(id){
  const job=state.opportunities.find(item=>item.id===id);if(!job)return;
  openModal('Confirm your application',`Apply to ${escapeHtml(job.title)} at ${escapeHtml(job.company)}?`,'<div class="modal-body"><p class="opportunity-detail-description">Your application in this local demo includes your name, contact email, education summary, skill passport and cited work evidence. Your uploaded resume file is not attached or stored.</p><div class="privacy-consent"><span>◈</span><p>This shares the sample profile with the sample company workspace in this browser, so you can view the recruiter flow. Track status changes from Applications.</p></div><label class="consent-check"><input id="application-consent" type="checkbox" /> I understand this is a sample application and consent to share the profile details above.</label></div>','<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="final-submit-application" data-opportunity-id="'+escapeHtml(id)+'" disabled>Submit application</button></div>');
}
async function createOpportunityFromForm(){
  const form=$('#opportunity-form');if(!form?.reportValidity())return;
  const value=id=>$('#'+id).value.trim();const name=value('job-title');
  const job={id:`custom-${Date.now()}`,title:name,company:state.company.name,type:value('job-type'),description:value('job-description'),skills:value('job-skills').split(',').map(x=>x.trim()).filter(Boolean),branches:value('job-branches').split(',').map(x=>x.trim()).filter(Boolean),graduationYear:value('job-year'),qualification:value('job-qualification'),experience:value('job-experience'),location:value('job-location'),compensation:value('job-compensation')||'Not listed',openings:Number(value('job-openings')),deadline:value('job-deadline')};
  if(!state.auth?.demo){
    try{await authRequest('/api/opportunities',{title:job.title,opportunity_type:job.type==='full-time'?'full_time':job.type,description:job.description,required_skills:job.skills,eligible_branches:job.branches,graduation_year:Number(job.graduationYear),location:job.location,work_mode:job.location.toLowerCase().includes('remote')?'remote':'on_site',compensation:job.compensation,application_deadline:job.deadline,status:'published'});await hydrateWorkspaceData(state.auth);closeModal();renderManagedOpportunities();renderCandidates();renderOpportunities();showToast('Opportunity published.');return;}catch(error){showToast(error.message||'Could not publish the opportunity.');return;}
  }
  state.opportunities.unshift(job);state.selectedCandidateJob=job.id;const selector=$('#candidate-job-filter');if(selector)selector.value=job.id;persistDemoData();closeModal();renderManagedOpportunities();renderCandidates();renderOpportunities();showToast('Demo opportunity published.');
}

document.addEventListener('click',event=>{
  const startStudent = event.target.closest('#start-student');
  if (startStudent) {
    state.authRole = 'student';
    showAuthMode('login');
    return;
  }

  const startRecruiter = event.target.closest('#start-recruiter');
  if (startRecruiter) {
    state.authRole = 'recruiter';
    showAuthMode('login');
    return;
  }
  if(event.target.id==='back-to-roles'){showAuthMode('landing');return;}
  if(event.target.id==='toggle-auth-mode'){showAuthMode(authMode==='register'?'login':'register');return;}
  const authTab=event.target.closest('[data-auth-role]');if(authTab){updateAuthRole(authTab.dataset.authRole);return;}
  if(event.target.id==='demo-login'){signIn(true);return;}
  if(event.target.id==='signout-button'){signOut();return;}
  const pageLink=event.target.closest('[data-page]'); if(pageLink){showPage(pageLink.dataset.page);closeModal();return;}
  const nav=event.target.closest('.nav-link'); if(nav){showPage(nav.dataset.page);return;}
  const jobPreview=event.target.closest('[data-opportunity-details]');if(jobPreview){openOpportunityDetails(jobPreview.dataset.opportunityDetails);return;}
  const applyJob=event.target.closest('[data-apply-opportunity]');if(applyJob){openOpportunityDetails(applyJob.dataset.applyOpportunity);return;}
  const confirmApply=event.target.closest('[data-confirm-apply]');if(confirmApply){confirmApplication(confirmApply.dataset.confirmApply);return;}
  if(event.target.id==='final-submit-application'){submitApplication(event.target.dataset.opportunityId);return;}
  const matchJob=event.target.closest('[data-manage-job]');if(matchJob){state.selectedCandidateJob=matchJob.dataset.manageJob;const selector=$('#candidate-job-filter');if(selector)selector.value=state.selectedCandidateJob;showPage('candidates');return;}
  const opportunityTab=event.target.closest('[data-opportunity-type]');if(opportunityTab){state.opportunityType=opportunityTab.dataset.opportunityType;$$('[data-opportunity-type]').forEach(tab=>tab.classList.toggle('active',tab===opportunityTab));renderOpportunities();return;}
  const skillTarget=event.target.closest('[data-skill]'); if(skillTarget){event.preventDefault();showEvidence(skillById(skillTarget.dataset.skill));return;}
  const close=event.target.closest('[data-close]'); if(close){closeModal();return;}
  if(event.target.id==='modal-backdrop'){closeModal();return;}
  const filter=event.target.closest('[data-filter]');if(filter){state.filter=filter.dataset.filter;$$('.filter-pill').forEach(x=>x.classList.toggle('active',x===filter));renderSkills();return;}
  if(event.target.id==='add-work-button'||event.target.id==='skills-add-work'){openAddWork();return;}
  if(event.target.id==='add-project-button'){openProjectComposer();return;}
  if(event.target.id==='save-project-button'){saveProject();return;}
  if(event.target.id==='edit-role-button'){openRolePicker();return;}
  if(event.target.id==='edit-profile-button'){openEditProfile();return;}
  if(event.target.id==='company-edit-button'){openCompanyEditor();return;}
  if(event.target.id==='post-opportunity-button'){openOpportunityComposer();return;}
  if(event.target.id==='dashboard-post-opportunity'){openOpportunityComposer();return;}
  if(event.target.id==='save-opportunity-button'){createOpportunityFromForm();return;}
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
    if(!state.auth?.demo){savePersistentStudentProfile();return;}
    state.profile={...state.profile,name:$('#profile-name-input').value.trim()||defaultProfile.name,headline:$('#profile-headline-input').value.trim(),college:$('#profile-college-input').value.trim(),branch:$('#profile-branch-input').value.trim(),graduationYear:$('#profile-year-input').value,email:$('#profile-email-input').value.trim(),phone:$('#profile-phone-input').value.trim(),github:$('#profile-github-input').value.trim()};
    persistDemoData();renderOverview();renderPassport();$('.profile-name strong').textContent=state.profile.name;const initials=state.profile.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase();$('.avatar-small').textContent=initials;$('.top-avatar').textContent=initials;closeModal();showToast('Sample profile updated.');return;
  }
  if(event.target.id==='save-company-button'){
    if(!state.auth?.demo){savePersistentCompanyProfile();return;}
    const previousName=state.company.name;
    const updated={};for(const key of Object.keys(defaultCompany))updated[key]=$('#company-'+key).value.trim();
    if(!updated.name||!updated.officialEmail){showToast('Add a company name and contact email first.');return;}
    state.company=updated;
    state.opportunities.forEach(job=>{if(job.company===previousName||job.company===defaultCompany.name)job.company=state.company.name;});
    persistDemoData();renderCompany();renderManagedOpportunities();renderOpportunities();closeModal();showToast('Company demo profile updated.');return;
  }
});

document.addEventListener('submit',event=>{if(event.target.id==='login-form'){event.preventDefault();signIn(false);}if(event.target.id==='register-form'){event.preventDefault();registerAccount();}if(event.target.id==='opportunity-form'){event.preventDefault();createOpportunityFromForm();}if(event.target.id==='project-form'){event.preventDefault();saveProject();}});
document.addEventListener('input',event=>{if(event.target.id==='skill-search')renderSkills();if(event.target.id==='candidate-search')renderCandidates();});
document.addEventListener('change',event=>{
  if(event.target.id==='candidate-job-filter'){state.selectedCandidateJob=event.target.value;renderCandidates();}
  if(event.target.id==='application-consent')$('#final-submit-application').disabled=!event.target.checked;
  if(event.target.matches('.application-status-select')){
    if(event.target.dataset.persistentApplicationId){
      authRequest(`/api/company/applications/${encodeURIComponent(event.target.dataset.persistentApplicationId)}/status`,{status:event.target.value}).then(()=>{renderPersistentCandidates();showToast('Application status updated.');}).catch(error=>{showToast(error.message||'Could not update the status.');renderPersistentCandidates();});
      return;
    }
    const application=state.applications.find(item=>item.id===event.target.dataset.applicationId);if(application){application.status=event.target.value;persistDemoData();renderCandidates();renderApplications();showToast('Application status updated.');}
  }
});
document.addEventListener('change',event=>{if(event.target.id==='resume-file')setResumeFile(event.target.files?.[0]);});
document.addEventListener('dragover',event=>{if(event.target.closest('#resume-drop-zone')){event.preventDefault();$('#resume-drop-zone').classList.add('dragging');}});
document.addEventListener('dragleave',event=>{if(event.target.closest('#resume-drop-zone'))$('#resume-drop-zone').classList.remove('dragging');});
document.addEventListener('drop',event=>{const zone=event.target.closest('#resume-drop-zone');if(!zone)return;event.preventDefault();zone.classList.remove('dragging');setResumeFile(event.dataTransfer?.files?.[0]);});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();});

restoreDemoData();renderOverview();renderSkills();renderRole();renderPlan();renderCandidates();renderOpportunities();renderApplications();renderCompany();renderManagedOpportunities();
updateAuthRole('student');
(async()=>{try{const response=await fetch('/api/auth/session');if(!response.ok)throw new Error('No active session');await setAuthenticated(await response.json());}catch(_error){showLogin();}})();

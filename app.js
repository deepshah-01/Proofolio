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
    {skill:'Team collaboration',status:'partial',why:'Team project listed; add review evidence',sid:'communication'}
  ],
  'Frontend Developer': [
    {skill:'React',status:'supported',why:'Reusable page components and state',sid:'react'},
    {skill:'JavaScript',status:'supported',why:'Interactive event form with validation',sid:'javascript'},
    {skill:'Responsive UI',status:'partial',why:'Project includes UI pages; add responsive examples',sid:'react'},
    {skill:'API integration',status:'partial',why:'Event API list and create calls',sid:'api'},
    {skill:'Accessibility',status:'gap',why:'No accessibility checks found in submitted work',sid:'testing'},
    {skill:'CSS',status:'partial',why:'UI implementation present; limited style evidence',sid:'react'},
    {skill:'Version control',status:'supported',why:'Project workflow documented in README',sid:'git'},
    {skill:'Team collaboration',status:'partial',why:'Team project listed; add review evidence',sid:'communication'}
  ],
  'Data Analyst': [
    {skill:'SQL',status:'partial',why:'Relational queries and ORM relationships',sid:'sql'},
    {skill:'Python',status:'supported',why:'Data retrieval and service logic',sid:'python'},
    {skill:'Data visualization',status:'gap',why:'No chart or reporting examples found',sid:'api'},
    {skill:'Data cleaning',status:'gap',why:'No reproducible data preparation evidence',sid:'python'},
    {skill:'Communication',status:'partial',why:'Team contribution listed; add a project write-up',sid:'communication'},
    {skill:'Git',status:'supported',why:'Project workflow documented in README',sid:'git'}
  ]
};

const learningTasks = [
  {title:'Add tests to your recipe API',sub:'Write 3 endpoint tests with pytest and cover a not-found case.',duration:'75 min',type:'PROJECT TASK',done:false},
  {title:'Model a many-to-many relationship',sub:'Add tags to recipes and query them with a join table.',duration:'60 min',type:'HANDS-ON',done:false},
  {title:'Make a small contribution',sub:'Open a pull request with a clear description and testing note.',duration:'90 min',type:'REAL-WORLD',done:true},
  {title:'Document one design choice',sub:'Explain why your API returns a 404 for a missing recipe.',duration:'45 min',type:'REFLECTION',done:false}
];

const state = {skills:initialSkills.map(x=>({...x})), page:'overview', filter:'all', role:'Junior Software Engineer', selectedRole:'Junior Software Engineer', scanTimer:null};
const $ = (selector,root=document)=>root.querySelector(selector);
const $$ = (selector,root=document)=>Array.from(root.querySelectorAll(selector));
const escapeHtml = value => String(value).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const symbol = skill => `<span class="skill-symbol ${escapeHtml(skill.className)}">${escapeHtml(skill.symbol)}</span>`;
const skillById = id => state.skills.find(skill=>skill.id===id) || state.skills[0];

function renderOverview(){
  $('#nav-skill-count').textContent=state.skills.length;
  $('#stat-skill-count').textContent=String(state.skills.length).padStart(2,'0');
  $('#all-skill-count').textContent=state.skills.length;
  $('#overview-skill-list').innerHTML=state.skills.slice(0,5).map(skill=>`<div class="skill-row" data-skill="${skill.id}">${symbol(skill)}<span class="skill-row-copy"><strong>${escapeHtml(skill.name)}</strong><small>${escapeHtml(skill.source)}</small></span><span class="skill-level"><strong>${escapeHtml(skill.level)}</strong><small>${skill.score}% evidence</small></span></div>`).join('');
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
  $('#project-cards').innerHTML=projects.map(p=>`<div class="project-card"><span class="project-card-icon">${p.symbol}</span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.kind)}<br>${escapeHtml(p.skills)}</small></div>`).join('');
}

function showPage(name){
  if(!$('#page-'+name))return;
  state.page=name;
  $$('.page-view').forEach(page=>page.classList.toggle('active',page.id==='page-'+name));
  $$('.nav-link').forEach(link=>link.classList.toggle('active',link.dataset.page===name));
  const title={overview:'Overview',skills:'My skills',roles:'Role match',learning:'Learning plan',passport:'Public view'}[name]||'Overview';
  $('#breadcrumb-page').textContent=title;
  $('#sidebar').classList.remove('open');
  if(name==='skills')renderSkills(); if(name==='roles')renderRole(); if(name==='learning')renderPlan(); if(name==='passport')renderPassport();
  window.scrollTo({top:0,behavior:'smooth'});
}

function openModal(title,subtitle,body,actions=''){
  $('#modal').innerHTML=`<div class="modal-head"><div><h2 id="modal-title">${title}</h2><p>${subtitle}</p></div><button class="modal-close" data-close aria-label="Close">×</button></div>${body}${actions}`;
  $('#modal-backdrop').classList.add('open');
  $('#modal').scrollTop=0;
}
function closeModal(){ $('#modal-backdrop').classList.remove('open'); }
function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2600);}

function showEvidence(skill){
  const github=skill.sourceType==='github';
  const sourceIcon=github?'⌘':'▤';
  const snippet=github?`<div class="evidence-code">${skill.excerpt.split('\n').map((line,i)=>`<span class="line-num">${String(i+18).padStart(2,'0')}</span>${escapeHtml(line)}`).join('\n')}</div>`:`<div class="evidence-quote">“${escapeHtml(skill.excerpt)}”</div>`;
  openModal('Evidence for '+escapeHtml(skill.name),'A closer look at the work behind this skill.',`<div class="evidence-detail"><div class="evidence-skill-head">${symbol(skill)}<span><h3>${escapeHtml(skill.name)}</h3><p>${escapeHtml(skill.levelText)} · ${skill.score}% evidence coverage</p></span></div><p class="evidence-summary">${escapeHtml(skill.description)}</p><div class="evidence-block"><div class="evidence-block-head"><strong>${sourceIcon} ${escapeHtml(skill.evidence)}</strong><span>${escapeHtml(skill.range)}</span></div>${snippet}</div><div class="modal-tag-row"><span class="modal-tag">${github?'Repository evidence':'Self-reported in resume'}</span><span class="modal-tag">${github?'Source link available':'Needs work sample'}</span></div><div class="modal-tip"><strong>How to read this:</strong> Evidence supports that this skill appears in the submitted work. It does not independently verify who authored the work.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Close</button><button class="button button-primary" data-page="learning">Build this skill <span>→</span></button></div>');
}

function openAddWork(){
  openModal('Add work to your passport','Connect a project and add a resume to discover more skills.',`<div class="modal-body"><label class="form-label" for="repo-url">Public GitHub repository</label><input class="form-input" id="repo-url" type="url" placeholder="https://github.com/you/project" /><p class="form-help">For this prototype, repository analysis is shown with sample evidence.</p><label class="form-label" for="resume-file">Resume or project notes</label><div class="upload-zone"><span>⇧</span><strong>Choose a file to add context</strong><small>PDF or TXT · Stored locally in this demo only</small></div><input class="file-input" id="resume-file" type="file" accept=".pdf,.txt,.md" /><div class="modal-tip"><strong>Privacy first:</strong> This front-end prototype does not upload your files or contact GitHub. Its analysis uses sample profile data.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="scan-work-button">Preview sample analysis <span>→</span></button></div>');
}

function openRolePicker(){
  const choices=['Junior Software Engineer','Frontend Developer','Data Analyst'];
  openModal('Choose a target role','We’ll compare your evidence against the role requirements.',`<div class="modal-body">${choices.map((role,index)=>`<label class="role-choice ${role===state.role?'selected':''}"><span class="role-choice-icon">${index===0?'⌘':index===1?'✳':'▤'}</span><span><strong>${role}</strong><small>${index===0?'Build and maintain software systems':index===1?'Create accessible, responsive interfaces':'Turn data into useful insights'}</small></span><input type="radio" name="role" value="${role}" ${role===state.role?'checked':''}></label>`).join('')}</div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-role-button">Use this role</button></div>');
}

function openEditProfile(){
  openModal('Your profile details','These details appear in your shareable passport.',`<div class="modal-body"><label class="form-label" for="profile-name-input">Name</label><input class="form-input" id="profile-name-input" value="Aarav Shah" /><label class="form-label" for="profile-headline-input">Headline</label><input class="form-input" id="profile-headline-input" value="Computer Science student · Pune, India" /><label class="form-label" for="profile-github-input">GitHub profile</label><input class="form-input" id="profile-github-input" value="https://github.com/aaravshah" /><div class="modal-tip">Your passport is private in this prototype. Sharing is only a preview action.</div></div>`,'<div class="modal-actions"><button class="button button-outline" data-close>Cancel</button><button class="button button-primary" id="save-profile-button">Save changes</button></div>');
}

document.addEventListener('click',event=>{
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
  if(event.target.id==='profile-button'){showToast('You’re viewing Aarav’s sample profile.');return;}
  if(event.target.id==='copy-link-button'||event.target.id==='share-button'){
    const link='https://proofolio.example/passport/aarav-shah';
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(link).catch(()=>{});
    $('#share-confirm').classList.add('show');showToast('Demo passport link copied.');return;
  }
  const taskButton=event.target.closest('[data-task]');if(taskButton){const task=learningTasks[Number(taskButton.dataset.task)];task.done=!task.done;renderPlan();showToast(task.done?'Nice work — step marked complete.':'Step moved back to your plan.');return;}
  if(event.target.id==='scan-work-button'){
    const repo=$('#repo-url').value.trim();
    if(repo&&!/^https:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(repo)){showToast('Add a public GitHub repository URL to continue.');return;}
    const file=$('#resume-file').files[0];
    openModal('Reviewing your sample profile','This preview uses the sample evidence already in Proofolio.',`<div class="scan-state"><div class="scan-spinner"></div><strong>Looking for skills in your work</strong><p>Checking project examples, source context, and role relevance…</p></div>`);
    state.scanTimer=setTimeout(()=>{closeModal();showToast(file||repo?'Sample scan complete. No files were uploaded.':'Sample profile refreshed.');},1300);return;
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

document.addEventListener('input',event=>{if(event.target.id==='skill-search')renderSkills();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();});

renderOverview();renderSkills();renderRole();renderPlan();

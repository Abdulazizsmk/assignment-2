// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.documentElement.toggleAttribute("data-theme");
});

// Navigation
const navButtons = document.querySelectorAll(".nav-btn");
const panels = document.querySelectorAll(".panel");
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    navButtons.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// Personalized greeting
const saveBtn = document.getElementById("save-name");
const nameInput = document.getElementById("name-input");
saveBtn.addEventListener("click", ()=>{
  const name = nameInput.value.trim();
  if(name){
    localStorage.setItem("username", name);
    document.querySelector(".hero-inner p").textContent=`Welcome back, ${name}! Explore my projects and experiments.`;
  }
});
window.addEventListener("load", ()=>{
  const storedName = localStorage.getItem("username");
  if(storedName){
    document.querySelector(".hero-inner p").textContent=`Welcome back, ${storedName}! Explore my projects and experiments.`;
  }
});

// Projects data
const projects = [
  { title:"Portfolio Website", img:"https://picsum.photos/id/1015/400/300", desc:"Responsive portfolio website with animations and dark mode.", category:"web", date:"2023-06-10" },
  { title:"UI Design System", img:"https://picsum.photos/id/1027/400/300", desc:"Reusable UI components with accessible color themes.", category:"design", date:"2023-03-15" },
  { title:"E-Commerce App", img:"https://picsum.photos/id/1038/400/300", desc:"Full-stack e-commerce platform with React and Firebase.", category:"web", date:"2023-05-22" },
  { title:"Data Dashboard", img:"https://picsum.photos/id/1043/400/300", desc:"Real-time dashboard using Chart.js and API integration.", category:"data", date:"2023-04-05" }
];

const projectsList = document.getElementById("projects-list");
const emptyState = document.getElementById("projects-empty");
const searchInput = document.getElementById("project-search");
const filterSelect = document.getElementById("project-filter");
const sortSelect = document.getElementById("project-sort");

// Render projects
function renderProjects(list){
  projectsList.innerHTML="";
  if(list.length===0){
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");
  list.forEach(p=>{
    const card=document.createElement("div");
    card.className="project-card";
    card.innerHTML=`
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <button class="details-btn">Details</button>
      <div class="project-details">${p.desc}</div>
    `;
    const btn = card.querySelector(".details-btn");
    const details = card.querySelector(".project-details");
    btn.addEventListener("click", ()=>{
      details.classList.toggle("open");
      btn.textContent=details.classList.contains("open")?"Hide Details":"Details";
    });
    projectsList.appendChild(card);
  });
}

// Initial render
renderProjects(projects);

// Filtering & sorting
function updateProjects(){
  let filtered = [...projects];

  const category = filterSelect.value;
  if(category!=="all") filtered = filtered.filter(p=>p.category===category);

  const query = searchInput.value.toLowerCase();
  if(query) filtered = filtered.filter(p=>p.title.toLowerCase().includes(query));

  const sort = sortSelect.value;
  if(sort==="title-asc") filtered.sort((a,b)=>a.title.localeCompare(b.title));
  if(sort==="title-desc") filtered.sort((a,b)=>b.title.localeCompare(a.title));

  renderProjects(filtered);
}

searchInput.addEventListener("input", updateProjects);
filterSelect.addEventListener("change", updateProjects);
sortSelect.addEventListener("change", updateProjects);

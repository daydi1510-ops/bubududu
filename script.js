const yes = document.getElementById("yes");
const no = document.getElementById("no");
const popup = document.getElementById("popup");
const hearts = document.querySelector(".hearts");
const sad = document.getElementById("sad");

// Floating hearts
setInterval(()=>{
  const h=document.createElement("span");
  h.innerText="💖";
  h.style.left=Math.random()*100+"vw";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),6000);
},400);

// Sad face
no.onclick = ()=>{
  sad.style.display="flex";
  setTimeout(()=>sad.style.display="none",2000);
};

// Fireworks
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];

yes.onclick=()=>{
  popup.style.display="flex";
  startFireworks();
};

function startFireworks(){
  setInterval(createFirework,400);
  requestAnimationFrame(update);
}

function createFirework(){
  let x=Math.random()*canvas.width;
  let y=Math.random()*canvas.height/2;
  for(let i=0;i<100;i++){
    particles.push({
      x,y,
      a:Math.random()*Math.PI*2,
      s:Math.random()*6+2,
      l:100
    });
  }
}

function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.x+=Math.cos(p.a)*p.s;
    p.y+=Math.sin(p.a)*p.s;
    p.l--;
    ctx.fillStyle=`hsl(${Math.random()*360},100%,60%)`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,3,0,Math.PI*2);
    ctx.fill();
    if(p.l<=0) particles.splice(i,1);
  });
  requestAnimationFrame(update);
}

const startDate = new Date(2026, 8, 27, 0, 0, 0);
const $ = (id) => document.getElementById(id);

function updateCounter() {
  let diff = Math.max(0, Date.now() - startDate.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  $("days").textContent = days;
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCounter();
setInterval(updateCounter, 1000);

$("openSurprise").addEventListener("click", () => {
  $("intro").classList.add("hidden");
  $("site").classList.remove("hidden");
  window.scrollTo(0, 0);
});

$("menuToggle").addEventListener("click", () => $("navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => $("navLinks").classList.remove("open")));

const photos = Array.from({length: 8}, (_, i) => `media/fotos/foto-${String(i+1).padStart(2,"0")}.jpg`);
const photoGrid = $("photoGrid");
photos.forEach((src, i) => {
  const card = document.createElement("div");
  card.className = "photo-card";
  const img = document.createElement("img");
  img.src = src; img.alt = `Recuerdo ${i+1}`;
  img.onerror = () => {
    const fallback = document.createElement("div");
    fallback.className = "photo-fallback";
    fallback.innerHTML = `<span>♡</span>Recuerdo ${i+1}`;
    img.replaceWith(fallback);
  };
  card.appendChild(img); photoGrid.appendChild(card);
});

const videoGrid = $("videoGrid");
for (let i = 1; i <= 6; i++) {
  const card = document.createElement("div"); card.className = "video-card";
  const video = document.createElement("video");
  video.controls = true; video.preload = "metadata";
  const source = document.createElement("source");
  source.src = `media/videos/video-${String(i).padStart(2,"0")}.mp4`;
  source.type = "video/mp4"; video.appendChild(source);
  const fallback = document.createElement("div");
  fallback.className = "video-fallback";
  fallback.innerHTML = `<span>▶</span><small>Video ${i} · agrega tu archivo</small>`;
  video.addEventListener("error", () => video.replaceWith(fallback));
  card.appendChild(video); videoGrid.appendChild(card);
}

const letters = [
  ["Cuando me extrañes", "Si algún día me extrañas, recuerda que también pienso en ti y en todos esos momentos que me hacen feliz. Aunque no estemos juntos en ese instante, quiero que sepas que ocupas un lugar muy especial en mi corazón. Espero que pronto podamos compartir otro abrazo, otra risa y otro recuerdo bonito. Te amo muchísimo, Nireska. ❤️"],
  ["Cuando tengas un día difícil", "Mi amor, si hoy las cosas no salieron como esperabas, quiero recordarte que no todos los días tienen que ser perfectos. Date tiempo, respira y recuerda todo lo valiosa que eres. No tienes que poder con todo a la vez. Quiero escucharte, apoyarte y acompañarte con paciencia y cariño. Mañana será una nueva oportunidad. ❤️"],
  ["Cuando quieras saber cuánto te amo", "Te amo muchísimo más de lo que a veces consigo explicar con palabras. Te amo por tu forma de ser, por tu sonrisa, por tus ocurrencias y por cada detalle que te hace ser tú. No necesito una fecha especial para recordártelo: quiero demostrártelo con respeto, paciencia, cariño y hechos. Eres muy especial para mí, Nireska. ❤️"],
  ["Cuando estés feliz", "Si estás feliz, quiero que disfrutes ese momento al máximo. Me encanta verte sonreír y saber que algo bonito te está pasando. Ojalá nunca te falten motivos para celebrar, sueños por cumplir y personas que te quieran de verdad. Gracias por dejarme compartir tus alegrías. ¡Que esa sonrisa nunca pierda su luz! ❤️"],
  ["Una promesa para nosotros", "No te prometo que todo será perfecto, pero sí quiero poner de mi parte para cuidar lo que estamos construyendo. Prometo escucharte, hablar con sinceridad, respetarte, aprender de mis errores y no dar por sentado los momentos que compartimos. Quiero que lo nuestro crezca con confianza, paciencia y cariño. ❤️"],
  ["Ábreme cuando menos lo esperes", "¡Sorpresa, mi amor! Si llegaste hasta aquí, quiero aprovechar para decirte otra vez que te amo muchísimo. Gracias por formar parte de mi vida y por cada recuerdo que hemos creado. Esta página es pequeñita comparada con todo lo bonito que deseo compartir contigo. Con muchísimo amor, Alexander. ❤️"]
];

const envelopeGrid = $("envelopeGrid");
letters.forEach(([title, body], i) => {
  const button = document.createElement("button");
  button.className = "envelope";
  button.innerHTML = `<span class="icon">✉</span><strong>${title}</strong><small>Toca para abrir · ${i+1}</small>`;
  button.addEventListener("click", () => {
    $("modalTitle").textContent = title;
    $("modalText").textContent = body;
    $("letterModal").classList.remove("hidden");
  });
  envelopeGrid.appendChild(button);
});
function closeModal(){ $("letterModal").classList.add("hidden"); }
$("modalClose").addEventListener("click", closeModal);
$("letterModal").addEventListener("click", e => { if(e.target === $("letterModal")) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

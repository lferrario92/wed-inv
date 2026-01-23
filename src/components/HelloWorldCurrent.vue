<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import { supabase } from '../utils/supabase';
import { ref, onMounted } from 'vue'
import TestData2 from './TestData2.vue';

const [emblaRef] = emblaCarouselVue({ loop: true }, [Autoplay()])
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const timelineElements = document.querySelectorAll('.timeline-element');
  const smallTimelineElements = document.querySelectorAll('.timeline-element-small');
  
  timelineElements.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none reset',
      },
      opacity: 0,
      y: 70,
      duration: 1.5,
    });
  });
  smallTimelineElements.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none reset',
      },
      opacity: 0,
      y: 50,
      duration: 1.5,
    });
  });
});

const events = ref([
  { status: '', dotClasses: 'w-4 h-4', date: '', color: '#fff', icon: ''},
  { status: 'Ceremonia', dotClasses: 'w-8 h-8', date: '16:00 hs', color: 'white', icon: 'fa-heart'},
  { status: 'Recepcion', dotClasses: 'w-8 h-8', date: '17:00 hs', color: 'white', icon: 'fa-bell-concierge'},
  { status: 'Cena', dotClasses: 'w-8 h-8', date: '21:00 hs', color: 'white', icon: 'fa-bell'},
  { status: '', dotClasses: 'w-4 h-4', date: '', color: '#fff', icon: ''},
])

var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

var countDown = new Date('Mar 07, 2026 16:00:00').getTime(),
  x = setInterval(function() {

  var now = new Date().getTime(),
  distance = countDown - now;

  document.getElementById('days').innerText = Math.floor(distance / (day)),
  document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
  document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
  document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
}, second)

const addToCalendar = () => {
  const title = encodeURIComponent("Casamiento Renata y Lucas");
  const description = encodeURIComponent(`
Estancia Santa Juana, Belén de Escobar, Provincia de Buenos Aires

https://maps.app.goo.gl/i9QaHE2TDDj3Tq1QA

---

- 16.00 hs

---

Dress Code: Formal

---

❤️ Te esperamos ❤️

`);
  const location = encodeURIComponent("Estancia Santa Juana, Belén de Escobar, Provincia de Buenos Aires");
  const startDate = "20260307T160000";
  const endDate = "20260308T000000";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;

  window.open(googleCalendarUrl, '_blank');
}

const openMap = () => {
  const link = 'https://maps.app.goo.gl/i9QaHE2TDDj3Tq1QA'
  window.open(link, '_blank')
}

const openDressCodeIdeas = () => {
  const link = 'https://photos.app.goo.gl/PcRmQGriVJebDsMH7'
  window.open(link, '_blank')
}

const song = ref('');
const isSaving = ref(false);
const songSuccess = ref('');
const songError = ref('');

const sendSong = async () => {
  if (isSaving.value) return;
  if (!song.value.trim()) {
    songError.value = 'Por favor ingresa una canción';
    return;
  }

  try {
    isSaving.value = true;
    songError.value = '';
    
    const { error: updateError } = await supabase
      .from('invitations')
      .upsert({
        id: localStorage.getItem('weddingInvitationId'),
        songs: song.value
      }, { onConflict: 'id' });
    
    if (updateError) throw updateError;
    
    songSuccess.value = '¡Canción agregada a la playlist!';
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      songSuccess.value = '';
    }, 3000);
    
  } catch (error) {
    console.error('Error al guardar la canción:', error);
    songError.value = 'Error al guardar la canción. Por favor, inténtalo de nuevo.';
  } finally {
    isSaving.value = false;
  }
}

// Header animations
const topDeco = ref(null);
const headerContainer = ref(null);
const bottomDeco = ref(null);

onMounted(() => {
  // Create a timeline for sequential animations
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  
  // Animate elements in sequence
  tl.to(topDeco.value, { 
    opacity: 1, 
    duration: 1.2,
    ease: 'sine.inOut'
  })
  .to(bottomDeco.value, { 
    opacity: 1, 
    duration: 1.5,
    ease: 'sine.inOut'
  }, '-=0.5') // Slight overlap with previous animation
  .to(headerContainer.value, { 
    opacity: 1, 
    duration: 1.2,
    ease: 'sine.inOut'
  }, '-=0.7'); // Slight overlap with previous animation
});

const openVideo = () => {
  const videoUrl = new URL('../assets/save_date.mp4', import.meta.url).href;
  window.open(videoUrl, '_blank');
}
</script>

<template>
	<div class="wrapper">
	  <div class="intro fixWidth">
      <!-- <div class="flex flex-col items-center names">
        <p class="transform -rotate-90 mt-10">Renata & Lucas</p>
      </div>
      <h1>Nuestra boda</h1> -->
      <div class="relative w-full min-h-screen">
        <img ref="topDeco" src="../assets/top_deco.png" alt="Top Deco" class="absolute top-0 w-full opacity-0">
        <div ref="headerContainer" class="absolute inset-0 flex items-start justify-center pt-[15%] opacity-0">
          <img src="../assets/header_center.png" alt="Header" class="max-w-full max-h-[70vh] object-contain">
        </div>
        <img ref="bottomDeco" src="../assets/bottom_deco.png" alt="Bottom Deco" class="absolute bottom-0 w-full opacity-0">
      </div>
	  </div>
	  <div class="content">
	    <section class="section hero"></section>
	    <section class="">
	      <div class="test">
          <div class="chosenBG text-white p-4 fixWidth">
            <p class="italic font-serif">Los invitamos a celebrar con nosotros</p>
            <ul class="flex gap-1 items-center justify-center mw-full">
              <li class="liCal chosenBG-over">
                <span class="text-xl" id="days"></span>
                <span>Dias</span>
              </li>
              <li class="liCal chosenBG-over">
                <span class="text-xl" id="hours"></span>
                <span>Horas</span>
              </li>
              <li class="liCal chosenBG-over">
                <span class="text-xl" id="minutes"></span>
                <span>Minutos</span>
              </li>
              <li class="liCal chosenBG-over">
                <span class="text-xl" id="seconds"></span>
                <span>Segundos</span>
              </li>
            </ul>
          </div>
          <div class="bg-white text-black fixWidth leading-none pt-10 pb-10">
            <div class="timeline-element-small flex flex-col gap-3 items-center px-4">
              <i class="text-4xl mb-2 fas fa-calendar-days chosenText"></i>
              <p class="text-lg font-bold font-serif chosenText">
                7 de Marzo de 2026
                <p class="chosenText">16:00 hs</p>
              </p>
              <span class="chosenText font-serif italic text-sm">¡Sé puntual para no perderte la ceremonia!</span>
              <button class="w-full chosenBG" @click="addToCalendar">Agregar a tu calendario</button>
            </div>
          </div>
          <div class="bg-white fixWidth leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white text-black fixWidth leading-none py-10">
            <div class="timeline-element-small flex flex-col gap-3 items-center px-4">
              <img src="../assets/santa_juana_green.png" alt="Santa Juana" class="w-auto h-12 mb-2 object-cover">
              <p class="chosenText font-bold mb-4 text-lg">
                Estancia Santa Juana
              </p>
              <p class="chosenText mb-6">
                Sta. Teresita de Lesieux, Belén de Escobar, Provincia de Buenos Aires
              </p>
              <button class="w-full chosenBG" @click="openMap">Como llegar</button>
            </div>
          </div>
          <div class="bg-white fixWidth leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
	      	<div class="relative text-black fixWidth h-[50vh] leading-none pt-28 bg-white">
            <img class="absolute top-0 w-full pointer-events-none max-w-[24rem]" src="../assets/dress_flower_top.png" alt="">
            <div class="absolute top-[30%] inset-0 flex flex-col items-center justify-center px-4">
              <p class="chosenText font-bold mb-4 text-lg">Dress code</p>
              <p class="chosenText mb-8">Formal Summer Chic</p>
              <p class="chosenText mb-2 mt-2">No usar blanco ni beige</p>
              <p class="chosenText italic font-serif text-xs mb-2">¡Se los dejamos a la novia!</p>
              <button class="w-full chosenBG mt-2" @click="openDressCodeIdeas">Ver ideas</button>
            </div>
          </div><div class="bg-white fixWidth leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white text-black fixWidth leading-none py-10">
            <div class="timeline-element-small flex flex-col gap-3 items-center px-4">
              <img src="../assets/dance_icon_green.png" alt="Dance" class="w-auto h-24 object-cover">
              <p class="chosenText font-bold mb-4 text-lg">
                ¡Te queremos ver dándolo todo en la pista como Vincent y Mia!
              </p>
              <p class="chosenText mb-6">
                ¿Qué canción no puede faltar?
              </p>
              <input v-model="song" type="text" placeholder="Completá acá" class="w-full chosenBG rounded p-2 placeholder-white/80">
              <button
                class="w-full chosenBG mt-2 disabled:opacity-50"
                :disabled="isSaving"
                @click="sendSong"
              >
                Enviar canción
              </button>
            </div>
            <div>
              <!-- Success message -->
              <div v-if="songSuccess" class="my-4 p-4 bg-green-50 text-green-800 rounded-md">
                {{ songSuccess }}
              </div>
              
              <!-- Error message -->
              <div v-if="songError" class="my-4 p-4 bg-red-50 text-red-800 rounded-md">
                {{ songError }}
              </div>
            </div>
          </div>
          <div class="bg-white fixWidth leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white text-black fixWidth leading-none pt-10 pb-10">
            <div class="timeline-element-small flex flex-col gap-3 items-center px-4">
              <i class="text-4xl mb-2 fas fa-gift chosenText"></i>
              <p class="text-lg font-bold font-serif chosenText">
                Regalos
              </p>
              <span class="chosenText font-serif italic text-sm">
                Tu presencia es nuestro mejor regalo, pero si querés hacernos un presente, agradeceremos tu aporte para nuestra luna de miel.
              </span>
              <div class="w-full mx-auto mb-6 rounded chosenBG p-4">
                <p class="chosenText font-bold mb-2">Datos para transferencia (en pesos):</p>
                <p class="chosenText text-sm mb-1">Alias: MARCA.MADRE.CLASE</p>
                <p class="chosenText text-sm mb-1">CBU: 0170016940000007130117</p>
                <p class="chosenText text-sm mb-1">Titular: Paez Renata Maria</p>
                <p class="chosenText text-sm mb-1">Caja de Ahorro pesos N° 16-71301/1</p>
                <p class="chosenText text-sm mb-1">Banco: BBVA</p>
              </div> 
              <div class="w-full mx-auto mb-6 rounded chosenBG p-4">
                <p class="chosenText font-bold mb-2">Datos para transferencia (en dólares):</p>
                <p class="chosenText text-sm mb-1">Alias: BLUSA.MARCO.ROCIO</p>
                <p class="chosenText text-sm mb-1">CBU: 0070019131004007609026</p>
                <p class="chosenText text-sm mb-1">Titular: Ferrario Lucas</p>
                <p class="chosenText text-sm mb-1">Caja de Ahorro U$S 4007609-0 019-2</p>
                <p class="chosenText text-sm mb-1">Banco: Galicia</p>
              </div> 
            </div>
          </div>
          <div class="bg-white fixWidth leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white text-black fixWidth leading-none py-10">
            <TestData2 @writeSong="song = $event" />
          </div>
          <div class="bg-white fixWidth leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white text-black fixWidth leading-none pt-10 pb-10">
            <div class="timeline-element-small flex flex-col gap-3 items-center px-4">
              <i class="text-4xl mb-2 fas fa-exclamation-triangle chosenText"></i>
              <p class="text-lg font-bold font-serif chosenText">
                Fe de erratas
              </p>
              <span class="chosenText font-serif italic text-sm">
                Hola! Aca el novio, tengo noticias sobre nuestra boda. <br>
                La noticia es que me equivoqué y mande mal el video para reservar la fecha... Lo bueno es que la fecha está bien!!
<br/>
                Asique, acá les dejo el video correcto.
              </span>
              <button class="w-full chosenBG mt-2" @click="openVideo">Ver save the date</button>
            </div>
          </div>
          <div class="bg-white fixWidth leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white fixWidth leading-none px-4">
            <div class="max-w-md mx-auto text-center">
              <div class="w-full leading-none pt-12 px-4 bg-white">
                <div class="max-w-md mx-auto text-center">
                  <div class="pb-[32vh] relative">
                    
                    <p class="chosenText text-sm font-serif italic mb-2">
                      Gracias por ser parte de nuestra historia
                    </p>
                    
                    <p class="chosenText text-sm font-serif italic mb-2">
                      ¡Nos vemos pronto!
                    </p>

                    <div class="mt-6">
                      <p class="text-lg font-serif chosenText mb-2">Renata & Lucas</p>
                      <p class="chosenText text-sm text-gray-500">07.03.2026</p>
                    </div>

                    <img class="absolute left-0 right-0 max-w-[23rem] w-full bottom-0" src="../assets/bottom_deco.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Beth+Ellen&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Beth+Ellen&family=Chelsea+Market&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

* {
  box-sizing: border-box;
}
body {
  background: black;
  font-weight: 400;
  font-style: normal;
  font-family: "Chelsea Market", system-ui;
  font-size: 34px;
}

.fixWidth {
	max-width: 31rem;
  width: 100%;
}

.paper {
	position: absolute;
	z-index: 1;
	top: 10%;
}

.wrapper,
.content {
  position: relative;
  width: 100%;
  z-index: 1;
}
.intro {
  position: absolute;
  background-color: white;
  left: 0%;
  top: 0%;
  right: auto;
  bottom: auto;
  z-index: 2;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
}

.intro h1 {
  font-size: 20px;
  font-family: "Lora";
}
.intro p  {
  font-size: 60px;
  font-family: "Great Vibes";
}

.names {
  height: 60vh;
}

.content {
  overflow-x: hidden;
}

.content .section {
  width: 100%;
  height: 100vh;
}
.gradient-purple, gradient-blue {
  height: 30vh !important;
}
.content .section.hero {
  /* background-image: url('../assets/second.jpg'); */
  /* background-image: url('../assets/white_paper_texture_old.avif'); */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: opacity 0.5s ease;
}

.image-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  perspective: 500px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  position: relative;
  z-index: 1;
}


.test {
  position: relative;
  color: white;
  /* width: 100vw; */
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  line-height: 45px;
  color: white;
}


.ourPic {
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
}

.ourPicContainer {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 60vh;
}

.igm {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


.embla {
  width: 100%;
  overflow: hidden;
}
.embla__container {
  display: flex;
  width: 100%;
}
.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.goDown {
  position: fixed;
  top: 65vh;
  right: 0;
  color: black;
  z-index: 99;
  left: 0;
  width: auto;
  animation: moveIt 1s infinite  alternate;
}

@keyframes moveIt {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}


</style>

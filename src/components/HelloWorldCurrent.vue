<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

import { ref } from 'vue'
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

---

- Ceremonia 16.00 hs
- Recepcion 17.00 hs
- Cena 21.00 hs

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

</script>

<template>
	<div class="wrapper">
	  <div class="intro">
      <div class="flex flex-col items-center names">
        <p class="transform -rotate-90 mt-10">Renata & Lucas</p>
      </div>
      <h1>Nuestra boda</h1>
	  </div>
	  <div class="content">
	    <section class="section hero"></section>
	    <section class="">
	      <div class="test">
          <div class="chosenBG text-white p-4 w-full">
            <p>Los invitamos a celebrar con nosotros</p>
            <p class="font-bold text-2xl">
              7 DE MARZO DE 2026
            </p>
            <p class="m-4 italic text-lg">
              Faltan...
            </p>
            <ul class="flex gap-1 items-center justify-center mw-full">
              <li class="liCal">
                <span class="text-xl" id="days"></span>
                <span>Dias</span>
              </li>
              <li class="liCal">
                <span class="text-xl" id="hours"></span>
                <span>Horas</span>
              </li>
              <li class="liCal">
                <span class="text-xl" id="minutes"></span>
                <span>Minutos</span>
              </li>
              <li class="liCal">
                <span class="text-xl" id="seconds"></span>
                <span>Segundos</span>
              </li>
            </ul>
          </div>
          <div class="bg-white text-black w-full leading-none pt-10 pb-10">
            <div class="timeline-element-small flex flex-col gap-3 items-center px-4">
              <i class="text-2xl mb-2 fas fa-calendar-days"></i>
              <button class="w-full bg-black text-white" @click="addToCalendar">Agregar a tu calendario</button>
            </div>
          </div>
          <div class="bg-white w-full leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white text-black w-full leading-none py-10">
            <div class="timeline-element-small flex flex-col gap-3 items-center px-4">
              <i class="text-2xl mb-2 fas fa-map-marker-alt"></i>
              <button class="w-full bg-black text-white" @click="openMap">Como llegar</button>
            </div>
          </div>
          <div class="bg-white w-full leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white text-black w-full leading-none py-10">
            <TestData2 />
          </div>
          <div class="bg-white w-full leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
	      	<div class="bg-white text-black w-full leading-none py-8 px-4">
            <div class="max-w-md mx-auto text-center">
              <div class="mb-6">
                <span class="inline-block w-16 h-px bg-gray-300 mb-2"></span>
                <h2 class="text-2xl font-serif tracking-wider">Dress Code</h2>
                <span class="inline-block w-16 h-px bg-gray-300 mt-2"></span>
              </div>
              
              <div class="mb-6">
                <p class="text-gray-700 mb-4">
                  Para esta ocasión tan especial, les pedimos que nos acompañen con un atuendo
                  <span class="font-semibold">elegante</span> que refleje la importancia de este día.
                </p>
                
                <div class="flex justify-center gap-8 my-6">
                  <div class="text-center">
                    <div class="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                      <i class="fas fa-venus text-gray-600 text-2xl"></i>
                    </div>
                    <p class="text-sm text-gray-600">Vestido largo o de cóctel</p>
                  </div>
                  
                  <div class="text-center">
                    <div class="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                      <i class="fas fa-mars text-gray-600 text-2xl"></i>
                    </div>
                    <p class="text-sm text-gray-600">Traje y corbata</p>
                  </div>
                </div>
                
                <p class="text-sm text-gray-500 italic">
                  * Evitar colores blanco y marfil
                </p>
              </div>
              
              <div class="border-t border-gray-100 pt-6">
                <p class="text-sm text-gray-600">
                  Su elegancia complementará la belleza de este día inolvidable.
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white w-full leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="w-full leading-none py-8 px-4 bg-white">
            <div class="max-w-md mx-auto text-center">
              <div class="mb-6">
                <span class="inline-block w-16 h-px bg-gray-300 mb-2"></span>
                <h2 class="text-2xl font-serif tracking-wider text-black">Regalos</h2>
                <span class="inline-block w-16 h-px bg-gray-300 mt-2"></span>
              </div>
              
              <div class="mb-6">
                <p class="text-gray-700 mb-6">
                  Su presencia es nuestro mejor regalo, pero si desean hacernos un obsequio, 
                  agradeceremos su aporte para nuestro viaje de luna de miel.
                </p>
                
                <div ref="giftIcon" class="w-24 h-24 mx-auto mb-6 rounded-full bg-black flex items-center justify-center">
                  <i class="fas fa-gift text-4xl text-white"></i>
                </div>
                
                <div class="bg-black rounded-lg p-4 mb-4">
                  <p class="text-white font-medium mb-2">Datos para transferencia:</p>
                  <p class="text-sm text-white mb-1">Banco: [Nombre del Banco]</p>
                  <p class="text-sm text-white">CBU: [Número de CBU]</p>
                  <p class="text-sm text-white">A nombre de: [Nombre]</p>
                </div>
                
                <p class="text-sm text-gray-500 italic">
                  * Muchas gracias por acompañarnos en este día tan especial
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="mt-2">
        <div class="test">
          <div class="bg-white w-full leading-none px-4">
            <div class="border-t border-black"></div>
          </div>
          <div class="bg-white w-full leading-none py-8 px-4">
            <div class="max-w-md mx-auto text-center">
              <div class="mb-6">
                <span class="inline-block w-16 h-px bg-gray-300 mb-2"></span>
                <h2 class="text-2xl font-serif tracking-wider text-black">Confirmar Asistencia</h2>
                <span class="inline-block w-16 h-px bg-gray-300 mt-2"></span>
              </div>
              
              <div class="mb-6">
                <p class="text-gray-700 mb-6">
                  Por favor, confirma tu asistencia antes del 1 de Febrero de 2026
                </p>
                
                <p class="text-sm text-gray-600 mb-6">
                  <span class="block text-lg font-medium mb-1">Invitados confirmados</span>
                  <span class="text-4xl font-serif">2</span>
                  <span class="block text-sm text-gray-500 mt-1">de 2</span>
                </p>
                
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfNTdNtGRQsxV96JBtiyA3JJ59cenb0G17LAu4LQtn3oJTcUA/viewform?usp=header" 
                  target="_blank"
                  class="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium"
                >
                  Confirmar Asistencia
                </a>
                
                <p class="text-sm text-gray-500 mt-6">
                  ¿Tienes alguna pregunta?<br>
                  <a href="mailto:renataylucas@boda.com" class="text-gray-700 underline">renataylucas@boda.com</a>
                </p>
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
  height: 90vw;
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
  background-image: url('../assets/white_paper_texture_old.avif');
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
  width: 100vw;
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

.chosenBG {
  @apply bg-black;
}

.liCal {
  @apply flex flex-col items-center justify-center w-20 h-20 bg-black p-2 bg-gray-900;
}

</style>

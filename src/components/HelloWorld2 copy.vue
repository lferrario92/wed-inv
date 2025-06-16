<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import nos1 from '../assets/nos1.jpg'
import nos2 from '../assets/nos2.jpg'
import nos3 from '../assets/nos3.jpg'
import nos4 from '../assets/nos4.jpg'
import nos5 from '../assets/nos5.jpg'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

import Timeline from 'primevue/timeline';
import { ref } from 'vue'
import { Button } from 'primevue'

const [emblaRef] = emblaCarouselVue({ loop: true }, [Autoplay()])
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "+=110%",
      pin: true,
      scrub: true,
      markers: false
    }
  })
  .to(".paper, .goDown", {
    opacity: 0,
    transformOrigin: "center center",
    ease: "power1.inOut"
  })
  .to(".mask", {
    scale: 4,
    z: 650,
    transformOrigin: "center center",
    ease: "power1.inOut"
  })
  .to(".mask", {
    opacity: 0,
    transformOrigin: "center center",
    ease: "power1.inOut"
  })
  .to(
    ".section.hero",
    {
      scale: 1.3,
      transformOrigin: "center center",
      ease: "power1.inOut"
    },
    "<"
  );
  const timelineElements = document.querySelectorAll('.timeline-element');
  const smallTimelineElements = document.querySelectorAll('.timeline-element-small');
  
  timelineElements.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 5%',
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
        start: 'top 5%',
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
	    <p>Renata & Lucas</p>
	    <h1>Nuestra boda</h1>
	  </div>
	  <div class="content">
	    <section class="section hero"></section>
	    <!-- <section class="section gradient-purple mt-0 mb-0">
	    	<div class="chosenBG text-white p-4">
	    		
	    	</div>
	    </section> -->
	    <section class="section gradient-blue" v-if="false">
	      <div class="test">
			    <div class="flex flex-col justify-items-center items-center gap-5 w-full">
            <h2 class="section-heading">Scroll down</h2>
            <div class="embla" ref="emblaRef">
              <div class="embla__container">
                <div class="embla__slide ourPicContainer">
                  <div class="ourPic">
                    <!-- <img src="../assets/nos1.jpg"> -->
                    <div class="igm bg-center" :style=" { backgroundImage: `url(${nos1})`}"></div>
                  </div>
                </div>
                <div class="embla__slide ourPicContainer">
                  <div class="ourPic">
                    <!-- <img src="../assets/nos2.jpg"> -->
                    <div class="igm bg-center" :style=" { backgroundImage: `url(${nos2})`}"></div>
                  </div>
                </div>
                <div class="embla__slide ourPicContainer">
                  <div class="ourPic">
                    <!-- <img src="../assets/nos3.jpg"> -->
                    <div class="igm bg-bottom" :style=" { backgroundImage: `url(${nos3})`}"></div>
                  </div>
                </div>
                <div class="embla__slide ourPicContainer">
                  <div class="ourPic">
                    <!-- <img src="../assets/nos4.jpg"> -->
                    <div class="igm bg-center" :style=" { backgroundImage: `url(${nos4})`}"></div>
                  </div>
                </div>
                <div class="embla__slide ourPicContainer">
                  <div class="ourPic">
                    <!-- <img src="../assets/nos5.jpg"> -->
                    <div class="igm bg-center" :style=" { backgroundImage: `url(${nos5})`}"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
			  </div>
	    </section>
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
          <div class="chosenBG w-full leading-none py-5">
            <Timeline :value="events" align="alternate">
              <template #marker="slotProps">
                <span
                  class="flex items-center justify-center text-black rounded-full z-10 shadow-sm"
                  :class="slotProps.item.dotClasses"
                  :style="{ backgroundColor: slotProps.item.color }"
                >
                  <i class="fas" :class="slotProps.item.icon"></i>
                </span>
              </template>
              <template #content="slotProps">
                <div class="flex flex-col gap-1 timeline-element">
                  <p class="text-sm">
                    {{ slotProps.item.status }}
                  </p>
                  <span class="text-xs">
                    {{ slotProps.item.date }}
                  </span>
                </div>
              </template>
            </Timeline>
	      	</div>
	      	<div class="bg-white text-black w-full leading-none py-5">
            dress code
          </div>
          <div class="chosenBG w-full leading-none py-5">
            regalito
          </div>
        </div>
      </section>
	    <section class="">
	      <div class="test">
	      	
			  </div>
	    </section>
	    <section class="mt-2">
	      <div class="test">
	      	<div class="bg-slate-500 w-full leading-none py-5">
            confirmar asistencia
          </div>
        </div>
      </section>
	  </div>
	  <div class="image-container">
	    <img class="mask" src="../assets/test_mask_svg.svg" alt="image">
	  </div>
	  <div class="goDown">
	  	👇
	  </div>
    <img class="paper" src="../assets/white_paper_texture.jpg" alt="image">
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
  color: white;
/*   margin: 0 auto; */
}

.intro h1 {
  font-size: 40px;
  font-family: "Beth Ellen", cursive;
}
.intro p  {
  font-size: 60px;
  font-family: "Beth Ellen", system-ui;
  font-weight: bolder;
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
  background-image: url('../assets/second.jpg');
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
  top: -30px;
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
  @apply rounded-2xl overflow-hidden flex items-center justify-items-center w-full h-full;
  height: 100%;
}

.ourPicContainer {
  @apply px-4 flex items-center justify-center w-full h-full;
  max-height: 60vh;
}

.igm {
  @apply w-full h-full bg-cover;
  height: 400px;
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

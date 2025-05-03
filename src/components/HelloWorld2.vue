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

const [emblaRef] = emblaCarouselVue({ loop: true }, [Autoplay()])
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  gsap
    .timeline({
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
});


//darken bg on scroll - jQuery
//cannot figure out how to get the same effect using GSAP,
//if you do, please let me know :D

// $.fn.darkenScroll = function() {
//   var elem = $( this );
//   self = this;

//   $(window).on('scroll', function(){
//     scroll = $(document).scrollTop();
//     offsetTop = elem.offset().top + elem.outerHeight();
//     opacity = 1 / offsetTop * scroll;
//     if (opacity > 0 && opacity < 1) {
//       elem.css({'box-shadow': '10000px 0 0 0 rgba(0,0,0,' + opacity + ') inset'});
//     }
//   })
// }
// $('.section.hero').darkenScroll();

</script>

<template>
	<div class="wrapper">
	  <div class="intro">
	    <p>Renata & Lucas</p>
	    <h1>Nuestra boda</h1>
	  </div>
	  <div class="content">
	    <section class="section hero"></section>
	    <section class="section gradient-purple mt-40">
	    	<div>
	    		Fecha
	    		<p>
	    			7/03/2026
	    		</p>
	    	</div>
	    	<div>
	    		Falta
	    		<p>
	    			countdown
	    		</p>
	    	</div>
	    </section>
	    <section class="section gradient-blue">
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
	    <section class="section">
	      <div class="test">
	      	<div class="bg-red-500 w-full">
	      		Como llegar?
	      		<p>
	      			no se, arreglate
	      		</p>
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

</style>

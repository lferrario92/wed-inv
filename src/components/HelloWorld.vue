<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import nos1 from '../assets/nos1.jpg'
import nos2 from '../assets/nos2.jpg'
import nos3 from '../assets/nos3.jpg'
import nos4 from '../assets/nos4.jpg'
import nos5 from '../assets/nos5.jpg'
import emblaCarouselVue from 'embla-carousel-vue'

const [emblaRef] = emblaCarouselVue()

onMounted(() => {
  gsap.registerPlugin(Observer);
  
  let sections = document.querySelectorAll("section"),
    images = document.querySelectorAll(".bg"),
    headings = gsap.utils.toArray(".section-heading"),
    outerWrappers = gsap.utils.toArray(".outer"),
    innerWrappers = gsap.utils.toArray(".inner"),
    // splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
    currentIndex = -1,
    wrap = gsap.utils.wrap(0, sections.length),
    animating;

  gsap.set(outerWrappers, { yPercent: 100 });
  gsap.set(innerWrappers, { yPercent: -100 });

  function gotoSection(index, direction) {
    index = wrap(index); // make sure it's valid
    animating = true;
    let fromTop = direction === -1,
        dFactor = fromTop ? -1 : 1,
        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => animating = false
        });
    if (currentIndex >= 0) {
      // The first time this function runs, current is -1
      gsap.set(sections[currentIndex], { zIndex: 0 });
      tl.to(images[currentIndex], { yPercent: -15 * dFactor })
        .set(sections[currentIndex], { autoAlpha: 0 });
    }
    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
        yPercent: i => i ? -100 * dFactor : 100 * dFactor
      }, { 
        yPercent: 0 
      }, 0)
      .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      // .fromTo(splitHeadings[index].chars, { 
      //     autoAlpha: 0, 
      //     yPercent: 150 * dFactor
      // }, {
      //     autoAlpha: 1,
      //     yPercent: 0,
      //     duration: 1,
      //     ease: "power2",
      //     stagger: {
      //       each: 0.02,
      //       from: "random"
      //     }
      //   }, 0.2);

    currentIndex = index;
  }

  Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 100,
    preventDefault: true
  });

  gotoSection(0, 1);
})



// original: https://codepen.io/BrianCross/pen/PoWapLP
// horizontal version: https://codepen.io/GreenSock/pen/xxWdeMK
</script>

<template>
  <div>
    <section class="first">
      <div class="outer">
        <div class="inner">
          <div class="bg one">
            <div class="flex flex-col justify-items-center items-center gap-5">
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
        </div>
      </div>
    </section>
    <section class="second">
      <div class="outer">
        <div class="inner">
          <div class="bg">
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
      </div>
    </section>
    <section class="third">
      <div class="outer">
        <div class="inner">
          <div class="bg">
            <h2 class="section-heading">GreenSock</h2>
          </div>
        </div>
      </div>
    </section>
    <section class="fourth">
      <div class="outer">
        <div class="inner">
          <div class="bg">
            <h2 class="section-heading">
              asd
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section class="fifth">
      <div class="outer">
        <div class="inner">
          <div class="bg">
            <h2 class="section-heading">Keep scrolling</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap");

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

$bg-gradient: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.2) 0%,
  rgba(0, 0, 0, 0.1) 100%
);

* {
  box-sizing: border-box;
  user-select: none;
}

a {
  color: #fff;
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  color: white;
  background: black;
  font-family: "Cormorant Garamond", serif;
  text-transform: uppercase;
}

h2 {
  font-size: clamp(1rem, 5vw, 5rem);
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.5em;
  margin-right: -0.5em;
  color: hsl(0, 0, 80%);
  width: 90vw;
  max-width: 1200px;
}

header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  width: 100%;
  z-index: 3;
  height: 7em;
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(0.66rem, 2vw, 1rem);
  letter-spacing: 0.5em;
}

section {
  height: 100%;
  width: 100%;
  top: 0;
  position: fixed;
  visibility: hidden;

  .outer,
  .inner {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    background-size: cover;
    background-position: center;

    h2 {
      z-index: 2;
    }

    .clip-text {
      overflow: hidden;
    }
  }
}

/*https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920*/

.first {
  .bg {
    background-image: $bg-gradient,
      url('../assets/white_paper_texture.avif');
  }
}
.second {
  .bg {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920");
  }
}

.third {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.fourth {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.fifth {
  .bg {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75w=1920");
    background-position: 50% 45%;
  }
}

h2 * {
  will-change: transform;
}
</style>

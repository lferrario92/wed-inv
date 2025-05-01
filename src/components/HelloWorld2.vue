<template>
	<div class="container">
	  <!-- Start with vertical scroll -->
	  <section style="background: red;">
	    <h1>Section 1</h1>
	  </section>
	  <section style="background: green;">
	    <h1>Section 2</h1>
	  </section>
	  <section style="background: yellow;">
	    <h1>Section 3</h1>
	  </section>
	  <section style="background: purple;">
	    <h1>Section 4</h1>
	  </section>
	  <section style="background: brown;">
	    <h1>Section 5</h1>
	  </section>
	</div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  scroll-snap-align: start;
}

h1 {
  font-size: 70px
}
</style>

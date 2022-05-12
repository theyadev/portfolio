<script setup lang="ts">
import "~/assets/css/cube.css";
import "~/assets/css/background.css";
import "~/assets/css/index.css";

const links = useLinks()
const active = useActive()

function updateActive() {
  const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);  
  const current_link = links.value.find(link => element.closest(link.path))
  
  active.value = current_link.path
}
</script>

<template>
  <Navbar />
  <div
    @scroll="updateActive"
    class="snap-y snap-proximity scroll-smooth relative h-screen w-full overflow-y-scroll bg-zinc-900 text-white"
  >
    <Landing />
    <About />
    <Cv />
  </div>
</template>

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
    <Head>
      <Title>Fassi Théo - Portfolio</Title>
      <Meta name="description" content="Vous êtes intéréssé par mon profil ? Venez voir mon portfolio !" />
      <Script src="https://kit.fontawesome.com/6059509ea3.js" crossorigin="anonymous" />
    </Head>

  <Navbar />
  <div
    @scroll="updateActive"
    class="snap-y snap-mandatory scroll-smooth relative h-screen w-full overflow-y-scroll bg-zinc-900 text-white"
  >
    <Landing />
    <About />
    <Cv />
    <Projects />
  </div>
  
</template>

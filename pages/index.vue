<script setup lang="ts">
import "~/assets/css/cube.css";
import "~/assets/css/background.css";
import "~/assets/css/index.css";

const links = useLinks();
const active = useActive();

function updateActive() {
  const element = document.elementFromPoint(
    window.innerWidth / 2,
    window.innerHeight / 4
  );
  const current_link = links.value.find((link) => element.closest(link.path));

  active.value = current_link.path;
}
</script>

<template>
  <Head>
    <Title>Portfolio de Théo Fassi - Développeur Fullstack</Title>
    <Meta
      name="description"
      content="Portfolio de Théo Fassi, développeur web fullstack. 3 ans d'expérience en Javascript et récemment diplomé d'une formation &quot;Développeur Web et Web Mobile&quot;."
    />

    <Meta name="og:locale" content="fr_FR" />
    <Meta name="og:type" content="website" />
    <Meta
      name="og:title"
      content="Portfolio de Théo Fassi - Développeur Fullstack"
    />
    <Meta name="og:url" content="https://www.fassitheo.com/" />
    <Meta
      name="og:image"
      content="https://www.fassitheo.com/images/portfolio.png"
    />
    <Meta
      name="og:description"
      content="Portfolio de Théo Fassi, développeur web fullstack. 3 ans d'expérience en Javascript et récemment diplomé d'une formation &quot;Développeur Web et Web Mobile&quot;."
    />

    <Meta name="twitter:card" content="summary_large_image" />
    <Meta property="twitter:domain" content="www.fassitheo.com" />
    <Meta property="twitter:url" content="https://www.fassitheo.com/" />
    <Meta
      name="twitter:title"
      content="Portfolio de Théo Fassi - Développeur Fullstack"
    />
    <Meta
      name="twitter:description"
      content="Portfolio de Théo Fassi, développeur web fullstack autodidacte. 3 ans d'expérience en Javascript et récemment diplomé d'une formation &quot;Développeur Web et Web Mobile (Niveau 5)&quot;."
    />
    <Meta
      name="twitter:image"
      content="https://www.fassitheo.com/images/portfolio.png"
    />

    <Script
      src="https://kit.fontawesome.com/6059509ea3.js"
      crossorigin="anonymous"
    />
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
    <Contact />
    <Footer />
  </div>
</template>

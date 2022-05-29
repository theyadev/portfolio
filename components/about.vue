<script setup lang="ts">
type Info = {
  value: string;
  label: string;
  href?: string;
};

type Informations = { [key: string]: Info };

const birth_date = new Date(2005, 2, 15, 15, 15);
const today = new Date();
const age = today.getFullYear() - birth_date.getFullYear();

const informations = ref<Informations>({
  name: {
    value: "Fassi Théo",
    label: "Nom/Prénom",
  },
  age: {
    value: age + " ans",
    label: "Age",
  },
  country: {
    value: "France",
    label: "Pays",
  },
  email: {
    value: "fassitheo@protonmail.com",
    label: "Email",
    href: "mailto:fassitheo@protonmail.com",
  },
});
</script>

<template>
  <Tab title="A Propos" header="Me Connaitre ?" id="about" :hide-curve="true">
    <div class="mt-8 flex flex-col-reverse md:grid md:grid-cols-6 gap-4">
      <div class="col-span-4">
        <p class="text-xl">Salut ! Moi c'est Théo</p>
        <p class="text-base text-justify mt-2">
          J'ai commencé le développement web il y a
          <span class="text-green-500 underline">3 ans</span> suite à une idée
          de projet sur le jeu
          <a href="https://osu.ppy.sh/home" class="text-green-500 underline"
            >osu!</a
          >, j'ai appris le Javascript (Node.JS) en autodidacte pour créer un
          bot IRC. <br />
          Depuis, j'ai continué à apprendre en
          <span class="text-green-500 underline">autodidacte</span>, étant très
          curieux j'ai appris différents frameworks et de nombreuses
          technologies. <br />
          J'ai eu la chance de participer à une formation
          <span class="text-green-500 underline"
            >"Développeur Web et Web Mobile"</span
          >
          dans laquelle j'ai appris le Python, Django et Odoo et j'ai obtenu le
          diplôme qui me donne un niveau
          <span class="text-green-500 underline">Bac +2</span>.
        </p>
      </div>
      <div class="mt-2 md:mt-0 col-span-2 justify-center items-center flex">
        <img
          src="~/assets/images/picture.webp"
          alt="me"
          class="w-52 rounded-full aspect-square"
        />
      </div>
    </div>
    <div class="w-full mt-4 grid gap-y-2 md:grid-cols-4">
      <div v-for="info of informations">
        <p class="font-bold">{{ info.label }} :</p>
        <a v-if="info.href" :href="info.href">{{ info.value }}</a>
        <span v-else>{{info.value}}</span>
      </div>
    </div>
  </Tab>
</template>

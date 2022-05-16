<script setup lang="ts">
type Info = {
  value: string;
  label: string;
  href?:string;
}

type Informations = { [key: string]: Info };

const informations = ref<Informations>({
  name: {
    value:"Fassi Théo",
    label:"Nom",
  },
  age: {
    value: "17 ans",
    label: "Age",
  },
  country: {
    value: "France",
    label: "Pays",
  },
  email: {
    value: "fassitheo@protonmail.com",
    label: "Email",
    href: "mailto:fassitheo@protonmail.com"
  },
});

</script>

<template>
  <div id="about" class="tab">
    <div class="title mx-auto">A Propos</div>
    <h1 class="header">Me Connaitre ?</h1>
    <div class="mt-8 grid md:grid-cols-6 gap-4">
      <div class="col-span-4">
        <p class="text-2xl">Salut ! Moi c'est Théo</p>
        <p class="text-lg mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque
          velit ex sequi eos perspiciatis, tempora est rem, impedit animi
          veniam? Libero vero veritatis iusto. Iure eveniet labore laboriosam
          consequatur!
        </p>
      </div>
      <div class="col-span-2"></div>
    </div>
    <div class="w-full mt-4 grid gap-y-2 md:grid-cols-4">
      <div v-for="info of informations">
        <p class="font-bold">{{info.label}} :</p>
        <a :href="info.href">{{info.value}}</a>
      </div>
    </div>
  </div>
</template>

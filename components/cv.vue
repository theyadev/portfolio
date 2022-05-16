<script setup lang="ts">
import skills from "~/assets/skills.json";
import certifications from "~/assets/certifications.json";
import experiences from "~/assets/experiences.json";
const cv_link = ref<string>(
  "https://www.canva.com/design/DAEhpYP0cbc/5OrlTaLCXiQenASohg_aSg/view?utm_content=DAEhpYP0cbc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
);

type Category =
  | "Langages"
  | "Frameworks"
  | "Frameworks CSS"
  | "Bases de données"
  | "Outils"
  | "Autres";

const categories: Category[] = [
  "Langages",
  "Frameworks",
  "Frameworks CSS",
  "Bases de données",
  "Outils",
  "Autres",
];

const current_category = ref<Category>(categories[0]);

function changeCategory(category: Category) {
  current_category.value = category;
}

function getColor(number: number) {
  switch (number) {
    case 1:
    case 2:
      return "bg-orange-500";
    case 3:
    case 4:
    case 5:
    case 6:
      return "bg-yellow-500";
    case 7:
    case 8:
      return "bg-blue-500";
    case 9:
    case 10:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

function getDate(dateString: string) {
  const dateParts = dateString.split("/");

  const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

  return dateObject;
}

const sortedExperiences = experiences.sort(
  (a, b) => getDate(b.from).getTime() - getDate(a.from).getTime()
);
</script>

<template>
  <div id="cv" class="tab">
    <div class="title mx-auto">Curiculum Vitae</div>
    <h1 class="header">Résumé de mon CV</h1>
    <div class="grid md:grid-cols-2 gap-y-2">
      <div class="flex flex-col gap-y-4">
        <h3 class="sub-header">Diplomes</h3>
        <div class="px-2 flex flex-col gap-y-2">
          <Card
            v-for="certification in certifications"
            :title="certification.name"
            :subtitle="certification.level"
          >
            remis par <strong>{{ certification.from }}</strong> le
            <strong>{{ certification.date }}</strong>
          </Card>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <h3 class="text-3xl font-semibold mx-auto mt-2">Expériences</h3>
        <div class="px-2 flex flex-col gap-y-2">
          <Card
            v-for="experience in sortedExperiences"
            :title="experience.name"
            :subtitle="experience.activity"
          >
            du <strong>{{ experience.from }}</strong> au
            <strong>{{ experience.to }}</strong>
          </Card>
        </div>
      </div>
    </div>
    <div class="gap-y-4 flex flex-col">
      <h3 class="sub-header pt-8 md:pt-0">Mes Compétences</h3>
      <div
        class="flex justify-center flex-wrap gap-8 bg-zinc-900 py-2 uppercase font-semibold rounded-lg"
      >
        <div
          v-for="category in categories"
          class="cursor-pointer transition-all duration-200 text-lg border-white border px-4 py-1 rounded"
          @click="changeCategory(category)"
          :class="{
            'text-green-500 border-green-500': current_category === category,
          }"
        >
          {{ category }}
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-x-10 gap-y-2">
        <div
          v-for="skill in skills
            .filter((skill) => skill.category === current_category)
            .sort((a, b) => b.level - a.level)"
          class="gap-y-1 flex flex-col"
        >
          <p class="text-lg">
            {{ skill.name }}
          </p>
          <div class="w-full rounded-full h-2.5 bg-gray-700">
            <div
              class="h-2.5 rounded-full"
              :class="getColor(skill.level)"
              :style="{ width: skill.level * 10 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <a :href="cv_link" target="_blank" class="button mx-auto mt-10">Téléchager mon CV</a>
  </div>
</template>

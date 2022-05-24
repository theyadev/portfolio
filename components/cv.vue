<script setup lang="ts">
import skills_json from "~/assets/skills.json";
import certifications from "~/assets/certifications.json";
import experiences from "~/assets/experiences.json";
const cv_link = ref<string>(
  "https://www.canva.com/design/DAEhpYP0cbc/5OrlTaLCXiQenASohg_aSg/view?utm_content=DAEhpYP0cbc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
);

const skills = ref(skills_json);

const categories = ref([
  "Langages",
  "Frameworks",
  "Frameworks CSS",
  "Bases de données",
  "Outils",
]);

const current_category = ref(categories.value[0]);
const sortedExperiences = experiences.sort(
  (a, b) => getDate(b.from).getTime() - getDate(a.from).getTime()
);

const experience = (level: number): string => {
  switch (level) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return "Débutant";
    case 6:
      return "Intermediaire";
    case 7:
    case 8:
      return "Avancé";
    case 9:
    case 10:
      return "Expert";

    default:
      break;
  }
};

function openLink(link: string, blank: boolean) {
  window.open(link, blank ? "_blank" : "")
}
</script>

<template>
  <Tab id="cv" title="Curriculum Vitae" header="Résumé de mon CV">
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
        <h3 class="sub-header">Expériences</h3>
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
        class="flex justify-center flex-wrap gap-x-8 gap-y-2 bg-zinc-900 py-2 uppercase font-semibold rounded-lg"
      >
        <Button
          v-for="category in categories"
          @click="current_category = category"
          :color="current_category === category ? 'green' : undefined"
        >
          {{ category }}
        </Button>
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
          <p class="text-sm italic mb-1">{{ experience(skill.level) }}</p>
          <ProgressBar :n="skill.level" />
        </div>
      </div>
    </div>
    <Button
      @click="openLink(cv_link, true)"
      color="green"
      class="mx-auto mt-10"
      >Téléchager mon CV</Button
    >
    <Curve />
  </Tab>
</template>
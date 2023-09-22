<script setup lang="ts">
const supabase = useSupabaseClient();

const cv_link =
  "https://www.canva.com/design/DAEhpYP0cbc/5OrlTaLCXiQenASohg_aSg/view?utm_content=DAEhpYP0cbc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton";

const skills_query = `
    name,
    level,
    category_id (
        id,
        name
    )
  `;

const { data: skills } = await supabase.from("skill").select(skills_query);
const { data: certifications } = await supabase.from("certification").select();
const { data: experiences } = await supabase
  .from("experience")
  .select()
  .order("from");
const { data: categories } = await supabase.from("skill_category").select();

const current_category = ref(categories[0]);

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
  window.open(link, blank ? "_blank" : "");
}

function pad(n: number) {
  return n < 10 ? "0" + n : n;
}

function formatDate(date_string: string) {
  const date = new Date(date_string);

  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}
</script>

<template>
  <Tab id="cv" title="Curriculum Vitae" header="Résumé de mon CV">
    <div class="grid md:grid-cols-2 gap-y-2">
      <div class="flex flex-col gap-y-4">
        <p class="sub-header">Diplomes</p>
        <div class="flex flex-col px-2 gap-y-2">
          <Card
            v-for="certification in certifications"
            :title="certification.name"
            :subtitle="certification.level"
          >
            remis par <strong>{{ certification.from }}</strong>
            <span v-if="certification.date"
              >le <strong>{{ formatDate(certification.date) }}</strong></span
            >
          </Card>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <p class="sub-header">Expériences</p>
        <div class="flex flex-col px-2 gap-y-2">
          <Card
            v-for="experience in experiences"
            :title="experience.name"
            :subtitle="experience.activity"
          >
            du <strong>{{ formatDate(experience.from) }}</strong> au
            <strong>{{ formatDate(experience.to) }}</strong>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-4">
      <p class="pt-8 sub-header md:pt-0">Mes Compétences</p>
      <div
        class="flex flex-wrap justify-center py-2 font-semibold uppercase rounded-lg gap-x-8 gap-y-2 bg-zinc-900"
      >
        <Button
          v-for="category in categories"
          @click="current_category = category"
          :color="current_category.id === category.id ? 'green' : undefined"
        >
          {{ category.name }}
        </Button>
      </div>
      <div class="grid md:grid-cols-2 gap-x-10 gap-y-2">
        <div
          v-for="skill in skills
            .filter((skill) => skill.category_id.id === current_category.id)
            .sort((a, b) => b.level - a.level)"
          class="flex flex-col gap-y-1"
        >
          <p class="text-lg">
            {{ skill.name }}
          </p>
          <p class="mb-1 text-sm italic">{{ experience(skill.level) }}</p>
          <ProgressBar :n="skill.level" />
        </div>
      </div>
    </div>
    <Button :href="cv_link" :blank="true" color="green" class="mx-auto mt-10"
      >Télécharger mon CV</Button
    >
  </Tab>
</template>

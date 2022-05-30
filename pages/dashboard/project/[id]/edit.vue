<script setup lang="ts">
import Project from "~~/types/Project";

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();
const route = useRoute();

const project = ref<Project>();
const file = ref<File>();

const id: unknown = route.params.id;
const projects = useProjects();

const isLoading = ref(false);

if (!user.value) router.push("/login");
if (projects.value.length === 0) projects.value = await fetchProjects(supabase);

onMounted(async () => {
  project.value = projects.value.find((project) => project.id == id);
});

function getImage() {
  if (file.value) return URL.createObjectURL(file.value);
}

async function update() {
  isLoading.value = true;
  if (file.value) {
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(`project-${project.value.id}`, file.value);

    if (error) return alert(error);

    project.value.image = data.Key;
  }
  await supabase
    .from<Project>("project")
    .update({
      name: project.value.name,
      description: project.value.description,
      github_link: project.value.github_link,
      project_link: project.value.project_link,
    })
    .match({
      id: project.value.id,
    });
  isLoading.value = false;
}

</script>

<template>
  <div class="w-screen min-h-screen flex flex-col gap-y-10 pt-2 bg-zinc-900">
    <Button class="w-max" @click="router.push('/dashboard')">Dashboard</Button>
    <div class="flex flex-col gap-y-4 px-4">
      <FormProject v-if="project" :name="project.name" :project_link="project.project_link" :description="project.description" :github_link="project.github_link" :id="project.id"> </FormProject>
    </div>
  </div>
</template>

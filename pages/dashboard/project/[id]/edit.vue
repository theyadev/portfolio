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
      <Form
        v-if="project"
        class="text-white bg-zinc-800/40 px-8 py-8 rounded flex flex-col gap-y-2"
      >
        <FormInputContainer>
          <FormInput
            type="text"
            name="name"
            :disabled="isLoading"
            :value="project.name"
            @update="(e) => (project.name = e)"
            :required="true"
            placeholder=""
          />
          <FormLabel :value="project.name" for="name">Nom</FormLabel>
        </FormInputContainer>
        <FormInputContainer>
          <textarea
            class="resize-none w-full focus-visible:outline-none bg-white px-4 py-2 text-black rounded disabled:cursor-default disabled:pointer-events-none disabled:text-gray-500 peer focus:h-20 transition-all duration-500 peer"
            :class="project.description.length > 0 ? 'h-20' : 'h-10'"
            name="description"
            id="description"
            placeholder=""
            v-model="project.description"
            required
            :disabled="isLoading"
          />
          <FormLabel for="content" :value="project.description"
            >Description</FormLabel
          >
        </FormInputContainer>
        <FormInputContainer>
          <FormInput
            type="text"
            name="github_link"
            :disabled="isLoading"
            :value="project.github_link"
            @update="(e) => (project.github_link = e)"
            :required="true"
            placeholder=""
          />
          <FormLabel :value="project.github_link" for="github_link"
            >Lien Github</FormLabel
          >
        </FormInputContainer>
        <img
          :src="file ? getImage() : `https://xfybgfrdyageccynwbic.supabase.co/storage/v1/object/public/project-images/project-${project.id}`"
          id="image"
          name="image"
          class="aspect-square object-cover w-72"
        />
        <FormInputContainer>
          <input
            :disabled="isLoading"
            type="file"
            accept="image/*"
            @change="(e) => file = (e.target as HTMLInputElement).files[0]"
          />
          <FormLabel value=" " for="image">Image</FormLabel>
        </FormInputContainer>
        <Button
          color="green"
          class="w-max"
          @click="update"
          :disabled="isLoading"
          >Update</Button
        >
      </Form>
    </div>
  </div>
</template>

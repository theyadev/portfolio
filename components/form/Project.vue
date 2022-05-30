<script setup lang="ts">
import Project from "~~/types/Project";

type Props = {
  id?: number;
  name?: string;
  description?: string;
  github_link?: string;
  project_link?: string;
};

const props = defineProps<Props>();
const projects = useProjects();

const name = props.name ? ref(props.name) : ref("");
const description = props.description ? ref(props.description) : ref("");
const github_link = props.github_link ? ref(props.github_link) : ref("");
const project_link = props.project_link ? ref(props.project_link) : ref("");

const supabase = useSupabaseClient();

const project = ref<Project>();
const file = ref<File>();

const isLoading = ref(false);

const emit = defineEmits(["nameUpdate"]);

function getImage() {
  if (file.value) return URL.createObjectURL(file.value);
}

async function update() {
  console.log("update");

  isLoading.value = true;
  if (file.value) {
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(`project-${props.id}`, file.value);

    if (error) return alert(error);
  }
  const { error } = await supabase
    .from<Project>("project")
    .update({
      name: name.value,
      description: description.value,
      github_link: github_link.value,
      project_link: project_link.value,
    })
    .match({
      id: props.id,
    });

  if (error) return alert(error);
  isLoading.value = false;
}

async function add() {
  console.log("adding");

  isLoading.value = true;
  const { data } = await supabase.from<Project>("project").upsert({
    name: name.value,
    description: description.value,
    github_link: github_link.value,
    project_link: project_link.value,
  });

  if (data === null) return alert("Erreur");

  projects.value.push(data[0]);
  isLoading.value = false;
}
</script>
<template>
  <Form
    class="text-white bg-zinc-800/40 px-8 py-8 md:w-full rounded flex flex-col gap-y-2"
  >
    <FormInputContainer>
      <FormInput
        type="text"
        name="name"
        :disabled="isLoading"
        :value="name"
        @update="(e) => (name = e)"
        :required="true"
        placeholder=""
      />
      <FormLabel :value="name" for="name">Nom</FormLabel>
    </FormInputContainer>
    <FormInputContainer>
      <FormInput
        type="textarea"
        name="description"
        :disabled="isLoading"
        :value="description"
        @update="(e) => (description = e)"
        :required="true"
        placeholder=""
      />
      <FormLabel for="description" :value="description">Description</FormLabel>
    </FormInputContainer>
    <FormInputContainer>
      <FormInput
        type="text"
        name="github_link"
        :disabled="isLoading"
        :value="github_link"
        @update="(e) => (github_link = e)"
        :required="true"
        placeholder=""
      />
      <FormLabel :value="github_link" for="github_link">Lien Github</FormLabel>
    </FormInputContainer>
    <FormInputContainer>
      <FormInput
        type="text"
        name="project_link"
        :disabled="isLoading"
        :value="project_link"
        @update="(e) => (project_link = e)"
        :required="true"
        placeholder=""
      />
      <FormLabel :value="project_link" for="project_link"
        >Lien du Projet</FormLabel
      >
    </FormInputContainer>
    <img
      v-if="id"
      :src="
        file
          ? getImage()
          : `https://xfybgfrdyageccynwbic.supabase.co/storage/v1/object/public/project-images/project-${id}`
      "
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
      @click="() => (props.id ? update() : add())"
      :disabled="isLoading"
      >{{props.id ? 'Update' : 'Add'}}</Button
    >
  </Form>
</template>

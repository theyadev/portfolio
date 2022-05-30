<script setup lang="ts">
import Project from '~~/types/Project';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();
const projects = useProjects()

if (!user.value) router.push("/login");
if (projects.value.length === 0) projects.value = await fetchProjects(supabase);

async function deleteProject(id: number) {
    await supabase.from<Project>("project").delete().match({ id });
    projects.value = projects.value.filter((project) => project.id !== id);
}

</script>

<template>
  <div class="w-screen min-h-screen flex flex-col gap-y-10 pt-2 bg-zinc-900">
    <Button class="w-max" @click="router.push('/dashboard')">Dashboard</Button>
    <div class="flex flex-col gap-y-4 px-4">
      <div
        v-for="(project) of projects"
        class="text-white bg-zinc-800/40 px-8 py-4 flex flex-col gap-y-2"
      >
        <p>
          {{ project.name }}
        </p>

        <p>
          {{ project.description }}
        </p>

        <Button
          class="w-max"
          @click="router.push('/dashboard/project/' + project.id + '/edit')">
            Modifier
        </Button>
        
        <Button
          class="w-max"
          @click="deleteProject(project.id)">
           Supprimer
        </Button>
      </div>
    </div>
  </div>
</template>

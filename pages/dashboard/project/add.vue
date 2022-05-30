<script setup lang="ts">
import Project from "~~/types/Project";

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const repos = useState<any[]>("repos", () => []);
const projects = useProjects();

if (!user.value) router.push("/login");
if (projects.value.length === 0) projects.value = await fetchProjects(supabase);

if (repos.value.length === 0) await fetchRepos();

async function fetchRepos() {
  const res = await fetch("https://api.github.com/user/repos?per_page=100", {
    headers: {
      Authorization: `token ${supabase.auth.session().provider_token}`,
    },
  });

  const data: any = await res.json();

  if (data.message) return;

  repos.value = data
    .filter((repo) =>
      projects.value.every((project) => project.github_link != repo.html_url)
    )
    .sort((a, b) => (b.description ? 1 : -1 - a.description ? 1 : -1));
}

async function add(index: number) {
  const repo = repos.value[index];

  const { data } = await supabase.from<Project>("project").upsert({
    name: repo.name,
    description: repo.description,
    github_link: repo.html_url,
    project_link: repo.homepage,
  });

  if (data === null) return alert("Erreur");

  projects.value.push(data[0]);

  repos.value.splice(index, 1);
}
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col gap-y-10 pt-2 bg-zinc-900">
    <Button class="w-max" @click="router.push('/dashboard')">Dashboard</Button>
    <div class="flex flex-col gap-y-4 px-4">
      <div
        v-for="(repo, i) of repos"
        class="text-white bg-zinc-800/40 px-8 py-4 flex flex-col gap-y-2"
      >
        <p>
          {{ repo.name }}
        </p>

        <p>
          {{ repo.description }}
        </p>
        <div>
          <Button @click="add(i)">Add</Button>
        </div>
      </div>
    </div>
  </div>
</template>

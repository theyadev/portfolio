<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

async function signout() {
  await client.auth.signOut();

  await router.push("/login");
}
</script>

<template>
  <div
    v-if="user"
    class="h-screen w-screen flex flex-col bg-zinc-900"
  >
    <Button class="w-max" @click="signout">Logout</Button>
    <Button class="w-max" @click="router.push('/')">Accueil</Button>
    <Button class="w-max" @click="router.push('/dashboard/project/list')">Liste des Projets</Button>
    <Button class="w-max" @click="router.push('/dashboard/project/add')">Ajouter des Projets</Button>
  </div>
  <div
    v-else
    class="flex h-screen w-screen bg-zinc-900 text-white font-bold items-center justify-center"
  >
    YOU MUST BE CONNECTED
  </div>
</template>

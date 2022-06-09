<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

if (user.value) router.push("/dashboard");

// Login method using providers
async function loginWithGithub() {
  await client.auth.signIn(
    {
      provider: "github",
    },
    {
      redirectTo: "https://preview.fassitheo.com/dashboard",
      scopes: "repo",
    }
  );
}
</script>

<template>
  <div class="flex h-screen w-screen bg-zinc-900 items-center justify-center">
    <Button @click="loginWithGithub">Login with Github</Button>
  </div>
</template>

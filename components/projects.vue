<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: projects } = await supabase.from("project").select();
</script>

<template>
<Tab id="projects" title="Projets" header="Mes Projets">
    <p class="italic text-center mt-4 mb-2">La liste de mes projets sera <span class="text-green-500">bientôt disponible</span>.</p>
</Tab>
</template>
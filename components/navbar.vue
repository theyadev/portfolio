<script setup lang="ts">
const links = useLinks()
const active = useActive()
</script>

<template>
  <nav
    class="bg-black flex fixed top-0 text-xl font-semibold text-white z-50 transition-all duration-1000"
    :class="active === '#home' ? 'bg-opacity-0' : 'bg-opacity-70'"
  >
    <ul class="flex justify-center w-screen gap-4 py-4 pb-6">
      <li class="nav-item" :class="active === link.path ? 'active': ''" v-for="link in links">
        <a :href="link.path">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

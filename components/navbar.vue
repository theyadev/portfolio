<script setup lang="ts">
const links = useLinks();
const active = useActive();

const open = ref<boolean>(false)
</script>

<template>
  <ClientOnly>
    <nav
      class="bg-zinc-900 flex items-center fixed top-0 text-xl font-semibold text-white z-50 transition-all duration-1000 min-h-[4rem] w-full"
      :class="active === '#home' ? 'bg-opacity-0' : 'bg-opacity-80'"
    > 
    <div class="absolute top-2 cursor-pointer md:opacity-0" @click="open = !open">
      <i class="fas fa-bars text-5xl px-6" />
    </div>
      <ul 
        class="absolute top-0 md:translate-y-0 md:static md:pointer-events-auto md:opacity-100 pointer-events-none flex flex-col md:flex-row justify-center w-screen gap-4 pb-6 mt-16 py-4 md:mt-0 transition-all duration-500 bg-zinc-900/80 md:bg-transparent px-6"
        :class="open ? 'opacity-100 pointer-events-auto' : 'opacity-0 translate-y-11'">
        <li
          class="nav-item"
          :class="active === link.path ? 'active' : ''"
          v-for="link in links"
        >
          <a :href="link.path">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </ClientOnly>
</template>

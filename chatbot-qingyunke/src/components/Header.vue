<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="h-14 bg-gradient-to-r from-blue-400 to-teal-500 py-3 flex h-full text-center">
    <h1 class="text-white w-full text-lg">{{ title }}</h1>
  </div>
</template>

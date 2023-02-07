<script setup lang="ts">
const msgBefore = `
<svg
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 50.663574 57.648159">
  <path
     d="m 0,0 c 3.6888711,27.104435 14.35237,40.733117 23.988199,47.523198 9.745755,6.867536 26.675376,10.124961 26.675376,10.124961 V 19.849951 c 0,0 -10.120617,-0.998355 -15.88017,-2.40657 C 24.472095,14.922259 11.634513,10.781255 0,0 Z"/>
</svg>
`;
defineProps({
  isStart: Boolean,
});
</script>

<template>
  <div class="mx-4">
    <div
      v-show="isStart"
      class="absolute mr-2.5 w-10 h-10 bg-teal-400 bg-8 bg-center bg-no-repeat bg-robot-head rounded-full drop-shadow-ring-dark"
    ></div>
    <div class="h-fit ml-12 relative">
      <div class="absolute -top-2">
        <div
          v-html="msgBefore"
          class="mt-4 w-4 fill-white drop-shadow-ring-dark absolute"
        ></div>
        <div v-html="msgBefore" class="mt-4 w-4 fill-white absolute z-10"></div>
      </div>
      <div
        class="bg-white md:max-w-3/4 max-w-full w-fit ml-4 mt-4 h-auto min-h-[2.4rem] drop-shadow-ring-dark px-4 py-2 rounded-lg"
      >
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

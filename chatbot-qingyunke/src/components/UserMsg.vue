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
    <div class="h-fit relative w-full flex justify-end">
      <div
        class="md:max-w-3/4 max-w-full mt-4 text-white bg-cyan-500 z-10 mr-4 w-fit h-auto min-h-[2.4rem] drop-shadow-ring-dark px-4 py-2 rounded-lg"
      >
        <slot></slot>
      </div>
      <div class="absolute -top-2 right-4">
        <div
          v-html="msgBefore"
          class="-scale-x-1 mt-8 w-4 fill-cyan-500 drop-shadow-ring-dark absolute"
        ></div>
        <div
          v-html="msgBefore"
          class="-scale-x-1 mt-8 w-4 fill-cyan-500 absolute z-10"
        ></div>
      </div>
    </div>
  </div>
</template>

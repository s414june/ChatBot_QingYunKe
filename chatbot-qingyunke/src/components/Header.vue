<script setup>
import { ref } from "vue";
defineProps({
  title: String,
});
const isOpenInfo = ref(false);
const isCloseInfo = ref(true);
const infoClass = ref({
  "!top-0 mt-14": isOpenInfo,
});
</script>

<template>
  <div class="relative">
    <div
      class="h-14 bg-gradient-to-r from-blue-400 to-teal-500 py-3 flex text-center relative items-center z-30"
    >
      <h1 class="text-white w-full text-lg">{{ title }}</h1>
      <div class="px-3 absolute right-0 top-0 h-14 flex items-center">
        <button
          @click="isOpenInfo = !isOpenInfo"
          class="text-white h-8 flex items-center"
        >
          <font-awesome-icon icon="fa-solid fa-circle-info" class="text-lg" />
        </button>
      </div>
    </div>
    <div
      :class="infoClass"
      class="text-base bg-white/75 w-full p-3 text-slate-400 shadow text-center absolute z-20 duration-500 h-fit bottom-0 -top-36"
    >
      您好，歡迎使用這個聊天機器人~
      <br />
      此聊天機器人使用了<a
        href="http://api.qingyunke.com/"
        class="text-cyan-500 underline decoration-solid"
        >青雲客</a
      >進行機器人回應的串接，
      <br />
      並使用<a
        href="https://docs.zhconvert.org/"
        class="text-cyan-500 underline decoration-solid"
        >繁化姬</a
      >進行簡繁轉換。
      <br />
      娛樂使用，請勿較真！
      <br />
      <br />
      <font-awesome-icon icon="fa-solid fa-face-smile-wink" class="mx-1" />
      開發者：青蛙
      <font-awesome-icon icon="fa-brands fa-github" class="mx-1 ml-5" />
      <a href="http://api.qingyunke.com/" class="text-cyan-500 underline decoration-solid"
        >瀏覽專案</a
      >
    </div>
  </div>
</template>

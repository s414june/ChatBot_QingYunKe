<script setup lang="ts">
import { ref } from "vue";
const isTyping = ref(false);
const msg = ref("");
const emit = defineEmits(["sendMsg", "setMobileVh"]);
function sendMsg() {
  let thisMsg = msg.value;
  msg.value = "";
  emit("sendMsg", thisMsg);
}
const nowFontSizeIndex = ref(0);
const fontSizeList = ["1rem", "1.2rem", "1.5rem", "1.8rem"];
function changeFontSize() {
  if (nowFontSizeIndex.value >= fontSizeList.length - 1) nowFontSizeIndex.value = 0;
  else nowFontSizeIndex.value++;
  let nowStyleValue = fontSizeList[nowFontSizeIndex.value];
  document
    .querySelector("body")
    .setAttribute("style", "font-size:" + nowStyleValue + ";");
  emit("setMobileVh");
}
</script>

<template>
  <div
    class="h-14 bg-gradient-to-r from-blue-400 to-teal-500 py-3 flex text-center px-3 items-center"
  >
    <div v-show="!isTyping">
      <img
        src="../assets/font-size-selfdesign.svg"
        alt="字體大小變化"
        class="w-6"
        @click="changeFontSize()"
      />
    </div>
    <div v-show="isTyping" @click="isTyping = false">
      <img src="../assets/chevron-right-solid.svg" alt="更多輸入選項" class="w-5 h-4" />
    </div>
    <input
      type="text"
      style="max-width: calc(100% - 1.25rem - 1.25rem - 1.5rem)"
      class="grow rounded-full focus:outline-none focus:drop-shadow-ring-white text-base px-3 py-0.5 mx-3"
      @focus="isTyping = true"
      @focusout="isTyping = false"
      @keyup.enter="sendMsg()"
      v-model="msg"
    />
    <button @click="sendMsg()">
      <img src="../assets/paper-plane-regular.svg" alt="傳送" class="w-5" />
    </button>
  </div>
</template>

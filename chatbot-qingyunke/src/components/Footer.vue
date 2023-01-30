<script setup>
import { ref } from "vue";
const isTyping = ref(false);
let msg = "";
const emit = defineEmits();
function sendMsg() {
  console.log(msg)
  emit('sendMsg', msg);
}
</script>

<template>
  <div class="
      h-14
      bg-gradient-to-r
      from-blue-400
      to-teal-500
      py-3
      flex
      h-full
      text-center
      px-3
      items-center
    ">
    <div class="ml-2" v-show="!isTyping">
      <img src="../assets/font-size-selfdesign.svg" alt="字體大小變化" class="w-6" />
    </div>
    <div class="ml-2" v-show="isTyping" @click="isTyping = false">
      <img src="../assets/chevron-right-solid.svg" alt="更多輸入選項" class="w-5 h-4" />
    </div>
    <input type="text" class="
        grow
        rounded-full
        focus:outline-none focus:drop-shadow-ring-white
        text-base
        px-3
        py-0.5
        mx-3
      " @focus="isTyping = true" @focusout="isTyping = false" v-model="msg" />
    <button @click="sendMsg()">
      <img src="../assets/paper-plane-regular.svg" alt="傳送" class="w-5" />
    </button>
  </div>
</template>

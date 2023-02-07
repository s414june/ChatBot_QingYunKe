<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue";
import { setMobileVh } from "../composable/useScript";
const props = defineProps({
  isLoading: Boolean,
  errMsg: String,
});
const { isLoading } = toRefs(props);
const isTyping = ref(false);
const preMsg = ref("");
const msg = ref("");
const emit = defineEmits(["loadMsg", "reLoadBotRes"]);
const loadingDisable = ref({ "opacity-50": isLoading, "cursor-no-drop": isLoading });
const nowFontSizeIndex = ref(0);
const fontSizeList = ["1rem", "1.2rem", "1.5rem", "1.8rem"];

function loadMsg() {
  if (isLoading.value) return;
  if (msg.value.trim() === "") return;
  emit("loadMsg", msg.value);
  preMsg.value = msg.value;
  msg.value = "";
}
function reLoadBotRes() {
  if (isLoading.value) return;
  if (preMsg.value.trim() === "") return;
  emit("reLoadBotRes", preMsg.value);
}
function changeFontSize() {
  if (nowFontSizeIndex.value >= fontSizeList.length - 1) nowFontSizeIndex.value = 0;
  else nowFontSizeIndex.value++;
  let nowStyleValue = fontSizeList[nowFontSizeIndex.value];
  document
    .querySelector("body")
    .setAttribute("style", "font-size:" + nowStyleValue + ";");
  setMobileVh();
}
function changeIsTypingState(isTypingValue) {
  isTyping.value = isTypingValue;
  setMobileVh();
}
</script>

<template>
  <div>
    <div
      class="h-10 text-red-600 flex justify-center px-3 items-center text-sm"
      v-show="errMsg !== ''"
    >
      <font-awesome-icon icon="fa-solid fa-circle-exclamation" class="mx-2" />
      {{ errMsg }}
    </div>
    <div
      class="h-14 bg-gradient-to-r from-blue-400 to-teal-500 py-3 flex text-center px-3 items-center"
    >
      <div id="LeftIconPlace">
        <div
          v-show="!isTyping"
          class="grid grid-flow-col gap-3 justify-center content-center"
        >
          <button class="flex items-center">
            <img
              src="../assets/font-size-selfdesign.svg"
              alt="字體大小變化"
              class="w-7"
              @click="changeFontSize()"
            />
          </button>
          <button class="flex items-center duration-500" :class="loadingDisable">
            <font-awesome-icon
              icon="fa-solid fa-arrows-rotate"
              class="text-white"
              size="lg"
              @click="reLoadBotRes()"
            />
          </button>
        </div>
        <div v-show="isTyping" @click="isTyping = false">
          <button class="flex items-center">
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              class="text-white"
              size="lg"
            />
          </button>
        </div>
      </div>
      <input
        type="text"
        class="grow rounded-full focus:outline-none focus:drop-shadow-ring-white text-base px-3 py-0.5 mx-3"
        @focus="changeIsTypingState(true)"
        @focusout="changeIsTypingState(false)"
        @keyup.enter="loadMsg()"
        v-model="msg"
      />
      <div id="RightIconPlace">
        <button @click="loadMsg()" class="flex items-center" :class="loadingDisable">
          <!-- <img src="../assets/paper-plane-regular.svg" alt="傳送" class="w-5" /> -->
          <font-awesome-icon
            icon="fa-regular fa-paper-plane"
            class="text-white"
            size="lg"
          />
        </button>
      </div>
    </div>
  </div>
</template>

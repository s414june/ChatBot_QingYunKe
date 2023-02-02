<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BotMsg from "./components/BotMsg.vue";
import UserMsg from "./components/UserMsg.vue";
import { getCurrentInstance, ref, onMounted, onUpdated } from "vue";

const loading = `
<div class="load-3">
  <div class="line"></div>
  <div class="line"></div>
  <div class="line"></div>
</div>`;

const isLoading = ref(false);

onMounted(() => {
  setMobileVh();
  window.addEventListener("resize", () => {
    setMobileVh();
  });
});
onUpdated(() => {
  let main = document.getElementById("main");
  console.log(main.scrollHeight);
  main.scrollTop = main.scrollHeight;
});
function setMobileVh() {
  let windowsVH = window.innerHeight / 100;
  document.querySelector("body").style.setProperty("--vh", windowsVH + "px");
}
let { proxy } = getCurrentInstance();
const textList = ref([
  {
    isStart: true,
    msg: "哈囉~跟我說說話吧！",
    component: BotMsg,
  },
]);
const sendMsg = (msg) => {
  if (msg === "") return;
  addUserMsg(msg);
  //送文字給機器人API
  isLoading.value = true;
  proxy.$http
    .get(import.meta.env.VITE_API_PATH, {
      params: {
        key: "free",
        msg: msg,
      },
      headers: {},
    })
    .then(function (res) {
      let data = res.data;
      if (data == null) {
        addBotMsg("不好意思，請再說一次");
        isLoading.value = false;
        return;
      }
      let result = data.result;
      if (result === 0) {
        let resText = data.content;
        translateToTaiwan(resText);
      } else {
        addBotMsg("傳輸異常，請稍後再試");
        isLoading.value = false;
        return;
      }
    });
};

function translateToTaiwan(text) {
  proxy.$http
    .get(import.meta.env.VITE_CONVERT_PATH, {
      params: {
        converter: "Taiwan",
        text: text,
      },
      headers: {},
    })
    .then(function (res) {
      let data = res.data;
      if (data.code === 0) {
        let translateText = data.data.text;
        addBotMsg(translateText);
      } else {
        alert(data.msg);
      }
      isLoading.value = false;
    });
}

function addUserMsg(msg) {
  let textListLength = textList.value.length;
  let count = textListLength;
  count++;
  textList.value.push({
    isStart: true,
    msg: msg,
    component: UserMsg,
  });
}

function addBotMsg(msg) {
  textList.value.push({
    isStart: true,
    msg: msg,
    component: BotMsg,
  });
}
</script>

<template>
  <div class="flex flex-col h-[calc(var(--vh)*100)] bg-slate-200 overflow-hidden">
    <div>
      <Header title="聊天機器人"></Header>
    </div>
    <div id="main" class="grow w-full overflow-auto relative pb-4">
      <div v-for="text in textList">
        <component
          :isStart="text.isStart"
          :msg="text.msg"
          :is="text.component"
        ></component>
      </div>
      <div v-show="isLoading">
        <BotMsg :isStart="true" :msg="loading"></BotMsg>
      </div>
    </div>
    <div>
      <Footer @sendMsg="sendMsg" @setMobileVh="setMobileVh"></Footer>
    </div>
  </div>
</template>

<style scoped></style>

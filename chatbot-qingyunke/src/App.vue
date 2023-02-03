<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BotMsg from "./components/BotMsg.vue";
import UserMsg from "./components/UserMsg.vue";
import Loading from "./components/Loading.vue";
import { getCurrentInstance, ref, onMounted, createApp, watch, reactive } from "vue";

const isLoading = ref(false);
const saying = ref("");

const textDatas = reactive([
  {
    isStart: true,
    msg: "哈囉~跟我說說話吧！",
    component: BotMsg,
  },
]);

let { proxy } = getCurrentInstance();

const loadMsg = async (msg) => {
  if (msg.trim() === "") return;
  appendUserMsg(msg);
  fecthBotResponse(msg);
};

onMounted(() => {
  setMobileVh();
  window.addEventListener("resize", () => {
    setMobileVh();
  });
  let LoadingMsg = createApp(BotMsg);
  console.log(LoadingMsg);
  LoadingMsg.mount("#LoadingMsg");
});
// onUpdated(() => {
//   let main = document.getElementById("main");
//   main.scrollTop = main.scrollHeight;
// });
watch(
  saying,
  () => {
    scrollToBottom();
  },
  {
    //updated後才執行
    flush: "post",
  }
);
function setMobileVh() {
  let windowsVH = window.innerHeight / 100;
  document.querySelector("body").style.setProperty("--vh", windowsVH + "px");
}
function scrollToBottom() {
  let main = document.getElementById("main");
  if (!main) return;
  main.scrollTop = main.scrollHeight;
}

function fecthBotResponse(msg) {
  saying.value = "bot";
  proxy.$http
    .get(import.meta.env.VITE_API_PATH, {
      params: {
        key: "free",
        msg: msg,
      },
      headers: {},
    })
    .then(function (res) {
      let botText = getBotText(res);
      showBotTextOrTanslate(botText);
    })
    .catch(function (err) {
      console.error(err);
      let botText = "ERROR";
      showBotTextOrTanslate(botText);
    });
}

function fetchTranslateToTaiwan(text) {
  proxy.$http
    .get(import.meta.env.VITE_CONVERT_PATH, {
      params: {
        converter: "Taiwan",
        text: text,
      },
      headers: {},
    })
    .then(function (res) {
      let taiwanText = getTaiwanText(res);
      showTaiwanText(taiwanText);
    })
    .catch(function (err) {
      console.error(err);
      let taiwanText = "ERROR";
      showTaiwanText(taiwanText);
    });
}

function getBotText(res) {
  let data = res.data;
  let botText = "";
  const SUCCESS_CODE = 0;
  if (data == null) {
    botText = "NULL";
    return botText;
  }
  let result = data.result;
  if (result === SUCCESS_CODE) botText = data.content;
  else botText = "ERROR";

  return botText;
}

function getTaiwanText(res) {
  let data = res.data;
  let taiwanText = "";
  const SUCCESS_CODE = 0;
  if (data.code === SUCCESS_CODE) {
    taiwanText = data.data.text;
  } else {
    console.error(data.msg);
    taiwanText = "ERROR";
  }
  return taiwanText;
}

function showBotTextOrTanslate(text: String) {
  if (text === "NULL") return appendBotMsg("不好意思，請再說一次");
  if (text === "ERROR") return appendBotMsg("系統異常，請稍候再試");
  fetchTranslateToTaiwan(text);
}

function showTaiwanText(text: String) {
  if (text === "NULL") return appendBotMsg("繁化姬無資料");
  if (text === "ERROR") return appendBotMsg("繁化姬系統異常");
  appendBotMsg(text);
}
function appendUserMsg(msg) {
  saying.value = "user";
  textDatas.push({
    isStart: true,
    msg: msg,
    component: UserMsg,
  });
  isLoading.value = true;
}

function appendBotMsg(msg) {
  textDatas.push({
    isStart: true,
    msg: msg,
    component: BotMsg,
  });
  isLoading.value = false;
  saying.value = "";
}
</script>

<template>
  <div class="flex flex-col h-[calc(var(--vh)*100)] bg-slate-200 overflow-hidden">
    <div>
      <Header title="聊天機器人"></Header>
    </div>
    <div id="main" class="grow w-full overflow-auto relative pb-4">
      <div v-for="text in textDatas">
        <component :isStart="text.isStart" :is="text.component">
          {{ text.msg }}
        </component>
      </div>
      <div v-show="isLoading">
        <BotMsg :isStart="true">
          <Loading></Loading>
        </BotMsg>
      </div>
    </div>
    <div>
      <Footer @loadMsg="loadMsg" @setMobileVh="setMobileVh"></Footer>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BotMsg from "./components/BotMsg.vue";
import UserMsg from "./components/UserMsg.vue";
import Loading from "./components/Loading.vue";
import { setMobileVh } from "./composable/useScript";
import { getCurrentInstance, ref, onMounted, watch, shallowRef } from "vue";
import { faL } from "@fortawesome/free-solid-svg-icons";

const isLoading = ref(false);

const textDatas = shallowRef([
  {
    isStart: true,
    msg: "哈囉~跟我說說話吧！",
    component: BotMsg,
  },
]);

const isTyping = ref(true);

let { proxy } = getCurrentInstance();

const inputIconWidthData = ref({
  istype: 0,
  notype: 0,
});

onMounted(() => {
  setMobileVh();
  window.addEventListener("resize", () => {
    setMobileVh();
  });
  isTyping.value = false;
});

watch(
  [textDatas, isLoading],
  () => {
    scrollToBottom();
    const loadingDomShow = waitLoadingDomShow();
    loadingDomShow.then(() => {
      scrollToBottom();
    });
  },
  {
    //updated後才執行
    flush: "post",
  }
);

const loadMsg = async (msg) => {
  appendUserMsg(msg);
  sendBotAndTanslateApi(msg);
};

const reLoadBotRes = (msg) => {
  isLoading.value = true;
  textDatas.value.pop();
  sendBotAndTanslateApi(msg);
};

function sendBotAndTanslateApi(msg) {
  const getBot = fecthBotResText(msg);
  getBot
    .then((botText: String) => {
      const getTaiwanText = fetchTranslateToTaiwan(botText);
      doGetTaiwanText(getTaiwanText);
    })
    .catch((errMsg: String) => {
      console.error(errMsg);
      showError(errMsg);
    });

  function doGetTaiwanText(getTaiwanText) {
    getTaiwanText
      .then((taiwanText) => {
        appendBotMsg(taiwanText);
      })
      .catch((errMsg) => {
        console.error(errMsg);
        showError(errMsg);
      });
  }
}

function waitLoadingDomShow() {
  let loadingElment = document.querySelector("#LoadingBlock").children[0] as HTMLElement;
  return new Promise((res, rej) => {
    let isLoadingDomShow = loadingElment.style.display === "";
    setTimeout(() => {
      isLoadingDomShow = loadingElment.style.display === "";
      if (isLoadingDomShow) {
        res("");
      }
    }, 0);
  });
}

function scrollToBottom() {
  let main = document.getElementById("main");
  if (!main) return;
  main.scrollTop = main.scrollHeight;
}

async function fecthBotResText(msg): Promise<String> {
  const promise = new Promise<String>((res, rej) => {
    proxy.$http
      .get(import.meta.env.VITE_API_PATH, {
        params: {
          key: "free",
          msg: msg,
        },
        headers: {},
      })
      .then(function (_res) {
        let botText = getBotText(_res);
        res(botText);
      })
      .catch(function (err) {
        rej(err);
      });
  });
  return promise;
}

async function fetchTranslateToTaiwan(text): Promise<String> {
  const promise = new Promise<String>((res, rej) => {
    proxy.$http
      .get(import.meta.env.VITE_CONVERT_PATH, {
        params: {
          converter: "Taiwan",
          text: text,
        },
        headers: {},
      })
      .then(function (_res) {
        let taiwanText = getTaiwanText(_res);
        res(taiwanText);
      })
      .catch(function (err) {
        rej(err);
      });
  });
  return promise;
}

function getBotText(res) {
  let data = res.data;
  let botText = "";
  const SUCCESS_CODE = 0;
  if (data == null) {
    throw new Error("NULL");
  }
  let result = data.result;
  if (result === SUCCESS_CODE) botText = data.content;
  else throw new Error("ERROR");
  return botText;
}

function getTaiwanText(res) {
  let data = res.data;
  let taiwanText = "";
  const SUCCESS_CODE = 0;
  if (data.code === SUCCESS_CODE) {
    taiwanText = data.data.text;
  } else {
    throw new Error("ERROR");
  }
  return taiwanText;
}

function showError(text: String) {
  if (text === "NULL") return appendBotMsg("不好意思，請再說一次");
  else if (text === "ERROR") return appendBotMsg("系統異常，請稍候再試");
  else return appendBotMsg("系統異常，請稍候再試");
}

function appendUserMsg(msg) {
  textDatas.value.push({
    isStart: true,
    msg: msg,
    component: UserMsg,
  });
  isLoading.value = true;
}

function appendBotMsg(msg) {
  textDatas.value.push({
    isStart: true,
    msg: msg,
    component: BotMsg,
  });
  isLoading.value = false;
}
</script>

<template>
  <div class="flex flex-col h-[calc(var(--vh)*100)] bg-slate-200 overflow-hidden">
    <div>
      <Header title="[青雲客+繁化姬]聊天機器人"></Header>
    </div>
    <div id="main" class="grow w-full overflow-auto relative pb-4">
      <div v-for="text in textDatas">
        <component :isStart="text.isStart" :is="text.component">
          {{ text.msg }}
        </component>
      </div>
      <div id="LoadingBlock" class="h-fit">
        <BotMsg :isStart="true" v-show="isLoading">
          <Loading></Loading>
        </BotMsg>
      </div>
    </div>
    <div>
      <Footer @loadMsg="loadMsg" @reLoadBotRes="reLoadBotRes" :isLoading="isLoading">
      </Footer>
    </div>
  </div>
</template>

<style scoped></style>

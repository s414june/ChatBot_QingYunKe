<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BotMsg from "./components/BotMsg.vue";
import UserMsg from "./components/UserMsg.vue";
import Loading from "./components/Loading.vue";
import { setMobileVh } from "./composable/useScript";
import { getCurrentInstance, ref, onMounted, watch, shallowRef } from "vue";

const isLoading = ref(false);
const errMsg = ref("");

const textDatas = shallowRef([
  {
    isStart: true,
    isShow:true,
    msg: "哈囉~跟我說說話吧！",
    component: BotMsg,
    isBotMsg: true
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
  cleanErrMsg();
  appendUserMsg(msg);
  let hasHidBotMsg = false;
  sendBotAndTanslateApi(msg, hasHidBotMsg);
};

const reLoadBotRes = (msg) => {
  cleanErrMsg();
  isLoading.value = true;
  // textDatas.value.pop();
  //隱藏最後一個機器人回應
  let msgLength = textDatas.value.length;
  if (textDatas.value[msgLength - 1].isBotMsg) {
    textDatas.value[msgLength - 1].isShow = false;
  }
  let hasHidBotMsg = true;
  sendBotAndTanslateApi(msg, hasHidBotMsg);
};

function sendBotAndTanslateApi(msg, hasHidBotMsg) {
  const getBot = fecthBotResText(msg);
  getBot
    .then((botText: String) => {
      const getTaiwanText = fetchTranslateToTaiwan(botText);
      doGetTaiwanText(getTaiwanText, hasHidBotMsg);
    })
    .catch((_errMsg: String) => {
      console.error(_errMsg);
      showError(_errMsg);
      isLoading.value = false;
      //api回傳失敗，再次顯示最後一個機器人回應
      let msgLength = textDatas.value.length;
      if (textDatas.value[msgLength - 1].isBotMsg) {
        textDatas.value[msgLength - 1].isShow = true;
      }
    });

  function doGetTaiwanText(getTaiwanText, hasHidBotMsg) {
    getTaiwanText
      .then((taiwanText) => {
        //確定api回傳成功，把前一個機器人回應刪除
        let msgLength = textDatas.value.length;
        if (hasHidBotMsg && textDatas.value[msgLength - 1].isBotMsg) {
          textDatas.value.pop();
        }
        appendBotMsg(taiwanText);
      })
      .catch((_errMsg) => {
        console.error(_errMsg);
        showError(_errMsg);
        isLoading.value = false;
        //api回傳失敗，再次顯示最後一個機器人回應
        let msgLength = textDatas.value.length;
        if (textDatas.value[msgLength - 1].isBotMsg) {
          textDatas.value[msgLength - 1].isShow = true;
        }
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

async function fecthWeatherTest(): Promise<String> {
  const promise = new Promise<String>((res, rej) => {
    proxy.$http
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-AEE024E9-A102-4069-8272-A96024102012",
        {}
      )
      .then(function (_res) {
        let r = _res.toString();
        res(r);
      })
      .catch(function (err) {
        rej(err);
      });
  });
  return promise;
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

function showError(_errMsg: String) {
  if (_errMsg === "NULL") return showErrMsg("不好意思，請再說一次");
  if (_errMsg === "ERROR") return showErrMsg("系統異常，請稍候再試");
  else return showErrMsg("系統異常，請稍候再試");
}

function cleanErrMsg() {
  errMsg.value = "";
}

function showErrMsg(text) {
  errMsg.value = text;
}

function appendUserMsg(msg) {
  textDatas.value.push({
    isStart: true,
    isShow:true,
    msg: msg,
    component: UserMsg,
    isBotMsg: false
  });
  isLoading.value = true;
}

function appendBotMsg(msg) {
  textDatas.value.push({
    isStart: true,
    isShow:true,
    msg: msg,
    component: BotMsg,
    isBotMsg: true
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
      <div v-for="(text, index) in textDatas" :key="index">
        <component :isStart="text.isStart" :is="text.component" :isShow="text.isShow">
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
      <Footer @loadMsg="loadMsg" @reLoadBotRes="reLoadBotRes" :isLoading="isLoading" :errMsg="errMsg">
      </Footer>
    </div>
  </div>
</template>

<style scoped></style>

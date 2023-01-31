<script setup lang="ts">

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BotMsg from "./components/BotMsg.vue";
import UserMsg from "./components/UserMsg.vue";
import { getCurrentInstance, ref } from "vue";

let { proxy } = getCurrentInstance();
const textList = ref([{
  isStart: true,
  msg: "哈囉~跟我說說話吧！",
  component: BotMsg
}]);
const sendMsg = (msg) => {
  if (msg === "") return;
  addUserMsg(msg);
  //送文字給機器人API
  proxy.$http.get("./api", {
    params: {
      key: "free",
      msg: msg
    }
  }).then(function (res) {
    let data = res.data;
    let result = data.result;
    if (result === 0) {
      let resText = data.content;
      translateToTaiwan(resText);
    }
    else {
      alert("傳輸異常，請稍後再試");
    }
  })
}

function translateToTaiwan(text) {
  proxy.$http.get("./convert", {
    params: {
      converter: "Taiwan",
      text: text
    }
  }).then(function (res) {
    let data = res.data;
    if (data.code === 0) {
      let translateText = data.data.text;
      addBotMsg(translateText);
    }
    else {
      alert(data.msg);
    }
  }
  )
}

function addUserMsg(msg) {
  let textListLength = textList.value.length;
  let count = textListLength;
  count++;
  textList.value.push({
    isStart: true,
    msg: msg,
    component: UserMsg
  })
}

function addBotMsg(msg) {
  let textListLength = textList.value.length;
  textList.value.push({
    isStart: true,
    msg: msg,
    component: BotMsg
  })
}
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-200">
    <div>
      <Header title="聊天機器人"></Header>
    </div>
    <div id="main" class="grow mt-2">
      <div v-for="text in textList">
        <component :isStart="text.isStart" :msg="text.msg" :is="text.component"></component>
      </div>
    </div>
    <div>
      <Footer @sendMsg="sendMsg"></Footer>
    </div>
  </div>
</template>

<style scoped>

</style>

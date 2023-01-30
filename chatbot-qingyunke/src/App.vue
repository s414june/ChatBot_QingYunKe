<script setup lang="ts">

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { getCurrentInstance } from "vue";

let { proxy } = getCurrentInstance();
const msgBefore = `
<svg
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 50.663574 57.648159">
  <path
     d="m 0,0 c 3.6888711,27.104435 14.35237,40.733117 23.988199,47.523198 9.745755,6.867536 26.675376,10.124961 26.675376,10.124961 V 19.849951 c 0,0 -10.120617,-0.998355 -15.88017,-2.40657 C 24.472095,14.922259 11.634513,10.781255 0,0 Z"/>
</svg>
`;

const sendMsg = (msg) => {
  console.log(msg)
  if (msg === "") return;
  proxy.$http.get("/api", {
    params: {
      key: "free",
      msg: msg
    },
    headers: {

    }
  }).then(function (res) {
    console.log(res)
  })
}
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-200">
    <div>
      <Header title="聊天機器人"></Header>
    </div>
    <div id="main" class="grow">
      <div v-html="msgBefore" class="w-6 fill-white drop-shadow-ring-dark"></div>
      <div class="">

      </div>
    </div>
    <div>
      <Footer @sendMsg="sendMsg"></Footer>
    </div>
  </div>
</template>

<style scoped>

</style>

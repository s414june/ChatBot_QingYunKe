import { onMounted, watch } from "vue";
export function setMobileVh() {
  // const setMobileVh = function(){
  // }
  // let windowsVH = window.innerHeight / 100;
  let windowsVH = document.documentElement.clientHeight / 100;
  document.querySelector("body").style.setProperty("--vh", windowsVH + "px");
}
export function useException(msg, short) {
  this.msg = msg;
  this.short = short;
}

export function viewportVhHandler(event) {
  let _vh = event.target.height / 100;
  document.querySelector("body").style.setProperty("--vh", _vh + "px");
}
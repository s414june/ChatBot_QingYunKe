import { onMounted,watch } from "vue";
export function setMobileVh() {
  // const setMobileVh = function(){
  // }
  let windowsVH = window.innerHeight / 100;
  document.querySelector("body").style.setProperty("--vh", windowsVH + "px");
}
export function useException(msg,short){
  this.msg = msg;
  this.short = short;
}
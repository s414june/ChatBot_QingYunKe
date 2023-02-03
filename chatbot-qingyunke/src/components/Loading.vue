<script setup lang="ts"></script>

<template>
  <div class="load-3">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>
<style scoped>
.load-3 .line {
  display: inline-block;
  width: var(--loading-width);
  height: var(--loading-width);
  border-radius: 100%;
  background-color: var(--loading-color);
  margin: 0 2px;
}

.load-3 {
  transform: translateY(calc(var(--loading-width) / -2));
}

.load-3 .line:nth-last-child(1) {
  animation: loadingC 0.6s 0.1s linear infinite;
}

.load-3 .line:nth-last-child(2) {
  animation: loadingC 0.6s 0.2s linear infinite;
}

.load-3 .line:nth-last-child(3) {
  animation: loadingC 0.6s 0.3s linear infinite;
}

@keyframes loadingC {
  0 {
    transform: translate(0, 0);
    opacity: 1;
  }

  50% {
    transform: translate(0, calc(var(--loading-width) * 0.65));
    opacity: 0.5;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>

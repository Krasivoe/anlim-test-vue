<template>
  <div class="loader"/>
</template>

<script>
export default {
  name: 'Loader'
};
</script>

<style scoped lang="scss">
.loader {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 5px solid #4338ca;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 0.8s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 450px) {
  .loader {
    position: relative;
    top: -20%;
  }
}
</style>

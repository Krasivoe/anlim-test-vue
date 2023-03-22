<template>
  <div class="wrapper">
    <Header/>
    <section class="app">
      <transition name="fade-router">
        <router-view class="container app-content"/>
      </transition>
    </section>
  </div>
</template>

<script setup>
import Header from '@/components/header/Header.vue';

</script>

<style lang="scss">
body {
  background: $bg;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app, .app-content {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 20px;
}

.fade-router-enter-active,
.fade-router-leave-active {
  transition: opacity 0.2s linear;
}

.fade-router-enter-from,
.fade-router-leave-to {
  opacity: 0;
}

@media screen and (max-width: $bp-small) {
  .container {
    padding: 0;
  }
}
</style>

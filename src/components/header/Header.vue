<template>
  <div class="header">
    <Navbar/>
  </div>
</template>

<script>
import Navbar from '@/components/header/Navbar.vue';

export default {
  components: { Navbar }
};
</script>

<style scoped lang="scss">
.header {
  @include flex-center();
  width: 100%;
  min-height: 80px;
}
</style>

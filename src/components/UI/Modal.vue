<template>
  <transition name="fade-modal">
    <div class="modal" v-if="props.show">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal'
};
</script>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  /**
   * Видимость модального окна
   */
  show: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  @include flex-center();
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  backdrop-filter: blur(1px);
}

.content {
  padding: 25px;
  border-radius: 10px;
  background: white;
}

.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.2s linear;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>

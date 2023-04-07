<template>
  <div class="home">
    <div class="home_image">
      <img
        class="image"
        src="@/assets/images/main/mainImage.jpg"
        width="450"
        height="450"
        alt="Фото главной страницы"
        @load="onImageLoad"
        v-show="isImageLoading">
      <Loader v-if="!isImageLoading"/>
    </div>
    <p class="home_text">
      Молодой Frontend-разработчик, со стремлением учиться и развиваться, совершенствовать свои навыки и пополнять
      знания.<br>
      Ежедневно изучаю новое в web-разработке. Многое знаю, что не знаю найду. Привык не просто решать проблемы, но и
      анализировать причины, по которым они возникли. Иначе говоря, не люблю наступать на одни и те же грабли.<br><br>
      P.S. На фото изображен человек, которому нравится смотреть на воду.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

/** Свойство, определяющее загрузку изображения */
let isImageLoading = ref(false);

// Очистка стора при переходе на главную страницу
const store = useStore();
store.commit('resetState');

/** Событие загрузки изображения */
const onImageLoad = () => {
  isImageLoading.value = true;
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
}

.home_image {
  @include flex-center();
  width: 100%;
  min-height: 450px;
  overflow: hidden;

  .image {
    border-radius: 5px;
    transition: 0.5s;
    &:hover {
      transform: scale(1.05);
    }
  }
}

.home_text {
  max-width: 700px;
  line-height: 26px;
  text-align: center;
}
</style>

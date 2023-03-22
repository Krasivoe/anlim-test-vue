<template>
  <nav class="navbar">
    <router-link class="link" to="/">Главная</router-link>
    <router-link class="link" to="/groups">Формирование групп</router-link>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  @include flex-center();
  column-gap: 50px;
  width: 100%;
  height: 100%;
}

.link {
  position: relative;
  min-height: 30px;
  color: black;
  font-size: 22px;
  text-decoration: none;
  padding: 5px 0;
  border-bottom: 3px solid #fe3458;
  transition: all 0.25s linear;

  &:before {
    position: absolute;
    bottom: -3px;
    left: 0;
    display: block;
    width: 100%;
    height: 3px;
    content: "";
    background-color: dodgerblue;
    transition: transform 0.25s linear;
    transform: scale(0);
  }

  &:hover {
    opacity: 0.8;
    &:before {
      transform: scale(1);
    }
  }

  &.router-link-active {
    border-bottom: 3px solid dodgerblue;
  }
}
</style>

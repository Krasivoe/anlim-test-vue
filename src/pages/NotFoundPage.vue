<template>
  <div class="error">
    <div>
      <p class="code">404</p>
      <h1 class="title">Страница не найдена</h1>
    </div>
    <Button label="Вернуться на главную" size="small" @click="$router.push('/')"/>
  </div>
</template>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 280px;
  text-align: center;
}

.code {
  font-size: 55px;
  font-weight: 600;
  line-height: 45px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 2px;
  padding-top: 5px;
}

</style>

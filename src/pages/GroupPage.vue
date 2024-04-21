<template>
  <div class="groups-configure">
    <Table/>

    <Groups
      :is-disabled-button="btnSaveIsDisabled"
      @save-players="savePlayers"
    />

    <Modal v-model:show="modalVisible">
      <div class="warning">
        <h2 class="warning-title">Предупреждение</h2>
        <p class="warning-text">Для перехода на другую страницу необходимо сохранить данные.</p>
        <div class="warning-buttons">
          <Button label="Сохранить" size="small" @click="saveAndMoveHome"/>
          <Button label="Отмена" severity="danger" size="small" @click="hideModal"/>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import Table from '@/components/Table.vue';
import Groups from '@/components/groups/Groups.vue';
import router from '@/router/index.js';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

/** Свойство, определяющее активна ли кнопка сохранения */
const btnSaveIsDisabled = ref(true);

/** Свойство, определяющее отображение модального окна */
const modalVisible = ref(false);

/** Свойство, определяющее сохранены ли данные */
const isSavedData = ref(false);

const store = useStore();

/** Список игроков в группах */
const groupPlayers = computed(() => {
  return store.state.groupPlayers;
});

/** Сохранение игроков */
const savePlayers = () => {
  isSavedData.value = true;
  console.log(JSON.stringify(store.state.sendPlayersData));
};

/** Сохранение игроков и возврат на главную страницу */
const saveAndMoveHome = () => {
  savePlayers();
  router.push('/');
};

/** Скрытие модального окна */
const hideModal = () => {
  modalVisible.value = false;
};

watch(
  () => groupPlayers,
  groupPlayers => {
    if (groupPlayers.value.length === store.state.groupsLimit * store.state.playersLimit) {
      btnSaveIsDisabled.value = false;
    } else {
      btnSaveIsDisabled.value = true;
      isSavedData.value = false;
    }
  },
  { deep: true }
);

// Проверки перед перемещением на главную страницу
router.beforeEach((to, from, next) => {
  if ((groupPlayers.value.length === 0) ||
    isSavedData.value) {
    next();
  } else {
    modalVisible.value = true;
  }
});
</script>

<style lang="scss" scoped>
.groups-configure {
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  justify-content: space-around;
  align-items: flex-start;
}

.warning {
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  justify-content: center;
  align-items: center;
  width: 400px;

  &-title {
    font-size: 1.5rem;
  }

  &-text {
    text-align: center;
  }

  &-buttons {
    display: flex;
    column-gap: 30px;
    justify-content: center;
    width: 100%;
    & button {
      width: 130px;
    }
  }
}
</style>;

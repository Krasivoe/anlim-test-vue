<template>
  <div class="groups-configure">
    <Table
      :players="displayPlayers"
      @add-player="addPlayerToGroup"/>

    <div class="forming">
      <div class="groups">
        <Group
          v-for="group in groups"
          @remove-player="removePlayerFromGroup"
          :group="group.group_id"
          :group-players="groupPlayers"
          :key="group.group_id"/>
      </div>
      <Button
        class="btn-save"
        label="Сохранить"
        icon="pi pi-check"
        size="small"
        @click="savePlayers"
        :disabled="btnSaveIsDisabled"
      />
    </div>

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

import router from '@/router/index.js';
import { players } from '@/assets/data/players.js';
import { groups } from '@/assets/data/groups.js';
import Group from '@/components/groups/Group.vue';
import Table from '@/components/groups/Table.vue';
import { reactive, ref, watch } from 'vue';
import { selectGroup } from '@/utils/group.js';

/**
 * Список игроков, для отображения в таблице
 */
let displayPlayers = ref(players
  .sort((a, b) => {
    return a.name.localeCompare(b.name) || a.surname.localeCompare(b.surname);
  })
  .map((item, idx) => {
    return {
      index: idx + 1,
      ...item,
      name: `${item.name} ${item.surname}`
    };
  }));

/**
 * Массив объектов с данными игрока и группы, в которую он папал
 */
let groupPlayers = ref([]);

/**
 * Массив с данными, которые отправятся на сервер
 */
let sendPlayersData = ref([]);

/**
 * Объект, хранящий количество игроков в группах
 */
const groupCounter = reactive({
  groups: new Array(3).fill(0),
  currentGroup: 1
});

/**
 * Свойство, определяющее отключена ли кнопка сохранения
 */
const btnSaveIsDisabled = ref(true);

/**
 * Свойство, определяющее отображение модального окна
 */
const modalVisible = ref(false);

/**
 * Свойство, определяющее сохранены ли данные
 */
const isSavedData = ref(false);

/**
 * Добавление игрока из таблицы в текущую группу и в список данных для отправки на сервер.
 * @param {Object} player - объект с данными игрока
 */
const addPlayerToGroup = player => {
  if (displayPlayers.value.length === 1) return;

  const actualGroup = selectGroup(groupCounter);

  groupCounter.currentGroup = actualGroup;
  groupCounter.groups[actualGroup - 1] += 1;

  groupPlayers.value.push({
    ...player,
    group: groupCounter.currentGroup
  });

  sendPlayersData.value.push({
    player_id: player.id,
    group_id: groupCounter.currentGroup
  });

  displayPlayers.value = displayPlayers.value.filter(p => p.id !== player.id);
};

/**
 * Перемещение игрока из группы обратно в таблицу
 * и удаление его из списка данных для отправки на сервер.
 * @param {Object} player - объект с данными игрока
 */
const removePlayerFromGroup = player => {
  groupCounter.groups[player.group - 1] -= 1;

  groupPlayers.value = groupPlayers.value.filter(p => p.id !== player.id);
  sendPlayersData.value = sendPlayersData.value.filter(p => p.player_id !== player.id);
  displayPlayers.value.push({ ...player });
};

/**
 * Сохранение игроков
 */
const savePlayers = () => {
  isSavedData.value = true;
  console.log(JSON.stringify(sendPlayersData.value));
};

/**
 * Сохранение игроков и возврат на главную страницу
 */
const saveAndMoveHome = () => {
  savePlayers();
  router.push('/');
};

/**
 * Скрытие модального окна
 */
const hideModal = () => {
  modalVisible.value = false;
};

watch(
  () => groupPlayers,
  groupPlayers => {
    if (groupPlayers.value.length === 9) {
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

<style scoped lang="scss">
.warning {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 25px;
  width: 400px;

  &-title {
    font-size: 1.5rem;
  }

  &-text {
    text-align: center;
  }

  &-buttons {
    display: flex;
    justify-content: center;
    column-gap: 30px;
    width: 100%;
    & button {
      width: 130px;
    }
  }
}

.groups-configure {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  row-gap: 30px;

  .forming {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    row-gap: 20px;
    min-height: 640px;

    .groups {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      row-gap: 20px;
      column-gap: 20px;
    }

    .btn-save {
      align-self: center;
      width: 170px;
    }
  }
}

@media screen and (max-width: $bp-medium) {
  .groups-configure {
    .forming {
      justify-content: flex-start;
      max-width: 550px;
      min-height: 0;

      .groups {
        flex-direction: row;
        justify-content: space-around;
        row-gap: 15px;
      }
    }
  }
}
</style>;

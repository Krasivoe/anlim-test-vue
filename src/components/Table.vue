<template>
  <div class="table">
    <DataTable :value="showTablePlayers" @row-dblclick="onClickRow" sortField="name" :sortOrder="1">
      <Column field="index" header="№" sortable/>
      <Column field="name" header="Участник" sortable/>
      <Column field="birthday" header="Дата рождения" filterField="date" dataType="date" sortable>
        <template #body="{ data }">
          {{
            formatDate(data.birthday)
          }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { formatDate } from '@/utils/index.js';

const store = useStore();

/** Список игроков для отображения в таблице */
const showTablePlayers = computed(() => store.state.displayPlayers);

/**
 * Регистрация события добавления игрока в группу
 * @param {Event} event - Объект с данными о событии
 */
const onClickRow = event => store.commit('addPlayerToGroup', event.data);
</script>

<style lang="scss">
.table {
  width: 550px;

  .p-datatable .p-datatable-thead > tr > th .p-column-header-content {
    display: block;
    text-align: center;
  }
  .p-datatable .p-datatable-tbody > tr > td {
    text-align: center;
    cursor: pointer;
  }
}
</style>

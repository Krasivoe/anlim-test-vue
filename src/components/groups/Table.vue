<template>
  <div class="table">
    <DataTable :value="props.players" @row-dblclick="onClickRow" sortField="name" :sortOrder="1">
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
import { defineProps, defineEmits } from 'vue';
import { formatDate } from '@/utils/index.js';

const props = defineProps({
  /**
   * Список игроков для отображения в таблице
   */
  players: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['addPlayer']);

/**
 * Регистрация события добавления игрока в группу
 * @param {Event} event - Объект с данными о событии
 */
const onClickRow = event => {
  emit('addPlayer', event.data);
};

</script>

<style lang="scss">
.table {
  width: 550px;
  min-height: 640px;

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

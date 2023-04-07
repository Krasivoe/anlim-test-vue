<template>
  <div class="forming">
    <div class="groups">
      <Group
        v-for="group in groups"
        :group="group.group_id"
        :key="group.group_id"/>
    </div>
    <Button
      class="btn-save"
      label="Сохранить"
      icon="pi pi-check"
      size="small"
      @click="savePlayers"
      :disabled="props.isDisabledButton"
    />
  </div>
</template>

<script setup>
import Group from '@/components/groups/Group.vue';
import { groups } from '@/assets/data/groups.js';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  /** Свойство, определяющее активна ли кнопка сохранения */
  isDisabledButton: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['savePlayers']);

/** Событие сохранения игроков для отправки на сервер */
const savePlayers = () => {
  emit('savePlayers');
};
</script>

<style scoped lang="scss">
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

@media screen and (max-width: $bp-medium) {
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
</style>

<template>
  <div class="forming">
    <div class="groups">
      <Group v-for="group in groups" :key="group.group_id" :group="group.group_id" />
    </div>
    <Button
      :disabled="props.isDisabledButton"
      class="btn-save"
      icon="pi pi-check"
      label="Сохранить"
      size="small"
      @click="savePlayers"
    />
  </div>
</template>

<script setup>
import Group from '@/components/groups/Group.vue';
import { defineEmits, defineProps, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  /** Свойство, определяющее активна ли кнопка сохранения */
  isDisabledButton: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['savePlayers']);
const groups = ref(new Array(store.state.groupsLimit).fill(undefined).map((_, idx) =>
    ({ group_id: idx + 1 })));

/** Событие сохранения игроков для отправки на сервер */
const savePlayers = () => {
  emit('savePlayers');
};
</script>

<style lang="scss" scoped>
.forming {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  justify-content: space-around;
  min-height: 640px;

  .groups {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;
    justify-content: center;
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
      row-gap: 15px;
      justify-content: space-around;
    }
  }
}
</style>

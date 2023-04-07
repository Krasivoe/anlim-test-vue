<template>
  <Fieldset class="field">
    <template #legend>
      <span>{{ `Группа ${group}` }}</span>
    </template>
    <ul class="field-inner">
      <li v-for="player in showGroupPlayers" :key="player" @dblclick="removePlayer(player)">{{ player.name }}</li>
    </ul>
  </Fieldset>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  /** Текущая группа */
  group: {
    type: Number,
    required: true
  }
});

const store = useStore();

/** Список игроков для отображения в текущей группе */
const showGroupPlayers = computed(() => {
  return store.state.groupPlayers.filter(p => p.group === props.group);
});

/**
 * Событие удаление игрока из группы
 * @param {Object} player - Объект с данными игрока
 */
const removePlayer = player => store.commit('removePlayerFromGroup', player);
</script>

<style lang="scss">
.field {
  display: flex;
  justify-content: center;
  @include font();
  width: 250px;
  min-height: 180px;
  border: 1px solid #dee2e6;

  &-inner {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    text-align: center;
    & li {
      cursor: pointer;
    }
  }
}

.groups {
  .p-fieldset .p-fieldset-legend {
    padding: 0.5rem;
  }
  .p-fieldset .p-fieldset-content {
    padding: 1.25rem 0 1.75rem;
  }
}
</style>

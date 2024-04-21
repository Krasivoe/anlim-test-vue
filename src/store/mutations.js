import { selectGroup } from '@/utils/group.js';

export const mutations = {
  /**
   * Добавление игрока из таблицы в текущую группу и в список данных для отправки на сервер.
   * @param {Object} state - хранилище данных
   * @param {Object} player - объект с данными игрока
   */
  addPlayerToGroup(state, player) {
    const actualGroup = selectGroup(state.groupCounter, state.playersLimit);
    if (!actualGroup) return;

    state.groupCounter.currentGroup = actualGroup;
    state.groupCounter.groups[actualGroup - 1] += 1;

    state.groupPlayers.push({
      ...player,
      group: state.groupCounter.currentGroup
    });

    state.sendPlayersData.push({
      player_id: player.id,
      group_id: state.groupCounter.currentGroup
    });

    state.displayPlayers = state.displayPlayers.filter(p => p.id !== player.id);
  },
  /**
   * Перемещение игрока из группы обратно в таблицу
   * и удаление его из списка данных для отправки на сервер.
   * @param {Object} state - хранилище данных
   * @param {Object} player - объект с данными игрока
   */
  removePlayerFromGroup(state, player) {
    state.groupCounter.groups[player.group - 1] -= 1;

    state.groupPlayers = state.groupPlayers.filter(p => p.id !== player.id);
    state.sendPlayersData = state.sendPlayersData.filter(p => p.player_id !== player.id);

    // Удаляем свойство group при переносе игрока обратно в таблицу
    delete player.group;
    state.displayPlayers.push(player);
  }
};

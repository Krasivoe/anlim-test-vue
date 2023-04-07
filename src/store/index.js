import { createStore } from 'vuex';
import { players } from '@/assets/data/players.js';
import { mutations } from '@/store/mutations.js';

const getDefaultState = () => {
  return {
    /** Список начальных игроков */
    displayPlayers: players
      .sort((a, b) => {
        return a.name.localeCompare(b.name) || a.surname.localeCompare(b.surname);
      })
      .map((item, idx) => {
        return {
          index: idx + 1,
          id: item.id,
          name: `${item.name} ${item.surname}`,
          birthday: item.birthday
        };
      }),
    /** Массив объектов с данными игрока и группы, в которую он папал */
    groupPlayers: [],
    /** Объект, хранящий количество игроков в группах */
    groupCounter: {
      groups: new Array(3).fill(0),
      currentGroup: 1
    },
    /** Массив с данными, которые отправятся на сервер */
    sendPlayersData: []
  };
};

const state = getDefaultState();

export default createStore({
  state,
  mutations: {
    /** Сброс стора */
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    ...mutations
  }
});

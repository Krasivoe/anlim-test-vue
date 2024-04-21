import { createStore } from 'vuex';
import { players } from '@/assets/data/players.js';
import { mutations } from '@/store/mutations.js';

// ! Для смены лимитов менять эти переменные
const playersLimit = 1;
const groupsLimit = 3;

const getDefaultState = () => {
  return {
    /** Лимит по количеству игроков в группе */
    playersLimit: playersLimit,
    /** Лимит по количеству групп */
    groupsLimit: groupsLimit,
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
    /** Массив объектов с данными игрока и группы, в которую он попал */
    groupPlayers: [],
    /** Объект, хранящий количество игроков в группах */
    groupCounter: {
      groups: new Array(groupsLimit).fill(0),
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

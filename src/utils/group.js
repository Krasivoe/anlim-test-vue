/**
 * Определение актуальной группы для игрока
 * @param {Object} groupCounter - объект с количеством игроков в группах
 * @return {number} Актуальная группа
 */
export const selectGroup = groupCounter => {
  const countArr = groupCounter.groups;

  if (countArr[0] < 3) return 1;
  else if (countArr[1] < 3) return 2;
  else return 3;
};

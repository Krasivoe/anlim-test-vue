/**
 * Определение актуальной группы для игрока
 * @param {Object} groupCounter - объект с количеством игроков в группах
 * @param limit - лимит по количеству игроков в группе
 * @return {number} Актуальная группа
 */
export const selectGroup = (groupCounter, limit = 3) => {
  if (!groupCounter.currentGroup) return null;
  const groupsCount = groupCounter.groups;

  for (let i = 0; i < groupsCount.length + 1; i++) {
    if (groupsCount[i] <= limit - 1) return i + 1;
  }
};

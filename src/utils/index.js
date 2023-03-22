/**
 * Преобразование даты в формат dd.mm.yyyy
 * @param {string} value - Дата
 * @return {string} Преобразованная дата
 */
export const formatDate = value => {
  let datePart = value.split('-');
  return `${datePart[2]}.${datePart[1]}.${datePart[0]}`;
};

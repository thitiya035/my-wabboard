export const thaiYearDiff = 543;

export const toThaiDate = (value: Date | string | number) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month}/${year + thaiYearDiff} ${hours}:${minutes}`;
};

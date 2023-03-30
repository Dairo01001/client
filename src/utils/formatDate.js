export const formatDate = (year, mount, day) => {
  return `${year}/${mount < 10 ? "0" + +mount : mount}/${day < 10 ? "0" + day : day}`;
};

export function copFormat(number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(number);
}
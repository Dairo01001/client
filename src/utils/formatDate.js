export const formatDate = (year, mount, day) => {
  return `${year}/${mount < 10 ? "0" + mount : mount}/${day < 10 ? "0" + day : day}`;
};

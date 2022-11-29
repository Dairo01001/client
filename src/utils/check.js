export const checkFactura = ({ ComboId, TeamId }) => {
  return Boolean(ComboId && TeamId);
};

export const checkUser = ({ phone, fullName }) => {
  return Boolean(phone && fullName);
};

export const checkMoto = ({ plaque, BrandId, ColorId }) => {
  return Boolean(plaque && BrandId && ColorId);
};

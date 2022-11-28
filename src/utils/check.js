export const checkFactura = (factura) => {
  return false;
};

export const checkUser = ({ phone, fullName }) => {
  return Boolean(phone && fullName);
};

export const checkMoto = ({ plaque, BrandId, ColorId }) => {
  return Boolean(plaque && BrandId && ColorId);
};

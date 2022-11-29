export const checkFactura = ({ ComboId, paymentMethod }) => {
  return ComboId !== "" && paymentMethod !== "";
};

export const checkPerson = ({ phone, fullName }) => {
  return phone !== "" && phone.length === 10 && fullName !== "";
};

export const checkMoto = ({ plaque, BrandId, ColorId }) => {
  return (
    plaque !== "" && plaque.length === 6 && BrandId !== "" && ColorId !== ""
  );
};

const dateFormatter = (dateISO) => {
  const date = new Date(dateISO);
  const intlInstance = new Intl.DateTimeFormat('pt-BR');
  return intlInstance.format(date);
};

export default dateFormatter;

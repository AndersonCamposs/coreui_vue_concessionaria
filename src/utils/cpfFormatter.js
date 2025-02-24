const cpfFormatter = (cpf) => {
  cpf = cpf.replace(/\D/g, '');

  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2');

  return cpf;
};

export default cpfFormatter;

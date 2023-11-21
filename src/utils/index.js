export const validateEmail = (email) => {
    return email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };
  export function primeiroNome(nomeCompleto) {
    if(nomeCompleto){

      const palavras = nomeCompleto.split(" ");
      const primeiroNome = palavras[0];
      if (primeiroNome.length > 10) {
        return primeiroNome.slice(0, 10) + "...";
      } else {
        return primeiroNome;
      }
    }else{
      return 'Admin'
    }
  }
  
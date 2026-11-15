// Converte o código numérico da Open-Meteo em uma descrição compreensível.
export function traduzirClima(codigo) {
  switch (codigo) {
    case 0:
      return "Céu limpo";
    case 1:
      return "Predominantemente limpo";
    case 2:
      return "Parcialmente nublado";
    case 3:
      return "Nublado";
    case 45:
    case 48:
      return "Neblina";
    case 51:
    case 53:
    case 55:
      return "Garoa";
    case 56:
    case 57:
      return "Garoa congelante";
    case 61:
    case 63:
    case 65:
      return "Chuva";
    case 66:
    case 67:
      return "Chuva congelante";
    case 71:
    case 73:
    case 75:
    case 77:
      return "Neve";
    case 80:
    case 81:
    case 82:
      return "Pancadas de chuva";
    case 85:
    case 86:
      return "Pancadas de neve";
    case 95:
    case 96:
    case 99:
      return "Tempestade";
    default:
      return "Condição do tempo indisponível";
  }
}

// Retorna uma imagem SVG simples conforme o código meteorológico.
export function obterIconeClima(codigo) {
  let desenho;

  if ([0, 1].includes(codigo)) {
    desenho = `<circle cx="50" cy="50" r="23" fill="#F7C948"/>`;
  } else if ([2, 3, 45, 48].includes(codigo)) {
    desenho = `<path d="M25 66h48a17 17 0 0 0 0-34 24 24 0 0 0-46 7 14 14 0 0 0-2 27Z" fill="#AABBC8"/>`;
  } else if ([95, 96, 99].includes(codigo)) {
    desenho = `<path d="M25 59h48a17 17 0 0 0 0-34 24 24 0 0 0-46 7 14 14 0 0 0-2 27Z" fill="#8296A8"/><path d="m53 48-13 20h12l-5 16 19-25H54l8-11Z" fill="#F7C948"/>`;
  } else {
    desenho = `<path d="M25 55h48a17 17 0 0 0 0-34 24 24 0 0 0-46 7 14 14 0 0 0-2 27Z" fill="#AABBC8"/><path d="m36 64-5 12m25-12-5 12m25-12-5 12" stroke="#3998D0" stroke-width="6" stroke-linecap="round"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${desenho}</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

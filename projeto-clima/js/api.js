const API_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search";
const API_CLIMA = "https://api.open-meteo.com/v1/forecast";

async function consultarAPI(url) {
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar a API. Tente novamente.");
  }

  return resposta.json();
}

export async function buscarCidade(nome) {
  const parametros = new URLSearchParams({
    name: nome,
    count: "1",
    language: "pt",
    format: "json"
  });

  const dados = await consultarAPI(`${API_GEOCODING}?${parametros}`);

  if (!dados.results || dados.results.length === 0) {
    throw new Error("Cidade não encontrada. Verifique o nome digitado.");
  }

  return dados.results[0];
}

export async function buscarClima(latitude, longitude) {
  const parametros = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    timezone: "auto"
  });

  return consultarAPI(`${API_CLIMA}?${parametros}`);
}

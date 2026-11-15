import { buscarCidade, buscarClima } from "./api.js";
import { traduzirClima, obterIconeClima } from "./utils.js";

const formulario = document.querySelector("#form-clima");
const campoCidade = document.querySelector("#cidade");
const botaoBuscar = document.querySelector("#botao-buscar");
const mensagem = document.querySelector("#mensagem");
const resultado = document.querySelector("#resultado");
const boasVindas = document.querySelector("#boas-vindas");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const nomeDigitado = campoCidade.value.trim();

  if (!nomeDigitado) {
    mensagem.textContent = "Digite o nome de uma cidade.";
    return;
  }

  mensagem.textContent = "";
  botaoBuscar.disabled = true;
  botaoBuscar.textContent = "Carregando...";

  try {
    const cidade = await buscarCidade(nomeDigitado);
    const clima = await buscarClima(cidade.latitude, cidade.longitude);
    const dadosAtuais = clima.current;
    const temperaturaAtual = dadosAtuais.temperature_2m;
    const codigoClima = dadosAtuais.weather_code;

    document.querySelector("#nome-cidade").textContent =
      `${cidade.name}${cidade.admin1 ? ", " + cidade.admin1 : ""}`;

    document.querySelector("#temperatura").textContent =
      Math.round(temperaturaAtual);

    document.querySelector("#umidade").textContent =
      `${dadosAtuais.relative_humidity_2m}%`;

    document.querySelector("#vento").textContent =
      `${Math.round(dadosAtuais.wind_speed_10m)} km/h`;

    // Tradução e ícone do clima.
    document.querySelector("#descricao-clima").textContent =
      traduzirClima(codigoClima);

    const icone = document.querySelector("#icone-clima");
    icone.src = obterIconeClima(codigoClima);
    icone.alt = traduzirClima(codigoClima);

    // Esconde a mensagem inicial e mostra os resultados.
    boasVindas.classList.add("hidden");
    resultado.classList.add("visivel");
    resultado.setAttribute("aria-hidden", "false");

    // Fundo térmico conforme a temperatura.
    if (temperaturaAtual < 15) {
      document.body.style.backgroundColor = "#e0f7fa";
    } else if (temperaturaAtual > 28) {
      document.body.style.backgroundColor = "#ffe0b2";
    } else {
      document.body.style.backgroundColor = "#edf3f6";
    }
  } catch (erro) {
    mensagem.textContent = erro.message ||
      "Ocorreu um erro ao buscar as informações do clima.";
    resultado.classList.remove("visivel");
    resultado.setAttribute("aria-hidden", "true");
    boasVindas.classList.remove("hidden");
  } finally {
    botaoBuscar.disabled = false;
    botaoBuscar.textContent = "Buscar";
  }
});

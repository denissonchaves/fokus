const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarIcone = document.querySelector(".app__card-primary-button-icon");
const tempoNaTela = document.querySelector("#timer");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioPause = new Audio("./sons/pause.mp3");

musica.loop = true;
musicaFocoInput.checked = false;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused == true && musicaFocoInput.checked == true) {
    musica.play();
  } else {
    musica.pause();
  }
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;

    case "descanso-curto":
      titulo.innerHTML = `
        Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta.</strong>
      `;
      break;

    case "descanso-longo":
      titulo.innerHTML = `
        Hora de voltar a superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `;
      break;

    default:
      break;
  }
}

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarIcone.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarIcone.setAttribute("src", "./imagens/play_arrow.png");
  intervaloId = null;
}

// function zerar() {
//   if (tempoDecorridoEmSegundos == 0) {
//     clearInterval(intervaloId);
//     intervaloId = null;
//     tempoDecorridoEmSegundos = 5;
//   } else {
//     clearInterval(intervaloId);
//     intervaloId = null;
//   }
// }

function mostrarTempo() {
  const tempo = tempoDecorridoEmSegundos;
  tempoNaTela.innerHTML = `<strong>${tempo}</strong>`;
}

mostrarTempo();

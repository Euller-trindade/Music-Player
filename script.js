let musicas = [
  {
    titulo: "Supposed to Feel",
    artista: "Euller trindade",
    src: "musicas/How's It Supposed to Feel (Clean) - NEFFEX.mp3",
    img: "imagens/eletronica.jpg",
  },
  {
    titulo: "It's Only Worth It if You Work for It",
    artista: "Euller trindade",
    src: "musicas/It's Only Worth It if You Work for It (Instrumental) - NEFFEX.mp3",
    img: "imagens/instrumental.jpg",
  },
  {
    titulo: "The Itch",
    artista: "Euller trindade",
    src: "musicas/The Itch (Instrumental) - NEFFEX.mp3",
    img: "imagens/bateria.jpg",
  },
];

let musica = document.querySelector("audio");
let indexMusica = 0;
const play = document.querySelector(".botao-play");
const pause = document.querySelector(".botao-pause");
const anterior = document.querySelector(".anterior");
const proximo = document.querySelector(".proximo");
let duracaoMusica = document.querySelector(".fim");
let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao p");

renderizarMusica(indexMusica);

function renderizarMusica(index) {
  musica.setAttribute("src", musicas[index].src);
  musica.addEventListener("loadeddata", () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    duracaoMusica.textContent = segundosParaMinutos(
      Math.floor(musica.duration)
    );
  });
}

function tocaMusica() {
  pause.style.display = "block";
  play.style.display = "none";
  musica.play();
}

function pausaMusica() {
  pause.style.display = "none";
  play.style.display = "block";
  musica.pause();
}

function atualizaBarra() {
  let barra = document.querySelector("progress");
  barra.style.width =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";
  let tempoDecorrido = document.querySelector(".inicio");
  tempoDecorrido.textContent = segundosParaMinutos(
    Math.floor(musica.currentTime)
  );
}

function segundosParaMinutos(segundos) {
  let campoMinuto = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10) {
    campoSegundos = "0" + campoSegundos;
  }
  return campoMinuto + ":" + campoSegundos;
}

musica.addEventListener("timeupdate", atualizaBarra);
play.addEventListener("click", tocaMusica);
pause.addEventListener("click", pausaMusica);
anterior.addEventListener("click", () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = 2;
  }
  renderizarMusica(indexMusica);
});
proximo.addEventListener("click", () => {
  indexMusica++;
  if (indexMusica > 2) {
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});

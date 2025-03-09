import { Jogo } from './jogo.js';
import { perguntas } from './perguntas.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    new Jogo(perguntas);
    console.log("Jogo iniciado com sucesso!");
  } catch (error) {
    console.error("Erro ao iniciar o jogo:", error);
  }
});
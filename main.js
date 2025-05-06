import { Jogo } from './jogo.js';
import { perguntas } from './perguntas.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    new Jogo(perguntas);
  } catch (error) {
    console.error("Erro ao iniciar o jogo:", error);
  }
});
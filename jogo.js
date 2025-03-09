export class Jogo {
  constructor(perguntas) {
    this.perguntas = this.embaralharPerguntas(perguntas);
    this.indicePergunta = 0;
    this.pontuacao = 0;
    this.tempoTotal = 60;
    this.tempoDecorrido = 0;
    this.vidaJogador = 100;
    this.vidaProfessor = 100;
    this.respostasSelecionadas = [];

    this.elementoPergunta = document.querySelector('.texto-pergunta');
    this.elementoOpcoes = document.getElementById('opcoes');
    this.barraVidaJogador = document.getElementById('vidaJogador');
    this.elementoProfessor = document.getElementById('professor');

    this.iniciarCronometro();
    this.carregarPergunta();
  }

  iniciarCronometro() {
    this.intervalo = setInterval(() => {
      this.tempoDecorrido++;
      const progresso = (this.tempoDecorrido / this.tempoTotal) * 100;

      this.elementoProfessor.style.right = `${100 - progresso}%`;

      if (this.tempoDecorrido >= this.tempoTotal) {
        clearInterval(this.intervalo);
        this.finalizarJogo(false, 'Tempo esgotado!');
      }
    }, 1000);
  }

  atualizarBarraVida(barra, vida) {
    barra.style.width = `${vida}%`;
    if (vida > 50) {
      barra.className = 'vida cheia';
    } else if (vida > 20) {
      barra.className = 'vida media';
    } else {
      barra.className = 'vida baixa';
    }
  }

  carregarPergunta() {
    const perguntaAtual = this.perguntas[this.indicePergunta];
    this.respostasSelecionadas = [];
    this.elementoPergunta.textContent = perguntaAtual.texto;
    this.elementoOpcoes.innerHTML = '';

    perguntaAtual.opcoes.forEach(opcao => {
      const botao = document.createElement('button');
      botao.textContent = opcao;
      botao.onclick = () => this.selecionarResposta(botao, opcao);
      this.elementoOpcoes.appendChild(botao);
    });

    const botaoConfirmar = document.createElement('button');
    botaoConfirmar.id = 'confirmar';
    botaoConfirmar.textContent = 'Confirmar';
    botaoConfirmar.onclick = () => this.verificarRespostas();
    this.elementoOpcoes.appendChild(botaoConfirmar);
  }

  finalizarJogo(vitoria, mensagem) {
    alert(mensagem);
    clearInterval(this.intervalo);
    location.reload();
  }

  verificarRespostas() {
    const perguntaAtual = this.perguntas[this.indicePergunta];
    const respostasCertas = perguntaAtual.respostasCertas.sort();
    const respostasSelecionadas = this.respostasSelecionadas.sort();

    if (JSON.stringify(respostasCertas) === JSON.stringify(respostasSelecionadas)) {
      this.pontuacao++;
    } else {
      this.vidaJogador -= 20;
      this.atualizarBarraVida(this.barraVidaJogador, this.vidaJogador);
      if (this.vidaJogador <= 0) {
        this.finalizarJogo(false, 'Você perdeu! Vida esgotada.');
        return;
      }
    }

    this.indicePergunta++;
    if (this.indicePergunta >= this.perguntas.length) {
      this.finalizarJogo(true, 'Parabéns! Você respondeu todas as perguntas!');
    } else {
      this.carregarPergunta();
    }
  }

  selecionarResposta(botao, opcao) {
    if (this.respostasSelecionadas.includes(opcao)) {
      this.respostasSelecionadas = this.respostasSelecionadas.filter(resp => resp !== opcao);
      botao.classList.remove('selecionado');
    } else {
      this.respostasSelecionadas.push(opcao);
      botao.classList.add('selecionado');
    }
  }

  embaralharPerguntas(perguntas) {
    return perguntas.sort(() => Math.random() - 0.5);
  }
}
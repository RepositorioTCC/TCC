class Jogo {
    constructor(perguntas) {
        this.perguntas = this.embaralharPerguntas(perguntas);
        this.indicePergunta = 0;
        this.pontuacao = 0;
        this.tempoTotal = 30;
        this.tempoDecorrido = 0;
        this.vidaJogador = 100;
        this.vidaProfessor = 100;
        this.respostasSelecionadas = [];

        this.elementoPergunta = document.querySelector('.texto-pergunta');
        this.elementoOpcoes = document.getElementById('opcoes');
        this.barraVidaJogador = document.getElementById('vidaJogador');
        this.elementoProfessor = document.getElementById('professor');
        this.professorGif = document.getElementById('professorGif');
        this.resetGifInterval = null;
        this.currentGif = 'Caminhando.gif';

        this.startGifLoop();
        this.iniciarCronometro();
        this.carregarPergunta();
    }

    startGifLoop() {
        if (this.resetGifInterval) {
            clearInterval(this.resetGifInterval);
        }
        this.resetGifInterval = setInterval(() => {
            this.resetGifAnimation(this.currentGif);
        }, 3000);
    }

    resetGifAnimation(gifName) {
        this.professorGif.src = '';
        this.professorGif.src = `imagem/${gifName}`;
        this.currentGif = gifName;
        this.professorGif.style.width = '200px';
        this.professorGif.style.height = '200px';
    }

    changeTemporaryGif(newGif, duration = 5000) {
        clearInterval(this.resetGifInterval);
        this.resetGifAnimation(newGif);
        setTimeout(() => {
            this.resetGifAnimation('Caminhando.gif');
            this.startGifLoop();
        }, duration);
    }

    iniciarCronometro() {
    this.elementoProfessor.style.left = '0';
    
    const calcularPosicaoFinal = () => {
        return window.innerWidth - this.elementoProfessor.offsetWidth;
    };

    const posicaoFinal = calcularPosicaoFinal();
    let movimentoConcluido = false;

    this.intervalo = setInterval(() => {
        if (movimentoConcluido) return;
        
        this.tempoDecorrido++;
        
        const progresso = Math.min(100, (this.tempoDecorrido / this.tempoTotal) * 100);
        const posicaoAtual = (progresso * posicaoFinal) / 100;
        
        if (posicaoAtual >= posicaoFinal) {
            this.elementoProfessor.style.left = `${posicaoFinal}px`;
            movimentoConcluido = true;
            clearInterval(this.intervalo);
            this.finalizarJogo(false, 'Tempo esgotado!');
            return;
        }
        
        this.elementoProfessor.style.left = `${posicaoAtual}px`;
    }, 1000);

    window.addEventListener('resize', () => {
        if (movimentoConcluido) {
            this.elementoProfessor.style.left = `${calcularPosicaoFinal()}px`;
        }
    });
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
    botaoConfirmar.style.backgroundColor = 'var(--cor-vida-media)';
    botaoConfirmar.style.border = '2px solid var(--cor-borda)';
    botaoConfirmar.style.color = 'var(--cor-texto)';
    botaoConfirmar.onclick = () => this.verificarRespostas();
    this.elementoOpcoes.appendChild(botaoConfirmar);
  }

  verificarRespostas() {
    const perguntaAtual = this.perguntas[this.indicePergunta];
    const respostasCertas = perguntaAtual.respostasCertas.sort();
    const respostasSelecionadas = this.respostasSelecionadas.sort();
  
    if (JSON.stringify(respostasCertas) === JSON.stringify(respostasSelecionadas)) {
      this.pontuacao += 100;
      document.getElementById('pontuacao').textContent = `Pontuação: ${this.pontuacao}`;
      this.changeTemporaryGif('Alegria.gif');
    } else {
      this.vidaJogador -= 20;
      this.atualizarBarraVida(this.barraVidaJogador, this.vidaJogador);
      this.changeTemporaryGif('Decepcao.gif');
      if (this.vidaJogador <= 0) {
        this.finalizarJogo(false, `Você perdeu! Pontuação final: ${this.pontuacao}`);
        return;
      }
    }
  
    this.indicePergunta++;
    if (this.indicePergunta >= this.perguntas.length) {
      this.finalizarJogo(true, `Parabéns! Você respondeu todas as perguntas! Pontuação final: ${this.pontuacao}`);
    } else {
      this.carregarPergunta();
    }
  }

  finalizarJogo(vitoria, mensagem) {
    alert(mensagem);
    clearInterval(this.intervalo);
    location.reload();
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
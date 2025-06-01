document.addEventListener('DOMContentLoaded', function() {
    const MainImagemDestaque = document.querySelector('.MainImagemDestaque');
    const MainDescricaoImagem = document.querySelector('.MainDescricaoImagem');
    
    const MainDadosBiomas = {
      "MainAmazonico": {
        grande: "imagem/Amazonico.jpg",
        descricao: "Amazônico: Caracterizado por um clima equatorial quente e úmido, com alta pluviosidade ao longo do ano, está localizado na região Norte do Brasil. A vegetação predominante é a Floresta Amazônica, densa e exuberante, com grande biodiversidade. O relevo é predominantemente de planície, com áreas de várzea e igapó, além de planaltos residuais. A hidrografia é marcada pela Bacia Amazônica, a maior do mundo, com rios volumosos e extensos. Os solos são pobres em nutrientes, mas a ciclagem da matéria orgânica garante a fertilidade da floresta."
      },
      "MainCerrado": {
        grande: "imagem/Cerrado.jpg",
        descricao: "Cerrado: Concebido por um mosaico de paisagens que incluem vastas savanas, campos rupestres e matas ciliares, refletindo a intrincada interação entre o clima tropical sazonal, com estações secas e chuvosas bem definidas, e a geomorfologia de planaltos e chapadas. A vegetação ambientada a essa sazonalidade, com árvores de troncos retorcidos e cascas grossas, convive com a rica biodiversidade de fauna e flora, que se adaptaram aos solos ácidos e pobres em nutrientes. A presença de extensas redes hidrográficas, como as bacias do Paraná e do Araguaia-Tocantins, evidencia a importância desse domínio como berço de rios que irrigam grande parte do território brasileiro."
      },
      "MainMaresDeMorros": {
        grande: "imagem/MaresDeMorros.jpg",
        descricao: "Mares de Morros: Trata-se de uma formação muito antiga, datada da Era Pré-Cambriana, cujas feições do relevo apresentam morros arredondados ou mamelonares, resultantes da intensa erosão em áreas de clima tropical úmido. Estende-se pela faixa litorânea oriental do Brasil, desde a região Nordeste até a região Sul, avançando para o sudeste. O clima quente e úmido, com chuvas abundantes, favorece a formação de solos profundos e férteis. A proximidade da costa e a ocupação humana histórica implicaram em intensa urbanização e desmatamento da vegetação original, a Mata Atlântica."
      },
      "MainCaatinga": {
        grande: "imagem/Caatinga.jpg",
        descricao: "Caatinga: É caracterizado por um clima semiárido, com baixos índices pluviométricos e longos períodos de seca, resultando em uma vegetação xerófila adaptada a essas condições, como folhas transformadas em espinhos e caules que armazenam água. O relevo é marcado por depressões e planaltos e os solos são rasos e pedregosos. A Caatinga é um ecossistema único e frágil, com uma rica biodiversidade adaptada às condições adversas do clima presente no interior da região Nordeste que se estende até o norte de Minas Gerais."
      },
      "MainAraucaria": {
        grande: "imagem/Araucarias.jpg",
        descricao: "Araucária: O clima subtropical úmido, com estações bem definidas e chuvas distribuídas ao longo do ano atua sobre o relevo de morros, serras e elevações com topos planos. A vegetação predominante é a Araucária ou Mata dos Pinhais, com árvores aciculifoliadas. Os solos, em diferentes estágios de evolução e profundidade, incluem o fértil solo de terra roxa. A rede de drenagem dispõe de grande potencial para geração de energia hidráulica, com seus rios perenes e nascentes que abastecem importantes bacias hidrográficas como a do Paraná, do Paraguai e do Uruguai."
      },
      "MainPradaria": {
        grande: "imagem/Pradarias.jpg",
        descricao: "Pradaria: Localizado no extremo sul do Brasil, é caracterizado por um relevo suavemente ondulado, conhecido como coxilhas, e um clima subtropical com estações bem definidas. A vegetação predominante é herbácea, com gramíneas e outras plantas rasteiras, adaptadas aos invernos frios e verões quentes. A pecuária extensiva é uma atividade tradicional nessa região devido às vastas áreas de pastagem natural."
      },
    };
  
    MainImagemDestaque.src = MainDadosBiomas.MainAmazonico.grande;
    MainImagemDestaque.alt = "Amazônia em pixel art";
    MainDescricaoImagem.textContent = MainDadosBiomas.MainAmazonico.descricao;
    MainDescricaoImagem.style.display = 'block';

    let MainBiomaDestaque = "MainAmazonico";
    const MainImagensBiomas = document.querySelectorAll('.MainImagemBioma');
    
    MainImagemDestaque.addEventListener('click', MainResetarDestaque);
    
    MainImagensBiomas.forEach(img => {
        img.addEventListener('click', function() {
            MainTrocarBiomaDestaque(this);
        });
    });

    function MainTrocarBiomaDestaque(biomaClicado) {
        const MainClasseBioma = Array.from(biomaClicado.classList).find(cls => 
            cls.startsWith('Main') && cls !== 'MainImagemBioma');
        
        if (MainClasseBioma && MainDadosBiomas[MainClasseBioma]) {
            const srcTemp = MainImagemDestaque.src;
            const altTemp = MainImagemDestaque.alt;

            MainImagemDestaque.src = MainDadosBiomas[MainClasseBioma].grande;
            MainImagemDestaque.alt = biomaClicado.alt;
            MainDescricaoImagem.textContent = MainDadosBiomas[MainClasseBioma].descricao;
            MainDescricaoImagem.style.display = 'block';
            
            biomaClicado.src = srcTemp;
            biomaClicado.alt = altTemp;
            
            MainBiomaDestaque = MainClasseBioma;
        }
    }

    function MainResetarDestaque() {
        if (MainBiomaDestaque !== "MainAmazonico") {
            const MainBiomaOriginal = document.querySelector(`.${MainBiomaDestaque}`);
            
            if (MainBiomaOriginal) {
                const srcTemp = MainImagemDestaque.src;
                const altTemp = MainImagemDestaque.alt;
                
                MainImagemDestaque.src = MainDadosBiomas.MainAmazonico.grande;
                MainImagemDestaque.alt = "Amazônia em pixel art";
                MainDescricaoImagem.textContent = MainDadosBiomas.MainAmazonico.descricao;
                
                MainBiomaOriginal.src = MainDadosBiomas[MainBiomaDestaque].grande;
                MainBiomaOriginal.alt = altTemp;
            }
            
            MainBiomaDestaque = "MainAmazonico";
        }
    }
});
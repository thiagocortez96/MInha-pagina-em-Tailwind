
let playerScore = 0;
    let cpuScore = 0;

    const emojis = {
      pedra: '✊',
      papel: '✋',
      tesoura: '✌️'
    };

    function play(playerChoice) {
      const choices = ['pedra', 'papel', 'tesoura'];
      const cpuChoice = choices[Math.floor(Math.random() * 3)];

      document.getElementById('playerChoice').textContent = emojis[playerChoice];
      document.getElementById('cpuChoice').textContent = emojis[cpuChoice];

      let result = '';

      if (playerChoice === cpuChoice) {
        result = 'EMPATE!';
      } else if (
        (playerChoice === 'pedra' && cpuChoice === 'tesoura') ||
        (playerChoice === 'papel' && cpuChoice === 'pedra') ||
        (playerChoice === 'tesoura' && cpuChoice === 'papel')
      ) {
        result = 'VOCÊ VENCEU!';
        playerScore++;
      } else {
        result = 'VOCÊ PERDEU!';
        cpuScore++;
      }

      document.getElementById('resultText').textContent = result;
      document.getElementById('playerScore').textContent = playerScore;
      document.getElementById('cpuScore').textContent = cpuScore;
    }

    function resetGame() {
      playerScore = 0;
      cpuScore = 0;

      document.getElementById('playerScore').textContent = 0;
      document.getElementById('cpuScore').textContent = 0;
      document.getElementById('playerChoice').textContent = '❔';
      document.getElementById('cpuChoice').textContent = '❔';
      document.getElementById('resultText').textContent = 'Escolha sua jogada!';
    }

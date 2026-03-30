const words = [
"CASAS","CARRO","PEDRA","PAPEL","GATOS","CACHO","LIVRO","MARTE","PLANO","TREVO",
"GRAMA","CHAVE","PORTA","NINJA","FALSO","VERDE","PRETO","BRISA","CLARO","FORTE",
"VENTO","CAMPO","SORTE","MAGIA","SONHO","RISCO","LINHA","PONTO","FRASE","TEXTO",
"DADOS","TERRA","AGUAS","AREIA","ILHAS","NORTE","LESTE","OESTE","SULDA","MUNDO",
"AMIGO","FAMIL","CASAL","FILHO","UNIAO","GRUPO","CLUBE","JOGOS","FASES","PODER",
"MAGOS","ARMAS","ESCUD","VIDAS","RISOS","CHORO","MEDOS","AMORR","RAIVA","CALMA",
"MENTE","CORPO","FORCA","SAUDE","TRENO","CORRE","PULAR","NADAR","ANDAR","PARAR",
"CRIAR","IDEIA","PLANO","AGORA","ANTES","NUNCA","SEMPRE","TALVE","CARTA","EMAIL",
"VIDEO","MIDIA","POSTE","REDES","BLOGS","LINKS","BANCO","GRANA","VALOR","PRECO",
"CUSTO","VENDA","LUCRO","PERDA","PAGAR","FESTA","DANCA","CANTO","RITMO","BANDA",
"SHOWS","PALCO","ARTES","FILME","SERIE","CENAS","DRAMA","COMED","MEXER","COZIN",
"FALAR","OUVIR","VERBO","LERDO","RAPID","CERTO","ERRAR","TENTAR","GANHO","PERCO"
];

const secret = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentGuess = "";
const maxAttempts = 7;

const board = document.getElementById("board");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");
const hiddenInput = document.getElementById("hiddenInput");

// foco mobile
document.body.addEventListener("click", () => hiddenInput.focus());

// criar board
for (let i = 0; i < maxAttempts; i++) {
  const row = document.createElement("div");
  row.className = "grid grid-cols-5 gap-2";

  for (let j = 0; j < 5; j++) {
    const cell = document.createElement("div");
    cell.className = "h-12 flex items-center justify-center border border-gray-600 text-lg";
    row.appendChild(cell);
  }

  board.appendChild(row);
}

// layout teclado
const keysLayout = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"]
];

// criar teclado
keysLayout.forEach(row => {
  const div = document.createElement("div");
  div.className = "flex justify-center gap-1";

  row.forEach(key => {
    const btn = document.createElement("button");
    btn.textContent = key;
    btn.className = "px-2 py-2 bg-gray-700 rounded text-xs flex-1";

    if (key === "ENTER") btn.classList.add("bg-blue-600");
    if (key === "⌫") btn.classList.add("bg-red-600");

    btn.onclick = () => handleKey(key);
    div.appendChild(btn);
  });

  keyboard.appendChild(div);
});

// função principal de input
function handleKey(key) {
  if (message.textContent) return;

  if (key === "⌫") {
    currentGuess = currentGuess.slice(0, -1);
    updateRow();
    return;
  }

  if (key === "ENTER") {
    submitGuess();
    return;
  }

  if (currentGuess.length < 5) {
    currentGuess += key;
    updateRow();
  }
}

// atualiza linha
function updateRow() {
  const row = board.children[currentRow];
  for (let i = 0; i < 5; i++) {
    row.children[i].textContent = currentGuess[i] || "";
  }
}

// envia tentativa
function submitGuess() {
  hiddenInput.value = "";

  if (currentGuess.length !== 5) return;

  const row = board.children[currentRow];

  for (let i = 0; i < 5; i++) {
    const cell = row.children[i];
    const letter = currentGuess[i];

    if (letter === secret[i]) {
      cell.classList.add("bg-green-600");
    } else if (secret.includes(letter)) {
      cell.classList.add("bg-yellow-500");
    } else {
      cell.classList.add("bg-gray-700");
    }
  }

  if (currentGuess === secret) {
    message.textContent = "Você venceu!";
    return;
  }

  currentRow++;
  currentGuess = "";

  if (currentRow === maxAttempts) {
    message.textContent = "Você perdeu! Palavra: " + secret;
  }
}

// teclado físico + mobile
hiddenInput.addEventListener("input", (e) => {
  const val = e.target.value.toUpperCase();
  currentGuess = val.slice(0,5);
  updateRow();
});

hiddenInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitGuess();
  }

  if (e.key === "Backspace") {
    currentGuess = currentGuess.slice(0, -1);
    updateRow();
  }
});
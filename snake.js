const canvas = document.getElementById("snakeGame");
        const ctx = canvas.getContext("2d");
        const scoreElement = document.getElementById("score");
        const levelDisplay = document.getElementById("levelDisplay");
        const menu = document.getElementById("menu");
        const gameOverBox = document.getElementById("gameOverBox");
        const finalScoreText = document.getElementById("finalScore");
        const deathReasonText = document.getElementById("deathReason");

        const box = 20;
        let snake, food, poison, banana, score, d, gameLoop;
        let poisonTimer, bananaTimer;

        function getRandomPos() {
            return {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
        }

        function initVars() {
            snake = [{ x: 10 * box, y: 10 * box }];
            food = getRandomPos();
            poison = null;
            banana = null;
            score = 0;
            d = null;
            scoreElement.innerHTML = "0";
            clearTimeout(poisonTimer);
            clearTimeout(bananaTimer);
            manageSpecialItems();
        }

        // Lógica para aparecer Veneno e Banana aleatoriamente
        function manageSpecialItems() {
            // Veneno ☠️ aparece a cada 5-10 seg e fica por 4 seg
            poisonTimer = setTimeout(() => {
                poison = getRandomPos();
                setTimeout(() => { poison = null; }, 4000);
                manageSpecialItems();
            }, Math.random() * 5000 + 5000);

            // Banana 🍌 aparece a cada 8-15 seg e fica por 3 seg
            bananaTimer = setTimeout(() => {
                banana = getRandomPos();
                setTimeout(() => { banana = null; }, 3000);
            }, Math.random() * 7000 + 8000);
        }

        document.addEventListener("keydown", (e) => {
            if(e.keyCode == 37 && d != "RIGHT") d = "LEFT";
            else if(e.keyCode == 38 && d != "DOWN") d = "UP";
            else if(e.keyCode == 39 && d != "LEFT") d = "RIGHT";
            else if(e.keyCode == 40 && d != "UP") d = "DOWN";
        });

        function drawEmoji(emoji, x, y) {
            ctx.font = "16px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(emoji, x + box/2, y + box/2);
        }

        function draw() {
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Desenhar Itens
            drawEmoji("🍎", food.x, food.y);
            if(poison) drawEmoji("☠️", poison.x, poison.y);
            if(banana) drawEmoji("🍌", banana.x, banana.y);

            // Desenhar Cobra
           for(let i = 0; i < snake.length; i++) {
    // A cabeça (i == 0) terá um verde mais escuro, o corpo um verde mais claro
    ctx.fillStyle = (i == 0) ? "#10b981" : "#34d399"; 
    
    // Desenha o quadrado
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    
    // Desenha uma borda fina para separar os gomos da cobra
    ctx.strokeStyle = "#064e3b";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
}

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if(d == "LEFT") snakeX -= box;
            if(d == "UP") snakeY -= box;
            if(d == "RIGHT") snakeX += box;
            if(d == "DOWN") snakeY += box;

            // Comer Maçã
            if(snakeX == food.x && snakeY == food.y) {
                score++;
                food = getRandomPos();
            } 
            // Comer Banana
            else if(banana && snakeX == banana.x && snakeY == banana.y) {
                score += 3;
                banana = null;
            }
            // Comer Veneno
            else if(poison && snakeX == poison.x && snakeY == poison.y) {
                endGame("VOCÊ FOI ENVENENADO! ☠️");
                return;
            }
            else {
                if(d) snake.pop();
            }

            scoreElement.innerHTML = score;
            let newHead = { x: snakeX, y: snakeY };

            // Colisões Parede/Corpo
            if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || (d && snake.some((seg, index) => index !== 0 && seg.x === newHead.x && seg.y === newHead.y))) {
                endGame("GAME OVER! 💀");
                return;
            }

            if(d) snake.unshift(newHead);
        }

        function endGame(reason) {
            clearInterval(gameLoop);
            clearTimeout(poisonTimer);
            clearTimeout(bananaTimer);
            deathReasonText.innerText = reason;
            finalScoreText.innerText = score;
            gameOverBox.classList.remove("hidden");
        }

        function closeGameOver() {
            gameOverBox.classList.add("hidden");
            menu.classList.remove("hidden");
            menu.style.opacity = "1";
        }

        function startGame(speed, levelName) {
            initVars();
            levelDisplay.innerHTML = levelName;
            menu.style.opacity = "0";
            setTimeout(() => menu.classList.add("hidden"), 300);
            if(gameLoop) clearInterval(gameLoop);
            gameLoop = setInterval(draw, speed);
        }
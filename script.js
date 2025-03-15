document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll('.stars .star');
    const ratingInput = document.getElementById('rating');
    const gameList = document.getElementById('gameList');

    // Função para avaliar o filme e serie
    function rateGame(starsCount) {
        stars.forEach((star, i) => {
            star.classList.toggle('selected', i < starsCount);
        });
        ratingInput.value = starsCount;
    }

    // Tornar a função global
    window.rateGame = rateGame;

    // Função para adicionar filmes e series
    window.addGame = function () {
        const gameInput = document.getElementById('gameInput');
        const categorySelect = document.getElementById('categorySelect');
        const rating = parseInt(ratingInput.value);

        const gameName = gameInput.value.trim();
        const category = categorySelect.value;

        if (gameName !== '' && rating > 0) {
            const gameData = { gameName, category, rating };
            createGameItem(gameData);
            saveGames();
            resetForm();
        } else {
            alert('Por favor, preencha todos os campos e faça uma avaliação.');
        }
    };

    // Criar um item da lista
    function createGameItem(gameData) {
        const { gameName, category, rating } = gameData;

        const li = document.createElement('li');

        const gameInfo = document.createElement('div');
        gameInfo.classList.add('game-info');
        gameInfo.innerHTML = `
            <strong class="game-title">${gameName}</strong>
            <span>${category}</span>
        `;

        const starsDisplay = document.createElement('span');
        starsDisplay.classList.add('stars-display');
        starsDisplay.innerHTML = `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = function () {
            li.remove();
            saveGames();
        };

        li.appendChild(gameInfo);
        li.appendChild(starsDisplay);
        li.appendChild(removeButton);
        gameList.appendChild(li);
    }

    // Função para salvar os filmes e series no LocalStorage
    function saveGames() {
        const games = [];
        gameList.querySelectorAll('li').forEach(li => {
            const gameName = li.querySelector('.game-title').textContent;
            const category = li.querySelector('span').textContent;
            const rating = li.querySelector('.stars-display').textContent.split('★').length - 1;
            games.push({ gameName, category, rating });
        });
        localStorage.setItem('games', JSON.stringify(games));
    }

    // Carregar filmes e series salvos
    function loadGames() {
        const games = JSON.parse(localStorage.getItem('games')) || [];
        games.forEach(createGameItem);
    }

    // Função para limpar toda a lista
    window.clearAllGames = function () {
        gameList.innerHTML = '';
        localStorage.removeItem('games');
    };

    // Resetar formulário
    function resetForm() {
        document.getElementById('gameInput').value = '';
        ratingInput.value = 0;
        stars.forEach(star => star.classList.remove('selected'));
    }

    // Carregar filmes e series ao iniciar
    loadGames();
});

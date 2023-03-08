const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];
let selectedLetters = [];
let score = 0;
let guessedWords = [];


const ground = new Image();
ground.src = "img/i.jpg";

function drawGame() {
	ctx.drawImage(ground, 0, 0);
}


// Генерация случайных чисел
selectedLetters = [];
for (let i = 0; i < 3; i++) {
  const randomIndex = Math.floor(Math.random() * letters.length);
  const randomLetter = letters[randomIndex];
  selectedLetters.push(randomLetter);
  letters.splice(randomIndex, 1);
}
document.getElementById('letters').innerText = selectedLetters.join(' ');


// Проверка, содержит ли слово выбранные буквы
function checkWord(word) {
  for (let i = 0; i < selectedLetters.length; i++) {
    if (word.indexOf(selectedLetters[i]) === -1) {
      return false;
    }
  }
  return true;
}

// Пользовательский ввод
function processInput() {
  // Сообщение о загрузке
  document.getElementById('loading-message').style.display = 'block';

  const word = document.getElementById('input').value.toUpperCase();
  if (word.length < 3) {
    document.getElementById('loading-message').style.display = 'none'; 
    document.getElementById('message').innerText = 'Мало букв';
  } else if (!checkWord(word)) {
    document.getElementById('loading-message').style.display = 'none';
    document.getElementById('message').innerText = 'В этом слове не все необходимые буквы';
  } else {
    //Загрузка словаря
    fetch('https://raw.githubusercontent.com/VasilyFmnkhNSTU/slovar/main/russian_nouns.txt')
  .then(response => response.text())
  .then(data => {
    // Конвертаиця
    data = data.toUpperCase();
    
    // Разбиение словаяря на слова
    const dictionary = data.split('\n').map(word => word.trim());
    console.log(dictionary);
    // Проверка, есть ли введенное слово в словаре
    if (dictionary.includes(word) && !guessedWords.includes(word)) {
      score++;
      guessedWords.push(word);
      document.getElementById('message').innerText = '';
      document.getElementById('score').innerText = `Score: ${score}`;
      document.getElementById('input').value = '';
      generateLetters();
    } else if (guessedWords.includes(word)) {
      document.getElementById('message').innerText = 'Это слово уже было';
    } else {
      document.getElementById('message').innerText = 'Такого слова не существует';
    }
  })
  }
}
document.getElementById('submit').addEventListener('click', processInput);




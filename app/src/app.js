import $ from '../vendor/jquery-2.1.4.js';
export default init;

const state = {
  word: null,
  inputWord: null,
  tries: new Set(),
  won: false
};

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

/** Game logic **/

function init(words) {
  state.word = words[getRandom(words.length)];
  state.tries = new Set();
  state.inputWord = emptyWord(state.word);
  state.won = false;
  console.log(state.word);

  initView(state);
}

function initView(state) {
  const wrapper = $('#app');
  wrapper.append(`<div id="title">Hangman</div>`);
  wrapper.append(`<ul></ul>`);

  draw(wrapper, state.inputWord);

  $('body').on('keypress', (event) => {
    const key = event.key || String.fromCharCode(event.keyCode);

    validate(key, state.inputWord, state.word);

    draw(wrapper, state.inputWord, state.won);
  });
}

function emptyWord(word) {
  return new Array(word.length).fill('_');
}

function validate(letter, word, solution) {
  if (state.tries.has(letter)) {
    console.log('already added that');
  } else if (solution.includes(letter)) {
    addLetter(letter, word, solution);
  } else {
    console.log('wrong!');
  }

  state.tries.add(letter);

  if (!word.includes('_')) {
    state.won = true;
    console.log('win!');
  }
}

function addLetter(letter, word, solution) {
  for (let i = 0; i < word.length; i += 1) {
    if (solution[i] == letter) {
      word[i] = letter;
    }
  }
}

/** UI stuff **/
function draw(wrapper, word, won) {
  const charList = word.map((char) => `<li>${char}</li>`);
  wrapper.find('ul').html(charList);

  if (won) {
    wrapper.find('#title').html('You won!');
  }
}
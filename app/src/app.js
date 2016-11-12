const HANGMAN = {
  state: {
    word: null,
    inputWord: null,
    tries: new Set(),
    won: false
  },

  getRandom(max){
    return Math.floor(Math.random() * max);
  },

  /** Game logic **/

  init(words) {
    this.state.word = words[this.getRandom(words.length)];
    this.state.tries = new Set();
    this.state.inputWord = this.emptyWord(this.state.word);
    this.state.won = false;
    console.log(this.state.word);

    this.initView(this.state);
  },

  initView(state) {
    const wrapper = $('#app');
    wrapper.append(`<div id="title">Hangman</div>`);
    wrapper.append(`<ul></ul>`);

    this.draw(wrapper, state.inputWord);

    $('body').on('keypress', (event) => {
      const key = event.key || String.fromCharCode(event.keyCode);

      this.validate(key, state.inputWord, state.word);

      this.draw(wrapper, state.inputWord, state.won);
    });
  },

  emptyWord(word) {
    return new Array(word.length).fill('_');
  },

  validate(letter, word, solution) {
    if (this.state.tries.has(letter)) {
      console.log('already added that');
    } else if (solution.includes(letter)) {
      this.addLetter(letter, word, solution);
    } else {
      console.log('wrong!');
    }

    this.state.tries.add(letter);

    if (!word.includes('_')) {
      this.state.won = true;
      console.log('win!');
    }
  },

  addLetter(letter, word, solution) {
    for (let i = 0; i < word.length; i += 1) {
      if (solution[i] == letter) {
        word[i] = letter;
      }
    }
  },

  /** UI stuff **/
  draw(wrapper, word, won) {
    const charList = word.map((char) => `<li>${char}</li>`);
    wrapper.find('ul').html(charList);

    if (won) {
      wrapper.find('#title').html('You won!');
    }
  }
};
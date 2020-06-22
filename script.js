class Fifteen {
  constructor() {
    this.leaderArray = JSON.parse(localStorage.getItem('leaderArray')) || [];
    this.countMove = +(localStorage.getItem('countMove')) || 0;
    this.size = +(localStorage.getItem('size')) || 4;
    this.gameFieldArr = JSON.parse(localStorage.getItem('gameFieldArr')) || [];
    this.min = JSON.parse(localStorage.getItem('min')) || 0;
    this.sec = JSON.parse(localStorage.getItem('sec')) || 0;
  }

  createDOM() {
    this.box = document.createElement('div');
    this.box.setAttribute('id', 'box');
    document.body.append(this.box);
    this.stopGame = document.createElement('div');
    this.stopGame.setAttribute('id', 'stopGame');
    document.body.append(this.stopGame);
    this.stopGameText = document.createElement('p');
    this.stopGameText.textContent = 'click «mix and start» to start game';
    this.stopGame.append(this.stopGameText);

    this.congratulation = document.createElement('div');
    this.congratulation.setAttribute('id', 'congratulation');
    document.body.append(this.congratulation);

    this.messageBlock = document.createElement('div');
    this.messageBlock.setAttribute('id', 'messageBlock');
    this.congratulation.append(this.messageBlock);
    this.buttonMessageOk = document.createElement('button');
    this.buttonMessageOk.textContent = 'Close';
    this.buttonMessageOk.classList.add('btnMessage');
    this.congratulation.append(this.buttonMessageOk);

    this.changeSizeDiv = document.createElement('div');
    this.textChangeSize = document.createElement('p');
    this.changeSizeDiv.setAttribute('id', 'change-size');
    document.body.append(this.changeSizeDiv);
    this.changeSizeDiv.prepend(this.textChangeSize);

    this.sizeThree = document.createElement('span');
    this.sizeThree.textContent = '3x3';
    this.sizeFour = document.createElement('span');
    this.sizeFour.textContent = '4x4';
    this.sizeFive = document.createElement('span');
    this.sizeFive.textContent = '5x5';
    this.sizeSix = document.createElement('span');
    this.sizeSix.textContent = '6x6';
    this.sizeSeven = document.createElement('span');
    this.sizeSeven.textContent = '7x7';
    this.sizeEight = document.createElement('span');
    this.sizeEight.textContent = '8x8';

    this.changeSizeDiv.append(this.sizeThree);
    this.changeSizeDiv.append(this.sizeFour);
    this.changeSizeDiv.append(this.sizeFive);
    this.changeSizeDiv.append(this.sizeSix);
    this.changeSizeDiv.append(this.sizeSeven);
    this.changeSizeDiv.append(this.sizeEight);

    this.leaderboard = document.createElement('button');
    this.leaderboard.textContent = 'leaderboard';
    this.leaderboard.classList.add('btn');
    document.body.prepend(this.leaderboard);

    this.save = document.createElement('button');
    this.save.textContent = 'save';
    this.save.classList.add('btn');
    document.body.prepend(this.save);

    this.stop = document.createElement('button');
    this.stop.setAttribute('id', 'stop');
    this.stop.classList.add('btn');
    this.stop.textContent = 'stop';
    document.body.prepend(this.stop);

    this.start = document.createElement('button');
    this.start.classList.add('btn');
    this.start.textContent = 'mix and start';
    document.body.prepend(this.start);

    this.count = document.createElement('div');
    this.count.classList.add('infoNum');
    this.count.textContent = `Count: ${this.countMove}`;
    document.body.prepend(this.count);

    this.timer = document.createElement('div');
    this.timer.classList.add('infoNum');
    this.timer.textContent = 'TIME';
    this.timerId = setInterval(() => this.tick(), 1000);
    document.body.prepend(this.timer);

    this.leaderboardTable = document.createElement('div');
    this.leaderboardTable.setAttribute('id', 'leaderboardTable');
    document.body.prepend(this.leaderboardTable);
    this.buttonLeadereOk = document.createElement('button');
    this.buttonLeadereOk.textContent = 'Close';
    this.buttonLeadereOk.setAttribute('id', 'buttonLeadereOk');
    this.buttonLeadereOk.classList.add('btnMessage');
    document.body.append(this.buttonLeadereOk);
  }

  tick() {
    this.sec++;
    if (this.sec >= 60) {
      this.min++;
      this.sec -= 60;
    } if (this.min < 10) {
      if (this.sec < 10) {
        this.timer.textContent = `0${this.min}:0${this.sec}`;
      } else {
        this.timer.textContent = `0${this.min}:${this.sec}`;
      }
    } else if (this.sec < 10) {
      this.timer.textContent = `${+this.min}:0${this.sec}`;
    } else {
      this.timer.textContent = `${+this.min}:${this.sec}`;
    }
  }

  createGame(size) {
    if (!localStorage.getItem('countMove')) {
      this.stopGame.style.display = 'block';
    }
    this.textChangeSize.innerHTML = `<b>Current size: ${size}x${size}</b><br>Other field sizes:`;
    const fieldSize = size ** 2;
    if (this.gameFieldArr.length === 0) {
      for (let j = 1; j < fieldSize; j++) {
        this.gameFieldArr.push(j);
      }
      this.gameFieldArr.push('space');
    }
    this.draw();
  }

  changeSizeField(size) {
    clearInterval(this.timerId);
    this.timerId = 0;
    this.stopGame.style.display = 'block';
    this.size = size;
    this.gameFieldArr = [];
    this.changeResize();
    this.createGame(size);
  }

  changeSizeListener(event) {
    if (event.target.tagName !== 'SPAN') {
      return;
    }
    const div = document.querySelector('.k1');
    const widthDiv = parseFloat(getComputedStyle(div).width);
    this.box.style.width = `${this.size * widthDiv + 2}px`;
    this.box.style.height = `${this.size * widthDiv}px`;
    const target = parseInt(event.target.textContent);
    if (this.size === target) {
      return;
    }
    this.changeSizeField(target);
  }

  draw() {
    this.box.innerHTML = '';
    for (let i = 0; i < this.gameFieldArr.length; i++) {
      const newElement = document.createElement('div');
      newElement.textContent = this.gameFieldArr[i];
      newElement.classList.add(`k${this.gameFieldArr[i]}`);
      newElement.classList.add('box');
      newElement.setAttribute('draggable', 'true');
      this.box.append(newElement);
    }
    document.querySelector('.kspace').classList.add('visibility');
    document.querySelector('.kspace').addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    document.querySelector('.kspace').addEventListener('drop', () => {
      this.movePuzzle(this.dropItem);
    });
    this.changeResize();
  }

  addListener() {
    this.stop.addEventListener('click', () => {
      this.stopGame.style.display = 'block';
      clearInterval(this.timerId);
      this.timerId = 0;
    });
    this.buttonLeadereOk.addEventListener('click', () => {
      this.buttonLeadereOk.style.display = 'none';
      this.leaderboardTable.style.display = 'none';
    });

    this.buttonMessageOk.addEventListener('click', () => {
      this.congratulation.style.display = 'none';
    });
    this.box.addEventListener('click', (event) => this.movePuzzle(event.target));
    this.start.addEventListener('click', () => this.shuffleArr());
    this.changeSizeDiv.addEventListener('click', (event) => this.changeSizeListener(event));
    this.save.addEventListener('click', () => this.saveData());
    this.leaderboard.addEventListener('click', () => this.leaderboardShow());
    this.box.addEventListener('dragstart', (event) => {
      this.dropItem = event.toElement;
    });
    window.addEventListener('resize', () => this.changeResize());
  }

  changeResize() {
    const widthWindow = document.documentElement.clientWidth;
    const div = document.querySelector('.k1');
    const widthDiv = parseFloat(getComputedStyle(div).width);
    if (widthWindow > '900') {
      this.box.style.width = `${this.size * 100 + 2}px`;
      this.box.style.height = `${this.size * 100}px`;
    }
    if (widthWindow < '900') {
      this.box.style.width = `${this.size * 75 + 2}px`;
      this.box.style.height = `${this.size * 75}px`;
    }
    if (widthWindow < '600') {
      this.box.style.width = `${this.size * 30 + 2}px`;
      this.box.style.height = `${this.size * 30}px`;
    }
    if (widthWindow < '300') {
      this.box.style.width = `${this.size * 25 + 2}px`;
      this.box.style.height = `${this.size * 25}px`;
    }
  }

  saveData() {
    localStorage.setItem('countMove', this.countMove);
    localStorage.setItem('min', this.min);
    localStorage.setItem('sec', this.sec);
    localStorage.setItem('size', this.size);
    localStorage.setItem('gameFieldArr', JSON.stringify(this.gameFieldArr));
    setTimeout(() => alert('Your game has been saved!', 1000));
  }

  getTransform(div) {
    const arr = getComputedStyle(div).transform.split(',');
    const transformY = parseInt(arr[arr.length - 1]);
    const transformX = parseInt(arr[arr.length - 2]);
    const width = parseFloat(getComputedStyle(div).width);
    return [transformY, transformX, width];
  }

  movePuzzle(event) {
    const index = event.textContent;
    const space = this.gameFieldArr.indexOf('space') + 1;
    const square = this.gameFieldArr.indexOf(+index) + 1;
    const spaceDiv = document.querySelector(`.kspace`);
    const squareDiv = document.querySelector(`.k${index}`);
    if (space === square + this.size) {
      let [transformY, transformX, width] = this.getTransform(spaceDiv);
      spaceDiv.style.transform = `translate(${transformX}px, ${transformY - width}px)`;
      [transformY, transformX, width] = this.getTransform(squareDiv);
      squareDiv.style.transform = `translate(${transformX}px, ${transformY + width}px)`;
      this.swap(space, square);
    } else if (space === square - this.size) {
      let [transformY, transformX, width] = this.getTransform(spaceDiv);
      spaceDiv.style.transform = `translate(${transformX}px, ${transformY + width}px)`;
      [transformY, transformX, width] = this.getTransform(squareDiv);
      squareDiv.style.transform = `translate(${transformX}px, ${transformY - width}px)`;
      this.swap(space, square);
    } else if (space === square - 1) {
      if ((square - 1) % this.size === 0) {
        return;
      }
      let [transformY, transformX, width] = this.getTransform(spaceDiv);
      spaceDiv.style.transform = `translate(${transformX + width}px, ${transformY}px)`;
      [transformY, transformX, width] = this.getTransform(squareDiv);
      squareDiv.style.transform = `translate(${transformX - width}px, ${transformY}px)`;
      this.swap(space, square);
    } else if (space === square + 1) {
      if ((space - 1) % this.size === 0) {
        return;
      }
      let [transformY, transformX, width] = this.getTransform(spaceDiv);
      spaceDiv.style.transform = `translate(${transformX - width}px, ${transformY}px)`;
      [transformY, transformX, width] = this.getTransform(squareDiv);
      squareDiv.style.transform = `translate(${transformX + width}px, ${transformY}px)`;
      this.swap(space, square);
    }
  }

  swap(space, square) {
    const a = this.gameFieldArr[space - 1];
    this.gameFieldArr[space - 1] = this.gameFieldArr[square - 1];
    this.gameFieldArr[square - 1] = a;
    this.countMove += 1;
    this.count.textContent = `Count: ${this.countMove}`;
    this.winGame();
  }

  shuffleArr() {
    this.countMove = 0;
    this.stopGame.style.display = 'none';
    console.log(this.min, this.sec)
    this.min = 0;
    this.sec = 0;
    this.count.textContent = `Count: ${this.countMove}`;
    this.timer.textContent = '00:00';
    this.gameFieldArr.sort(() => Math.random() - 0.5);
    this.draw();
    if (this.timerId) {
      return;
    }
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  winGame() {
    for (let i = 0; i < this.gameFieldArr.length - 2; i++) {
      if (!(this.gameFieldArr[i] < this.gameFieldArr[i + 1])) {
        return;
      }
    }
    clearInterval(this.timerId);
    this.timerId = 0;
    setTimeout(() => this.congratulation.style.display = 'block', 200);
    this.messageBlock.innerHTML = `<b>YOU WON!</b> <br> Moves: ${this.countMove}<br> Time: ${this.timer.textContent}`;
    this.leaderArray.push(`${this.countMove} ${this.timer.textContent}`);
    this.shuffleArr();
  }

  leaderboardShow() {
    this.leaderboardTable.style.display = 'block';
    this.buttonLeadereOk.style.display = 'block';
    this.writeOnLeaderboadrd();
  }

  writeOnLeaderboadrd() {
    this.leaderboardTable.innerHTML = 'TOP SCORES<br><br><br>';
    this.leaderArray.sort((a, b) => parseInt(a) - parseInt(b));
    for (let z = 0; z < this.leaderArray.length; z++) {
      this.leaderboardTable.innerHTML += `${z + 1}.  MOVES: ${parseInt(this.leaderArray[z])} | TIME: ${(this.leaderArray[0].substr(-5, 5))}<br>`;
    }
    localStorage.setItem('leaderArray', JSON.stringify(this.leaderArray));
  }
}

window.onload = function () {
  const game = new Fifteen();
  game.createDOM();
  game.createGame(game.size);
  game.addListener();
};

class Box {
  constructor(x, y, numberDiv, bomb, neighbor) {
    this.x = x;
    this.y = y;
    this.numberDiv = numberDiv;
    this.bomb = bomb;
    this.neighbor = neighbor;
  }
}
class Storage {
  constructor() {
    this.board = document.querySelector('[data-key="board"]');
    this.bombs = [];
    this.boxes = [];
    this.boxesWithBomb = [];
    this.numberBox = 100;
    this.createBomb = () => {
      for (let i = 0; i < this.numberBox; i++) {
        if (!(i % 5)) {
          this.bombs.push(true);
        } else {
          this.bombs.push(false);
        }
      }
    };
    this.createBomb();
  }
  draw(length) {
    return Math.floor(Math.random() * length);
  }
  setNumberNeighborBomb(getX, getY) {
    let numberBomb = 0;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const that = this;
        if (
          this.boxes.some(box => {
            if (
              box.x == x + getX - 1 &&
              box.y == y + getY - 1 &&
              box.bomb == true
            )
              return true;
          })
        ) {
          numberBomb++;
        }
      }
    }
    return numberBomb;
  }

  createBoxes() {
    let numberDiv = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const bomba = this.bombs.splice(this.draw(this.bombs.length), 1);
        const box = new Box(x, y, numberDiv, bomba[0]);
        numberDiv++;
        this.boxes.push(box);
      }
    }
    for (let i = 0; i < this.numberBox; i++) {
      const numberBomb = this.setNumberNeighborBomb(
        this.boxes[i].x,
        this.boxes[i].y
      );
      if (this.boxes[i].bomb == true) {
        this.boxes[i].neighbor = numberBomb - 1;
      } else {
        this.boxes[i].neighbor = numberBomb;
      }
    }
  }

  createDiv() {
    this.boxes.forEach(box => {
      const div = document.createElement("div");
      div.classList.add("area");
      div.dataset.x = box.x;
      div.dataset.y = box.y;
      div.dataset.number = box.numberDiv;
      this.board.appendChild(div);
    });
  }

  filterBoxesWithBomb() {
    this.boxesWithBomb = this.boxes.filter(box => box.bomb == true);
  }
}

class Result {
  constructor() {
    this.button = document.querySelector('[data-key="button"]');
    this.button.addEventListener("click", () => {
      location.reload();
    });
    this.display = document.querySelector('[data-key="result"]');
  }
  showNumerAreaDefuse(hit) {
    this.display.textContent = `To defuse remain ${hit} item`;
  }
  showResult(result) {
    this.display.textContent = `${result}`;
    this.button.style.display = "block";
  }
}

class Game {
  constructor() {
    this.storage = new Storage();
    this.storage.createBoxes();
    this.storage.createDiv();
    this.storage.filterBoxesWithBomb();
    this.result = new Result();
    this.divs = document.querySelectorAll("div.area");
    const handlerEventListner = this.showArea.bind(this);
    this.divs.forEach(div => {
      div.addEventListener("click", handlerEventListner, {
        once: true
      });
    });
    this.removeClick = () => {
      this.divs.forEach(div => {
        div.classList.add("gameover")
        div.removeEventListener("click", handlerEventListner);
      });
    };
    this.clickedDiv;
    this.hittedBox = 80;
  }
  showArea(e) {
    this.clickedDiv = document.querySelector(
      `[data-number="${e.target.dataset.number}"]`
    );
    const i = this.storage.boxes.findIndex(
      box => parseInt(e.target.dataset.number) === box.numberDiv
    );
    const div = document.createElement("div");
    if (this.storage.boxes[i].bomb === true) {
      div.innerHTML = `<i class="fas fa-bomb"></i>`;
      div.classList.add("hitted");
      this.clickedDiv.appendChild(div);
      this.end("LOSS!!!", i)

    } else {
      div.innerHTML = `<p>${this.storage.boxes[i].neighbor}</p>`;
      this.clickedDiv.appendChild(div);
      this.hittedBox--;
      this.result.showNumerAreaDefuse(this.hittedBox);
      if (this.hittedBox === 0) this.end("WIN!!!")
    }
  }

  showWhereBombAre(bombHitted) {
    this.storage.boxesWithBomb.forEach(box => {
      if (!(box.numberDiv === bombHitted)) {
        const bomb = document.querySelector(`[data-number="${box.numberDiv}"]`);
        const div = document.createElement("div");
        div.innerHTML = `<i class="fas fa-bomb"></i>`;
        bomb.appendChild(div);
      }
    });
  }
  end(resultStr, i) {
    this.showWhereBombAre(this.storage.boxes[i].numberDiv);
    this.removeClick();
    this.result.showResult(resultStr);
  }

}


const game = new Game();
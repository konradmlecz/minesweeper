import {NUMBER_OF_FIELDS, NUMBER_OF_NOT_DISPLAYED_FIELDS} from 'data/constant'

export class Field {
    constructor(private x: number,
                private y: number,
                private id: number,
                private bomb: boolean,
                private isDisplayed: boolean = false,
                private explosion: boolean = false,
                private numberOfNeighborBomb: number = 0,
    ) {
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getId() {
        return this.id;
    }

    getBomb() {
        return this.bomb;
    }

    getIsDisplayed() {
        return this.isDisplayed;
    }

    getExplosion() {
        return this.explosion;
    }

    getNumberOfNeighborBomb() {
        return this.numberOfNeighborBomb;
    }

    setExplosion(explosion: boolean) {
        this.explosion = explosion
    }

    setIsDisplayed(isDisplayed: boolean) {
        this.isDisplayed = isDisplayed;
    }


    setNumberNeighborBomb(numberNeighborBomb: number) {
        this.numberOfNeighborBomb = numberNeighborBomb;
    }
}

export class Storage {
    numberFields: number
    bombs: boolean[]
    fields: Array<Field>
    numberOfNotDisplayedFields: number
    isLost: boolean
    isWin: boolean

    constructor() {
        this.bombs = [];
        this.fields = [];
        this.numberFields = NUMBER_OF_FIELDS;
        this.numberOfNotDisplayedFields = NUMBER_OF_NOT_DISPLAYED_FIELDS;
        this.isLost = false;
        this.isWin = false;
        this.createBomb();
        this.createFields();
    }

    createBomb() {
        for (let i = 0; i < this.numberFields; i++) {
            if (!(i % 5)) {
                this.bombs.push(true);
            } else {
                this.bombs.push(false);
            }
        }
    };

    draw(length: number) {
        return Math.floor(Math.random() * length);
    }

    setNumberNeighborBombs(getX: number, getY: number) {
        let numberBomb = 0;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (
                    this.fields.some(field => {
                        if (
                            field.getX() === x + getX - 1 &&
                            field.getY() === y + getY - 1 &&
                            field.getBomb()
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

    createFields() {
        let id = 0;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const [bombToAdd] = this.bombs.splice(this.draw(this.bombs.length), 1);
                const field = new Field(x, y, id, bombToAdd);
                id++;
                this.fields.push(field);
            }
        }
        for (let i = 0; i < this.numberFields; i++) {
            const numberBomb = this.setNumberNeighborBombs(
                this.fields[i].getX(),
                this.fields[i].getY(),
            );
            if (this.fields[i].getBomb()) {
                this.fields[i].setNumberNeighborBomb(numberBomb - 1);
            } else {
                this.fields[i].setNumberNeighborBomb(numberBomb);
            }
        }
    }

    getFields() {
        return this.fields;
    }

    getNumberOfNotDisplayedFields() {
        return this.numberOfNotDisplayedFields;
    }

    getIsLost() {
        return this.isLost;
    }

    getIsWin() {
        return this.isWin;
    }

}


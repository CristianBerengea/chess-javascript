class CountDown {
    constructor(seconds = 5) {
        document.body.classList.add('bg-animation');
        this.countP = document.createElement('p');
        this.countText = document.createTextNode(seconds);
        this.seconds = seconds;
        this.addCountDown();
        this.countDownInterval=null;
    }
    addCountDown() {
        this.countP.appendChild(this.countText);
        this.countP.classList.add('counter');
        document.body.appendChild(this.countP);
    }
    removeCounter(){
        counter.countP.remove();
        document.body.classList.remove("bg-animation");
    }
    decrementSeconds() {
        this.seconds -= 1;
        this.countText.textContent = counter.seconds;
        if (this.seconds == 0) {
            clearInterval(this.countDownInterval);
            this.removeCounter();

            chess.load();

        }
    }
    startCounter(){
        this.countDownInterval = setInterval(this.decrementSeconds.bind(this), 500);
    }
}

let counter = new CountDown();
counter.startCounter();



class Piece {
    constructor(pieceIsWhite) {
        this.piece = document.createElement('div');
        this.addClassesToPiece(pieceIsWhite);
        this.piceImg = document.createElement('img');
        this.appendImgToPiece();
    }
    addClassesToPiece(pieceIsWhite){
        this.piece.classList.add('piece');
        if (pieceIsWhite == true) {
            this.piece.classList.add('white-player');
        }
        else {
            this.piece.classList.add('black-player');
        }
    }
    appendImgToPiece() {
        this.piece.appendChild(this.piceImg);
    }
}

class Pion extends Piece {
    static get type() {
        return 'pion';
    }

    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.piceImg.setAttribute('src', 'pion-' + 'alb' + '.png');
        else this.piceImg.setAttribute('src', 'pion-' + 'negru' + '.png');
        this.piceImg.classList.add('pion');
    }

    static pionMove(chess) {
        if (chess.player == false) {
            if (chess.newColumn == chess.column && (chess.newRow == chess.row - 1 || chess.newRow == chess.row - 2 && chess.row == 6)) {
                chess.movePiece();
                chess.player = true;
                chess.playerElem.innerHTML = 'white player turn';
            }
        } else {
            if (chess.newColumn == chess.column && (chess.newRow == 1 * chess.row + 1 || chess.newRow == 2 + 1 * chess.row && chess.row == 1)) {
                chess.movePiece();
                chess.player = false;
                chess.playerElem.innerHTML = 'black player turn';
            }
        }
    }

    static pionAttack(chess) {
        if (chess.player == false) {
            if (chess.newRow == chess.row - 1 && (chess.newColumn == 1 * chess.column + 1 || chess.newColumn == chess.column - 1)) {
                chess.elimina();
                chess.movePiece();
                chess.player = true;
                chess.playerElem.innerHTML = 'white player turn';
            }
        } 
        else {
            if (chess.newRow == 1 * chess.row + 1 && (chess.newColumn == 1 * chess.column + 1 || chess.newColumn == chess.column - 1)) {
                chess.elimina();
                chess.movePiece();
                chess.player = false;
                chess.playerElem.innerHTML = 'black player turn';
            }
        }
    }
}

class Turn extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.piceImg.setAttribute('src', 'turn-' + 'alb' + '.png');
        else this.piceImg.setAttribute('src', 'turn-' + 'negru' + '.png');
        this.piceImg.classList.add('turn');
    }
    static turnMove(chess) {
        if (chess.newColumn == chess.column || chess.newRow == chess.row) {
            if (chess.newColumn == chess.column) {
                if (chess.newRow < chess.row) {
                    for (let i = chess.newRow * 1 + 1; i < 1 * chess.row; i++) {
                        if (chess.cells[i][chess.column].firstChild != null) return 0;
                    }
                }
                else {
                    for (let i = 1 * chess.row + 1; i < 1 * chess.newRow; i++) {
                        if (chess.cells[i][chess.column].firstChild != null) return 0;
                    }
                }
            }
            else {
                if (chess.newColumn < chess.column) {
                    for (let i = chess.newColumn * 1 + 1; i < 1 * chess.column; i++) {
                        if (chess.cells[chess.row][i].firstChild != null) return 0;
                    }
                }
                else {
                    for (let i = 1 * chess.column + 1; i < 1 * chess.newColumn; i++) {
                        if (chess.cells[chess.row][i].firstChild != null) return 0;
                    }
                }
            }
            chess.elimina();
            chess.movePiece();
            chess.changePlayer();
        }
        else {
            return 0;
        }
    }
}

class Nebun extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.piceImg.setAttribute('src', 'nebun-' + 'alb' + '.png');
        else this.piceImg.setAttribute('src', 'nebun-' + 'negru' + '.png');
        this.piceImg.classList.add('nebun');
    }
    static nebunMove(chess) {
        if (Math.abs(1 * chess.newColumn - chess.column) == Math.abs(1 * chess.newRow - chess.row)) {
            let j = chess.newColumn;
            if (chess.newColumn < chess.column) j++;
            else j--;
            if (chess.newRow < chess.row) {
                for (let i = chess.newRow * 1 + 1; i < 1 * chess.row; i++) {
                    if (chess.cells[i][j].firstChild != null) return 0;
                    if (chess.newColumn < chess.column) j++;
                    else j--;
                }
            }
            else {
                for (let i = chess.newRow * 1 - 1; i > 1 * chess.row; i--) {
                    if (chess.cells[i][j].firstChild != null) return 0;
                    if (chess.newColumn < chess.column) j++;
                    else j--;
                }
            }
            chess.movePiece();
            chess.elimina();
            chess.changePlayer();
        } 
        else {
            return 0;
        }
    }
}

class Cal extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.piceImg.setAttribute('src', 'cal-' + 'alb' + '.png');
        else this.piceImg.setAttribute('src', 'cal-' + 'negru' + '.png');
        this.piceImg.classList.add('cal');
    }
    static calMove(chess) {
        if (Math.abs(chess.column - chess.newColumn) == 2 && Math.abs(chess.row - chess.newRow) == 1 || Math.abs(chess.column - chess.newColumn) == 1 && Math.abs(chess.row - chess.newRow) == 2) {
            chess.movePiece();
            chess.elimina();
            chess.changePlayer();
        }
    }
}

class Rege extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.piceImg.setAttribute('src', 'rege-' + 'alb' + '.png');
        else this.piceImg.setAttribute('src', 'rege-' + 'negru' + '.png');
        this.piceImg.classList.add('rege');
    }
    static regeMove(chess) {
        if (chess.newColumn >= chess.column - 1 && chess.newColumn <= 1 * chess.column + 1 && chess.newRow >= chess.row - 1 && chess.newRow <= 1 * chess.row + 1) {
            chess.movePiece();
            chess.elimina();
            chess.changePlayer();
        }
    }
}

class Regina extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.piceImg.setAttribute('src', 'regina-' + 'alb' + '.png');
        else this.piceImg.setAttribute('src', 'regina-' + 'negru' + '.png');
        this.piceImg.classList.add('regina');
    }
    static reginaMove(chess){
        if(Turn.turnMove(chess)==0) Nebun.nebunMove(chess);
    }
}


class ChessTable {
    constructor() {
        this.playerElem = document.createElement('div');
        this.whitePlayerScore = document.createElement('div');
        this.blackPlayerScore = document.createElement('div');
        this.player = true;
        this.table = document.createElement('div');
        this.cells = new Array(8);
        for (let i = 0; i < 8; i++) {
            this.cells[i] = new Array(8);
        }
        this.generateCells();
        this.addElements();
        this.selectedId = null;
        this.selectedElem = null;
        this.selectedPiceType = null;

        this.newSelected = null;
        this.newSelectedId = null;
        this.newSelectedPiceType = null;
        this.attack = false;
        this.line = 0;
        this.interval=null;
        this.palcePinionInterval=null;
    }
    addElements(){
        this.table.classList.add('table');
        this.playerElem.classList.add('player');
        this.whitePlayerScore.classList.add('player');
        this.blackPlayerScore.classList.add('player');
        this.blackPlayerScore.classList.add('black-player');
        this.playerElem.innerHTML = 'white player turn';
        this.whitePlayerScore.innerHTML=0;
        this.blackPlayerScore.innerHTML=0;
        this.table.classList.add('table');
    }
    generateCells() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let id = '' + i + j;
                let eClass;
                if ((i + j) % 2 == 0) {
                    eClass = 'white';
                } else eClass = 'black';
                this.cells[i][j] = document.createElement('div');
                this.cells[i][j].id = id;
                this.cells[i][j].setAttribute('data-row', i);
                this.cells[i][j].setAttribute('data-column', j);
                this.cells[i][j].classList.add(eClass);
                this.cells[i][j].classList.add('cell');
                this.cells[i][j].addEventListener('click', () => {
                    this.clickCell(chess.cells[i][j].id);
                });
                this.table.appendChild(this.cells[i][j]);
            }
        }
    }

    move() {
        this.row = this.selectedElem.getAttribute('data-row')
        this.column = this.selectedElem.getAttribute('data-column');
        this.newRow = this.newSelected.getAttribute('data-row')
        this.newColumn = this.newSelected.getAttribute('data-column');
        switch (this.selectedPiceType) {
            case 'pion':
                if (this.attack == true) Pion.pionAttack(this);
                else Pion.pionMove(this);
                break;
            case 'rege':
                Rege.regeMove(this);
                break;
            case 'turn':
                Turn.turnMove(this);
                break;
            case 'nebun':
                Nebun.nebunMove(this);
                break;
            case 'regina':
                Regina.reginaMove(this);
                break;
            case 'cal':
                Cal.calMove(this);
                break;
            default:
                console.log('move not implemented');
        }
        localStorage.setItem('player',this.player+'');
        console.log(this.player+'');
    }
    elimina(){
        if (chess.attack == true) {
            chess.cells[chess.newRow][chess.newColumn].removeChild(chess.cells[chess.newRow][chess.newColumn].firstChild);
            let score=0;
            switch(this.newSelectedPiceType){
                case 'rege':
                    localStorage.clear();
                    if(this.player==true){
                        alert('White player win!  Score: white: '+this.whitePlayerScore.innerHTML+'  black: '+this.blackPlayerScore.innerHTML);
                    }
                    else{
                        alert('black player win!  Score: white: '+this.whitePlayerScore.innerHTML+'  black: '+this.blackPlayerScore.innerHTML);
                    }
                    location.reload();
                    break;
                case 'pion': score=1;
                    break;
                case 'cal': score=3;
                    break;
                case 'nebun': score=3;
                    break;  
                case 'turn': score=5;
                    break; 
                case 'regina': score=9;
                default:
                    console.log('err');
            }
            if(this.player==true){
                this.whitePlayerScore.innerHTML=this.whitePlayerScore.innerHTML*1+score;
            }
            else{
                this.blackPlayerScore.innerHTML=this.blackPlayerScore.innerHTML*1+score;
            }
        }
    }
    movePiece(){
        chess.cells[chess.newRow][chess.newColumn].appendChild(chess.selectedElem.firstChild);
        this.saveToLocal();
        localStorage.setItem('save','true');
    }

    changePlayer(){
        if (this.player == false) {
            this.player = true;
            this.playerElem.innerHTML = 'white player turn';
        } else {
            this.player = false;
            this.playerElem.innerHTML = 'black player turn';
        }
    }
    resetSelected() {
        this.selectedElem = null;
        this.selectedId = null;
        this.selectedPiceType = null;
    }
    clickCell(id) {
        if (id == this.selectedId) {
            this.selectedElem.classList.remove('selected');
            this.resetSelected();
        } else {
            this.newSelectedId = id;
            this.newSelected = document.getElementById(id);
            if (this.newSelected.firstChild !== null) {
                this.newSelectedPiceType = this.newSelected.firstChild.firstChild.classList[0];
                let playerPiece = Array.from(this.newSelected.firstChild.classList).includes('white-player');
                if (this.selectedId == null || playerPiece == this.player) {
                    if (playerPiece == this.player) {
                        if (this.selectedId != null) {
                            this.selectedElem.classList.remove('selected');
                        }
                        this.newSelected.classList.add('selected');
                        this.selectedElem = this.newSelected;
                        this.selectedId = id;
                        this.selectedPiceType = this.newSelectedPiceType;
                    }
                    else {
                        alert('Not your turn!');
                    }
                } else {
                    this.selectedElem.classList.remove('selected');
                    this.attack = true;
                    this.move();
                    this.resetSelected();
                }
            }
            else {
                if (chess.selectedId != null) {
                    chess.selectedElem.classList.remove('selected');
                    chess.attack = false;
                    chess.move();
                }
                chess.resetSelected()
            }
        }
    }
    addPiecesToTable(){
        this.interval=setInterval(this.palcePieces.bind(this), 300);
    }
    addTableToBody(){
        document.body.appendChild(this.playerElem);
        document.body.appendChild(this.whitePlayerScore);
        document.body.appendChild(this.blackPlayerScore);
        document.body.appendChild(chess.table);
    }

    palcePieces() {
        let pionAlb = new Pion(true);
        let pionNegru = new Pion(false);
        this.cells[1][this.line].appendChild(pionAlb.piece);
        this.cells[6][this.line].appendChild(pionNegru.piece);
        localStorage.setItem(1+' '+this.line, 'pion'+' white');
        localStorage.setItem(6+' '+this.line, 'pion'+' black');
        switch (this.line) {
            case 0:
                let turnAlb = new Turn(true);
                let turnNegru = new Turn(false);
                this.cells[0][7 - this.line].appendChild(turnAlb.piece);
                this.cells[7][7 - this.line].appendChild(turnNegru.piece);
                localStorage.setItem(0+' '+(7-this.line), 'turn'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'turn'+' black');
                break;
            case 1:
                let calAlb = new Cal(true);
                let calNegru = new Cal(false);
                this.cells[0][7 - this.line].appendChild(calAlb.piece);
                this.cells[7][7 - this.line].appendChild(calNegru.piece);
                localStorage.setItem(0+' '+(7-this.line), 'cal'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'cal'+' black');
                break;
            case 2:
                let nebunAlb = new Nebun(true);
                let nebunNegru = new Nebun(false);
                this.cells[0][7 - this.line].appendChild(nebunAlb.piece);
                this.cells[7][7 - this.line].appendChild(nebunNegru.piece);
                localStorage.setItem(0+' '+(7-this.line), 'nebun'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'nebun'+' black');
                break;
            case 3:
                let reginaAlb = new Regina(true);
                let reginaNegru = new Regina(false);
                this.cells[0][7 - this.line].appendChild(reginaAlb.piece);
                this.cells[7][7 - this.line].appendChild(reginaNegru.piece);
                localStorage.setItem(0+' '+(7-this.line), 'regina'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'regina'+' black');
                break;
            case 4:
                let regeAlb = new Rege(true);
                let regeNegru = new Rege(false);
                this.cells[0][7 - this.line].appendChild(regeAlb.piece);
                this.cells[7][7 - this.line].appendChild(regeNegru.piece);
                localStorage.setItem(0+' '+(7-this.line), 'rege'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'rege'+' black');
                break;
            case 5:
                let nebunAlb2 = new Nebun(true);
                let nebunNegru2 = new Nebun(false);
                this.cells[0][7 - this.line].appendChild(nebunAlb2.piece);
                this.cells[7][7 - this.line].appendChild(nebunNegru2.piece);
                localStorage.setItem(0+' '+(7-this.line), 'nebun'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'nebun'+' black');
                break;
            case 6:
                let calAlb2 = new Cal(true);
                let calNegru2 = new Cal(false);
                this.cells[0][7 - this.line].appendChild(calAlb2.piece);
                this.cells[7][7 - this.line].appendChild(calNegru2.piece);
                localStorage.setItem(0+' '+(7-this.line), 'cal'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'cal'+' black');
                break;
            case 7:
                let turnAlb2 = new Turn(true);
                let turnNegru2 = new Turn(false);
                this.cells[0][7 - this.line].appendChild(turnAlb2.piece);
                this.cells[7][7 - this.line].appendChild(turnNegru2.piece);
                localStorage.setItem(0+' '+(7-this.line), 'turn'+' white');
                localStorage.setItem(7+' '+(7-this.line), 'turn'+' black');
                break;
            default:
                console.log('err');
        }
        this.line++;
        if (this.line == 8) clearInterval(this.interval);
    }
    saveToLocal(){
        localStorage.setItem(this.row+' '+this.column, null);
        if(this.player==true) localStorage.setItem(this.newRow+' '+this.newColumn, this.selectedPiceType+' white');
        else localStorage.setItem(this.newRow+' '+this.newColumn, this.selectedPiceType+' black');
        localStorage.setItem('player',this.player+'');
    }
    load(){
        let savedGame=localStorage.getItem('save');
        if(savedGame=='true'){
            if (confirm("Do you want to continue last game?") == true) {
                if(localStorage.getItem('player')=='true'){
                    this.player=true;
                    this.playerElem.innerHTML = 'white player turn';
                }
                else {
                    this.player=false;
                    this.playerElem.innerHTML = 'black player turn';
                }
                this.loadSavedPieces();
            }
            else{
                localStorage.clear();
                this.addPiecesToTable();
                localStorage.setItem('save','false');
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let key =  i +' '+ j;
                    console.log(key+' '+localStorage.getItem(key));
                }
            }
        }
        else 
        {
            localStorage.clear();
            this.addPiecesToTable();
            localStorage.setItem('save','false');
        }
        this.addTableToBody();
    }
    loadSavedPieces(){
        let scoreWhite=39;
        let scoreBlack=39;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let key =  i +' '+ j;
                let pieceType=localStorage.getItem(key);
                switch(pieceType){
                    case 'pion white':
                        let pionAlb = new Pion(true);
                        this.cells[i][j].appendChild(pionAlb.piece);
                        scoreBlack-=1;
                        break;
                    case 'pion black':
                        let pionNegru = new Pion(false);
                        this.cells[i][j].appendChild(pionNegru.piece);
                        scoreWhite-=1;
                        break;
                    case 'rege white':
                        let regeAlb = new Rege(true);
                        this.cells[i][j].appendChild(regeAlb.piece);
                        break;
                    case 'rege black':
                        let regeNegru = new Rege(false);
                        this.cells[i][j].appendChild(regeNegru.piece);
                        break;
                    case 'turn white':
                        let turnAlb = new Turn(true);
                        this.cells[i][j].appendChild(turnAlb.piece);
                        scoreBlack-=5;
                        break;
                    case 'turn black':
                        let turnNegru = new Turn(false);
                        this.cells[i][j].appendChild(turnNegru.piece);
                        scoreWhite-=5;
                        break;
                    case 'nebun white':
                        let nebunAlb = new Nebun(true);
                        this.cells[i][j].appendChild(nebunAlb.piece);
                        scoreBlack-=3;
                        break;
                    case 'nebun black':
                        let nebunNegru = new Nebun(false);
                        this.cells[i][j].appendChild(nebunNegru.piece);
                        scoreWhite-=3;
                        break;
                    case 'regina white':
                        let reginaAlb = new Regina(true);
                        this.cells[i][j].appendChild(reginaAlb.piece);
                        scoreBlack-=9;
                        break;
                    case 'regina black':
                        let reginaNegru = new Regina(false);
                        this.cells[i][j].appendChild(reginaNegru.piece);
                        scoreWhite-=9;
                        break;
                    case 'cal white':
                        let calAlb = new Cal(true);
                        this.cells[i][j].appendChild(calAlb.piece);
                        scoreBlack-=3;
                        break;
                    case 'cal black':
                        let calNegru = new Cal(false);
                        this.cells[i][j].appendChild(calNegru.piece);
                        scoreWhite-=3;
                        break;
                    default:   
                }
            }
        }
        this.whitePlayerScore.innerHTML=scoreWhite;
        this.blackPlayerScore.innerHTML=scoreBlack;
    }
}

chess=new ChessTable();
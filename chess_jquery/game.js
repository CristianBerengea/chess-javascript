(function($) {

class CountDown {
    constructor(seconds = 5) {
        this.seconds = seconds;
        this.$countP=$("<p/>").html(seconds);
        this.addCountDown();
        this.countDownInterval=null;
    }
    addCountDown() {
        this.$countP.addClass('counter');
        $('body').append(this.$countP);
        $('body').addClass('bg-animation');
    }
    removeCounter(){
        counter.$countP.remove();
        document.body.classList.remove("bg-animation");
    }
    decrementSeconds() {
        this.seconds -= 1;
        this.$countP.html(this.seconds);
        if (this.seconds == 0) {
            clearInterval(this.countDownInterval);
            this.removeCounter();
            chess.chooseGameType();
        }
    }
    startCounter(){
        this.countDownInterval = setInterval(this.decrementSeconds.bind(this), 300);
    }
}

let counter = new CountDown();
counter.startCounter();

class Piece {
    constructor(pieceIsWhite) {
        this.$piece = $('<div/>');
        this.addClassesToPiece(pieceIsWhite);
        this.$pieceImg = $('<img/>');
        this.appendImgToPiece();
    }
    addClassesToPiece(pieceIsWhite){
        this.$piece.addClass('piece');
        if (pieceIsWhite == true) {
            this.$piece.attr('data-player_type','white-player');
        }
        else {
            this.$piece.attr('data-player_type','black-player');
        }
    }
    appendImgToPiece() {
        this.$piece.append(this.$pieceImg);
    }
}

class Pion extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.$pieceImg.attr('src', 'pion-' + 'alb' + '.png');
        else this.$pieceImg.attr('src', 'pion-' + 'negru' + '.png');
        this.$piece.attr('data-pieceType','pion');
    }

    static pionCanMove(player,row,column,newRow,newColumn) {
        if (player == false) {
            if (newColumn == column && (newRow == row - 1 || newRow == row - 2 && row == 6)) {
                return true;
            }
            else return false;
        } else {
            if (newColumn == column && (newRow == 1 * row + 1 || newRow == 2 + 1 * row && row == 1)) {
                return true;
            }
            return false;
        }
    }

    static pionCanAttack(player,row,column,newRow,newColumn) {
        if (player == false) {
            if (newRow == row - 1 && (newColumn == 1 * column + 1 || newColumn == column - 1)) {
                return true;
            }else return false;
        } 
        else {
            if (newRow == 1 * row + 1 && (newColumn == 1 * column + 1 || newColumn == column - 1)) {
                return true;
            }
            else return false;
        }
    }
}

class Turn extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.$pieceImg.attr('src', 'turn-' + 'alb' + '.png');
        else this.$pieceImg.attr('src', 'turn-' + 'negru' + '.png');
        this.$piece.attr('data-pieceType','turn');
    }
    static turnCanMove(chess,row,column,newRow,newColumn) {
        if (newColumn == column || newRow == row) {
            if (newColumn == column) {
                if (newRow < row) {
                    for (let i = newRow * 1 + 1; i < 1 * row; i++) {
                        if (chess.$cells[i][column].children().length != 0) return false;
                    }
                }
                else {
                    for (let i = 1 * row + 1; i < 1 * newRow; i++) {
                        if (chess.$cells[i][column].children().length != 0) return false;
                    }
                }
            }
            else {
                if (newColumn < column) {
                    for (let i = newColumn * 1 + 1; i < 1 * column; i++) {
                        if (chess.$cells[row][i].children().length != 0) return false;
                    }
                }
                else {
                    for (let i = 1 * column + 1; i < 1 * newColumn; i++) {
                        if (chess.$cells[row][i].children().length != 0) return false;
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
}

class Nebun extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.$pieceImg.attr('src', 'nebun-' + 'alb' + '.png');
        else this.$pieceImg.attr('src', 'nebun-' + 'negru' + '.png');
        this.$piece.attr('data-pieceType','nebun');
    }
    static nebunCanMove(chess,row,column,newRow,newColumn) {
        if (Math.abs(1 * newColumn - column) == Math.abs(1 * newRow - row)) {
            let j = newColumn;
            if (newColumn < column) j++;
            else j--;
            if (newRow < row) {
                for (let i = newRow * 1 + 1; i < 1 * row; i++) {
                    if (chess.$cells[i][j].children().length != 0) return false;
                    if (newColumn < column) j++;
                    else j--;
                }
            }
            else {
                for (let i = newRow * 1 - 1; i > 1 * row; i--) {
                    if (chess.$cells[i][j].children().length != 0) return false;
                    if (newColumn < column) j++;
                    else j--;
                }
            }
            return true;
        } 
        else {
            return false;
        }
    }
}

class Cal extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.$pieceImg.attr('src', 'cal-' + 'alb' + '.png');
        else this.$pieceImg.attr('src', 'cal-' + 'negru' + '.png');
        this.$piece.attr('data-pieceType','cal');
    }
    static calCanMove(chess,row,column,newRow,newColumn) {
        if (Math.abs(column - newColumn) == 2 && Math.abs(row - newRow) == 1 || Math.abs(column - newColumn) == 1 && Math.abs(row - newRow) == 2) {
            return true;
        }
        else{
            return false;
        }
    }
}

class Rege extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.$pieceImg.attr('src', 'rege-' + 'alb' + '.png');
        else this.$pieceImg.attr('src', 'rege-' + 'negru' + '.png');
        this.$piece.attr('data-pieceType','rege');
    }
    static regeCanMove(chess,row,column,newRow,newColumn) {
        if (newColumn >= column - 1 && newColumn <= 1 * column + 1 && newRow >= row - 1 && newRow <= 1 * row + 1) {
            if(this.inSah(chess,newRow,newColumn,true) == false)
                return true;
            else return false;
        }
        else return false;
    }
    static inSah(chess,newRow,newColumn,pionAttack){
        chess.player=!chess.player;
        let x=[-1,-1,-1,0,1,1,1,0];
        let y=[-1,0,1,1,1,0,-1,-1];
        for(let l=0;l<x.length;l++){
            let i=newRow*1;
            let j=newColumn*1;
            i=i+1*x[l];
            j=j+1*y[l];
            let canMove=false;
            while(i>=0&&j>=0&&i<8&&j<8){
                if(chess.$cells[i][j].children().length != 0 ){
                    //console.log(chess.$cells[i][j].children().first().attr('data-player_type')+'   '+i+' '+j);
                        if(chess.$cells[i][j].children().first().attr('data-player_type')=='white-player'&&chess.player==true||chess.$cells[i][j].children().first().attr('data-player_type')=='black-player'&&chess.player==false) {
                            //console.log(i+' '+j);
                        switch (chess.$cells[i][j].children().first().attr('data-piecetype')) {
                            case 'pion':
                                if(pionAttack==true) canMove=Pion.pionCanAttack(chess.player,i,j,newRow,newColumn);
                                else canMove=Pion.pionCanMove(chess.player,i,j,newRow,newColumn);
                                break;
                            case 'rege':
                                if(Math.abs(i-newRow)<2&&Math.abs(j-newColumn)<2) {
                                    chess.player=!chess.player;
                                    return true;
                                }
                                break;
                            case 'turn':
                                canMove=Turn.turnCanMove(chess,i,j,newRow,newColumn);
                                break;
                            case 'nebun':
                                canMove=Nebun.nebunCanMove(chess,i,j,newRow,newColumn);
                                break;
                            case 'regina':
                                canMove=Regina.reginaCanMove(chess,i,j,newRow,newColumn);
                                break;
                            default:
                        }
                        if(canMove == true) {
                            chess.player=!chess.player;
                            return true; 
                        }
                    }
                    i=-1;
                }
                else {
                    i=i+1*x[l]; 
                    j=j+1*y[l];
                }
            }
        }
        chess.player=!chess.player;
        x=[-1,-2,-2,1,1,2,2,1];
        y=[-2,-1,1,2,2,1,-1,-2];
        for(let l=0;l<x.length;l++){
            let i=newRow*1+x[l];
            let j=newColumn*1+y[l];
            if(i>=0&&j>=0&&i<8&&j<8){
                if((chess.$cells[i][j].children().first().attr('data-player_type')=='white-player'&&chess.player==false||chess.$cells[i][j].children().first().attr('data-player_type')=='black-player'&&chess.player==true)&&chess.$cells[i][j].children().first().attr('data-piecetype')=='cal') return true;
            }
        }
        return false;
    }
}

class Regina extends Piece {
    constructor(pieceIsWhite) {
        super(pieceIsWhite);
        if (pieceIsWhite == true) this.$pieceImg.attr('src', 'regina-' + 'alb' + '.png');
        else this.$pieceImg.attr('src', 'regina-' + 'negru' + '.png');
        this.$piece.attr('data-pieceType','regina');
    }
    static reginaCanMove(chess,row,column,newRow,newColumn){
        if(Turn.turnCanMove(chess,row,column,newRow,newColumn)==true || Nebun.nebunCanMove(chess,row,column,newRow,newColumn)==true) return true;
    }
}


class ChessTable {
    constructor() {
        this.$gameType=$('<div/>');
        this.$playerElem = $('<div/>');
        this.$whitePlayerScore = $('<div/>');
        this.$blackPlayerScore = $('<div/>');
        this.player = true;
        this.$table = $('<div/>');
        this.$cells = new Array(8);
        for (let i = 0; i < 8; i++) {
            this.$cells[i] = new Array(8);
        }
        this.generateCells();
        this.addElements();
        this.selectedElem = null;

        this.newSelected = null;
        this.attack = false;
        this.line = 0;
        this.interval=null;

        this.whiteKingRow;
        this.whiteKingColumn;
        this.blackKingRow;
        this.blackKingColumn;
        this.gameId=null;
        this.game=null;
        this.onlinePlayerType=null;
        this.noOnlineMoves=null;
        this.refreshMovesInterval=null;
        this.sah=false;

        this.sahRow=this.newRow;
        this.sahColum=this.newColumn;
    }
    addElements(){
        this.$table.addClass('table');
        this.$playerElem.addClass('player');
        this.$gameType.addClass('player');
        this.$whitePlayerScore.addClass('player');
        this.$blackPlayerScore.addClass('player');
        this.$blackPlayerScore.addClass('black-player');
        this.$playerElem.html('white player turn');
        this.$whitePlayerScore.html(0);
        this.$blackPlayerScore.html(0);
    }
    addTableToBody(){
        $('body').append(this.$playerElem);
        $('body').append(this.$whitePlayerScore);
        $('body').append(this.$blackPlayerScore);
        $('body').append(this.$gameType);
        $('body').append(this.$table);
    }
    generateCells() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let id = '' + i + j;
                let eClass;
                if ((i + j) % 2 == 0) {
                    eClass = 'white';
                } else eClass = 'black';
                this.$cells[i][j] = $("<div/>");
                this.$cells[i][j].id = id;
                this.$cells[i][j].attr('data-row', i);
                this.$cells[i][j].attr('data-column', j);
                this.$cells[i][j].addClass(eClass);
                this.$cells[i][j].addClass('cell');
                this.$cells[i][j].droppable({
                    drop:(event) => {
                        this.clickCell(event.target.getAttribute('data-row'),event.target.getAttribute('data-column'));
                    }
                });
                this.$cells[i][j].on('click', () => {
                this.clickCell(event.currentTarget.getAttribute('data-row'),event.currentTarget.getAttribute('data-column'));
                });
                this.$table.append(this.$cells[i][j]);
            }
        }
    }
    /*verifyOutOfSah()
    {
        if(this.row==this.whiteKingRow&&this.column==this.whiteKingColumn||this.row==this.blackKingRow&&this.column==this.blackKingColumn) return true;
        if(this.$cells[this.sahRow][this.sahColum].children().first().attr('data-piecetype')=='cal'){
            if(this.newRow==this.sahRow&&this.newColumn==this.sahColum) return true;
            else return false;
        }
        return false;
    }*/
    move() {
        this.row = this.selectedElem.attr('data-row')
        this.column = this.selectedElem.attr('data-column');
        this.newRow = this.newSelected.attr('data-row')
        this.newColumn = this.newSelected.attr('data-column');
        if(this.sah==false||this.sah==true&&this.verifyOutOfSah()==true)
        {
            let canMove=false;
            this.sah=false;
            let adverseKingRow;
            let adverseKingColumn;
            if(this.player==true){
                adverseKingRow=this.blackKingRow;
                adverseKingColumn=this.blackKingColumn;
            }
            else{
                adverseKingRow=this.whiteKingRow;
                adverseKingColumn=this.whiteKingColumn;
            }
            switch (this.selectedElem.children().first().attr('data-piecetype')) {
                case 'pion':
                    if (this.attack == true)  canMove=Pion.pionCanAttack(this.player,this.row,this.column,this.newRow,this.newColumn);
                    else canMove=Pion.pionCanMove(this.player,this.row,this.column,this.newRow,this.newColumn);
                    this.sah=Pion.pionCanAttack(this.player,this.newRow,this.newColumn,adverseKingRow,adverseKingColumn);
                    break;
                case 'rege':
                    canMove=Rege.regeCanMove(this,this.row,this.column,this.newRow,this.newColumn);
                    this.sah=Rege.regeCanMove(this,this.newRow,this.newColumn,adverseKingRow,adverseKingColumn);
                    if(canMove == true){
                        if(this.player==true){
                            this.whiteKingRow=this.newRow;
                            this.whiteKingColumn=this.newColumn;
                        }
                        else{
                            this.blackKingRow=this.newRow;
                            this.blackKingColumn=this.newColumn;
                        }
                    }
                    break;
                case 'turn':
                    canMove=Turn.turnCanMove(this,this.row,this.column,this.newRow,this.newColumn);
                    this.sah=Turn.turnCanMove(this,this.newRow,this.newColumn,adverseKingRow,adverseKingColumn);
                    break;
                case 'nebun':
                    canMove=Nebun.nebunCanMove(this,this.row,this.column,this.newRow,this.newColumn);
                    this.sah=Nebun.nebunCanMove(this,this.newRow,this.newColumn,adverseKingRow,adverseKingColumn);
                    break;
                case 'regina':
                    canMove=Regina.reginaCanMove(this,this.row,this.column,this.newRow,this.newColumn);
                    this.sah=Regina.reginaCanMove(this,this.newRow,this.newColumn,adverseKingRow,adverseKingColumn);
                    break;
                case 'cal':
                    canMove=Cal.calCanMove(this,this.row,this.column,this.newRow,this.newColumn);
                    this.sah=Cal.calCanMove(this,this.newRow,this.newColumn,adverseKingRow,adverseKingColumn);
                    break;
                default:
            }
                
        if(canMove==true){
            if (this.attack == true) this.elimina();
            this.movePiece();
            if(this.sah == true){
                this.sahRow=this.newRow;
                this.sahColum=this.newColumn;
                //check sah mat
                let sahMat=this.verifyMat(adverseKingRow,adverseKingColumn);
                if(sahMat==true){
                    this.endGame();
                }
                console.log(sahMat);
            }
        }
      }
        localStorage.setItem('player',this.player+'');
    }
    verifyMat(adverseKingRow,adverseKingColumn){
        let x=[-1,-1,-1,0,1,1,1,0];
        let y=[-1,0,1,1,1,0,-1,-1];
        for(let l=0;l<x.length;l++){
            let i = adverseKingRow*1+x[l]; 
            let j = adverseKingColumn*1+y[l];
            if(i>=0&&j>=0&&i<8&&j<8&&(this.$cells[i][j].children().length==0 ||this.$cells[i][j].children().first().attr('data-player_type')!=this.$cells[adverseKingRow][adverseKingColumn].children().first().attr('data-player_type')) && Rege.regeCanMove(this,adverseKingRow,adverseKingColumn,i,j)==true){
                return false;
            }
        }
        let i;
        let j;
        if(this.newRow==adverseKingRow) i=0;
        else if(this.newRow>adverseKingRow) i=1;
        else i=-1;
        if(this.newColumn==adverseKingColumn) j=0;
        else if(this.newColumn>adverseKingColumn) j=1;
        else j=-1;
        while(adverseKingRow!=this.newRow&&adverseKingColumn!=this.newColumn){
            adverseKingRow=adverseKingRow*1+i;
            adverseKingColumn=adverseKingColumn*1+j;
            if(adverseKingRow==this.newRow&&adverseKingColumn==this.newColumn) {
                if(Rege.inSah(this,adverseKingRow,adverseKingColumn,true)) return false;
            }else{
                if(Rege.inSah(this,adverseKingRow,adverseKingColumn,false)) return false;
            }
        }
        return true;
    }
    endGame(){
        localStorage.setItem('save','false');
        if(this.player==true){
            alert('Black player win!  Score: white: '+this.$whitePlayerScore.html()+'  black: '+this.$blackPlayerScore.html());
        }
        else{
            alert('White player win!  Score: white: '+this.$whitePlayerScore.html()+'  black: '+this.$blackPlayerScore.html());
        }
        location.reload();
    }
    elimina(){
        let score=0;
        switch(this.newSelected.children().first().attr('data-piecetype')){
            case 'rege':
                this.endGame();
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
            break;
            default:
                console.log('err');
        }
        if(this.player==true){
            this.$whitePlayerScore.html(this.$whitePlayerScore.html()*1+score);
        }
        else{
            this.$blackPlayerScore.html(this.$blackPlayerScore.html()*1+score);
        }
        this.$cells[this.newRow][this.newColumn].empty();
    }
    movePiece(){
        this.changePlayer();
        this.$cells[this.newRow][this.newColumn].append(this.selectedElem.children().first());
        this.saveToLocal();
        localStorage.setItem('save','true');
        if(this.gameId!=null){
            this.noOnlineMoves=this.noOnlineMoves*1+1;
            $.ajax({
                method: 'PUT',
                url: `https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/${this.gameId}`,
                data: { move: {from: {x:this.row, y:this.column}, to:{x:this.newRow,y:this.newColumn}} }
            }).done(() => {;
                this.refreshMovesInterval=setInterval(() => { 
                    $.get( `https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/${this.game.ID}`, ( data ) => {
                        if(this.noOnlineMoves*1+1==data.moves.length){
                            this.movePieceWithoutValidation(data.moves[this.noOnlineMoves].from.x,data.moves[this.noOnlineMoves].from.y,data.moves[this.noOnlineMoves].to.x,data.moves[this.noOnlineMoves].to.y);
                            this.noOnlineMoves=this.noOnlineMoves*1+1;
                            clearInterval(this.refreshMovesInterval);
                        }
                    });  
               }, 1000);
           });
        }
    }
    
    changePlayer(){
        if (this.player == false) {
            this.player = true;
            this.$playerElem.html('white player turn');
        } else {
            this.player = false;
            this.$playerElem.html( 'black player turn');
        }
    }
    resetSelected() {
        this.selectedElem = null;
    }
    clickCell(i,j) {
        if (this.selectedElem!=null && i+j == this.selectedElem.attr('data-row')+this.selectedElem.attr('data-column')) {
            this.selectedElem.removeClass('selected');
            this.resetSelected();
        } else {
            this.newSelected = this.$cells[i][j];
            if (this.$cells[i][j].children().length != 0) {
                let playerPiece = this.newSelected.children().first().attr('data-player_type') == 'white-player';
                if (this.selectedElem == null || playerPiece == this.player) {
                    if (playerPiece == this.player&&(this.onlinePlayerType==null||this.onlinePlayerType==this.player)) {
                        if (this.selectedElem != null) {
                            this.selectedElem.removeClass('selected');
                        }
                        this.newSelected.addClass('selected');
                        this.selectedElem = this.newSelected;
                    }
                    else {
                        alert('Not your turn!');
                    }
                } else {
                    this.selectedElem.removeClass('selected');
                    this.attack = true;
                    this.move();
                    this.resetSelected();
                }
            }
            else {
                if (this.selectedElem != null) {
                    this.selectedElem.removeClass('selected');
                    this.attack = false;
                    this.move();
                }
                this.resetSelected()
            }
        }
    }
    addPiecesToTable(){
        this.interval=setInterval(this.palcePieces.bind(this), 300);
    }

    palcePieces() {
        let pionAlb = new Pion(true);
        let pionNegru = new Pion(false);
        pionAlb.$piece.draggable({
            helper:"clone",
            containment:"document",
            zIndex: 20,
            start:(event) => {
                this.clickCell(event.target.parentNode.getAttribute('data-row'),event.target.parentNode.getAttribute('data-column'));
            }
        });
        pionNegru.$piece.draggable({
            helper:"clone",
            containment:"document",
            zIndex: 20,
            start:(event) => {
                this.clickCell(event.target.parentNode.getAttribute('data-row'),event.target.parentNode.getAttribute('data-column'));
            }
        });
        this.$cells[1][this.line].append(pionAlb.$piece);
        this.$cells[6][this.line].append(pionNegru.$piece);
        if(this.game==null) localStorage.setItem(1+' '+this.line, 'pion'+' white');
        if(this.game==null) localStorage.setItem(6+' '+this.line, 'pion'+' black');
        let pieceWhite;
        let pieceBlack;
        switch (this.line) {
            case 0:
                pieceWhite = new Turn(true);
                pieceBlack = new Turn(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'turn'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'turn'+' black');
                break;
            case 1:
                pieceWhite = new Cal(true);
                pieceBlack = new Cal(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'cal'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'cal'+' black');
                break;
            case 2:
                pieceWhite = new Nebun(true);
                pieceBlack = new Nebun(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'nebun'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'nebun'+' black');
                break;
            case 3:
                pieceWhite = new Regina(true);
                pieceBlack = new Regina(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'regina'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'regina'+' black');
                break;
            case 4:
                pieceWhite = new Rege(true);
                pieceBlack = new Rege(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'rege'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'rege'+' black');
                    this.whiteKingRow=0;
                    this.whiteKingColumn=7-this.line;
                    this.blackKingRow=7;
                    this.blackKingColumn=7-this.line;
                break;
            case 5:
                pieceWhite = new Nebun(true);
                pieceBlack = new Nebun(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'nebun'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'nebun'+' black');
                break;
            case 6:
                pieceWhite = new Cal(true);
                pieceBlack = new Cal(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'cal'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'cal'+' black');
                break;
            case 7:
                pieceWhite = new Turn(true);
                pieceBlack = new Turn(false);
                if(this.game==null) localStorage.setItem(0+' '+(7-this.line), 'turn'+' white');
                if(this.game==null) localStorage.setItem(7+' '+(7-this.line), 'turn'+' black');
                break;
            default:
                console.log('err');
        }
        pieceWhite.$piece.draggable({
            helper:"clone",
            containment:"document",
            zIndex: 20,
            start:(event) => {
                this.clickCell(event.target.parentNode.getAttribute('data-row'),event.target.parentNode.getAttribute('data-column'));
            }
        });
        pieceBlack.$piece.draggable({
            helper:"clone",
            containment:"document",
            zIndex: 20,
            start:(event) => {
                this.clickCell(event.target.parentNode.getAttribute('data-row'),event.target.parentNode.getAttribute('data-column'));
            }
        });
        this.$cells[0][7 - this.line].append(pieceWhite.$piece);
        this.$cells[7][7 - this.line].append(pieceBlack.$piece);
        this.line++;
        if (this.line == 8) clearInterval(this.interval);
    }
    saveToLocal(){
        if(this.game==null){
            localStorage.setItem(this.row+' '+this.column, null);
            if(this.player==false) localStorage.setItem(this.newRow+' '+this.newColumn,  this.newSelected.children().first().attr('data-piecetype')+' white');
            else localStorage.setItem(this.newRow+' '+this.newColumn, this.newSelected.children().first().attr('data-piecetype')+' black');
            localStorage.setItem('player',this.player+'');
        }
    }
    chooseGameType(){
        let $frame=$('<div/>');
        $frame.addClass('choose');
        let $button1=$('<button/>');
        $button1.html('Create new online Game');
        let $button2=$('<button/>');
        $button2.html('Acces online Game');
        let $button3=$('<button/>');
        $button3.html('Play local Game');
        let id=$('<textArea>');
        id.attr('placeholder', 'Enter Game Id');
        id.attr('type','number');

        let name=$('<textArea>');
        name.attr('placeholder', 'Enter New Game Name');
        $frame.append(name);
        $frame.append(id);
        $frame.append($button1);
        $frame.append($button2);
        $frame.append($button3);
        $('body').append($frame);
        $button1.click(()=>{
            $.ajax({
                method: 'POST',
                url: 'https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game',
                data: { name: name.val() }
               }).done(( msg ) => {
                  this.gameId=msg.ID;
                  this.game=msg;
                  localStorage.setItem('ID'+msg.ID,'true');
                  this.onlinePlayerType=true;
                  this.$gameType.html('Online Game created by you : '+msg.post_title+'        ID: '+msg.ID+' ');
                  $frame.remove();
                  this.load();
               }); 
        });
        $button2.click(()=>{
            $.get( `https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/${id.val()}`, ( data ) => {
                this.gameId=data.ID;
                this.$gameType.html('Online Game : '+data.post_title+'         ID: '+data.ID+' ');
                this.game=data;
                $frame.remove();
                let playerType=localStorage.getItem('ID'+data.ID);
                if(playerType=='true') {
                    this.onlinePlayerType=true;
                }
                else{
                    this.onlinePlayerType=false;
                }
                this.load();
           });           
        });
        $button3.click(()=>{
            $frame.remove();
            this.load();
        });
    }
    load(){
        this.$joke = $('<div/>');
        this.$joke.addClass('joke');
        $('body').append(this.$joke);
        $.get( "https://sv443.net/jokeapi/v2/joke/Programming?format=txt", function( data ) {
            $( ".joke" ).html( data );
       });
       this.$joke.click(()=>{
        $.get( "https://sv443.net/jokeapi/v2/joke/Programming?format=txt", function( data ) {
            $( ".joke" ).html( data );
       });
       });
       if(this.gameId==null){
            let savedGame=localStorage.getItem('save');
            if(savedGame=='true'){
                if (confirm("Do you want to continue last game?") == true) {
                    if(localStorage.getItem('player')=='true'){
                        this.player=true;
                        this.$playerElem.html('white player turn');
                    }
                    else {
                        this.player=false;
                        this.$playerElem.html('black player turn');
                    }
                    this.loadSavedPieces();
                }
                else{
                    this.clearLocalStorage();
                    this.addPiecesToTable();
                    localStorage.setItem('save','false');
                }
            }
            else 
            {
                this.clearLocalStorage();
                this.addPiecesToTable();
                localStorage.setItem('save','false');
            }
        }
        else{
            for(let i=0;i<8;i++){
                this.palcePieces();
            }
            if(this.game.moves!=null) {
                this.applyMoves();
                this.noOnlineMoves=this.game.moves.length;
                if(this.player!=this.onlinePlayerType){
                    this.refreshMovesInterval=setInterval(() => { 
                        $.get( `https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/${this.game.ID}`, ( data ) => {
                            if(this.noOnlineMoves*1+1==data.moves.length){
                                this.movePieceWithoutValidation(data.moves[this.noOnlineMoves].from.x,data.moves[this.noOnlineMoves].from.y,data.moves[this.noOnlineMoves].to.x,data.moves[this.noOnlineMoves].to.y);
                                this.noOnlineMoves=this.noOnlineMoves*1+1;
                                clearInterval(this.refreshMovesInterval);
                            }
                        });  
                  }, 1000);                  
                }
            }else{
                this.noOnlineMoves=0;
            }
        }
        this.addTableToBody();
    }
    clearLocalStorage(){
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                localStorage.setItem(i+' '+j, null);
            }
        }
    }
    applyMoves(){
        for(let i=0;i<this.game.moves.length;i++){
            this.movePieceWithoutValidation(this.game.moves[i].from.x,this.game.moves[i].from.y,this.game.moves[i].to.x,this.game.moves[i].to.y);
        }
    }
    movePieceWithoutValidation(i,j,newI,newJ){
        if(this.$cells[newI][newJ].children().length!=0){
            this.newSelected=this.$cells[i][j];
            this.newRow=newI;
            this.newColumn=newJ;
            this.elimina();
        }
        if(i==this.whiteKingRow&&j==this.whiteKingColumn){
            this.whiteKingRow=newI;
            this.whiteKingColumn=newJ;
        }
        if(i==this.blackKingRow&&j==this.blackKingColumn){
            this.blackKingRow=newI;
            this.blackKingColumn=newJ;
        }
        this.$cells[newI][newJ].append(this.$cells[i][j].children().first());
        this.changePlayer();
    }
    loadSavedPieces(){
        let scoreWhite=39;
        let scoreBlack=39;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let key =  i +' '+ j;
                let pieceType=localStorage.getItem(key);
                let newPiece;
                switch(pieceType){
                    case 'pion white':
                        newPiece = new Pion(true);
                        scoreBlack-=1;
                        break;
                    case 'pion black':
                        newPiece = new Pion(false);
                        scoreWhite-=1;
                        break;
                    case 'rege white':
                        newPiece = new Rege(true);
                        this.whiteKingRow=i;
                        this.whiteKingColumn=j;
                        break;
                    case 'rege black':
                        newPiece = new Rege(false);
                        this.blackKingRow=i;
                        this.blackKingColumn=j;
                        break;
                    case 'turn white':
                        newPiece = new Turn(true);
                        scoreBlack-=5;
                        break;
                    case 'turn black':
                        newPiece = new Turn(false);
                        scoreWhite-=5;
                        break;
                    case 'nebun white':
                        newPiece = new Nebun(true);
                        scoreBlack-=3;
                        break;
                    case 'nebun black':
                        newPiece = new Nebun(false);
                        scoreWhite-=3;
                        break;
                    case 'regina white':
                        newPiece = new Regina(true);
                        scoreBlack-=9;
                        break;
                    case 'regina black':
                        newPiece = new Regina(false);
                        scoreWhite-=9;
                        break;
                    case 'cal white':
                        newPiece = new Cal(true);
                        scoreBlack-=3;
                        break;
                    case 'cal black':
                        newPiece = new Cal(false);
                        scoreWhite-=3;
                        break;
                    default:   
                    newPiece=null;
                }
                if(newPiece!=null) {
                    newPiece.$piece.draggable({
                        helper:"clone",
                        containment:"document",
                        zIndex: 20,
                        start:(event) => {
                            this.clickCell(event.target.parentNode.getAttribute('data-row'),event.target.parentNode.getAttribute('data-column'));
                        }
                    });
                    this.$cells[i][j].append(newPiece.$piece);
                }
            }
        }
        this.$whitePlayerScore.html(scoreWhite);
        this.$blackPlayerScore.html(scoreBlack);
    }
}

chess=new ChessTable();

})(jQuery);
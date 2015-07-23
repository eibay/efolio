var game = {

  //board: ['r0c0', 'r0c1', 'r0c2', 'r1c0', 'r1c1', 'r1c2', 'r2c0', 'r2c1', 'r2c2'],

  boardValues: [[], [], []],

  boardSize: 3,

  player1: {score: 0, name: 'SPIRIT', avatar: '', move: 0},

  player2: {score: 0, name: 'FLESH', avatar: '', move: 2},

  gameScore: 0,

  counter: 0,

  setRound: 3,

  moveCounter: 0,

  moves: [],

  //15Jul15
  setPlayer: function(){
    $('#p1-name').html(game.player1.name);
    $('#p2-name').html(game.player2.name);

  },//end setPlayer

  //15Jul15
  setTile: function (row, col, value){
    game.boardValues[row][col] = value;
  }, //end setTile

  //15Jul15
  initBoard: function(arr){
    _.each(arr, function(elem, index1){
        _.each(arr, function(elem, index2){
          game.setTile(index1, index2, 1);
        });
    });
  },//end initBoard

  //15Jul15
  checkLineSum: function(arr){
    var lineSum = 0;
    _.each(arr, function(elem){
       lineSum += elem;   
    });
    // console.log("Linesum: "+ lineSum);
    return lineSum;
  },

  //15Jul15
  checkLineMove: function(arr){
    var sum = game.checkLineSum(arr)
    if (sum === 0){
      return true;
    }else if (sum === 6){
      return true;
    }else{
      return false;
    }
  },

  //ROW CHECKING:

  //15Jul15
  checkRow: function (arr){
    var rowOut = false;
    _.each(arr, function(elem){
      var result = game.checkLineMove(elem);
        if (result === true){
          rowOut = true;
          return rowOut;
        }
    });
    return rowOut;
  },//end checkRow

  //COLUMN CHECKING:

  //15Jul15
  checkCol: function(arr){
    var colArr = [];
    var columnOut = false;

    // 4 determines size of array
    for (var i = 0; i <= game.boardSize; i++){
      
      //column builder
      _.each(arr, function(elem1, index){
        colArr.push(elem1[i]);
      }); //end of column builder

      columnOut = game.checkLineMove(colArr);
      if ( columnOut === true) {
        return columnOut; // declare outside _.each function
      }else{
        colArr = []; //reset to get next column
      }

    } //end of for
      return columnOut;//default to false!
  },//end of checkCol

  //DIAGONAL CHECKING
  checkDiagLine: function(arr, rev){
    var newArr = arr;
    var diagOut = false;
    var diagArr = [];
    var flatArr = [];//created 9 elements: from 3x3 matrix
    var len = (game.boardSize * game.boardSize);
    var stepCount = (game.boardSize + 1);
    
    if (rev === true){
      newArr = newArr.reverse();
      flatArr = _.flatten(newArr);
    }else{
      newArr = newArr.reverse();
      flatArr = _.flatten(newArr);
    }
    for (var j = 0; j < len; j += stepCount){
      diagArr.push(flatArr[j]);
    } //end of for    
    diagOut = game.checkLineMove(diagArr); 
    return diagOut;
  },//end of checkDiagLine

  //16Jul15
  checkDiag: function(arr){
    var newArr = arr;
    var diagOutLR = false;
    var diagOutRL = false;

    diagOutRL = game.checkDiagLine(newArr, true);
    diagOutLR = game.checkDiagLine(newArr, false);

    return (diagOutRL || diagOutLR || false);

  }, //end of checkDiag

  //
  checkRound: function(arr){
    var row = game.checkRow(arr);
    var col = game.checkCol(arr);
    var cross = game.checkDiag(arr);
    if ((row || col || cross) === true){
      return true;
    }else if (game.moves.length === 9){
      return "draw";
    }else{
      return false;
    }
  }, //end checkWin

  //
  updateScore: function(playerName){
    if (playerName === game.player1.name){
      game.player1.score += 1;

    }else{
      game.player2.score += 1;
    }
  },

  renderMatchWin: function(playerName){
    if (playerName === game.player1.name){
      $('#p1-score').html(game.player1.score);
      $('#p1-match').html(playerName + " WINS!");
      $('#p2-reset').html("<button class='playAgain'>PLAY AGAIN</button>");
      game.counter = 1; //switches starting player2
      game.winStatusToggle(true);
      if (game.player1.score < game.setRound){
        $( '#p2-reset' ).show( 1000 );
      } 

    }else{
      $('#p2-score').html(game.player2.score);
      $('#p2-match').html(playerName + " WINS!");
      $('#p1-reset').html("<button class='playAgain'>PLAY AGAIN</button>");
      game.counter = 0; //switches starting player1
      game.winStatusToggle(true);
      if (game.player2.score < game.setRound){  
        $( '#p1-reset' ).show( 1000 );
      }
    }

  },

  renderGameWin: function(playerName){
    $('.gameWinner').html
     ("<div>CLICK HERE FOR NEXT ROUND</div>");
    $('.gameWinner').show(1000);
    game.winStatusToggle(true);
  },

  renderDraw: function(){
    $('.gameDraw').html("<div>IT'S A DRAW! CLICK TO NEXT ROUND</div>");
    $('.gameDraw').show(1000);

  },

  // winStatusToggle: function (status) {
  //   if (status === true){
  //       $('.matrix').attr('disabled', true);
  //   } else {
  //       $('matrix').removeAttr('disabled');
  //   }   
  // },
  winStatusToggle: function(status){
    var nodes = document.getElementById("board").getElementsByTagName('div');
    for(var i = 0; i < nodes.length; i++){
      if (status === true){
        nodes[i].disabled = true;
      }else{
         nodes[i].disabled = false;
      }
    }
  }, //end of winStatusToggle

  //
  checkWinner: function(){
    if (game.player1.score === game.setRound){
      game.renderGameWin(game.player1.name);
    }else if (game.player2.score === game.setRound){
      game.renderGameWin(game.player2.name);
    }else{
      //do nothing!
    }
  },

  playerMove: function (playerName, arr){
    var playerMove = game.checkRound(arr);
    if (playerMove === true){
      game.updateScore(playerName);
      game.renderMatchWin(playerName);
      game.checkWinner();
    }else if (playerMove === "draw"){
      game.renderDraw();
    }else{
      //continue playing..
    }
  }, //end of playerMove

  gameReset: function (){
    $('div.matrix').html('');
    game.init();
    arrBoard = game.boardValues;
    $('#p1-match').html("free");
    $('#p2-match').html("slave");
    $( '.resetBtn' ).hide( 1000 );
    $( '.div.matrix' ).hide( 1000 );
    game.score = 0;
    $('.score').html("0");
    game.player1.score = 0;
    game.player2.score = 0;
    game.moveCounter = 0;
    game.moves = [];
    game.winStatusToggle(false);
  },

  matchReset: function(){
    $('div.matrix').html('');   //clears board display
    game.init();                // clears board array
    arrBoard = game.boardValues;
    game.moves = [];
    $('#p1-match').html("free");
    $('#p2-match').html("slave");
    $( '.resetBtn' ).hide( 1000 );
    game.moveCounter = 0;
    game.winStatusToggle(false);
  },

  init: function(){
    game.initBoard(game.boardValues); //working
    game.setPlayer();   
  }

} //end of game


window.onload = function() {

  //var ENTER_KEY = 13; //enter key code

  //15Jul
  game.init();

  //Declare global array data
  var arrBoard = game.boardValues;


   $('#board').on('click', '.matrix', function(){
    //prevention of double clicking.
    var idClick = $(this).attr("id");
  
    //marking starts here..
    if ((_.indexOf(game.moves, idClick)) === -1){
      //set up player alternate access
      game.moveCounter++; //tracks the number of tile clicks
      var playerNum = 1;
      if (game.counter % 2 === 0){
        playerNum = game.player1.move; //0 player1
        playerName = game.player1.name;
      }else{
        playerNum = game.player2.move; //2 player2
        playerName = game.player2.name;
      }

      var row = $(this).attr('data-row');
      var col = $(this).attr('data-col');
      game.setTile(row, col, playerNum);
      game.counter++;
      
      if (playerNum === 0){
        $(this).html('<img src="/img/safari.png" width="100%", height="100%">');
      }else{
        $(this).html('<img src="/img/firefox.jpg" width="100%", height="100%">');
      }
      game.moves.push(idClick);
      game.playerMove(playerName, arrBoard);

    }else{
      //do nothing since it's added already
    }

  });//end of board display  

  $(".resetBtn" ).click(function() {
    game.matchReset();
  });

  $('.gameWinner').click(function(){
    game.gameReset();
    $('.gameWinner').hide(1000);
  });

  $('.gameDraw').click(function(){
    game.matchReset();
    $('.gameDraw').hide(1000);
  });
  //animates the slow appearance of the matrix board
  $(document).ready(function(){
    // $( "#board" ).animate({ "height": "+=600px" }, 2500 );

    $("#board").animate({

    }, 1000, "linear", function(){
      $('#player1').fadeIn(3000);
      $('#player2').fadeIn(3000);
      $( "#player1" ).animate({ "left": "-=315px" }, 2000 );
      $( "#player2" ).animate({ "right": "-=315px" }, 2000 );
      $( "#player1" ).animate({ "top": "+=100px" }, 500 );
      $( "#player2" ).animate({ "top": "+=100px" }, 500 );
      $( "#player1" ).animate({ "top": "-=100px" }, 3500 );
      $( "#player2" ).animate({ "top": "-=100px" }, 3500 );
    });
    
    $('#board').fadeIn(5000).animate({
      opacity: 0.8,
    }, 4000 );
    
  
  }); //end of document ready

} //end of window onload

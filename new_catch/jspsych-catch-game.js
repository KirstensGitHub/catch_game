/*
 * Example plugin template
 */

jsPsych.plugins["catch-game"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "catch-game",
    parameters: {
      interval: {
        type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 1000
      }
    }
  }

  plugin.trial = function(display_element, trial) {

      // data saving
      var trial_data = {
        speed: interval
      };

      var end = false;

      // var canvas = document.getElementById("myCanvas");
      var canvas = document.createElement("canvas");

      // create a reference to the canvas

      var ctx = canvas.getContext("2d");
      // 2D rendering context we can use to paint on the canvas

      var paddleHeight = 50 ;
      var paddleWidth  = 150;
      // define paddle dimensions

      var paddleX = 150; //(canvas.width-paddleWidth) / 2;
      // set paddle start location

      var ballSize = 50;
      // define ball size

      var rightPressed = false;
      var leftPressed  = false;
      // variables to store right/left button presses

      var score = 0;
      // set starting score to zero

      var trials = 10;
      // set number of trials the player will play

      // set x and y values for square location
      let x = getRndInteger(0,9)*50 
      let y = 0 
      // ball start location, x and y vals

      let x_end = getRndInteger(0,9)*50 
      // pick ahead of time ball's ending x value

      let color = "black"
      // set ball color

      document.addEventListener("keydown", keyDownHandler, false);
      document.addEventListener("keyup", keyUpHandler, false);
      // set up listeners to listen for button presses

      //////////////////////////////////////////////////////

      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

      function drawScore() {
        ctx.font = "32px Arial"; // font
        ctx.fillStyle = "#0095DD"; // color
        ctx.fillText("Score: "+score, 8, 60); // content and screen location
      }
      // function for displaying the score


      // draw function that will repaint the square over and over again
      function drawBall() {

        ctx.beginPath(); 
        // begin instructions

        ctx.rect(x, y, ballSize, ballSize); 
        // first two values  --> coordinates of top left corner of square
        // second two values --> width and height of the square

        ctx.fillStyle = color
        // designates the square fill color

        ctx.fill();
        // fills the square with designated color

        ctx.closePath();  
        // end instructions
      }

      function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD"; //black
        ctx.fill();
        ctx.closePath();
      }
      // function for drawing the paddle

      function drawTrials() {
          ctx.font = "32px Arial";
          ctx.fillStyle = "#0095DD";

          if (trials < 51) {
            ctx.fillText("Staircase Trials: "+trials, 8 , 30);
          } else {
            ctx.fillText("Game Trials: "+trials, 8, 30);
          }
      }
      // function for drawing trial counter


    // UPDATE: want to record the first button they press in each time step
    //         implement the appropriate movement
    //         then clear for next time step

    function keyDownHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = true;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = true;
      }
    }

    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    // key handlers for collecting button presses


    function draw() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawScore();
      drawPaddle();
      drawTrials();
      // draw the ball, paddle, score, and trials


      // set change in x for next draw (set dx)
      if (x!=x_end && x<x_end){
        dx=50
        // let test_color="blue"; // for testing
        // IF upper left corner of ball is not at its ending location
        // AND the upper left corner of the ball is left of its ending location
        // THEN next redraw, the ball will move 50 pixels to the right (50)

      } else if (x!=x_end && x>x_end){
        dx=-50
        // let test_color="red"; // for testing
        // IF upper left corner of ball is not at its ending location
        // AND the upper left corner of the ball is right of its ending locations
        // THEN next redraw, the ball will move 50 pixels to the left (-50)

      } else{ 
        dx=0
        // let test_color="y";
        // ELSE (upper left corner of ball is in end position)
        // THEN next redraw, ball will not move along the x-axis (right or left)
      }

      // IF the square is landing above the paddle 
      if(x>paddleX-1 && x<paddleX+101 && y>449){

        score = score + 2;
        // increase score by 2

        trials--;
        // subtract number of remaining trials by 1

        if(!trials) {
          // AND this is the last trial
          alert("+2 points. Game over! Total score: "+score);
          // alert("+2 points");
          // game ends: display "Game over" message with final score
          document.location.reload();
          clearInterval(interval); // Needed for Chrome to end game

          // jsPsych.finishTrial(trial_data);

          end = true;

          // leftPressed = false;
          // rightPressed = false;
          

      } else {

          // AND this is NOT the last trial
          x = getRndInteger(0,9)*50;
          // set x coordinate of top left corner of ball to a random value along x axis, within the game space
          y = -100;
          // set the y coordinate of top left corner of ball to -50
          x_end = getRndInteger(0,9)*50;
          // set the ending location of the block along the x axis
          paddleX = 150;
          alert("+2 points");
          // leftPressed = false;
          // rightPressed = false;
      }


        } else if(x<paddleX || x>paddleX+100){
        if(y>450){
          trials--;
          if(!trials) {
            alert("+0 points. Game over! Total score: "+score);
            // alert("+0 points");

            document.location.reload();
            clearInterval(interval);

            //jsPsych.finishTrial(trial_data);

            end = true;

            leftPressed = false;
            rightPressed = false;


        } else {
          alert("+0 points");
          x = getRndInteger(0,9)*50;
          y = -100;
          x_end = getRndInteger(0,9)*50;
          paddleX = 150;
          leftPressed = false;
          rightPressed = false;

        }
        }
      }

      // now, update the ball location coordinates

      x += dx; // update the x position of square
      y += ballSize; // update the y position of square
                     // each time the ball drops by one ballSize

      // now, update the paddle location 

      if(rightPressed) {
        paddleX += 50;
          if (paddleX + paddleWidth > canvas.width){
              paddleX = canvas.width - paddleWidth;
          }
      } else if(leftPressed) {
        paddleX -= 50;
        if (paddleX < 0){
            paddleX = 0;
          }
        }

      // clear the left and right button presses

    }

    var interval = setInterval(draw, 90);
    // set how often screen re-draws (in milliseconds)

    //draw()

    // function show_stimulus(){;
    //     display_element.innerHTML = "<p>" + trial.words + "</p>"
    // }

    // show_stimulus();

    if(end==true){
    // end trial
    jsPsych.finishTrial(trial_data);
    }
  };



  return plugin;
})();

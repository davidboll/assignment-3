$(() => {
  // console.log("Jquery funkar!");

  const $boxes = $(".box");
  const $statusTxt = $("#status");
  const $btnRestart = $("#restart");
  const arnold =
    "<img src='./images/arnold.png' alt='Image of Arnold' class='character-icon'>";
  const terminator =
    "<img src='./images/terminator.png' alt='Image of The Terminator' class='character-icon'>";

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let options = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = arnold;
  let player = "Arnold";
  let running = false;
  let score = { Arnold: 0, Terminator: 0 };

  const startGame = () => {
    $boxes.on("click", (event) => boxClick($(event.currentTarget)));
    $btnRestart.on("click", restartGame);
    $statusTxt.text(`${player}'s Turn`);
    running = true;
    $btnRestart.hide();
  };

  const boxClick = ($box) => {
    const index = $box.data("index");
    if (options[index] !== "" || !running) {
      return;
    }
    updateBox($box, index);
    checkWinner();
  };

  const updateBox = ($box, index) => {
    options[index] = player;
    $box.html(currentPlayer);
  };

  const changePlayer = () => {
    if (player === "Arnold") {
      player = "Terminator";
      currentPlayer = terminator;
    } else {
      player = "Arnold";
      currentPlayer = arnold;
    }
    $statusTxt.text(`${player}'s Turn`);
  };

  const checkWinner = () => {
    let gameOver = false;
    for (let i = 0; i < winningCombinations.length; i++) {
      const condition = winningCombinations[i];
      const box1 = options[condition[0]];
      const box2 = options[condition[1]];
      const box3 = options[condition[2]];
      if (box1 === "" || box2 === "" || box3 === "") {
        continue;
      }
      if (box1 === box2 && box2 === box3) {
        gameOver = true;
        break;
      }
    }

    if (gameOver) {
      score[player]++;
      $statusTxt.text(`${player} wins this round!`);
      running = false;
      checkSeriesWinner();
      $btnRestart.show();
    } else if (!options.includes("")) {
      $statusTxt.text(`Game is a draw!`);
      running = false;
      $btnRestart.show();
    } else {
      changePlayer();
    }
  };

  const checkSeriesWinner = () => {
    if (score.Arnold === 2 || score.Terminator === 2) {
      $statusTxt.text(`${player} wins the game!`);
      $btnRestart.text("Restart Game");
    } else {
      $btnRestart.text("Next Round");
    }
  };

  const restartGame = () => {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = arnold;
    player = "Arnold";
    running = true;
    $statusTxt.text(`Go ahead ${player}`);

    // Clear each box on the board
    $boxes.each(function () {
      $(this).html("");
    });

    if (score.Arnold === 2 || score.Terminator === 2) {
      score = { Arnold: 0, Terminator: 0 };
      $btnRestart.text("Restart Game");
    } else {
      $btnRestart.text("Next Game");
    }
    $btnRestart.hide();
  };

  startGame();
});

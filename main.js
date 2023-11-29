/*
 TODO:
 - Game Object
    -  Game play
        - Function when called runs the game
 
 - Player moment
 - Player rendering
    
*/

GAME_OBJECTS = new Array();

function game() {
  GAME_OBJECTS.forEach((index, object) => {
    console.log(index);
    object.update();
  });

  GAME_OBJECTS.forEach((object) => {
    object.renderer();
  });
}

class HEJ {
  update() {
    console.log("UPDATED");
  }
  renderer() {
    console.log("Rendered");
  }
}
GAME_OBJECTS.push(new HEJ());

game();

interface Game {

}

export default class Controller {
   constructor() {

   }


function Controller(game) {
   this.game = game;
   this.view = new View(this, game);
   this.init();
}

init() {
   let self = this;
   self.view.initialize();

   self.view.app.stage.on('click', function (e) {
      self.game.instantiateShape(e.data.global);
   });

   this.addButtonListeners();
}

addButtonListeners() {
   let self = this;

   // Gravity controls
   let butttonGravityInc = document.querySelector('.gravity-value-controls button.inc');
   let butttonGravityDec = document.querySelector('.gravity-value-controls button.dec');

   butttonGravityInc.addEventListener('click', function (e) {
      e.preventDefault();
      self.game.incGravity();
   });
   butttonGravityDec.addEventListener('click', function (e) {
      e.preventDefault();
      self.game.decGravity();
   });

   // Shape spawning speed controls
   let butttonShapeSpawnSpeedInc = document.querySelector('.shape-spawn-speed-controls button.inc');
   let butttonShapeSpawnSpeedDec = document.querySelector('.shape-spawn-speed-controls button.dec');

   butttonShapeSpawnSpeedInc.addEventListener('click', function (e) {
      e.preventDefault();
      self.game.incShapesSpawningSpeed();
   });
   butttonShapeSpawnSpeedDec.addEventListener('click', function (e) {
      e.preventDefault();
      self.game.decShapesSpawningSpeed();
   });
}

registerNewShape(shape) {
   let self = this;

   if (shape) {
      shape.on('click', function (e) {
         self.game.removeShape(shape);
      });
   }
}

window.Controller = Controller;
}
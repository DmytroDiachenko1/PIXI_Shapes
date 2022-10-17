import Game from "../Model/Game";
import View from "../View/View";

export default class Controller {
   game: Game;
   view: View;

   constructor(game: Game) {
      this.game = game;
      this.view = new View(this, game);
      this.init();
   }


   init(): void {
      this.view.initialize();

      this.view.app.stage.on('click', (e) => {
         this.game.instantiateShape(e.data.global);
      });

      this.addButtonListeners();
   }

   addButtonListeners(): void {

      // Gravity controls
      let butttonGravityInc = document.querySelector('.gravity-value-controls button.inc');
      let butttonGravityDec = document.querySelector('.gravity-value-controls button.dec');

      butttonGravityInc!.addEventListener('click', (e) => {
         e.preventDefault();
         this.game.incGravity();
      });
      butttonGravityDec!.addEventListener('click', (e) => {
         e.preventDefault();
         this.game.decGravity();
      });

      // Shape spawning speed controls
      let butttonShapeSpawnSpeedInc = document.querySelector('.shape-spawn-speed-controls button.inc');
      let butttonShapeSpawnSpeedDec = document.querySelector('.shape-spawn-speed-controls button.dec');

      butttonShapeSpawnSpeedInc!.addEventListener('click', (e) => {
         e.preventDefault();
         this.game.incShapesSpawningSpeed();
      });
      butttonShapeSpawnSpeedDec!.addEventListener('click', (e) => {
         e.preventDefault();
         this.game.decShapesSpawningSpeed();
      });
   }

   registerNewShape(shape): void {

      if (shape) {
         shape.on('click', (e) => {
            this.game.removeShape(shape);
         });
      }
   }

}
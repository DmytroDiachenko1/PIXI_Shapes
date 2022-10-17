import Game from "./Model/Game";
import Controller from "./Controller/Controller";
import { Application } from "pixi.js";


// View class
export default class View {
   game: Game;
   controller: Controller;
   app: Application;


   constructor(controller: Controller, game: Game) {
      this.controller = controller;
      this.game = game;
      this.app = new Application({ width: WINDOW_SIZE.width, height: WINDOW_SIZE.height, backgroundColor: rendererOptions.backgroundColor, resolution: rendererOptions.resolution });
      this.app.renderer.autoResize = true;
      document.querySelector('#game-view').appendChild(this.app.renderer.view);
   }

let PIXELS_PER_METER = window.innerWidth / 1000;
let WINDOW_SIZE = {
   width: 1024,
   height: 768
};
let rendererOptions = {
   backgroundColor: 0xffffff,
   autoResize: true,
   resolution: window.devicePixelRatio
};


View.prototype.initialize = function () {

   this.startObservers();

   // register world in the Game 
   this.game.registerWorld(this.app);

   this.app.stage.interactive = true;
   // add trigger for user interactions
   this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.app.renderer.width, this.app.renderer.height / this.app.renderer.resolution);

   // add ticker
   this.app.ticker.add(function (delta) {
      this.render(delta);
   });
}


// describe observers
View.prototype.startObservers = function () {
   this.game.subscribe('instantiateShape', function instantiateShapeObserver(shape) {
      if (shape) {
         shape.interactive = true;
         // notify the controller about new shape for add handlers
         this.controller.registerNewShape(shape);
         this.app.stage.addChild(shape);
      }
   });

   this.game.subscribe('shapesNumberChange', function shapesNumberChangeObserver(e) {
      let element = document.getElementById('number-of-shapes');
      if (element) {
         element.value = e.shapesNumber;
      }
   });

   this.game.subscribe('shapesAreaChange', function shapesAreaChangeObserver(e) {
      let element = document.getElementById('area-of-shapes');
      if (element) {
         element.value = Math.floor(e.shapesArea);
      }
   });

   this.game.subscribe('shapesPerSecChange', function shapesPerSecChangeObserver(e) {
      let element = document.getElementById('shape-spawn-speed');
      if (element) {
         element.value = e.shapesPerSec;
      }
   });

   this.game.subscribe('gravityForceChange', function gravityForceChangeObserver(e) {
      let element = document.getElementById('gravity-value');
      if (element) {
         element.value = e.gravityForce;
      }
   });
}

View.prototype.animateFalling = function (delta) {
   // TODO refactor it
   // iterate objects in stage and animate falling
   this.app.stage.children.forEach(function (shape) {
      // auto destroy shapes
      if (shape) {
         if (shape.position.y - this.game.cfg.RADIUS * 2 > this.app.renderer.height / this.app.renderer.resolution) {
            this.game.removeShape(shape);
            return;
         }
         // calc vertical velocity and store it in a shape
         shape.velocityY += this.game.cfg.gravityForce * delta * PIXELS_PER_METER;
         // update position by add (velocity/fps)
         shape.position.y += shape.velocityY / 1000 / delta;
      }
   });
}

View.prototype.render = function (delta) {
   this.animateFalling(delta);
}

}
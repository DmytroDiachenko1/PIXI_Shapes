// View class
; (function () {
   "use strict";

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

   function View(controller, game) {
      this.controller = controller;
      this.game = game;
      this.app = new PIXI.Application(WINDOW_SIZE.width, WINDOW_SIZE.height, rendererOptions);

      this.app.renderer.autoResize = true;
      document.querySelector('#game-view').appendChild(this.app.renderer.view);
   }

   View.prototype.initialize = function () {
      let self = this;
      self.startObservers();

      // register world in the Game 
      self.game.registerWorld(self.app);

      self.app.stage.interactive = true;
      // add trigger for user interactions
      self.app.stage.hitArea = new PIXI.Rectangle(0, 0, self.app.renderer.width, self.app.renderer.height / self.app.renderer.resolution);

      // add ticker
      self.app.ticker.add(function (delta) {
         self.render(delta);
      });
   }


   // describe observers
   View.prototype.startObservers = function () {
      let self = this;

      self.game.addObserver('instantiateShape', function instantiateShapeObserver(shape) {
         if (shape) {
            shape.interactive = true;
            // notify the controller about new shape for add handlers
            self.controller.registerNewShape(shape);
            self.app.stage.addChild(shape);
         }
      });

      self.game.addObserver('shapesNumberChange', function shapesNumberChangeObserver(e) {
         let element = document.getElementById('number-of-shapes');
         if (element) {
            element.value = e.shapesNumber;
         }
      });

      self.game.addObserver('shapesAreaChange', function shapesAreaChangeObserver(e) {
         let element = document.getElementById('area-of-shapes');
         if (element) {
            element.value = Math.floor(e.shapesArea);
         }
      });

      self.game.addObserver('shapesPerSecChange', function shapesPerSecChangeObserver(e) {
         let element = document.getElementById('shape-spawn-speed');
         if (element) {
            element.value = e.shapesPerSec;
         }
      });

      self.game.addObserver('gravityForceChange', function gravityForceChangeObserver(e) {
         let element = document.getElementById('gravity-value');
         if (element) {
            element.value = e.gravityForce;
         }
      });
   }

   View.prototype.animateFalling = function (delta) {
      let self = this;
      // TODO refactor it
      // iterate objects in stage and animate falling
      this.app.stage.children.forEach(function (shape) {
         // auto destroy shapes
         if (shape) {
            if (shape.position.y - self.game.cfg.RADIUS * 2 > self.app.renderer.height / self.app.renderer.resolution) {
               self.game.removeShape(shape);
               return;
            }
            // calc vertical velocity and store it in a shape
            shape.velocityY += self.game.cfg.gravityForce * delta * PIXELS_PER_METER;
            // update position by add (velocity/fps)
            shape.position.y += shape.velocityY / 1000 / delta;
         }
      });
   }

   View.prototype.render = function (delta) {
      this.animateFalling(delta);
   }

   window.View = View;
})();
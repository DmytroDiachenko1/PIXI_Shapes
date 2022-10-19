import Game from "./Model/Game";
import Controller from "./Controller/Controller";
import { Application } from "pixi.js";

const PIXELS_PER_METER = window.innerWidth / 1000;
const WINDOW_SIZE = {
   width: 1024,
   height: 768
};
const rendererOptions = {
   backgroundColor: 0xffffff,
   autoResize: true,
   resolution: window.devicePixelRatio
};
// View class
export default class View {
   game: Game;
   controller: Controller;
   app: Application;


   constructor(controller: Controller, game: Game) {

      this.controller = controller;
      this.game = game;
      this.app = new Application({
         width: WINDOW_SIZE.width,
         height: WINDOW_SIZE.height,
         backgroundColor: rendererOptions.backgroundColor,
         resolution: rendererOptions.resolution
      });
      document.querySelector('#game-view')!.appendChild(this.app.renderer.view);
   }

   initialize(): void {

      this.startObservers();

      // register world in the Game 
      this.game.registerWorld(this.app);

      this.app.stage.interactive = true;
      // add trigger for user interactions
      this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.app.renderer.width, this.app.renderer.height / this.app.renderer.resolution);

      // add ticker
      this.app.ticker.add((delta) => this.render(delta));
   }


   // describe observers
   startObservers(): void {
      this.game.eventEmitter.subscribe('instantiateShape', (shape) => {
         if (shape) {
            shape.interactive = true;
            // notify the controller about new shape for add handlers
            this.controller.registerNewShape(shape);
            this.app.stage.addChild(shape);
         }
      });

      this.game.eventEmitter.subscribe('shapesNumberChange', (e) => {
         const element = document.getElementById('number-of-shapes') as HTMLInputElement;
         if (element) {
            element.value = e.shapesNumber;
         }
      });

      this.game.eventEmitter.subscribe('shapesAreaChange', (e) => {
         const element = document.getElementById('area-of-shapes') as HTMLInputElement;
         if (element) {
            element.value = Math.floor(e.shapesArea) + '';
         }
      });

      this.game.eventEmitter.subscribe('shapesPerSecChange', (e) => {
         const element = document.getElementById('shape-spawn-speed') as HTMLInputElement;
         if (element) {
            element.value = e.shapesPerSec;
         }
      });

      this.game.eventEmitter.subscribe('gravityForceChange', (e) => {
         const element = document.getElementById('gravity-value') as HTMLInputElement;
         if (element) {
            element.value = e.gravityForce;
         }
      });
   }

   animateFalling(delta) {
      // TODO refactor it
      // iterate objects in stage and animate falling
      this.app.stage.children.forEach((shape) => {
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

   render(delta): void {
      this.animateFalling(delta);
   }
}


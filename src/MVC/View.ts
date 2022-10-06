import * as PIXI from 'pixi.js';
import App from '../index'
const Application = PIXI.Application;

export default class View {

   initPIXIApp(properties) {
      const { width, height } = properties;
      const canvas = document.getElementById('stage');

      this.pixiApp = new Application({
         width,
         height,
         view: canvas,
         transparent: true
      });

      this.pixiApp.stage.sortableChildren = true;

      this.createRectangle(this.createStage(), properties);
   }

   createStage() {
      const container = new PIXI.Container();
      container.name = 'stage';

      this.pixiApp.stage.addChild(container);
      return container;
   }

   createRectangle(parentContainer, properties) {
      const { width, height } = properties;
      App.generateShapes();
      const graphics = new PIXI.Graphics();
      graphics.name = 'rectangle';
      graphics.beginFill(0x000000);
      graphics.drawRect(0, 0, width, height);
      graphics.endFill();
      graphics.alpha = 0;
      graphics.interactive = true;
      graphics.buttonMode = true;
      parentContainer.addChild(graphics);
      graphics.on('pointerdown', ({ data }) => App.createShapeOnClick(data));
   }

   updateGravity({ gravityValue }) {
      const footerGravity = document.getElementById('footer-gravity');
      footerGravity.innerHTML = gravityValue;
   }

   updateNumberOfShapes({ numberOfShapes }) {
      const shapeNumber = document.getElementById('footer-number-of-shapes');
      shapeNumber.innerHTML = numberOfShapes;
   }
}
import App from "../index";
import Triangle from "../Figures/Triangle";.
import Quadrangle from "../Figures/Quadrangle";
import Pentagon from "../Figures/Pentagon";
import Hexagon from "../Figures/Hexagon";
import Circle from "../Figures/Circle";
import Ellipse from "../Figures/Ellipse";
import EventEmitter from "../EventEmmiter/EventEmitter";

export default class Controller {
   constructor(Model, View) {
      this.Model = Model;
      this.View = View;
      this.onUpdate = new EventEmitter();
   };

   init() {
      this.View.initPIXIApp(this.Model.getProperties());
      this.Model.initDOM();
      this.onUpdate.subscribe(this.View.updateGravity.bind(this));
      this.onUpdate.subscribe(this.View.updateNumberOfShapes.bind(this));
   }

   createShapeOnClick(data) {
      const properties = this.Model.getProperties();
      const { x, y } = data.global;
      const shape = this.initShape(properties);

      shape.graphics.position.set(x, y);
      this.shapesFalls(shape, properties, x, y);
   }

   makeShapeDisappear(figure, makeShapeFalls) {
      const shape = figure.graphics;
      let { shapeColors } = this.Model.getProperties();
      const stage = this.View.pixiApp.stage.getChildAt(0);
      const ticker = this.View.pixiApp.ticker;
      this.Model.pixels -= figure.area
      shape.destroy();
      stage.children.forEach(graphic => {
         if (graphic) {
            graphic.tint = shapeColors[Math.floor(Math.random() * shapeColors.length)];
         }
      })

      ticker.remove(makeShapeFalls);
   }

   initShape() {
      let { shapeTypes, shapeColors } = this.Model.getProperties();
      const parentContainer = this.View.pixiApp.stage.getChildByName('stage');
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      let shape;
      const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
      switch (shapeType) {
         case 'quadrangle':
            shape = new Quadrangle({ color });
            break;
         case 'pentagon':
            shape = new Pentagon({ color });
            break;
         case 'hexagon':
            shape = new Hexagon({ color });
            break;
         case 'circle':
            shape = new Circle({ color });
            break;
         case 'ellipse':
            shape = new Ellipse({ color });
            break;
         default:
            shape = new Triangle({ color });
      }

      shape.drawShape();
      parentContainer.addChild(shape.graphics);

      this.Model.pixels += shape.area;

      return shape
   };

   generateShapes() {
      const defaultNumberOfShapes = 1;
      if (this.View.pixiApp) {
         const ticker = this.View.pixiApp.ticker;
         let startTime = Date.now(); // save time for calc diff

         const func = () => {
            if (Date.now() - startTime > 1000 / (this.Model.getData().numberOfShapes || defaultNumberOfShapes)) { // time spent
               startTime = Date.now();
               const shape = App.initShape();
               this.shapesFalls(shape, this.Model.getProperties());
            }
         };
         ticker.add(func);
         return func;
      }
   }

   shapesFalls(figure, properties, x = Math.floor(Math.random() * (800 - figure.graphics.width)), y = -figure.graphics.height) {
      let shape = figure.graphics;
      const pixiApp = this.View.pixiApp;
      const defaultGravity = 5;
      const ticker = pixiApp.ticker;
      const parentContainer = pixiApp.stage.getChildByName('stage');
      const { height } = properties;
      const pixelsElem = document.getElementById('surface-area');

      pixelsElem.innerHTML = this.Model.pixels;
      const shapeNumber = document.getElementById('number');
      shapeNumber.innerHTML = parentContainer.children.length - 1;
      shape.position.set(x, y);

      const makeShapeFalls = () => {
         if (shape.y >= height + shape.height) {
            this.Model.pixels -= figure.area;
            ticker.remove(makeShapeFalls);
            pixelsElem.innerHTML = this.Model.pixels;

            shape.destroy();
         } else {
            shape.y += this.Model.getData().gravityValue || defaultGravity
         }
      };

      shape.interactive = true;
      shape.buttonMode = true;

      shape.on('pointerdown', () => App.makeShapeDisappear(figure, makeShapeFalls));

      ticker.add(makeShapeFalls);
   }
}

import MainFigure from "./MainFigure";
import { Point } from 'pixi.js';

let area = require('area-polygon')
export default class Hexagon extends MainFigure {
   drawShape() {
      super.drawShape();
      this.graphics!.drawPolygon([
         new PIXI.Point(10, this.height),
         new PIXI.Point(70, this.height),
         new PIXI.Point(this.width, this.height / 2),
         new PIXI.Point(this.width / 2, 0),
         new PIXI.Point(0, this.height / 2),
         new PIXI.Point(this.width / 2, this.height + 30),
         new PIXI.Point(20, this.height / 2)
      ]);

      this.setArea();

      return this.graphics
   }

   setArea() {
      this.area = area([
         [10, 100],
         [70, 100],
         [100, 50],
         [50, 0],
         [0, 50],
         [50, 130],
         [20, 50]
      ]
      ) >> 0;
   }
}

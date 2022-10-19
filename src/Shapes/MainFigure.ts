import { Graphics } from 'pixi.js';

export default class Shape {
   params: params;
   width: number;
   height: number;
   graphics: Graphics | null;
   type: params.type;
   area: null;

   constructor(params) {
      this.width = 50;
      this.height = 50;
      this.graphics = null;
      this.type = params.type;
      this.color = params.color;
      this.area = null;
   }

   drawShape() {
      this.graphics = new Graphics();
      this.graphics.beginFill(this.color);
      this.graphics.position.set(Math.floor(Math.random() * (800 - this.graphics.width)), -this.graphics.height);
   }
}

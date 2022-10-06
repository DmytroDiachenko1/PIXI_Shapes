import MainFigure from "./MainFigure";
export default class Quadrangle extends MainFigure {

   drawShape() {
      super.drawShape();
      this.graphics.drawRect(0, 0, this.width, this.height).endFill();
      this.setArea();
      return this.graphics
   }

   setArea() {
      this.area = this.height * this.width >> 0;
   }
}

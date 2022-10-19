import MainFigure from "./MainFigure";
export default class Circle extends MainFigure {

   drawShape() {
      super.drawShape();
      this.graphics!.drawCircle(this.width / 2, 0, this.width / 2);
      this.setArea();
      return this.graphics
   }

   setArea() {
      this.area = Math.PI * Math.pow(this.width / 2, 2) >> 0;
   }
}
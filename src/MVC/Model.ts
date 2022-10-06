import App from '../index'
import text from '../text.json'
export default class Model {
   constructor() {
      this.width = 800;
      this.height = 600;
      this.shapeColors = [0xFF7DFF, 0xFFFF7D, 0x5A76E5, 0x008080, 0xBE7DFF, 0xFFDB00, 0x5DEA5D, 0x5FDCFF, 0xFD9AB1];
      this.shapeTypes = ['triangle', 'quadrangle', 'pentagon', 'hexagon', 'circle', 'ellipse'];
      this.pixels = 0;

      this.data = {
         gravityValue: 5,
         numberOfShapes: 1
      }
   };

   getData() {
      return this.data;
   }

   getProperties() {
      return {
         width: this.width,
         height: this.height,
         shapeColors: this.shapeColors,
         shapeTypes: this.shapeTypes
      }
   }

   initDOM() {
      const gravityElem = document.getElementsByClassName('gravity-value');
      const gravityDecrease = gravityElem[0].getElementsByClassName('decrease')[0];
      const gravityIncrease = gravityElem[0].getElementsByClassName('increase')[0];
      gravityIncrease.addEventListener('click', () => this.changeGravityValue('increase'));
      gravityDecrease.addEventListener('click', () => this.changeGravityValue('decrease'));

      const shapesElem = document.getElementsByClassName('number-of-shapes');
      const shapesElemDecrease = shapesElem[0].getElementsByClassName('decrease')[0];
      const shapesElemIncrease = shapesElem[0].getElementsByClassName('increase')[0];

      shapesElemIncrease.addEventListener('click', () => this.changeShapesNumber('increase'));
      shapesElemDecrease.addEventListener('click', () => this.changeShapesNumber('decrease'));

      document.getElementById('shapes').innerinnerText = text['FOOTER-SHAPES'];
      document.getElementById('gravity').innerinnerText = text['FOOTER_GRAVITY'];
      document.getElementById('shapesNumber').innerinnerText = text['SHAPES_NUMBER'];
      document.getElementById('shapesArea').innerinnerText = text['SHAPES_AREA'];
   }

   changeGravityValue(type) {
      let { gravityValue } = this.data;
      switch (type) {
         case 'increase':
            gravityValue += 1;
            break;
         case 'decrease':
            if (gravityValue > 1) {
               gravityValue -= 1;
            }
            break;

      }
      this.data.gravityValue = gravityValue;
      App.onUpdate.emit(this.data);
   };

   changeShapesNumber(type) {
      let { numberOfShapes } = this.data;

      switch (type) {
         case 'increase':
            numberOfShapes += 1;
            break;
         case 'decrease':
            if (numberOfShapes > 1) {
               numberOfShapes -= 1;
            }
            break;
      }
      this.data.numberOfShapes = numberOfShapes;

      App.onUpdate.emit(this.data);
   };
}

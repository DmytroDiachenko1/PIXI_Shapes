interface Config {
   RADIUS: number;
   shapesPerSec: number;
   shapeSpawnDelay: number;
   gravityForce: number;
}
export default class Game {
   cfg: Config;

   constructor() {
      // extends class Observable
      //Observable.call(this);
      this.cfg = {
         RADIUS: 60,
         shapesPerSec: 15,
         shapeSpawnDelay: 1000,
         gravityForce: 9
      };
   }

   //Game.prototype = Object.create(Observable.prototype);
   //constructor = Game;


   // Game logic
   init() {
      this.startShapeSpawning();

      // notify observers with init values
      this.emit('gravityForceChange', { gravityForce: this.cfg.gravityForce });
      this.emit('shapesPerSecChange', { shapesPerSec: this.cfg.shapesPerSec });
      this.calcShapesArea();
      this.calcShapesNumber();
   };

   registerWorldyworld) {
   this.world = world;
   this.init();
};

startShapeSpawning() {
   let self = this;
   self.spawnManyShapes();
   self._shapesSpawnTimerId = setInterval(function () {
      self.spawnManyShapes();
   }, self.cfg.shapeSpawnDelay);
};

// stop spawning shapes (for future)
stopShapeSpawning() {
   let self = this;
   clearInterval(self._shapesSpawnTimerId);
   self._shapesSpawnTimerId = null;
}

spawnManyShapes() {
   for (let i = 0; i < this.cfg.shapesPerSec; i++) {
      this.instantiateShape();
   }
}

calcShapesNumber() {
   this.emit('shapesNumberChange', { shapesNumber: this.world.stage.children.length });
};

calcShapesArea() {
   let area = this.world.stage.children.reduce(function (prev, current) {
      return prev + current.area;
   }, 0);
   this.emit('shapesAreaChange', { shapesArea: area });
};

incShapesSpawningSpeed() {
   this.cfg.shapesPerSec += 1;
   this.emit('shapesPerSecChange', { shapesPerSec: this.cfg.shapesPerSec });
};

decShapesSpawningSpeed() {
   let shapesPerSec = this.cfg.shapesPerSec - 1;
   // prevent negative values
   this.cfg.shapesPerSec = shapesPerSec >= 0 ? shapesPerSec : 0;
   this.emit('shapesPerSecChange', { shapesPerSec: this.cfg.shapesPerSec });
};

incGravity() {
   this.cfg.gravityForce += 1;
   this.emit('gravityForceChange', { gravityForce: this.cfg.gravityForce });
};

decGravity() {
   this.cfg.gravityForce -= 1;
   this.emit('gravityForceChange', { gravityForce: this.cfg.gravityForce });
};

instantiateShape(position) {
   // TODO Refactor it
   let self = this;

   if (!position) {
      // add start position
      position = {
         x: getRandomInRange(self.cfg.RADIUS, self.world.renderer.width - self.cfg.RADIUS),
         y: -(this.cfg.RADIUS)
      };
   }

   let shape;
   // random shape generator
   let shapeType = getRandomIntInRange(1, 6);
   switch (shapeType) {
      case 1:
      case 2:
      case 3:
      case 4:
         shape = createPolygon(position);
         break;
      case 5:
         shape = createCircle(position);
         break;
      case 6:
         shape = createEllipse(position);
         break;
      default:
         shape = createPolygon(position);
         break;
   }

   // add init velocityY
   shape.velocityY = 0;
   // notify observers with new data
   self.emit('instantiateShape', shape);
   self.calcShapesArea();
   self.calcShapesNumber();

   // shape creators
   function createCircle(pos) {
      let graphics = new PIXI.Graphics();
      // surface area of shape
      graphics.area = Math.PI * self.cfg.RADIUS * self.cfg.RADIUS;
      return graphics
         .beginFill(getRandomColor())
         .drawCircle(pos.x, pos.y, self.cfg.RADIUS)
         .endFill();
   }

   function createEllipse(pos) {
      let graphics = new PIXI.Graphics();
      // surface area of shape
      graphics.area = Math.PI * self.cfg.RADIUS * self.cfg.RADIUS / 2;
      return graphics
         .beginFill(getRandomColor())
         .drawEllipse(pos.x, pos.y, self.cfg.RADIUS, self.cfg.RADIUS / 2)
         .endFill();
   }

   function createPolygon(pos) {
      let VERTS = getRandomIntInRange(3, 6);

      // generate paths
      let paths = [];
      for (let i = 0; i < VERTS; i++) {
         let xi = pos.x + self.cfg.RADIUS * Math.cos(360 / 2 * VERTS + (2 * Math.PI * i / VERTS));
         let yi = pos.y + self.cfg.RADIUS * Math.sin(360 / 2 * VERTS + (2 * Math.PI * i / VERTS));
         paths.push(xi, yi);
      }

      let graphics = new PIXI.Graphics();
      // length of edge
      let a = Math.sqrt((paths[0] - paths[2]) * (paths[0] - paths[2]) + (paths[1] - paths[3]) * (paths[1] - paths[3]));
      // surface area of shape
      graphics.area = 1 / 2 * self.cfg.RADIUS * VERTS * a;
      return graphics
         .beginFill(getRandomColor())
         .drawPolygon(paths)
         .endFill();
   }
};

removeShape(shape) {
   let self = this;
   shape.destroy();
   self.calcShapesArea();
   self.calcShapesNumber();
}

}
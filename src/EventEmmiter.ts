export default class EventEmitter {
   constructor() {
      this.subscribtions = []
   }

   emit(value: number) {
      if (this.subscribtions.length > 0) {
         for (const sub of this.subscribtions) {
            sub(value);
         }
      }
   }

   subscribe(listener) {
      if (!listener) {
         return;
      }
      this.subscribtions.push(listener);
   }

}
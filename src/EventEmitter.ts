
export default class EventEmitter {
   subcribers: {
      [k: string]: Function[];
   }
   constructor() {
      this.subcribers = {};
   }



   // add function-observer events
   subscribe(label: string, callback: Function): void {
      if (!this.subcribers[label]) {
         this.subcribers[label] = [];
      }
      this.subcribers[label].push(callback);
   }

   // notify subcribers by event label
   emit(label: string, event: unknown): void {
      let subcribers = this.subcribers[label];
      if (subcribers && subcribers.length) {
         subcribers.forEach(function (callback) {
            callback(event);
         });
      }
   }

}
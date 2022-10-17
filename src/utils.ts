function getRandomIntInRange(min: number, max: number) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
   let MAX = 16777215;
   return Math.floor(Math.random() * MAX);
}

function getRandomInRange(min: number, max: number) {
   return Math.random() * (max - min) + min;
}
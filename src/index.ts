import "./styles/style.scss";
import Model from './MVC/Model';
import View from './MVC/View';
import Controller from './MVC/Controller';
import * as PIXI from '../node_modules/pixi.js';

const App = new Controller(new Model(), new View());
export default App;
window.PIXI = PIXI;
window.App = App;

App.init();
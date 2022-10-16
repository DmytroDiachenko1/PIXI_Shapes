import Game from './MVC/Model/Game'
import Controller from './MVC/Controller/Controller'
import './styles/main.scss'

//init game model
const game = new Game();
//init controller
const controller = new Controller(game);
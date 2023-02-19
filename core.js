import * as THREE from './js/three.module.js';
import { PointerLockControls } from './js/PointerLockControls.js';

import { Map } from "./js/generationMap.js";
import { Controls } from "./js/controls.js";

// стандартные настройки three.js
const canvas				= document.querySelector("#game");
const scene 				= new THREE.Scene();
scene.background 			= new THREE.Color(0x00ffff);
scene.fog 					= new THREE.Fog(0x00ffff, 10, 650);
const renderer 				= new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
const camera 				= new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50, 40, 50);

// Создание карты
let mapWorld = new Map();
mapWorld.generation(scene);

let controls = new Controls( new PointerLockControls(camera, document.body),  scene, mapWorld );

renderer.domElement.addEventListener( "keydown", (e)=>{ controls.inputKeydown(e); } );
renderer.domElement.addEventListener( "keyup", (e)=>{ controls.inputKeyup(e); } );
document.body.addEventListener( "click", (e) => { controls.onClick(e); }, false );

function update(){
	// передвижение/камера
	controls.update();
};

GameLoop();

// Игровой цикл
function GameLoop() {
	update();
	render();
	requestAnimationFrame(GameLoop);
}

// Рендер сцены(1 кадра)
function render(){
	renderer.render(scene, camera);
}

// обновление размера игры
window.addEventListener("resize", function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
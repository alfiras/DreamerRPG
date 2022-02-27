import * as PIXI from "pixi.js";

const AppPixi = new PIXI.Application({
  width: 64 * 11,
  height: 64 * 9,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

const canvas = document.querySelector("div#canvas");
canvas.appendChild(AppPixi.view);

export default AppPixi;

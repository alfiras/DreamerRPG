import * as PIXI from "pixi.js";
import KnightPNG from "../assets/Knight001.png";
import AppPixi from "./App";

const Knight = () => {
  const stateSystem = {
    value: {
      x: 0,
      y: 0,
    },
    dep: {},
    add: function (key, func) {
      if (!this.dep[key]) {
        this.dep[key] = func;
      }
    },
    remove: function (key) {
      if (this.dep[key]) {
        delete this.dep[key];
      }
    },
    set: function ({ x, y }) {
      this.value.x = x;
      this.value.y = y;
      Object.entries(this.dep).map(([k, v]) => {
        v();
      });
    },
    get: function () {
      return { x: this.value.x, y: this.value.y };
    },
  };

  const texture = new PIXI.Texture.from(KnightPNG);
  const knight = new PIXI.Sprite(texture);

  AppPixi.stage.addChild(knight);
  knight.state = stateSystem;

  return knight;
};

export default Knight;

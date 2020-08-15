import { ants } from "./ants.data";
import { nodes } from "./nodes.data";
import { edges } from "./edges.data";
import { Injectable } from "@angular/core";
import { Ant } from "src/model/ant";

@Injectable({ providedIn: "root" })
export class HomeCnavasService {
  ants: Ant[];
  nodes: any[];
  edges: any[];
  nestCenter: { x: number; y: number };
  canvas: CanvasRenderingContext2D;

  SCALE = 5;
  WIDTH = 200;
  HEIGHT = 25;

  constructor() {
    this.ants = ants;
    this.nodes = nodes;
    this.edges = edges;
  }

  start(ctx: CanvasRenderingContext2D) {
    this.canvas = ctx;
    this.clear();
    this.nestCenter = {
      x: Math.round(Math.random() * this.WIDTH - 3) + 1,
      y: Math.round(Math.random() * (this.HEIGHT - 3)) + 1,
    };
    this.drawBackground();

    this.drawNest();

    while (!this.drawFood()) {
      this.drawFood();
    }
    while (!this.drawFood()) {
      this.drawFood();
    }
    while (!this.drawFood()) {
      this.drawFood();
    }

    //loop
    this.drawAnt();
  }

  clear() {
    this.canvas.clearRect(
      0,
      0,
      this.WIDTH * this.SCALE,
      this.HEIGHT * this.SCALE
    );
  }

  drawBackground() {
    this.canvas.fillStyle = "#202124";
    this.nodes.forEach((node) => {
      return this.canvas.fillRect(
        node.x,
        node.y,
        (this.WIDTH - 1) * this.SCALE,
        (this.HEIGHT - 1) * this.SCALE
      );
    });
  }

  drawNest() {
    this.canvas.fillStyle = "#c6f7f7";
    this._updateNode(this.nestCenter.x - 1, this.nestCenter.y - 1, "nest");
    this._updateNode(this.nestCenter.x, this.nestCenter.y - 1, "nest");
    this._updateNode(this.nestCenter.x + 1, this.nestCenter.y - 1, "nest");
    this._updateNode(this.nestCenter.x - 1, this.nestCenter.y, "nest");
    this._updateNode(this.nestCenter.x + 1, this.nestCenter.y, "nest");
    this._updateNode(this.nestCenter.x - 1, this.nestCenter.y + 1, "nest");
    this._updateNode(this.nestCenter.x, this.nestCenter.y + 1, "nest");
    this._updateNode(this.nestCenter.x + 1, this.nestCenter.y + 1, "nest");
  }

  drawFood(): boolean {
    this.canvas.fillStyle = "#ed1d9b";
    const x = Math.round(Math.random() * this.WIDTH);
    const y = Math.round(Math.random() * (this.HEIGHT - 1));
    if (
      Math.abs(this.nestCenter.x - x) < 4 &&
      Math.abs(this.nestCenter.y - y) < 4
    ) {
      console.log("goo!");
      return false;
    }
    //bottom center
    this._updateNode(x, y, "food");
    if (x - 1 > -1) {
      //bottom left 1
      this._updateNode(x - 1, y, "food");
    }
    if (x - 2 > -1) {
      //bottom left 2
      this._updateNode(x - 2, y, "food");
    }
    if (x + 1 < this.WIDTH) {
      //bottom right 1
      this._updateNode(x + 1, y, "food");
    }
    if (x + 2 < this.WIDTH) {
      //bottom right 2
      this._updateNode(x + 2, y, "food");
    }
    if (x - 1 > -1 && y - 1 > -1) {
      //middle left
      this._updateNode(x - 1, y - 1, "food");
    }
    if (y - 1 > -1) {
      //middle center
      this._updateNode(x, y - 1, "food");
    }
    if (x + 1 < this.WIDTH && y - 1 > -1) {
      //middle right
      this._updateNode(x + 1, y - 1, "food");
    }
    if (y - 2 > -1) {
      //top
      this._updateNode(x, y - 2, "food");
    }

    return true;
  }

  drawAnt() {
    this.canvas.fillStyle = "#1bdddd";
    this.ants.forEach((ant) => {
      if (ant.location.x == -1 && ant.location.y == -1) {
        //init ant
      } else {
        return this._updateNode(ant.location.x, ant.location.y, "ant");
      }
    });
  }

  _updateNode(x: number, y: number, type: string) {
    this.canvas.fillRect(
      x * this.SCALE,
      y * this.SCALE,
      this.SCALE,
      this.SCALE
    );
    const node = this.nodes.find((node) => node.x == x && node.y == y);
    if (node) {
      node.type = type;
    } else {
      console.log("error");
      console.log(x);
      console.log(y);
    }
  }

  // fix() {
  //   let edges = [];
  //   for (let i = 4800; i < nodes.length; i++) {
  //     if (nodes[i].x != 199) {
  //       let rightEdge = {
  //         id: i + "r",
  //         nodeA: { x: nodes[i].x, y: nodes[i].y, type: "blank" },
  //         nodeB: { x: nodes[i].x + 1, y: nodes[i].y, type: "blank" },
  //         pheromone: 0,
  //       };
  //       edges.push(rightEdge);
  //     }

  //     if (nodes[i].y != 24) {
  //       let downEdge = {
  //         id: i + "d",
  //         nodeA: { x: nodes[i].x, y: nodes[i].y, type: "blank" },
  //         nodeB: { x: nodes[i].x, y: nodes[i].y + 1, type: "blank" },
  //         pheromone: 0,
  //       };
  //       edges.push(downEdge);
  //     }
  //   }
  //   return edges;
  // }
}

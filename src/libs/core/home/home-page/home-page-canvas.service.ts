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

  SCALE = 5;
  WIDTH = 200;
  HEIGHT = 25;

  constructor() {
    this.ants = ants;
    this.nodes = nodes;
    this.edges = edges;
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.WIDTH * this.SCALE, this.HEIGHT * this.SCALE);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#202124";
    this.nodes.forEach((node) => {
      return ctx.fillRect(
        node.x,
        node.y,
        this.WIDTH * this.SCALE,
        this.HEIGHT * this.SCALE
      );
    });
  }

  drawNest(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#c6f7f7";
    ctx.fillRect(76 * this.SCALE, 1 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(77 * this.SCALE, 1 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(78 * this.SCALE, 1 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(76 * this.SCALE, 2 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(78 * this.SCALE, 2 * this.SCALE, this.SCALE, this.SCALE);
  }

  drawFood(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ed1d9b";
    ctx.fillRect(115 * this.SCALE, 5 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(110 * this.SCALE, 10 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(115 * this.SCALE, 15 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(120 * this.SCALE, 20 * this.SCALE, this.SCALE, this.SCALE);
  }

  drawAnt(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#1bdddd";
    ctx.fillRect(5 * this.SCALE, 5 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(10 * this.SCALE, 10 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(15 * this.SCALE, 15 * this.SCALE, this.SCALE, this.SCALE);
    ctx.fillRect(20 * this.SCALE, 20 * this.SCALE, this.SCALE, this.SCALE);
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

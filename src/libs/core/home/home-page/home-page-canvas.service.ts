import { ants } from "./ants.data";
import { nodes } from "./nodes.data";
import { edges } from "./edges.data";
import { Injectable } from "@angular/core";
import { Ant } from "src/model/ant";
import { MapEdge, MapNode } from "src/model/_index";

/**
 * initXX: first time generate the data and update the dot on canvas
 * drawXX: update the dot on canvas only
 * spawnXX: generate the data only
 * antXX: ant's behavior. returns the new status of an ant
 * printXX: generate message for display. Returns string (for now)
 */

@Injectable({ providedIn: "root" })
export class HomeCnavasService {
  ants: Ant[];
  nodes: any[];
  edges: any[];
  //TODO: void:any [];
  nestCenter: { x: number; y: number };
  nestNodes: { x: number; y: number }[] = [];
  antStartingPoint: { x: number; y: number }[] = [];
  canvas: CanvasRenderingContext2D;
  stop: boolean = false;
  counter: number = 0;

  SCALE = 5;
  WIDTH = 200;
  HEIGHT = 25;
  SUGAR = { id: "n15GT4enVCG3BYCPgWAd", name: "Cane sugar", stimulusC: 1 };

  BLANKCOLOR = "#202124";
  NESTCOLOR = "#c6f7f7";
  ANTCOLOR = "#1bdddd";
  FOODCOLOR = "#ed1d9b";

  constructor() {
    this.ants = ants;
    this.nodes = nodes;
    this.edges = edges;
  }

  start(ctx: CanvasRenderingContext2D) {
    this.canvas = ctx;
    this.clear();
    this.drawBackground();
    this.initNest();
    this.initAnt();
    this.initFood();
    this.drawNest();

    //loop
    //update ants on the canvas
    this.drawAnt();
    this.simulate();
  }

  clear() {
    this.canvas.clearRect(
      0,
      0,
      this.WIDTH * this.SCALE,
      this.HEIGHT * this.SCALE
    );
  }

  initNest() {
    this.nestCenter = {
      x: Math.round(Math.random() * this.WIDTH - 3) + 1,
      y: Math.round(Math.random() * (this.HEIGHT - 3)) + 1,
    };
    this.nestNodes.push({ x: this.nestCenter.x - 1, y: this.nestCenter.y - 1 });
    this.nestNodes.push({ x: this.nestCenter.x, y: this.nestCenter.y - 1 });
    this.nestNodes.push({ x: this.nestCenter.x + 1, y: this.nestCenter.y - 1 });
    this.nestNodes.push({ x: this.nestCenter.x - 1, y: this.nestCenter.y });
    this.nestNodes.push({ x: this.nestCenter.x + 1, y: this.nestCenter.y });
    this.nestNodes.push({ x: this.nestCenter.x - 1, y: this.nestCenter.y + 1 });
    this.nestNodes.push({ x: this.nestCenter.x, y: this.nestCenter.y + 1 });
    this.nestNodes.push({ x: this.nestCenter.x + 1, y: this.nestCenter.y + 1 });

    if (this.nestCenter.x - 2 > -1) {
      //left
      this.antStartingPoint.push({
        x: this.nestCenter.x - 2,
        y: this.nestCenter.y,
      });
      if (this.nestCenter.y - 2 > -1) {
        //left top
        this.antStartingPoint.push({
          x: this.nestCenter.x - 2,
          y: this.nestCenter.y - 2,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x - 1,
          y: this.nestCenter.y - 2,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x - 2,
          y: this.nestCenter.y - 1,
        });
        //top
        this.antStartingPoint.push({
          x: this.nestCenter.x,
          y: this.nestCenter.y - 2,
        });
      }
      if (this.nestCenter.y + 2 < this.HEIGHT) {
        //left bottom
        this.antStartingPoint.push({
          x: this.nestCenter.x - 2,
          y: this.nestCenter.y + 2,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x - 2,
          y: this.nestCenter.y + 1,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x - 1,
          y: this.nestCenter.y + 2,
        });
        //bottom
        this.antStartingPoint.push({
          x: this.nestCenter.x,
          y: this.nestCenter.y + 2,
        });
      }
    }
    if (this.nestCenter.x + 2 < this.WIDTH) {
      //right
      this.antStartingPoint.push({
        x: this.nestCenter.x + 2,
        y: this.nestCenter.y,
      });
      if (this.nestCenter.y - 2 > -1) {
        //top right
        this.antStartingPoint.push({
          x: this.nestCenter.x + 1,
          y: this.nestCenter.y - 2,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x + 2,
          y: this.nestCenter.y - 2,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x + 2,
          y: this.nestCenter.y - 1,
        });
      }
      if (this.nestCenter.y + 2 < this.HEIGHT) {
        //bottom right
        this.antStartingPoint.push({
          x: this.nestCenter.x + 1,
          y: this.nestCenter.y + 2,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x + 2,
          y: this.nestCenter.y + 2,
        });
        this.antStartingPoint.push({
          x: this.nestCenter.x + 2,
          y: this.nestCenter.y + 1,
        });
      }
    }
  }

  initFood() {
    while (!this.drawFood()) {
      this.drawFood();
    }
    while (!this.drawFood()) {
      this.drawFood();
    }
    while (!this.drawFood()) {
      this.drawFood();
    }
  }

  initAnt() {
    this.ants.forEach((ant) => {
      let i = Math.round(Math.random() * (this.antStartingPoint.length - 1));
      ant.location = {
        x: this.antStartingPoint[i].x,
        y: this.antStartingPoint[i].y,
        type: "blank",
      };
      ant.memory.push(ant.location);
    });
  }

  drawBackground() {
    this.canvas.fillStyle = this.BLANKCOLOR;
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
    this.canvas.fillStyle = this.NESTCOLOR;
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
    this.canvas.fillStyle = this.FOODCOLOR;
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
    this.canvas.fillStyle = this.ANTCOLOR;
    this.ants.forEach((ant) => {
      return this._updateNode(ant.location.x, ant.location.y, "ant");
    });
  }

  simulate() {
    //  create a loop function, pause in between an iteration
    setTimeout((t) => {
      ants.forEach((ant) => {
        this.antMove(ant);
      });
      //map
      edges.forEach((edge) => {
        //  _updatePheromon(edge, ants);
      });

      if (this.counter < 1000) {
        this.simulate();
      } else {
        // Print result after simulation
        ants.forEach((ant) => {
          //  const message = formatPathMessage(ant);
        });

        //print message
      }
      this.counter++;
    }, 200);
  }

  antMove(ant: Ant) {
    const allowedEdges = this.antfindMovableEdges(ant);
    //TODO: algorithm
    const nextNode = this.antChooseeNextNode(ant, allowedEdges);
    ant.memory.push(ant.location);
    if (nextNode.type == "food") {
      ant.food = this.SUGAR;
      //FIXME: ant never update food
      console.log("this ant found food", ant);
    }
    if (
      this.nestNodes.find(
        (node) => node.x == ant.location.x && node.y == ant.location.y
      )
    ) {
      this.canvas.fillStyle = this.NESTCOLOR;
      this._updateNode(ant.location.x, ant.location.y, "nest");
    } else {
      this.canvas.fillStyle = this.BLANKCOLOR;
      this._updateNode(ant.location.x, ant.location.y, "blank");
    }
    ant.location = nextNode;
    this.canvas.fillStyle = this.ANTCOLOR;
    this._updateNode(nextNode.x, nextNode.y, "ant");
  }

  //movable rule:
  /**
   * movable node rule:
   * 1. if ant current node is a nest, it can only move to none nest node
   * 2. if ant has food, it can only move to none food node
   * 3. ant can't move back to last node, unless it's the only node
   * 4. //TODO: ant can't move to void
   */
  antfindMovableEdges(ant: Ant) {
    // onst connectedEdges = map.findEdgesToNode(currentNode(ant), edges);
    const lastNode =
      ant.memory.length > 1 ? ant.memory[ant.memory.length - 2] : null;
    let allowedEdges = [];
    //left top
    if (ant.location.x != 0 && ant.location.y != 0) {
      allowedEdges.push({
        x: ant.location.x - 1,
        y: ant.location.y - 1,
        type: ant.location.type,
      });
    }
    //left
    if (ant.location.x != 0) {
      allowedEdges.push({
        x: ant.location.x - 1,
        y: ant.location.y,
        type: ant.location.type,
      });
    }
    //left bottom
    if (ant.location.x != 0 && ant.location.y != this.HEIGHT - 1) {
      allowedEdges.push({
        x: ant.location.x - 1,
        y: ant.location.y + 1,
        type: ant.location.type,
      });
    }
    //top
    if (ant.location.y != 0) {
      allowedEdges.push({
        x: ant.location.x,
        y: ant.location.y - 1,
        type: ant.location.type,
      });
    }
    //bottom
    if (ant.location.y != this.HEIGHT - 1) {
      allowedEdges.push({
        x: ant.location.x,
        y: ant.location.y + 1,
        type: ant.location.type,
      });
    }
    //right top
    if (ant.location.x != this.WIDTH - 1 && ant.location.y != 0) {
      allowedEdges.push({
        x: ant.location.x + 1,
        y: ant.location.y - 1,
        type: ant.location.type,
      });
    }
    //right
    if (ant.location.x != this.WIDTH - 1) {
      allowedEdges.push({
        x: ant.location.x + 1,
        y: ant.location.y,
        type: ant.location.type,
      });
    }
    //right bottom
    if (ant.location.x != this.WIDTH - 1 && ant.location.y != this.HEIGHT - 1) {
      allowedEdges.push({
        x: ant.location.x + 1,
        y: ant.location.y + 1,
        type: ant.location.type,
      });
    }
    //remove nest node if ant is in nest
    if (ant.location.type == "nest") {
      allowedEdges = allowedEdges.filter((edge) => edge.type != "nest");
    }
    //remove food node if ant has food
    if (ant.food != null) {
      allowedEdges = allowedEdges.filter((edge) => edge.type != "food");
    }
    //remove previous node
    if (allowedEdges.length > 1) {
      const lastNode =
        ant.memory.length > 1
          ? ant.memory[ant.memory.length - 2]
          : { x: -1, y: -1 };
      allowedEdges = allowedEdges.filter(
        (edge) => edge.x != lastNode.x && edge.y != lastNode.y
      );
    }

    return allowedEdges;
  }

  antChooseeNextNode(ant: Ant, allowedNodes: MapNode[]) {
    const r = Math.round(Math.random() * (allowedNodes.length - 1));
    const nextNode = allowedNodes[r];
    return nextNode;
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

  //_edge(x: number, y: number): MapEdge {}

  _theOtherNode(nodeA: MapNode, edge: MapEdge) {
    if (nodeA == edge.nodeA) {
      return edge.nodeB;
    }
    if (nodeA == edge.nodeB) {
      return edge.nodeA;
    }
    return null;
  }

  _updateEdge(id: string, pheromon: number) {}

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

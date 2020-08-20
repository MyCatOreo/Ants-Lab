import { ants } from "./ants.data";
import { nodes } from "./nodes.data";
import { edges } from "./edges.data";
import { Injectable } from "@angular/core";
import { Ant } from "src/model/ant";
import { MapEdge, MapNode, Food } from "src/model/_index";

/**
 * initXX: first time generate the data and update the dot on canvas
 * drawXX: print the dot on canvas
 * antXX: ant's behavior. returns the new status of an ant
 * updateXX: update state and refresh display if needed
 * printXX: generate message for display. Returns string (for now)
 */

@Injectable({ providedIn: "root" })
export class HomeCnavasService {
  //source of truth
  ants: Ant[];
  nodes: any[];
  edges: any[];
  //TODO: void:any [];
  nestNodes: { x: number; y: number }[] = [];
  antStartingNodes: { x: number; y: number }[] = [];
  foodNodes: { x: number; y: number }[] = [];
  antNodes: { x: number; y: number }[] = [];

  //flags
  stop: boolean = false;
  counter: number = 0;
  foodInNest: Food[] = [];

  SCALE = 5;
  WIDTH = 200;
  HEIGHT = 25;
  SUGAR = { id: "n15GT4enVCG3BYCPgWAd", name: "Cane sugar", stimulusC: 1 };
  COUNT_NUM = 1000;
  FOOD_NUM = 5;
  FOOD_NEST_MIN_DISTANCE = 5;

  BLANKCOLOR = "#202124";
  NESTCOLOR = "#c6f7f7";
  ANTCOLOR = "#1bdddd";
  FOODCOLOR = "#ed1d9b";

  canvas: CanvasRenderingContext2D;

  constructor() {
    this.ants = ants;
    this.nodes = nodes;
    this.edges = edges;
  }

  start(ctx: CanvasRenderingContext2D) {
    this.canvas = ctx;
    this.clear();
    this.initBackground();
    this.initNest();
    this.initFood();
    this.initAnt();

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

  initBackground() {
    this.nodes.forEach((node) => {
      this.drawBlank(node);
    });
    console.log("init background complete");
  }

  initNest() {
    const nestCenter = {
      x: Math.round(Math.random() * this.WIDTH - 3) + 1,
      y: Math.round(Math.random() * (this.HEIGHT - 3)) + 1,
    };
    this.nestNodes.push({ x: nestCenter.x - 1, y: nestCenter.y - 1 });
    this.nestNodes.push({ x: nestCenter.x, y: nestCenter.y - 1 });
    this.nestNodes.push({ x: nestCenter.x + 1, y: nestCenter.y - 1 });
    this.nestNodes.push({ x: nestCenter.x - 1, y: nestCenter.y });
    this.nestNodes.push({ x: nestCenter.x + 1, y: nestCenter.y });
    this.nestNodes.push({ x: nestCenter.x - 1, y: nestCenter.y + 1 });
    this.nestNodes.push({ x: nestCenter.x, y: nestCenter.y + 1 });
    this.nestNodes.push({ x: nestCenter.x + 1, y: nestCenter.y + 1 });

    if (nestCenter.x - 2 > -1) {
      //left
      this.antStartingNodes.push({
        x: nestCenter.x - 2,
        y: nestCenter.y,
      });
      if (nestCenter.y - 2 > -1) {
        //left top
        this.antStartingNodes.push({
          x: nestCenter.x - 2,
          y: nestCenter.y - 2,
        });
        this.antStartingNodes.push({
          x: nestCenter.x - 1,
          y: nestCenter.y - 2,
        });
        this.antStartingNodes.push({
          x: nestCenter.x - 2,
          y: nestCenter.y - 1,
        });
        //top
        this.antStartingNodes.push({
          x: nestCenter.x,
          y: nestCenter.y - 2,
        });
      }
      if (nestCenter.y + 2 < this.HEIGHT) {
        //left bottom
        this.antStartingNodes.push({
          x: nestCenter.x - 2,
          y: nestCenter.y + 2,
        });
        this.antStartingNodes.push({
          x: nestCenter.x - 2,
          y: nestCenter.y + 1,
        });
        this.antStartingNodes.push({
          x: nestCenter.x - 1,
          y: nestCenter.y + 2,
        });
        //bottom
        this.antStartingNodes.push({
          x: nestCenter.x,
          y: nestCenter.y + 2,
        });
      }
    }
    if (nestCenter.x + 2 < this.WIDTH) {
      //right
      this.antStartingNodes.push({
        x: nestCenter.x + 2,
        y: nestCenter.y,
      });

      if (nestCenter.y - 2 > -1) {
        //top right
        this.antStartingNodes.push({
          x: nestCenter.x + 1,
          y: nestCenter.y - 2,
        });

        this.antStartingNodes.push({
          x: nestCenter.x + 2,
          y: nestCenter.y - 2,
        });

        this.antStartingNodes.push({
          x: nestCenter.x + 2,
          y: nestCenter.y - 1,
        });
      }
      if (nestCenter.y + 2 < this.HEIGHT) {
        //bottom right
        this.antStartingNodes.push({
          x: nestCenter.x + 1,
          y: nestCenter.y + 2,
        });
        this.antStartingNodes.push({
          x: nestCenter.x + 2,
          y: nestCenter.y + 2,
        });
        this.antStartingNodes.push({
          x: nestCenter.x + 2,
          y: nestCenter.y + 1,
        });
      }
    }

    this.nestNodes.forEach((node) => {
      this._updateNode(node, "nest");
    });

    console.log("init nest complete");
  }

  initFood() {
    let foodNum = this.FOOD_NUM;
    while (foodNum > 0) {
      const x = Math.round(Math.random() * this.WIDTH);
      const y = Math.round(Math.random() * (this.HEIGHT - 1));

      const tooCloseToNest = this.nestNodes.find(
        (node) =>
          Math.abs(node.x - x) < this.FOOD_NEST_MIN_DISTANCE &&
          Math.abs(node.y - y) < this.FOOD_NEST_MIN_DISTANCE
      );
      if (tooCloseToNest == null) {
        //bottom center
        this._updateNode({ x: x, y: y }, "food");
        if (x - 1 > -1) {
          //bottom left 1
          this._updateNode({ x: x - 1, y: y }, "food");
        }
        if (x - 2 > -1) {
          //bottom left 2
          this._updateNode({ x: x - 2, y: y }, "food");
        }
        if (x + 1 < this.WIDTH) {
          //bottom right 1
          this._updateNode({ x: x + 1, y: y }, "food");
        }
        if (x + 2 < this.WIDTH) {
          //bottom right 2
          this._updateNode({ x: x + 2, y: y }, "food");
        }
        if (x - 1 > -1 && y - 1 > -1) {
          //middle left
          this._updateNode({ x: x - 1, y: y - 1 }, "food");
        }
        if (y - 1 > -1) {
          //middle center
          this._updateNode({ x: x, y: y - 1 }, "food");
        }
        if (x + 1 < this.WIDTH && y - 1 > -1) {
          //middle right
          this._updateNode({ x: x + 1, y: y - 1 }, "food");
        }
        if (y - 2 > -1) {
          //top
          this._updateNode({ x: x, y: y - 2 }, "food");
        }

        foodNum--;
      }
    }
    console.log("init food complete");
  }

  initAnt() {
    this.ants.forEach((ant) => {
      let i = Math.round(Math.random() * (this.antStartingNodes.length - 1));
      this._updateAnt(ant, "move", {
        fromNode: { x: -1, y: -1 },
        toNode: {
          x: this.antStartingNodes[i].x,
          y: this.antStartingNodes[i].y,
        },
      });
    });
    console.log("init ant complete");
  }

  drawNest(node: Partial<MapNode>) {
    this.canvas.fillStyle = this.NESTCOLOR;
    this.canvas.fillRect(
      node.x * this.SCALE,
      node.y * this.SCALE,
      this.SCALE,
      this.SCALE
    );
  }

  drawFood(node: Partial<MapNode>) {
    this.canvas.fillStyle = this.FOODCOLOR;
    this.canvas.fillRect(
      node.x * this.SCALE,
      node.y * this.SCALE,
      this.SCALE,
      this.SCALE
    );
  }

  drawAnt(node: Partial<MapNode>) {
    this.canvas.fillStyle = this.ANTCOLOR;
    this.canvas.fillRect(
      node.x * this.SCALE,
      node.y * this.SCALE,
      this.SCALE,
      this.SCALE
    );
  }

  drawBlank(node: Partial<MapNode>) {
    this.canvas.fillStyle = this.BLANKCOLOR;
    this.canvas.fillRect(
      node.x * this.SCALE,
      node.y * this.SCALE,
      this.SCALE,
      this.SCALE
    );
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

      if (this.counter < this.COUNT_NUM) {
        this.simulate();
      } else {
        // Print result after simulation
        ants.forEach((ant) => {
          //  const message = formatPathMessage(ant);
        });
      }
      this.counter++;
    }, 200);
  }

  antMove(ant: Ant) {
    const allowedNodes = this.antfindMovableNodes(ant);
    //TODO: algorithm
    const nextNode = this.antChooseeNextNode(ant, allowedNodes);
    if (nextNode) {
      this._updateAnt(ant, "move", {
        fromNode: ant.location,
        toNode: nextNode,
      });
      if (nextNode.food != 0) {
        this._updateAnt(ant, "pickFood");
      }
      if (
        this.nestNodes.find(
          (node) => node.x == nextNode.x && node.y == nextNode.y
        )
      ) {
        if (ant.food) {
          this._updateAnt(ant, "dropFood");
        }
      }
    }
  }

  //movable rule:
  /**
   * movable node rule:
   * 1. if ant current node is a nest, it can only move to none nest node
   * 2. if ant has food, it can only move to none food node
   * 3. ant can't move back to last node, unless it's the only node
   * 4. //TODO: ant can't move to void
   */
  antfindMovableNodes(ant: Ant) {
    const lastNode =
      ant.memory.length > 0 ? ant.memory[ant.memory.length - 1] : null;
    let allowedNodes = [];
    //left top
    if (ant.location.x != 0 && ant.location.y != 0) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x - 1 && node.y == ant.location.y - 1
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //left
    if (ant.location.x != 0) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x - 1 && node.y == ant.location.y
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //left bottom
    if (ant.location.x != 0 && ant.location.y != this.HEIGHT - 1) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x - 1 && node.y == ant.location.y + 1
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //top
    if (ant.location.y != 0) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x && node.y == ant.location.y - 1
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //bottom
    if (ant.location.y != this.HEIGHT - 1) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x && node.y == ant.location.y + 1
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //right top
    if (ant.location.x != this.WIDTH - 1 && ant.location.y != 0) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x + 1 && node.y == ant.location.y - 1
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //right
    if (ant.location.x != this.WIDTH - 1) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x + 1 && node.y == ant.location.y
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //right bottom
    if (ant.location.x != this.WIDTH - 1 && ant.location.y != this.HEIGHT - 1) {
      const movableNode = this.nodes.find(
        (node) => node.x == ant.location.x + 1 && node.y == ant.location.y + 1
      );
      if (movableNode) {
        allowedNodes.push(movableNode);
      }
    }
    //remove nest node if ant is in nest
    if (allowedNodes.length > 1 && ant.location.type == "nest") {
      allowedNodes = allowedNodes.filter((node) => node.type != "nest");
    }
    //remove food node if ant has food
    if (allowedNodes.length > 1 && ant.food != null) {
      allowedNodes = allowedNodes.filter((node) => node.food == 0);
    }
    //remove previous node
    if (allowedNodes.length > 1) {
      const lastNode =
        ant.memory.length > 0
          ? ant.memory[ant.memory.length - 1]
          : { x: -1, y: -1 };
      allowedNodes = allowedNodes.filter(
        (node) => node.x != lastNode.x || node.y != lastNode.y
      );
    }
    if (allowedNodes.length == 0) {
      console.log("something is wrong", ant);
    }
    return allowedNodes;
  }

  antChooseeNextNode(ant: Ant, allowedNodes: MapNode[]) {
    const r = Math.round(Math.random() * (allowedNodes.length - 1));
    const nextNode = allowedNodes[r];
    if (nextNode) {
      return nextNode;
    } else {
      console.log("ant choose next node error", allowedNodes);
    }
  }

  //reducers

  _updateAnt(ant: Partial<Ant>, action: string, payload?: any) {
    const antsToUpdate = this.ants.filter((item) => item.id == ant.id);
    if (antsToUpdate.length > 0) {
      let antToUpdate = antsToUpdate[0];
      switch (action) {
        case "move": //payload: {fromNode: MapNode, toNode: MapNode}
          //update ant itself
          ant.memory.push(payload.fromNode);
          ant.location = payload.toNode;
          //update from node
          this._updateNode(payload.fromNode, "removeAnt");
          //update to node
          this._updateNode(payload.toNode, "ant");
          //update ant nodes
          this.antNodes = this.antNodes.filter(
            (node) =>
              node.x != payload.fromNode.x && node.y != payload.fromNode.y
          );
          this.antNodes.push({ x: payload.toNode.x, y: payload.toNode.y });

          break;
        case "pickFood":
          //update ant itself
          antToUpdate.food = this.SUGAR;
          //update food nodes
          this.foodNodes = this.foodNodes.filter(
            (node) => node != ant.location
          );
          //update node
          this._updateNode(ant.location, "removeFood");
          break;
        case "dropFood":
          //update ant itself
          antToUpdate.food = null;
          //update counter
          this.foodInNest.push(antToUpdate.food);
          console.log("got food", this.foodInNest.length);
          break;
      }
    } else {
      console.log("omg sth wrong can't find this ant ", ant);
    }
  }

  _updateNode(node: Partial<MapNode>, action: string, payload?: any) {
    const nodesToUpdate = this.nodes.filter(
      (item: Partial<MapNode>) => item.x == node.x && item.y == node.y
    );
    if (nodesToUpdate.length > 0) {
      let nodeToUpdate = nodesToUpdate[0];

      switch (action) {
        case "blank":
          nodeToUpdate.type = "blank";
          if (nodeToUpdate.ant == 0 && nodeToUpdate.food == 0) {
            this.drawBlank(nodeToUpdate);
          }
          break;
        case "ant":
          nodeToUpdate.ant = nodeToUpdate.ant + 1;
          if (nodeToUpdate.ant > 0) {
            this.drawAnt(nodeToUpdate);
          }
          break;
        case "removeAnt":
          nodeToUpdate.ant = nodeToUpdate.ant - 1;
          if (nodeToUpdate.ant == 0 && nodeToUpdate.food == 0) {
            if (nodeToUpdate.type == "blank") {
              this.drawBlank(nodeToUpdate);
            }
            if (nodeToUpdate.type == "nest") {
              this.drawNest(nodeToUpdate);
            }
          }
          if (nodeToUpdate.food > 0) {
            this.drawFood(nodeToUpdate);
          }
          if (nodeToUpdate.ant > 0) {
            this.drawAnt(nodeToUpdate);
          }
          break;
        case "food":
          nodeToUpdate.food = nodeToUpdate.food + 1;
          this.foodNodes.push({
            x: nodeToUpdate.x,
            y: nodeToUpdate.y,
          });
          if (nodeToUpdate.food > 0) {
            this.drawFood(nodeToUpdate);
          }
          break;
        case "removeFood":
          nodeToUpdate.food = nodeToUpdate.food - 1;
          this.foodNodes = this.foodNodes.filter(
            (node) => node.x != nodeToUpdate.x && node.y != nodeToUpdate.y
          );
          if (nodeToUpdate.ant == 0 && nodeToUpdate.food == 0) {
            if (nodeToUpdate.type == "blank") {
              this.drawBlank(nodeToUpdate);
            }
            if (nodeToUpdate.type == "nest") {
              this.drawNest(nodeToUpdate);
            }
          }
          if (nodeToUpdate.food > 0) {
            this.drawFood(nodeToUpdate);
          }
          if (nodeToUpdate.ant > 0) {
            this.drawAnt(nodeToUpdate);
          }
          break;
        case "nest":
          nodeToUpdate.type = "nest";
          if (nodeToUpdate.ant == 0 && nodeToUpdate.food == 0) {
            this.drawNest(nodeToUpdate);
          }
          break;
      }
    }
  }

  _updateEdge(id: string, action: string, payload: any) {}

  //helpers
  _theOtherNode(nodeA: MapNode, edge: MapEdge) {
    if (nodeA == edge.nodeA) {
      return edge.nodeB;
    }
    if (nodeA == edge.nodeB) {
      return edge.nodeA;
    }
    return null;
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { HomeCnavasService } from "./home-page-canvas.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  canvas: CanvasRenderingContext2D;
  @ViewChild("homeCanvas")
  homeCanvas: ElementRef<HTMLCanvasElement>;
  console: any[];
  constructor(private canvasService: HomeCnavasService) {}

  ngOnInit(): void {
    this.console = ["hello"];
  }

  ngAfterViewInit(): void {
    this.canvas = this.homeCanvas.nativeElement.getContext("2d");
    if (this.canvas) {
      //  this.canvas.imageSmoothingEnabled = false;
      this.canvasService.start(this.canvas);
    }
  }
}

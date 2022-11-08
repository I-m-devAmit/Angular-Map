import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const google: any;


@Component({
  selector: 'app-agm-example',
  templateUrl: './agm-example.component.html',
  styleUrls: ['./agm-example.component.css'],
})
export class AgmExampleComponent implements OnInit {
  lat = 20.5937;
  lng = 78.9629;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;
  // totalLandArea : []
  // landSelection = "LandArea"; 

  constructor(private router:Router) {}

  ngOnInit() {
    this.setCurrentPosition();
  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon'],
      },
      polygonOptions: {
        draggable: false,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(
              paths.getAt(p),
              'set_at',
              () => {
                if (!event.overlay.drag) {
                  self.updatePointList(event.overlay.getPath());
                }
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'insert_at',
              () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'remove_at',
              () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
          }
          self.updatePointList(event.overlay.getPath());
          this.selectedShape = event.overlay;
          this.selectedShape.type = event.type;
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          self.drawingManager.setOptions({
            drawingControl: false,
          });
        }
      }
    );
  }


  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
    }
  }

  updatePointList(path) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    console.log("coordinates: ", this.pointList);
    // console.log("totalCoordinates: ", this.pointList.length);

    this.selectedArea = google.maps.geometry.spherical.computeArea(
      path
    );
    console.log( "selectedArea : ", this.selectedArea);
  }

  buyLand(){ 
    let totalLandArea = {
      coordinates: this.pointList,
      selectedArea: this.selectedArea
    }
    if(totalLandArea){
      console.log("TotalLandArea : ", totalLandArea); 
    localStorage.setItem("landArea", JSON.stringify(totalLandArea));
    if(!sessionStorage.getItem("token"))
    this.router.navigate(["login"]);
    else{
    this.router.navigate(["land"]);
      // alert(localStorage.getItem("landArea"))
    }
    }
    else{
      alert("Select land area");
    }
    
    
  }
}

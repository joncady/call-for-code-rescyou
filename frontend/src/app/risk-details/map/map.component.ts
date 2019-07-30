import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MapOptions, tileLayer, latLng, LeafletMouseEvent, Marker, marker } from 'leaflet';

const TILE_LAYER_SRC = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options: MapOptions;
  markerLayer: Marker;
  @Output()
  latLngSelected: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();
  constructor() { }

  ngOnInit() {
    const options: MapOptions = {
      layers: [
        tileLayer(TILE_LAYER_SRC, { maxZoom: 18, attribution: '\u00A9 OpenStreetMap contributors' })
      ]
    };
    this.latLngSelected.subscribe(coords => {
     this.markerLayer = marker(coords);
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        options.center = latLng(latitude, longitude);
        options.zoom = 5;
        this.options = options;
        this.latLngSelected.emit([latitude, longitude]);
      }, error => {
        options.center = latLng(0, 0);
        options.zoom = 1;
        this.options = options;
        this.latLngSelected.emit([0, 0]);
      });
    } else {
      options.center = latLng(0, 0);
      options.zoom = 1;
      this.options = options;
      this.latLngSelected.emit([0, 0]);
    }

  }

  onLeafletClick(event: LeafletMouseEvent) {
    this.latLngSelected.emit([event.latlng.lat, event.latlng.lng]);
  }
}

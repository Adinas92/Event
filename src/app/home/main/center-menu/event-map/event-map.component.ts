import { EventE, PointE } from '../../event.models';
import { Component, OnInit } from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import { EventListService } from '../../event-list.service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'em-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent implements OnInit 
{
  lat: number = 52.237049;
  lng: number = 21.017532;
   latNewMarker: number;
   lngNewMarker: number;
  windowForNewEvent = false;
  isNewEventInEdition = false;
  private events: EventE[] = [];
  private myEvents: EventE[];
  private newPoint: PointE = {
    latitude: null,
    longitude: null,
    draggable: false
  };
  style = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  constructor(private router: Router, private dataService: EventListService) {
  }

  showPropertyAboutNewEvent($event: AGMMouseEvent) {
    if (this.isNewEventInEdition) {
      console.log("Dokończ dodadwanie poprzedniego evenu lub anuluj.")
    }
    else {
      this.windowForNewEvent = true;
      this.latNewMarker = $event.coords.lat;
      this.lngNewMarker = $event.coords.lng;
    }   
  };
  
  addNewEvent() {   
    this.windowForNewEvent = false;
    this.dataService.addNewPoint(this.latNewMarker, this.lngNewMarker);
    this.dataService.setNewEventInEdition(true); 
    if (this.router.url != "/mylist") {
      this.router.navigateByUrl('/mylist');
    }
  }

  ngOnInit() {
    this.dataService.getEvents()
    .filter(events => events && events.length > 0)
    .subscribe(
    (events) => {
      this.events = events;       
    });
    this.dataService.getNewMarkerCoordinate().subscribe(
      (newPoint) => {
        this.newPoint = newPoint;
        console.log(newPoint);
        console.log(this.newPoint);
      });
  }
    ngOnChanges(changes: SimpleChanges) {
    
      if (changes.sumListEvents.previousValue) {
        this.dataService.showEvents()
      }
    }
  ngDoCheck() {
    this.isNewEventInEdition = this.dataService.getNewEventInEdition();
  }
  changeAddNextEventStatus($event) {
    this.isNewEventInEdition = this.dataService.getNewEventInEdition();
  }
}

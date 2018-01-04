import { Component, OnInit } from '@angular/core';
import { marker } from '../../event.models';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import { EventListService } from '../../event-list.service';


@Component({
  selector: 'em-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent implements OnInit 
{
  private marker: marker;
  lat: number = 52.237049;
  lng: number = 21.017532;
   latNewMarker: number;
   lngNewMarker: number;
  windowForNewEvent = false;
  isNewEventInEdition = false;
  private myEventsMarkers: marker[];
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
  markers: marker[] = [
    {
      lat: 52.220049,
      lng: 21.016132,
      label: 'A',
      draggable: true
    },
    {
      lat: 52.237049,
      lng: 21.035532,
      label: 'B',
      draggable: false
    },
    {
      lat: 52.237049,
      lng: 21.007532,
      label: 'C',
      draggable: true
    }
  ];

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


  // przekazuje dodawanie do servisu poniewaz potem chce przekazac wartosc do innego komponentu ktory bedzie zapisywal wszystkie dane o event (przekazywal do serwera)
  addNewEvent() {   
    this.windowForNewEvent = false;
    this.dataService.addNewEvent(this.latNewMarker, this.lngNewMarker);
    this.dataService.setNewEventInEdition(true); // przekazanie info do servicu ze dodawanie kolejnego eventu jest zajęte
    if (this.router.url != "/mylist") {
      this.router.navigateByUrl('/mylist');
    }
  }
  constructor(private router: Router, private dataService: EventListService) {
  }
  ngOnInit() {

  }
  ngDoCheck() {
    this.myEventsMarkers = this.dataService.getListOfMyEventsMarkers();
    this.isNewEventInEdition = this.dataService.getNewEventInEdition();
  }
  changeAddNextEventStatus($event) {
    this.isNewEventInEdition = this.dataService.getNewEventInEdition();
  }
}

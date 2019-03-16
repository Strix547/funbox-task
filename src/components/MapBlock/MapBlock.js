import React, { Component } from 'react';

import './MapBlock.scss';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';

export default class MapBlock extends Component {
  map = null;

  state = {
    center: [55.76, 37.64],
    zoom: 10,
    controls: []
  }

  onBoundsChange = () => {
    const center = this.map.getCenter();
    this.props.mapCenter(center);
    this.setState({center});
  };

  render() {
    const { pointsList, onPlacemarkDragend, onYmapsLoad } = this.props;

    const placemarks = pointsList.map(({id, name, coord}) => {
      return (
        <Placemark
          key={id}
          geometry={coord}
          properties={{
            balloonContent: name
          }}
          options={{
            draggable: true
          }}
          onDragend={(e) => {
            const dragCoord = e.get('target').geometry.getCoordinates();
            onPlacemarkDragend(id, dragCoord);
          }}
        />
      );
    });

    const polylineCoords = pointsList.map(({coord}) => coord);
    return (
      <div className="map-block">
        <YMaps
          query={{
            load: "package.full",
            apikey: '2e897e10-0e8f-4974-841d-93edb806dc0d'
          }}
        >
          <Map
            state={this.state}
            instanceRef={map => this.map = map}
            onLoad={(ymaps) => onYmapsLoad(ymaps)}
            width="100%"
            height="600px"
            onBoundsChange={this.onBoundsChange}
          >
            { placemarks }

            <Polyline
              geometry={polylineCoords}
              options={{
                balloonCloseButton: false,
                strokeColor: '#330033',
                strokeWidth: 4,
                strokeOpacity: 0.5,
              }}
            />
          </Map>
        </YMaps>
      </div>
    );
  }
}
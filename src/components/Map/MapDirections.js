import React from 'react';
import mapboxgl from 'mapbox-gl';
import bbox from '@turf/bbox';
import { List, Header, Divider } from 'semantic-ui-react';

import MapDirectionList from './MapDirectionList';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A';

class MapDirections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      boundingBox: [],
    };
  }

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
      this.map.removeLayer('start');
      this.map.removeSource('start');
      this.map.removeLayer('end');
      this.map.removeSource('end');
      this.setState({ steps: [], boundingBox: [] }, this.fetchDirections);
    }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
    });
    this.fetchDirections();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  fetchDirections = () => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${this.props.userLocation[0]}%2C${
        this.props.userLocation[1]
      }%3B${this.props.destination.coordinates.longitude}%2C${
        this.props.destination.coordinates.latitude
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&geometries=geojson&steps=true`,
    )
      .then(res => res.json())
      .then(json => this.addRoute(json))
      .then(this.addStartAndEnd)
      .then(this.createBoundingBox);
  };

  addRoute = response => {
    const coords = response.routes[0].geometry;
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: coords,
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3b9ddd',
        'line-width': 8,
        'line-opacity': 0.8,
      },
    });
    this.setState({ steps: response.routes['0'].legs['0'].steps });
  };

  addStartAndEnd = () => {
    this.map.addLayer({
      id: 'start',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: this.props.userLocation,
          },
        },
      },
    });

    this.map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              this.props.destination.coordinates.longitude,
              this.props.destination.coordinates.latitude,
            ],
          },
        },
      },
    });
  };

  createBoundingBox = () => {
    const boundingBox = bbox(this.map.getSource('route')._data.geometry);
    this.setState({ boundingBox: boundingBox });
    this.map.fitBounds(this.state.boundingBox, { padding: 30 });
  };

  render() {
    const style = {
      position: 'relative',
      top: 0,
      bottom: 0,
      width: '100%',
      minHeight: 400,
    };

    return (
      <div>
        <Header as="h3">Directions to {this.props.destination.name}</Header>
        <div style={style} ref={el => (this.mapContainer = el)} />
        {this.state.steps.length > 0 && (
          <div>
            <Divider hidden />
            <Header as="h4">Steps</Header>
            <List animated verticalAlign="middle" divided relaxed>
              {this.state.steps.map(step => <MapDirectionList step={step} />)}
            </List>
          </div>
        )}
      </div>
    );
  }
}
export default MapDirections;

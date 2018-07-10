import React from 'react';
import mapboxgl from 'mapbox-gl';
import bbox from '@turf/bbox';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { refresh: false };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
    });

    this.map.on('load', () => {
      this.map.addLayer(this.renderPoints());
      this.createBoundingBox();
      this.mapActions();
      const marker = new mapboxgl.Marker().setLngLat(this.props.userLocation).addTo(this.map);
    });
  }

  componentDidUpdate(nextProps) {
    if (this.props.points !== nextProps.points) {
      this.map.removeLayer('venues');
      this.map.removeSource('venues');
      this.map.addLayer(this.renderPoints());
      this.createBoundingBox();
    }
  }

  mapActions = () => {
    this.map.on('click', 'venues', e => {
      var features = this.map.queryRenderedFeatures(e.point, {
        layers: ['venues'],
      });

      if (!features.length) {
        return;
      }

      var feature = features[0];
      console.log(feature);
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3>${feature.properties.name}</h3> <p>${feature.properties.addressOne}</p><p>${
            feature.properties.addressTwo
          }</p>`,
        )
        .setLngLat(feature.geometry.coordinates)
        .addTo(this.map);
    });

    this.map.on('mouseenter', 'venues', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'venues', () => {
      this.map.getCanvas().style.cursor = '';
    });
  };

  componentWillUnmount() {
    this.map.remove();
  }

  createBoundingBox() {
    const boundingBox = bbox(this.map.getSource('venues')._data);
    this.map.fitBounds(boundingBox, { padding: 15 });
  }

  renderPoints = () => {
    return {
      id: 'venues',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.props.points.map(venue => ({
            type: 'Feature',
            properties: {
              yelpId: venue.id,
              name: venue.name,
              addressOne: venue.location.display_address[0],
              addressTwo: venue.location.display_address[1],
            },
            geometry: {
              type: 'Point',
              coordinates: [venue.coordinates.longitude, venue.coordinates.latitude],
            },
          })),
        },
      },
      paint: {
        'circle-color': '#F15A2D',
        'circle-radius': 6,
        'circle-stroke-width': 1.7,
        'circle-stroke-color': '#ffffff',
      },
    };
  };

  render() {
    console.log(this.props);
    const style = {
      position: 'relative',
      top: 0,
      bottom: 0,
      width: '100%',
      minHeight: 400,
    };

    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}
export default Map;

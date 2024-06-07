'use client';

import React from 'react';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';
import { LocationType, MapDataRes } from '../../data/aqi';

type ComponentPropsType = {
  className: string,
  locations: FeatureCollection<Geometry, LocationType>,
  tileUrl: string,
  data: MapDataRes[],
  mapOptions: {
    center: [number, number],
    zoom: number,
  },
  scaleOptions: {
    grades: number[],
    labels: string[],
    colors: string[],
  },
  cacheStorageKey: string,
};
export default class Component extends React.Component<ComponentPropsType> {
  containerRef = React.createRef<HTMLDivElement>();
  //@ts-ignore
  map: L.Map;
  //@ts-ignore
  state: {
    tiles: L.TileLayer,
    geojson: L.GeoJSON<LocationType>,
    info: L.Control,
    legend: L.Control,
  } = {};

  constructor(props: ComponentPropsType) {
    super(props);
    this.syncData = this.syncData.bind(this);
    this.getColor = this.getColor.bind(this);
    this.style = this.style.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  async componentDidMount() {
    if (!window || !this.containerRef.current || this.map) return;

    this.map = L.map(this.containerRef.current, this.props.mapOptions);
    //@ts-ignore
    const info = L.control();
    info.onAdd = function (map: L.Map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };
    info.update = function (props: LocationType) {
      this._div.innerHTML = `<h4>Air Quality</h4>${props
        ? `<b>${props.name}</b><br />${props.measure} PM2.5`
        : 'Hover over a place'
        }`;
    };
    //@ts-ignore
    const legend = L.control({ position: 'bottomright' }),
      _ = this;
    legend.onAdd = function (map: L.Map) {
      const div = L.DomUtil.create('div', 'info legend');
      for (let i = 0; i < _.props.scaleOptions.grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + _.getColor(_.props.scaleOptions.grades[i] + 1) + '"></i> ' +
          _.props.scaleOptions.grades[i] + (_.props.scaleOptions.grades[i + 1] ? '&ndash;' + _.props.scaleOptions.grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    this.setState({
      tiles: L.tileLayer(this.props.tileUrl, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map),
      geojson: L.geoJson(await this.syncData(), {
        //@ts-ignore
        style: this.style,
        //@ts-ignore
        onEachFeature: this.onEachFeature,
      }).addTo(this.map),
      info: info.addTo(this.map),
      legend: legend.addTo(this.map),
    });
  }
  async syncData() {
    const cachedData = localStorage.getItem(this.props.cacheStorageKey);
    if (cachedData) return JSON.parse(cachedData);
    const result = {
      ...this.props.locations,
      features: this.props.locations.features.map(f => {
        const d = this.props.data.find((m: MapDataRes) =>
          m.location.toLowerCase().includes(f.properties.name.toLowerCase())
          || f.properties.name.toLowerCase().includes(m.location.toLowerCase())
        )
        if (d) f.properties.measure = d.pm2_5;
        return f;
      })
    };
    localStorage.setItem(this.props.cacheStorageKey, JSON.stringify(result));
    return result;
  }
  getColor(d: number) {
    const grades = this.props.scaleOptions.grades;
    const colors = this.props.scaleOptions.colors;
    if (grades.length !== colors.length) return;
    const std_d = grades.length * (d - grades[0]) / (grades[grades.length - 1] - grades[0]);
    const index = Math.min(Math.floor(std_d), grades.length - 1);
    return colors[index];
  }
  style(feature: Feature<null, LocationType>) {
    return {
      fillColor: this.getColor(feature.properties.measure),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  highlightFeature(e: Event) {
    const layer = e.target;
    //@ts-ignore
    layer?.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    //@ts-ignore
    layer?.bringToFront();
    //@ts-ignore
    this.state.info.update(layer?.feature?.properties);
  }
  resetHighlight(e: Event) {
    //@ts-ignore
    this.state.geojson.resetStyle(e.target);
    //@ts-ignore
    this.state.info.update();
  }
  zoomToFeature(e: Event) {
    //@ts-ignore
    this.map.fitBounds(e.target?.getBounds());
  }
  onEachFeature(feature: Feature<null, LocationType>, layer: L.Layer) {
    layer.on({
      //@ts-ignore
      mouseover: this.highlightFeature,
      //@ts-ignore
      mouseout: this.resetHighlight,
      //@ts-ignore
      click: this.zoomToFeature,
    });
  }

  render() {
    return <div className={this.props.className}>
      <div ref={this.containerRef} />
    </div>;
  }
}
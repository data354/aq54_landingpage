'use client';

import React from 'react';
import type { BBox, Feature, FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';
import { LocationType, MapDataRes } from '../../data/aqi';

type ComponentGeoJsonType = { features: Feature<Geometry, LocationType>[]; type: "FeatureCollection"; bbox?: BBox | undefined; };
type ComponentStateType = {
  tiles: L.TileLayer,
  layer0: L.GeoJSON<LocationType>,
  layer1: L.GeoJSON<LocationType>,
  info: L.Control,
  legend: L.Control,
  layer1Timeout: number,
  prevPropagatedFromLayer: L.LeafletMouseEvent['propagatedFrom'],
};
type ComponentPropsType = {
  className: string,
  locations: [FeatureCollection<Geometry, LocationType>, FeatureCollection<Geometry, LocationType>],
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
  state: ComponentStateType = {};

  constructor(props: ComponentPropsType) {
    super(props);
    this.syncData = this.syncData.bind(this);
    this.getColor = this.getColor.bind(this);
    this.style = this.style.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.loadSubFeatures = this.loadSubFeatures.bind(this);
    this.style1 = this.style1.bind(this);
    this.resetHighlight1 = this.resetHighlight1.bind(this);
    this.onEachFeature1 = this.onEachFeature1.bind(this);
    this.cleanUpLayer1 = this.cleanUpLayer1.bind(this);
    this.addLayer1 = this.addLayer1.bind(this);
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
        ? `<b>${props.village ?? props.s_town ?? props.town}</b><br />${props.measure} PM2.5`
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
          _.props.scaleOptions.grades[i] + (_.props.scaleOptions.grades[i + 1]
            ? '&ndash;' + _.props.scaleOptions.grades[i + 1] + '<br>'
            : '+');
      }
      return div;
    };
    this.setState({
      tiles: L.tileLayer(this.props.tileUrl, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map),
      layer0: L.geoJson((await this.syncData())[0], {
        //@ts-ignore
        style: this.style,
        //@ts-ignore
        onEachFeature: this.onEachFeature,
      }).addTo(this.map),
      info: info.addTo(this.map),
      legend: legend.addTo(this.map),
    });
  }
  async syncData(): Promise<ComponentGeoJsonType[]> {
    const cachedData = localStorage.getItem(this.props.cacheStorageKey);
    let result: ComponentGeoJsonType[];
    if (cachedData) {
      let { updatedAt, result } = JSON.parse(cachedData),
        now = new Date();
      if (
        updatedAt instanceof Date
        && updatedAt.getFullYear() === now.getFullYear()
        && updatedAt.getMonth() === now.getMonth()
        && updatedAt.getDate() === now.getDate()
        && updatedAt.getHours() >= now.getHours()
      ) {
        return result;
      }
    }
    result = this.props.locations.map(locations => ({
      ...locations,
      features: locations.features.map(f => {
        const d = this.props.data.find((m: MapDataRes) =>
          m.location.toLowerCase().includes((f.properties.village ?? f.properties.s_town ?? f.properties.town).toLowerCase())
          || (f.properties.village ?? f.properties.s_town ?? f.properties.town).toLowerCase().includes(m.location.toLowerCase())
        )
        if (d) f.properties.measure = d.pm2_5;
        return f;
      })
    }));
    localStorage.setItem(this.props.cacheStorageKey, JSON.stringify({ updatedAt: new Date(), result }));
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
      fillOpacity: (this.state.layer1 && !this.state.prevPropagatedFromLayer) ? 0 : 0.7
    };
  }
  highlightFeature(e: L.LeafletMouseEvent) {
    if (this.state.layer1) {
      clearTimeout(this.state.layer1Timeout);
      this.state.prevPropagatedFromLayer?.setStyle({ fillOpacity: 0.7 });
    };
    const layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    layer.bringToFront();
    //@ts-ignore
    this.state.info.update(layer.feature.properties);
  }
  resetHighlight(e: L.LeafletMouseEvent) {
    this.state.layer0.resetStyle(e.target);
    //@ts-ignore
    this.state.info.update();
  }
  async loadSubFeatures({ town }: LocationType) {
    const data = (await this.syncData())[1];
    const subFeatures = data.features.filter(f => f.properties.town === town);
    return {
      ...this.props.locations[1],
      features: subFeatures
    };
  }
  cleanUpLayer1() {
    if (!this.state.layer1) return;

    clearTimeout(this.state.layer1Timeout);
    this.state.layer1.removeFrom(this.map);
    this.setState({
      layer1: null,
      layer1Timeout: null,
    });
    this.state.prevPropagatedFromLayer?.setStyle({
      fillOpacity: 0.7
    });
  }
  async addLayer1(propagatedFrom: L.LeafletMouseEvent['propagatedFrom']) {
    this.cleanUpLayer1();
    const layer1 = L.geoJson(await this.loadSubFeatures(propagatedFrom.feature.properties), {
      //@ts-ignore
      style: this.style1,
      //@ts-ignore
      onEachFeature: this.onEachFeature1,
    });
    layer1.on({
      mouseout: (e: L.LeafletMouseEvent) => {
        this.setState({
          layer1Timeout: setTimeout(() => this.cleanUpLayer1(), 1000)
        });
      },
    });
    this.setState({
      prevPropagatedFromLayer: propagatedFrom,
      layer1: layer1.addTo(this.map),
    });
  }
  async zoomToFeature(e: L.LeafletMouseEvent) {
    const layer = e.target;
    this.map.fitBounds(layer.getBounds());

    this.addLayer1(layer);
  }
  onEachFeature(feature: Feature<null, LocationType>, layer: L.Layer) {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature,
    });
  }
  style1(feature: Feature<null, LocationType>) {
    return {
      fillColor: this.getColor(feature.properties.measure),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  resetHighlight1(e: L.LeafletMouseEvent) {
    this.state.layer1.resetStyle(e.target);
    //@ts-ignore
    this.state.info.update();
  }
  onEachFeature1(feature: Feature<null, LocationType>, layer: L.Layer) {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight1,
    });
  }

  render() {
    return <div className={this.props.className} onMouseLeave={this.cleanUpLayer1}>
      <div ref={this.containerRef} />
    </div>;
  }
}
import 'leaflet/dist/leaflet.css'

import { useEffect } from 'react'

import _ from "lodash"
import Banner from '../components/Banner'
import Projects from '../components/Projects'
import PollutioDescription from '../components/Description';
import Installations from '../components/Installations';
import Partenaires from '../components/Partenaires';
import Map from '../components/Map';
import MapData from '../components/MapData'
import Video from '../components/Video'
import locationsLevel3 from '../assets/locations/level3.json';
import locationsLevel4 from '../assets/locations/level4.json';

export function SmoothScrolling(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

export default  function Home () {
  useEffect(() => {
    SmoothScrolling("root")
  }, [])
  return (
    <>
      <Banner />
      <PollutioDescription />
      <Video />
      <MapData locations={[locationsLevel3, locationsLevel4]}/>
      <Projects />
      <Installations />
      <Partenaires />
    </>
  )
}
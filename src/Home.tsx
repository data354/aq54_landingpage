import 'leaflet/dist/leaflet.css'
import logo from "./assets/logo.png"
import logoAirqino from "./assets/airqino.png"
import fondDechets from "./assets/dechets.jpeg"
import fondAq54 from "./assets/aq54Page.png"
import fondTraffic from "./assets/traffic.webp"
import fondUsine from "./assets/industrie.jpg"
import logoMinedd from "./assets/minedd.jpg"
import logoDiis from "./assets/diis.png"
import iconLinkedin from "./assets/linkedin.png"
import iconGmail from "./assets/gmail.png"
import { IconArrowDown, IconArrowRight, IconChartHistogram, IconCodeDots, IconInfoCircle, IconLoader2, IconMenu, IconPhoneCall, IconPlus, IconTopologyStar3 } from "@tabler/icons-react";
import { ActionIcon, Avatar, Button, Flex, Grid, HoverCard, Menu, Text, } from "@mantine/core";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { icon } from 'leaflet';
import sensors from './data/sensors';

import fondSensor188_3 from "./assets/sensor188_3.jpeg"

import fondSensor189_1 from "./assets/sensor189_1.jpeg"
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import moment from 'moment'
import aqi, { AQIINFO } from './data/aqi'

import _ from "lodash"

export function SmoothScrolling(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

const Header = () => {

  const navigate = useNavigate()
  const location = useLocation()

  return <div id="header" className="z-50 h-20 px-5 flex items-center bg-slate-950 text-white xl:sticky xl:top-0">
    <Grid className="w-full" align="center">
      <Grid.Col span={9} lg={3}>
        <Flex align={"center"} id='headerIcon'>
          <a href="/" rel="noopener noreferrer">
            <Avatar radius={"md"} src={logo} size={"md"} alt="Data354 Logo" />
          </a>
          <span className='ml-5 font-extrabold text-2xl'>AQ54</span>
        </Flex>
      </Grid.Col>
      <Grid.Col span={3} lg={9} >
        <Flex gap={50} align={"center"} justify={"end"} className='hidden lg:flex' >
          <a onClick={() => { navigate("/") }} className={`cursor-pointer hover:text-red-500 ${location.pathname === "/" ? "text-red-500 font-bold" : ""}`}>Accueil</a>
          <a onClick={() => { navigate("/article") }} className={`cursor-pointer hover:text-red-500 ${location.pathname === "/article" ? "text-red-500 font-bold" : ""}`}>Qualité de l'air</a>
          <a onClick={() => { navigate("/project") }} className={`cursor-pointer hover:text-red-500 ${location.pathname === "/project" ? "text-red-500 font-bold" : ""}`}>Projet AQ54</a>
          <a href='https://aq54.visualisation.data354.com/' target='blank' className="hover:text-red-500">Visualisation des données</a>
          <Button size='lg' onClick={() => SmoothScrolling('contacts')} leftIcon={<IconPhoneCall />} radius={0} className="btn-primary">Contactez-nous</Button>
        </Flex>
        <div className='flex justify-end lg:hidden'>
          <Menu shadow="md">
            <Menu.Target>
              <ActionIcon variant='filled'>
                <IconMenu color='white' />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown className='bg-slate-950 bg-opacity-80 backdrop-blur-md border-0'>
              <Menu.Item onClick={() => { navigate("/") }} className={`cursor-pointer hover:text-red-500 font-bold ${location.pathname === "/" ? "text-red-500" : "text-white"}`} component="a" >Accueil</Menu.Item>
              <Menu.Item onClick={() => { navigate("/article") }} className={`cursor-pointer hover:text-red-500 font-bold ${location.pathname === "/article" ? "text-red-500" : "text-white"}`} component="a">Qualité de l'air</Menu.Item>
              <Menu.Item onClick={() => { navigate("/project") }} className={`cursor-pointer hover:text-red-500 font-bold ${location.pathname === "/project" ? "text-red-500" : "text-white"}`} component="a">Projet AQ54</Menu.Item>
              <Menu.Item className={`text-white hover:text-red-500 font-bold `} component="a" href="https://aq54.visualisation.data354.com/" target="_blank">Visualisation des données</Menu.Item>
              <Menu.Item onClick={() => SmoothScrolling('contact')} className={`text-white hover:text-red-500 font-bold`}>Nous contacter</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Grid.Col>
    </Grid>
  </div>
}

const Banner = () => {

  const [aqiInfo, setAqiInfo] = useState<AQIINFO>()
  const [sensorsValues, setSensorsValues] = useState()
  const [sensorsValuesLength, setSensorsValuesLength] = useState<number>(1)
  const [loading, setLoading] = useState(false)

  function getEmoji(aqi: number) {
    switch (aqi) {
      case 1: return "😊"
      case 2: return "😶";
      case 3: return "😟";
      case 4:
      case 5: return "😷";
      case 6: return "🥵";
    }
  }

  function getCategory(aqi: number): [string, string] {
    switch (aqi) {
      case 1: return ["Good", "green"]
      case 2: return ["Moderate", "yellow"];
      case 3: return ["Unhealthy for sensitive", "orange"];
      case 4: return ["Unhealthy", "red"];
      case 5: return ["Very Unhealthy", "red"];
      case 6: return ["Harzardous", "red"];
    }

    return ["", ""]
  }

  function getAQIs() {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_HOST}/user/stationAQI/byday/SMART189/${moment().format("YYYY-MM-DD")}`)
      .then(async (response) => {
        let result = (await response.json())[0]
        setLoading(false);
        setAqiInfo(result)
      })
      .catch(async (response) => { setLoading(false) })
  }

  function getSensorsValues() {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_HOST}/user/stationData/byday/${moment().format("YYYY-MM-DD")}`)
      .then(async (response) => {
        let result = (await response.json())
        setSensorsValues(result)
        setSensorsValuesLength(result["SMART189"]["CO"]["data"].length)
      })
      .catch(async (response) => { setLoading(false) })
  }

  useEffect(() => {
    getAQIs()
    getSensorsValues()
  }, [])

  return <div id="banner"
    className="bg-cover bg-slate-950 p-10 md:p-20 lg:p-36 lg:min-h-screen">
    <div className='text-white grid gap-5 grid-cols-2 lg:gap-20 xl:grid-cols-4'>
      <div id='infoTitle' className='col-span-2 '>
        <h2 className='text-4xl font-bold md:text-6xl lg:text-7xl'>L'Open data contre la pollution de l'air</h2>
        <p className='text-xl text-white lg:text-3xl my-5 lg:my-20 text-justify md:mt-10 font-extralight'>
          La pollution de l’air est un enjeu de premier rang pour la santé publique,
          le climat et la société. Aujourd’hui, il y a un manque cruel de données ouvertes
          sur la qualité de l’air en Côte d’Ivoire.
        </p>
        <Button onClick={() => SmoothScrolling('info')} rightIcon={<IconArrowDown />} radius={0} size='lg' className="btn-primary" mt={30}>En savoir plus</Button>
      </div>
      <div id='infoPopup' className='col-span-2 md:col-span-1 md:max-xl:col-start-2 xl:col-span-2 xl:-mb-96 xl:-mt-96'>
        <div className="sticky top-36 xl:max-w-md mx-auto">
          <div className='shadow-2xl bg-slate-950 bg-opacity-70 backdrop-blur border border-slate-900 border-opacity-10'>
            <div className="flex items-center justify-center">
              <p className='text-slate-100 p-3 font-extralight flex-1'>Qualité de l'air à <b className='font-extrabold'>Abidjan</b></p>
              {
                loading ? <IconLoader2 className='animate-spin opacity-60 mx-5' /> : aqiInfo !== null && <HoverCard position="right" withArrow shadow="md">
                  <HoverCard.Target>
                    <IconInfoCircle className='mx-5 opacity-80' />
                  </HoverCard.Target>
                  <HoverCard.Dropdown className='p-2 border-none backdrop-blur-xl'>
                    <small className='text-slate-700 block font-bold'>Definition des catégories d'AQI</small>
                    <div className="text-sm text-slate-500 flex flex-col">
                      {aqi.aqiRanges['PM2.5'].map((range, index) => <small key={index}>{range}</small>)}
                    </div>
                  </HoverCard.Dropdown>
                </HoverCard>
              }
            </div>
            <div className="text-gray-500 p-5 grid grid-cols-3">
              {
                aqiInfo !== undefined &&
                <>
                  <p style={{ color: getCategory(aqiInfo["Gravity"])[1] }} className={`text-sm lg:text-xl self-center text-center font-extrabold`}>{getCategory(aqiInfo["Gravity"])[0]}</p>
                  <div className='text-center'>
                    <h2 className='text-slate-200 text-5xl font-bold'>{aqiInfo.AQI}</h2>
                    <h6 className='text-slate-200 text-xs'>{aqiInfo["Most_Responsible_Pollutant"]} AQI</h6>
                  </div>
                  <span className='text-4xl text-center self-center'>{getEmoji(Number(aqiInfo["Gravity"]))}</span>
                </>
              }
            </div>
            {
              !!aqiInfo && !!sensorsValues && <div className='p-2 flex justify-center text-center'><small className='text-slate-100'>La concentration actuelle en <b>{aqiInfo.Most_Responsible_Pollutant}</b> dans l'air est de <b>{Math.ceil(sensorsValues["SMART189"][aqi.indicators[aqiInfo.Most_Responsible_Pollutant].label]["data"][sensorsValuesLength - 1]["y"])}</b> {aqi.indicators[aqiInfo["Most_Responsible_Pollutant"]].unit} </small></div>
            }
          </div>
          <div className="bg-slate-950 bg-opacity-80 text-md backdrop-blur-xl p-2">
            {
              !!aqiInfo &&
              <HoverCard withArrow width={"target"} shadow="md">
                <HoverCard.Target>
                  <small className='line-clamp-1'>Recommandations :  {aqiInfo.Recommendation} </small>
                </HoverCard.Target>
                <HoverCard.Dropdown className='bg-slate-950 bg-opacity-80 text-md backdrop-blur-xl text-white border-none'>
                  <small>{aqiInfo.Recommendation}</small>
                </HoverCard.Dropdown>
              </HoverCard>
            }
          </div>
        </div>
      </div>
      <div id='bannerBottom' className="p-5 col-span-2"></div>
    </div>
  </div>
}

const PollutioDescription = () => {
  const navigate = useNavigate()
  return <div id="pollutionDescription" className='p-10'>
    <div className="lg:py-20 max-w-7xl mx-auto">
      <h2 className='text-slate-700'>La qualité de l'air</h2>
      <p className='text-slate-500 lg:text-2xl sm:text-xl'>Un enjeu majeur</p>
      <div className="lg:mt-20 grid xl:grid-cols-3 gap-5 lg:gap-10">
        <p>
          Selon l’OMS, plus de 9 personnes sur 10 sur Terre respirent un air de mauvaise qualité. C’est particulièrement le cas dans les zones urbaines comme Abidjan, qui concentrent de nombreuses différentes sources émettrices de polluants. La pollution de l’air constitue en Côte d’Ivoire le deuxième facteur de risque de mortalité après la malnutrition. C’est également un grand enjeu climatique puisque les polluants atmosphériques à courte durée de vie accélèrent localement la hausse des températures. Pourtant, peu de mesures sont mises en place, et le sujet reste méconnu...
          <a onClick={() => navigate("/article")} className='text-blue-500 hover:text-blue-600 cursor-pointer'>En savoir plus </a>
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:col-span-2 xl:gap-0">
          <div style={{ backgroundImage: `url("${fondTraffic}")` }}
            className='h-44 lg:h-80 xl:h-96 w-full bg-cover'>
            <div className="h-full flex justify-center items-end bg-gradient-to-t from-slate-500 from-5% to-transparent">
              <p className='
          text-white p-2 
          text-lg -tracking-tighter text-center font-extralight' >Trafic</p>
            </div>
          </div>
          <div style={{ backgroundImage: `url("${fondUsine}")` }}
            className='h-44 lg:h-80 xl:h-96  bg-cover picture-animated drop-shadow-2xl '>
            {/* <p className=' text-white p-2 text-lg -tracking-tighter text-center font-extralight' >Trafic</p> */}
          </div>
          <div style={{ backgroundImage: `url("${fondDechets}")` }}
            className={`h-44 lg:h-80 xl:h-96 w-full bg-cover`}>
            <div className="h-full flex justify-center items-end bg-gradient-to-t from-zinc-500 from-5% to-transparent">
              <p className='
          text-white p-2 
          text-lg -tracking-tighter text-center font-extralight' >Incinération de déchets</p>
            </div>
          </div>
          <p className='text-center text-md mt-5 col-span-full'>Sources urbaines de pollution de l'air </p>
        </div>
      </div>
    </div>
  </div>
}

const Projects = () => {
  return <div id="projects" className='bg-zinc-100 p-10 md:p-28 md:py-20 md:mb-80'>
    <div className='max-w-7xl mx-auto'>
      <h2 className='text-red-600'>Le projet AQ54</h2>
      <p className='text-slate-500 lg:text-2xl sm:text-xl'>Une ambition globale</p>
      <p className='text-lg text-slate-600 font-extralight sm:text-3xl text-center my-10'>Pour accélerer la lutte contre la pollution de l’air, le projet vise à :</p>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-7">
        <div className='bg-white p-8 flex flex-col items-center space-y-5'>
          <IconTopologyStar3 size={80} className='text-zinc-400' />
          <p className='text-center'> Doter Abidjan d’un <b>réseau de capteurs</b> afin de <b>cartographier la qualité de l’air</b> en temps réel.</p></div>
        <div className='bg-white p-8  flex flex-col items-center space-y-5'>
          <IconCodeDots size={80} className='text-red-400' />
          <p className='text-center'><b> Collecter, traiter, analyser</b> les données pour comprendre et agir contre la pollution aérienne.</p></div>
        <div className='bg-white p-8  flex flex-col items-center space-y-5'>
          <IconChartHistogram size={80} className='text-red-400' />
          <p className='text-center'> Développer une <b>plateforme de visualisation</b> des données et les <b>diffuser ouvertement</b>.</p></div>
      </div>
      <img className='mt-10 md:-mb-96 drop-shadow-lg' src={fondAq54} />
    </div>
  </div>
}

const Installations = () => {
  return (
    <div className='p-10'>
      <div className='flex items-center justify-center'>
        <a className='text-red-500 hover:text-red-600 text-xl' href="http://aq54.visualisation.data354.com" target="_blank" rel="noopener noreferrer">Acceder à la plateforme de visualisation <IconArrowRight className='inline' /></a>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <p className='my-20 text-6xl font-[1000] text-center text-zinc-400'>Agir sans attendre : Lancement de notre projet pilote</p>
        <p className='text-lg text-zinc-500 font-bold sm:text-4xl my-10 text-center '>Nos installations</p>
        <div className='mt-14 grid grid-cols-1 md:grid-cols-2 gap-20'>
          <div className='space-y-6'>
            <p className=''>Le capteur <b className='text-red-500'>SMART188</b> installé à la pharmacie du bonheur près d'une rue bituméé.</p>
            <div style={{ backgroundImage: `url("${fondSensor188_3}")` }}
              className='h-80 lg:h-96 bg-center bg-cover'>
            </div>
          </div>
          <div className="space-y-6">
            <p className=''>Le capteur <b className='text-red-500'>SMART189</b> installé à la pharmacie Ministre près d'une rue non bituméé.</p>
            <div style={{ backgroundImage: `url("${fondSensor189_1}")` }}
              className='h-80 lg:h-96 bg-cover bg-center'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Partenaires = () => {
  return (
    <div id='partners' className='p-10 py-20'>
      <div className="mx-auto max-w-7xl">
        <p className='text-lg text-zinc-500 font-bold sm:text-4xl text-center'>Nos partenaires</p>
        <div className='flex justify-center space-x-20 mt-20'>
          <a className='md:col-start-2 self-center' href="https://environnement.gouv.ci/directions-centrales/ " target="_blank" rel="noopener noreferrer">
            <img className='h-20 xl:h-28' src={logoMinedd} alt="" />
          </a>
          <a className='self-center' href="https://www.airqino.it/en/" target="_blank" rel="noopener noreferrer">
            <img className='h-20 xl:h-28' src={logoAirqino} alt="" />
          </a>
          <a className='self-center' href="https://www.snisdiis.com/" target="_blank" rel="noopener noreferrer">
            <img className='h-20 xl:h-28' src={logoDiis} alt="" />
          </a>
        </div>
      </div>
    </div>
  )
}

const Map = () => {

  let mapZoom: number = 11
  let mapCenter: [number, number] = [5.37, -4]

  function MapComponent() {

    let iconDefault = icon({
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      shadowUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC",
      iconRetinaUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcY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",
      iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII="
    })

    return (
      <>
        <TileLayer
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {
          sensors.map((sensor, index: number) => <Marker key={index} position={{ lat: sensor.location.lat, lng: sensor.location.lng }} icon={iconDefault}>
            <Tooltip> <img src={sensor.picture} alt="" /> {sensor.name} <br /> {sensor.emplacement} <br /><Text size={"xs"} color='dimmed'>{sensor.description}</Text></Tooltip>
          </Marker>)
        }
      </>
    )
  }

  return <MapContainer className='h-[55vh] p-0' zoom={mapZoom} center={mapCenter} scrollWheelZoom={false}>
    <MapComponent />
  </MapContainer>
}

const Contacts = () => {
  return (
    <div id='contacts' className="bg-gray-950 p-10 md:px-20 lg:px-24">
      <p className="font-extrabold text-4xl text-slate-100 text-center">Contactez-nous</p>
      <div className='text-slate-100 space-y-3 mt-10 text-center'>
        <h6><b>Telephone</b> : +225 07 1008 1410</h6>
        <h6><b>Mail</b> : aq54@data354.co</h6>
        <h6><b>Adresse</b> : Cocody, Riviera Boulevard Y4</h6>
        <a href="https://www.linkedin.com/company/data354/" className='inline-block' target="_blank" rel="noopener noreferrer">
          <Avatar alt="logo facebook" src={iconLinkedin} />
        </a>
        <a href="mailto:aq54@data354.com" className='inline-block ml-5' target="_blank" rel="noopener noreferrer">
          <Avatar alt="logo facebook" src={iconGmail} />
        </a>
      </div>
    </div>
  )
}

const AppFooter = () => {
  return (
    <div className="bg-slate-950 p-2 flex justify-center">
      <small className='text-white text-center sm:text-sm'> {`Designed & built by Data354, 2023 CIV 🇨🇮`} - {`All rights reserved`}</small>
    </div>
  );
};

export const Home = () => {
  useEffect(() => {
    SmoothScrolling("root")
  }, [])
  return (
    <>
      <Banner />
      <PollutioDescription />
      <Projects />
      <Installations />
      <Partenaires />
      <Map />
    </>
  )
}

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Contacts />
      <AppFooter />
    </>
  );
}

export default Root;
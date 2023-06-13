import 'leaflet/dist/leaflet.css'
import { Avatar, Button, Flex, Grid, HoverCard, Stack, Text, } from "@mantine/core";
import logo from "./assets/logo.jpeg"
import fondPollution from "./assets/pollution.jpg"
import logoAirqino from "./assets/airqino.png"
import fondDechets from "./assets/dechets.jpeg"
import fondAq54 from "./assets/aq54Page.png"
import fondTraffic from "./assets/traffic.webp"
import fondUsine from "./assets/industrie.jpg"
import logoMinedd from "./assets/minedd.jpg"
import logoDiis from "./assets/diis.png"
import fondPoisson from "./assets/poisson.webp"
import iconLinkedin from "./assets/linkedin.png"
import { IconPhoneCall, IconPlus, IconSend } from "@tabler/icons-react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { icon } from 'leaflet';
import sensors from './data/sensors';

import fondSensor188_1 from "./assets/sensor188_1.jpeg"
import fondSensor188_3 from "./assets/sensor188_3.jpeg"

import fondSensor189_1 from "./assets/sensor189_1.jpeg"
import fondSensor189_3 from "./assets/sensor189_3.jpeg"

const Header = () => {
  return <div id="header" className="z-50 h-20 px-5 flex items-center bg-gray-800 text-white lg:sticky lg:top-0">
    <Grid className="w-full" align="center">
      <Grid.Col span={3}>
        <a href="https://data354.com" target="_blank" rel="noopener noreferrer">
          <Avatar radius={"md"} src={logo} size={"md"} alt="Data354 Logo" />
        </a>
        <span>AQ54</span>
      </Grid.Col>
      <Grid.Col span={9} >
        <Flex gap={50} align={"center"} justify={"end"} className='hidden lg:flex' >
          <Text fw={600} className="cursor-pointer hover:text-red-500">Qualité de l'air</Text>
          <Text fw={600} className="cursor-pointer hover:text-red-500">Projet AQ54</Text>
          <Text fw={600} className="cursor-pointer hover:text-red-500">Visualisation des données</Text>
          <Button leftIcon={<IconPhoneCall />} size="md" radius={0} className="bg-red-700">Contactez-nous</Button>
        </Flex>
      </Grid.Col>
    </Grid>
  </div>
}

const Banner = () => {
  return <div style={{ backgroundImage: `url("${fondPollution}")` }} id="banner" className=" h-full bg-cover bg-blend-multiply bg-black bg-opacity-40 p-10 md:p-20">
    <div className='text-white grid gap-5 md:grid-cols-3 md:gap-20 xl:grid-cols-4'>
      <div className=' md:col-span-2'>
        <p className='text-4xl font-bold md:text-6xl'>L'Open data contre la pollution de l'air</p>
        <p className='text-xl mt-5 text-justify md:mt-10 font-extralight'>
          La pollution de l’air est un enjeu de premier rang pour la santé publique,
          le climat et la société. Aujourd’hui, il y a un manque cruel de données ouvertes
          sur la qualité de l’air en Côte d’Ivoire.
        </p>
        <Button rightIcon={<IconPlus />} radius={0} size="md" className="bg-red-700" mt={30}>En savoir plus</Button>
      </div>
      <div className='xl:col-start-4'>
        <div className='sticky top-36 backdrop-blur-lg bg-white opacity-90'>
          <p className='text-gray-950 text-center p-3 font-extralight'>Qualité de l'air à Abidjan</p>
          <div className="text-gray-500 p-5 grid grid-cols-3 md:grid-cols-2">
            <span className='text-5xl text-center self-center'>😟</span>
            <div className='text-center'>
              <p className='text-6xl font-bold'>15</p>
              <p className='text-xs'>US AQI</p>
              <p className='text-md text-orange-500 self-center text-center hidden md:block'>moderate</p>
            </div>
            <p className='text-md text-orange-500 self-center text-center md:hidden'>moderate</p>
            {/* <Text fz={30} >🥵😊😟😷</Text> */}
          </div>
          <p className="bg-red-600 animate-pulse p-1"></p>
          <Stack className="bg-gray-800" p={10}>
            <HoverCard withArrow width={"target"} shadow="md">
              <HoverCard.Target>
                <small className='line-clamp-1'>Recommandations :  Les personnes souffrant de maladies cardiaques ou pulmonaires, les personnes âgées,
                  les enfants et les personnes ayant un statut socio-économique faible
                  doivent réduire les efforts importants ou prolongés. </small>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <small className='text-gray-700'>Les personnes souffrant de maladies cardiaques ou pulmonaires, les personnes âgées,
                  les enfants et les personnes ayant un statut socio-économique faible
                  doivent réduire les efforts importants ou prolongés. </small>
              </HoverCard.Dropdown>
            </HoverCard>
          </Stack>
        </div>
      </div>
    </div>
  </div>
}

const PollutioDescription = () => {
  return <div id="pollutionDescription">
    <p className='text-4xl lg:text-5xl font-bold text-blue-900'>La qualité de l'air</p>
    <p className='text-gray-500 lg:text-lg'>Un enjeu majeur</p>
    <div className="mt-5 grid lg:grid-cols-3 gap-5 lg:gap-10">
      <div className="text-justify text-gray-500 leading-8">
        Selon l’OMS, plus de 9 personnes sur 10 sur Terre respirent un air de mauvaise qualité. C’est particulièrement le cas dans les zones urbaines comme Abidjan, qui concentrent de nombreuses différentes sources émettrices de polluants. La pollution de l’air constitue en Côte d’Ivoire le deuxième facteur de risque de mortalité après la malnutrition. C’est également un grand enjeu climatique puisque les polluants atmosphériques à courte durée de vie accélèrent localement la hausse des températures. Pourtant, peu de mesures sont mises en place, et le sujet reste méconnu...
        <a href='#' className='text-blue-500 hover:text-blue-600'>En savoir plus </a>
      </div>
      <div className="grid col-span-2 grid-cols-2 lg:gap-5">
        <div style={{ backgroundImage: `url("${fondTraffic}")` }}
          className='h-44 lg:h-56 w-full bg-blend-multiply bg-cover flex justify-end items-end'>
          <p className='bg-blue-950 bg-opacity-70 text-white p-2' >Traffic</p>
        </div>
        <div style={{ backgroundImage: `url("${fondDechets}")` }}
          className='h-44 lg:h-56 w-full bg-blend-multiply bg-cover flex justify-end items-end'>
          <p className='bg-blue-950 bg-opacity-70 text-white p-2' >Incinération de déchets</p>
        </div>
        <div style={{ backgroundImage: `url("${fondUsine}")` }}
          className='h-44 lg:h-56 w-full bg-blend-multiply bg-cover flex justify-end items-end'>
          <p color='white' className='bg-blue-950 bg-opacity-70 text-white p-2' >Industrie</p>
        </div>
        <div style={{ backgroundImage: `url("${fondPoisson}")` }}
          className='h-44 lg:h-56 w-full bg-blend-multiply bg-cover flex justify-end items-end'>
          <p color='white' className='bg-blue-950 bg-opacity-70 text-white p-2' >Cuisson traditionnelle</p>
        </div>
        <p className='text-center text-sm mt-2 col-span-full'>Sources urbaines de pollution de l'air </p>
      </div>
    </div>
  </div>
}

const Projects = () => {
  return <div id="projects">
    <p className='text-4xl lg:text-5xl font-bold text-blue-900'>Le projet AQ54</p>
    <p className='text-gray-500 lg:text-lg'>Une ambition globale</p>
    <div className="mt-5 grid lg:grid-cols-3 gap-5 lg:gap-10">
      <img className='lg:col-span-2' src={fondAq54} />
      <div className='text-justify'>
        <p className='text-lg text-blue-900 font-bold'>Pour accélerer la lutte contre la pollution de l’air, le projet vise à :</p>
        <ul className='list-decimal list-inside mt-5 space-y-5 text-gray-500'>
          <li>Doter Abidjan d’un réseau de capteurs suffisant pour obtenir une cartographie de la qualité de l’air en temps réel,</li>
          <li>Collecter, traiter, analyser les données pour comprendre et agir contre la pollution aérienne,</li>
          <li>Développer une plateforme de visualisation des données et les diffuser ouvertement aux décideurs, scientifiques, entreprises, organisations et aux citoyens.</li>
        </ul>
      </div>
    </div>

    <p className='my-20 text-center text-4xl opacity-10 leading-10'><b className='font-bold'>Agir sans attendre</b> : Lancement de notre projet pilote</p>

    <div className='mt-10 grid gap-5 lg:grid-cols-3 lg:gap-10'>
      <div className='text-justify'>
        <p className='text-lg text-blue-900 font-bold'>Pour initier le projet, Data354 a lancé sa phase pilote consistant en:</p>
        <ul className='list-decimal list-inside mt-5 space-y-5 text-gray-500'>
          <li>L’installation de deux premiers capteurs en ville et une période de récolte de données,</li>
          <li>Le développement et tests de la plateforme de visualisation,</li>
          <li>L’étude sur l’impact du bitumage de route sur la qualité de l’air.</li>
        </ul>
      </div>
      <div className='grid grid-cols-2 lg:col-span-2 lg:gap-5'>
        <div style={{ backgroundImage: `url("${fondSensor188_3}")` }}
          className='h-44 lg:h-56 w-full bg-center bg-cover flex justify-end items-end'>
          <p className='bg-blue-950 bg-opacity-70 text-white p-2' >Pharmacie du bonheur</p>
        </div>
        <div style={{ backgroundImage: `url("${fondSensor188_1}")` }} className='h-44 lg:h-56 w-full bg-cover bg-center'></div>
        <div style={{ backgroundImage: `url("${fondSensor189_1}")` }}
          className='h-44 lg:h-56 w-full bg-cover bg-center flex justify-end items-end'>
          <p color='white' className='bg-blue-950 bg-opacity-70 text-white p-2' >Pharmacie rue ministre</p>
        </div>
        <div style={{ backgroundImage: `url("${fondSensor189_3}")` }} className='h-44 lg:h-56 w-full bg-cover bg-center'></div>
      </div>
    </div>
  </div>
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
            <Tooltip> <img src={sensor.picture} alt="" /> {sensor.emplacement} <br /><Text size={"xs"} color='dimmed'>{sensor.description}</Text></Tooltip>
          </Marker>)
        }
      </>
    )
  }

  return <MapContainer className='h-96 p-0' zoom={mapZoom} center={mapCenter} scrollWheelZoom={false}>
    <MapComponent />
  </MapContainer>
}

const Partenaires = () => {
  return (
    <div id='partners'>
      <p className='text-3xl opacity-40 font-extralight text-center'>Nos partenaires</p>
      <div className='grid grid-cols-3 mt-10 gap-20 md:grid-cols-5 place-content-center'>
        <a className='md:col-start-2 self-center' href="https://environnement.gouv.ci/directions-centrales/ " target="_blank" rel="noopener noreferrer">
          <img src={logoMinedd} alt="" />
        </a>
        <a className='self-center' href="https://www.airqino.it/en/" target="_blank" rel="noopener noreferrer">
          <img src={logoAirqino} alt="" />
        </a>
        <a className='self-center' href="https://www.snisdiis.com/" target="_blank" rel="noopener noreferrer">
          <img src={logoDiis} alt="" />
        </a>
      </div>
    </div>
  )
}

const Contacts = () => {
  return (
    <div className="bg-gray-950 p-10 md:px-20">
      <p className="font-extrabold text-4xl text-gray-50">Contactez-nous</p>
      <div className='grid grid-flow-row md:grid-cols-2'>
        <div className='order-2'>
          <Stack mt={20} spacing={15}>
            <Grid>
              <Grid.Col span={6}>
                <label htmlFor="nom" className="text-white">Nom et prenoms</label>
                <input id="nom" className="bg-gray-500 p-3 text-lg outline-0 text-white w-full mt-4" />
              </Grid.Col>
              <Grid.Col span={6}>
                <label htmlFor="email" className="text-white">Email</label>
                <input id="email" className="bg-gray-500 p-3 text-lg outline-0 text-white w-full mt-4" />
              </Grid.Col>
            </Grid>
            <label htmlFor="entreprise" className="text-white">Organisation</label>
            <input id="entreprise" className="bg-gray-500 p-3 text-lg outline-0 text-white w-full" />
            <label htmlFor="message" className="text-white">Message</label>
            <textarea id="message" className="bg-gray-500 p-3 text-lg outline-0 text-white" />
          </Stack>
          <Button fullWidth rightIcon={<IconSend />} radius={0} size="lg" className="bg-red-700" mt={50}>Soumettre</Button>
        </div>
        <div className='text-white space-y-5 mt-10 order-1'>
          <p><b>Whatsapp</b> : +33 6 76 38 64 12</p>
          <p><b>Telephone</b> : +225 07 1008 1410</p>
          <p><b>Mail</b> : luca.thommen@data354.co</p>
          <p><b>Adresse</b> : Cocody, Riviera Boulevard Y4</p>
          <p>
            <a href="https://www.linkedin.com/company/data354/" className='inline-block' target="_blank" rel="noopener noreferrer">
              <Avatar alt="logo facebook" src={iconLinkedin} />
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const AppFooter = () => {
  return (
    <div className="bg-gray-700 p-5">
      <p className='text-white text-center text-sm'> {`Designed & built by Data354, 2023 CIV 🇨🇮`} - {`All rights reserved`}</p>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className='p-10 py-20 md:px-20 mx-auto space-y-24'>
        <PollutioDescription />
        <Projects />
        <Partenaires />
      </div>
      <Map />
      <Contacts />
      <AppFooter />
    </>
  );
}

export default App;
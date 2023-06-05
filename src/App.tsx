import 'leaflet/dist/leaflet.css'
import { Avatar, Button, Center, Flex, Grid, Group, Input, Paper, Stack, Text, TextInput, Textarea } from "@mantine/core";
import logo from "./assets/logo.jpeg"
import fondPollution from "./assets/pollution.jpg"
import fondProjet from "./assets/projet.jpg"
import fondLaunch from "./assets/launch.jpg"
import fondSujet from "./assets/sujet.png"
import fondTraffic from "./assets/traffic.webp"
import fondUsine from "./assets/industrie.jpg"
import fondPoussiere from "./assets/poussiere.jpg"
import iconFace from "./assets/face.png"
import iconInsta from "./assets/insta.webp"
import iconYoutube from "./assets/youtube.webp"
import iconTwitter from "./assets/twitter.png"
import { IconLocation, IconMapPin, IconMapPins, IconPhoneCall, IconPlus, IconSend } from "@tabler/icons-react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import { icon } from 'leaflet';
import sensors from './data/sensors';

import fondSensor188_1 from "./assets/sensor188_1.jpeg"
import fondSensor188_2 from "./assets/sensor188_2.jpeg"
import fondSensor188_3 from "./assets/sensor188_3.jpeg"

import fondSensor189_1 from "./assets/sensor189_1.jpeg"
import fondSensor189_2 from "./assets/sensor189_2.jpeg"
import fondSensor189_3 from "./assets/sensor189_3.jpeg"

const Header = () => {
  return <div id="header" className="z-50 h-20 px-5 flex items-center bg-gray-800 text-white sticky top-0">
    <Grid className="w-full" align="center">
      <Grid.Col span={3}>
        <Group>
          <Avatar radius={"md"} src={logo} size={"md"} alt="Data354 Logo" />
          <Text fw={1000} fz="xl">AQ54</Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={9} >
        <Flex gap={50} align={"center"} justify={"end"}>
          <Text fw={600} className="cursor-pointer hover:text-red-500">Qualité de l'air</Text>
          <Text fw={600} className="cursor-pointer hover:text-red-500">Projet AQ54</Text>
          <Text fw={600} className="cursor-pointer hover:text-red-500">Données</Text>
          <Button leftIcon={<IconPhoneCall />} size="lg" radius={0} className="bg-red-700">Contactez-nous</Button>
        </Flex>
      </Grid.Col>
    </Grid>
  </div>
}

const Banner = () => {
  return <div style={{ backgroundImage: `url("${fondPollution}")` }} id="banner" className="h-min bg-blend-multiply bg-black bg-opacity-20 p-36">
    <Grid justify="center">
      <Grid.Col span={7}>
        <Stack spacing={-2}>
          <Text fw={1000} opacity={0.8} color="white" fz={80}>L'Open data</Text>
          <Text fw={1000} opacity={0.8} color="white" fz={80}>contre la polution</Text>
          <Text fw={1000} opacity={0.8} color="white" fz={80}>de l'air</Text>
        </Stack>
        <Text opacity={0.9} fs={"oblique"} fw={1} color="white" fz={25} mt={15}>
          La pollution de l’air est un enjeu de premier rang pour la santé publique,
          le climat et la société. Aujourd’hui, il y a un manque cruel de données ouvertes
          sur la qualité de l’air en Côte d’Ivoire.
        </Text>
        <Button rightIcon={<IconPlus />} radius={0} size="lg" className="bg-red-700" mt={50}>En savoir plus</Button>
      </Grid.Col>
      <Grid.Col offset={2} span={3} >
        <Paper shadow="xl" p={0} opacity={0.85} className='sticky top-2 backdrop-blur-lg bg-blue-950'>
          <Stack p={15} align='center'>
            <Text fz={23} fw={800} color='white'>Qualité de l'air à Abidjan </Text>
          </Stack>
          <Stack className="bg-gray-500" p={20} >
            <Group align='center' spacing={20} position='apart'>
              <Text fz={45} >🥵</Text>
              <Stack align='center' spacing={0}>
                <Text color='white' fz={50} fw={1000}>15</Text>
                <Text color='white' fz={15}>US AQI</Text>
              </Stack>
              <Text color='white' fz={20}>Moderate</Text>
            </Group>
            {/* <Text fz={30} >🥵😊😟😷</Text> */}
          </Stack>
          <Stack className="bg-red-600 animate-pulse" p={10}></Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  </div>
}

const PollutioDescription = () => {
  return <div id="pollutionDescription" className="px-40 mt-32 bg-white">
    <Text fw={1000} fz={80} color="dimmed" >Le sujet</Text>
    <Text fw={"lighter"} fz={40} color="dimmed" >La pollution de l'air en bref</Text>
    <Grid mt={50}>
      <Grid.Col style={{ height: "60vh" }} span={4}>
        <div style={{ backgroundImage: `url("${fondPoussiere}")` }}
          className='w-full p-5 bg-cover h-full flex-col'>
          <Text color='white' fw={800} fz={40} >Traffic</Text>
          <Text color='white' fz={20} >Traffic</Text>
        </div>
      </Grid.Col>
      <Grid.Col span={4} pr={25}>
        <Grid className='h-full' gutter={0} align='stretch'>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondTraffic}")` }}
              className='w-full p-5 bg-blend-multiply bg-cover h-full flex justify-end items-end'>
              <Text color='white' >Traffic</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondPoussiere}")` }}
              className='w-full p-5 bg-blend-multiply bg-cover h-full flex justify-end items-end'>
              <Text color='white'>Bitume</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondUsine}")` }}
              className='w-full p-5 bg-blend-multiply bg-cover h-full flex justify-end items-end'>
              <Text color='white'>Industrie</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondProjet}")` }}
              className='w-full p-5 bg-blend-multiply bg-cover h-full flex justify-end items-end'>
              <Text color='white'>Menages & Commerces</Text>
            </div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={4}>
        <Text fz={22} align="justify" className='leading-loose'>
          La pollution de lair est un phénomène large qui désigne la présence en plus ou moins grande quantité, dans l’air respirable, de polluants atmosphériques.
          Ces polluants sont des espèces chimiques gazeuses, ou liquides ou solides de petite taille, de natures et d’origines
          variées, qui ont des effets différents sur la santé ou le climat. Parmi les polluants principaux, on retrouve :
          le tarffic urbain, les industries et usines, les voies non bitumés, les commerces et ménages.
        </Text>
      </Grid.Col>
    </Grid>
  </div>
}

const Projects = () => {
  return <div id="projects" className="p-40 bg-white">
    <Text fw={1000} fz={80} align='end' color="dimmed" >Notre projet</Text>
    <Text fw={"lighter"} fz={40} align='end' color="dimmed" >Une ambition globale</Text>
    <Grid mt={50}>
      <Grid.Col span={4}>
        <Grid className='h-full' gutter={0} align='stretch'>
          <Grid.Col span={12}>
            <div style={{ backgroundImage: `url("${fondTraffic}")` }}
              className='w-full p-5 bg-blend-multiply bg-cover h-full flex justify-end items-end'>
              <Text color='white' >Traffic</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondPoussiere}")` }}
              className='w-full p-5 bg-blend-multiply bg-cover h-full flex justify-end items-end'>
              <Text color='white'>Bitume</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondUsine}")` }}
              className='w-full p-5 bg-blend-multiply bg-cover h-full flex justify-end items-end'>
              <Text color='white'>Industrie</Text>
            </div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col px={50} span={4}>
        <Text fz={22} align="justify" className='leading-loose'>
          Pour faire face à la pollution de l’air et à ses dangers, data354 a mis au point le projet AQ54.
          L’objectif du projet : déployer un réseau de capteurs de qualité de l’air à travers toute la ville d’Abidjan,
          en nombre suffisant pour mettre au point une réelle cartographie de la pollution de l’air dans la ville.
          Notre plus-value : gérer efficacement la collecte des données qui proviendront des capteurs, les analyser,
          les afficher et les partager de manière ouverte et en temps réel, avec tous les acteurs concernés :
          les politiques et législateurs, entreprises, organisations non-gouvernementales, et bien sûr les citoyens.
        </Text>
      </Grid.Col>
      <Grid.Col span={4}>
        <Text fz={20} align="justify" className='leading-10'>
          De plus en plus d’autres villes africaines (Nairobi, Accra, Addis Abbaba… sources) se dotent de tels réseaux de capteurs.
          Le but de ce projet, c’est de doter Abidjan d’une infrastructure moderne pour piloter sa qualité d’air - comme la ville a
          pu s’y engager dans le cadre du C40 Cities (source).
          Nous sommes convaincus que cela permettra d’accélérer non seulement la prise de conscience, mais aussi l’engagement citoyen,
          privé et public, en termes d’actions, de mesures et de législations, dans la lutte contre la pollution de l’air.

        </Text>
      </Grid.Col>
    </Grid>
    <Text fw={"lighter"} mt={50} fz={40} color="dimmed" ><b className='font-bold'>Agir sans attendre</b> : Lancement de notre projet pilote</Text>
    <Grid mt={50} style={{ height: "60vh" }}>
      <Grid.Col pr={25} span={4}>
        <Text fz={20} align="justify" className='leading-10'>
          De plus en plus d’autres villes africaines (Nairobi, Accra, Addis Abbaba… sources) se dotent de tels réseaux de capteurs.
          Le but de ce projet, c’est de doter Abidjan d’une infrastructure moderne pour piloter sa qualité d’air - comme la ville a
          pu s’y engager dans le cadre du C40 Cities (source).
          Nous sommes convaincus que cela permettra d’accélérer non seulement la prise de conscience, mais aussi l’engagement citoyen,
          privé et public, en termes d’actions, de mesures et de législations, dans la lutte contre la pollution de l’air.

        </Text>
      </Grid.Col>
      <Grid.Col span={4}>
        <Grid className='h-full' gutter={0} align='stretch'>
          <Grid.Col span={12}>
            <div style={{ backgroundImage: `url("${fondSensor188_3}")` }}
              className='w-full bg-center bg-cover h-full flex justify-end items-end'>
              <Text color='white' className='bg-blue-950 bg-opacity-50 p-2' >Pharmacie du bonheur (SMART188)</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondSensor188_2}")`}} className='w-full bg-cover h-full'></div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondSensor188_1}")`}} className='w-full bg-cover h-full'></div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={4}>
        <Grid className='h-full' gutter={0} align='stretch'>
          <Grid.Col span={12}>
            <div style={{ backgroundImage: `url("${fondSensor189_1}")` }}
              className='w-full bg-cover h-full bg-center flex justify-end items-end'>
              <Text color='white' className='bg-blue-950 bg-opacity-50 p-2' >Pharmacie rue ministre (SMART189)</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondSensor189_2}")`}} className='w-full bg-cover h-full'></div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundImage: `url("${fondSensor189_3}")`}} className='w-full bg-cover h-full'></div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>

  </div>
}

const Map = () => {

  let mapZoom: number = 11
  let mapCenter: [number, number] = [5.32, -4]

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

  return <MapContainer zoom={mapZoom} center={mapCenter} scrollWheelZoom={false} style={{ height: "70vh", padding: 0 }}>
    <MapComponent />
  </MapContainer>
}

const Contacts = () => {
  return (
    <div className="p-10 bg-gray-900 bg-blend-multiply bg-opacity-80" style={{ backgroundImage: `url("${fondPollution}")` }}>
      <Grid justify="center" align="center">
        <Grid.Col span={3}>
          <Text c={"dark"} fz={35} opacity={0.9} className="font-extrabold text-gray-50">Devenez partenaire</Text>
          <Stack mt={20} spacing={15}>
            <label htmlFor="nom" className="text-white">Nom et prenoms</label>
            <input id="nom" className="bg-gray-500 p-3 text-lg outline-0 text-white" />
            <label htmlFor="entreprise" className="text-white">Entreprise</label>
            <input id="entreprise" className="bg-gray-500 p-3 text-lg outline-0 text-white" />
            {/* <label htmlFor="message" className="text-white">Message</label>
            <textarea id="message" className="bg-gray-500 p-3 text-lg outline-0 text-white" /> */}
          </Stack>
          <Button fullWidth rightIcon={<IconSend />} radius={0} size="lg" className="bg-red-700" mt={50}>Soumettre</Button>
        </Grid.Col>
        <Grid.Col offset={1} span={3} >
          <Stack spacing={30}>
            <Text fz={"lg"} c={"white"}><b>Telephone</b> : +33 6 76 38 64 12</Text>
            <Text fz={"lg"} c={"white"}><b>Mail</b> : lucas.thommen@data354.co</Text>
            <Text fz={"lg"} c={"white"}><b>Adresse</b> : Cocody, Riviera Boulevard Y4</Text>
            <Group spacing={50}>
              <Avatar alt="logo facebook" src={iconFace} />
              <Avatar alt="logo twitter" src={iconTwitter} />
              <Avatar alt="logo instagram" src={iconInsta} />
              <Avatar alt="logo youtube" src={iconYoutube} />
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  )
}

const AppFooter = () => {
  return (
    <Stack p={5} align="center" className="bg-gray-700 p-5">
      <Text size="sm" c="white"> {`Designed & built by Data354, 2023 CIV 🇨🇮`} - {`All rights reserved`}
      </Text>
    </Stack>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Banner />
      <PollutioDescription />
      <Projects />
      <Map />
      <Contacts />
      <AppFooter />
    </>

  );
}

export default App;
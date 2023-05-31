import 'leaflet/dist/leaflet.css'
import { Avatar, Button, Center, Flex, Grid, Group, Input, Paper, Stack, Text, TextInput, Textarea } from "@mantine/core";
import logo from "./assets/logo.jpeg"
import fondPollution from "./assets/pollution.jpg"
import iconFace from "./assets/face.png"
import iconInsta from "./assets/insta.webp"
import iconYoutube from "./assets/youtube.webp"
import iconTwitter from "./assets/twitter.png"
import { IconPhoneCall, IconPlus, IconSend } from "@tabler/icons-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const Header = () => {
  return <div id="header" className="z-50 h-20 px-5 flex items-center bg-gray-800 text-white">
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
  return <div style={{ backgroundImage: `url("${fondPollution}")` }} id="banner" className="h-screen bg-blend-multiply bg-black bg-opacity-20 p-36">
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
        <Paper shadow="lg" p={0} opacity={0.85}>
          <Stack className="bg-green-500" p={20} >
            <Text fz={30} >🥵😊😟😷</Text>
          </Stack>
          <Stack p={60}></Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  </div>
}

const Map = () => {


  let mapZoom: number = 11
  let mapCenter: [number, number] = [5.32, -4]

  function MapComponent() {

  //  const map = useMap()

    return (
      <TileLayer
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />)
  }


  return <MapContainer zoom={mapZoom} center={mapCenter} scrollWheelZoom={false} style={{ height: "50vh", padding: 0 }}>
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

const Projects = () => {
  return <div id="projects" className="p-32 bg-white">
    <Text fw={1000} fz={80} color="dark" >Notre projet</Text>
    <Grid justify="center">
      <Grid.Col span={4}>

      </Grid.Col>
      <Grid.Col span={4}>
        <Text fz={20} align="justify">
          Pour faire face à la pollution de l’air et à ses dangers, data354 a mis au point le projet AQ54. 
          L’objectif du projet : déployer un réseau de capteurs de qualité de l’air à travers toute la ville d’Abidjan, 
          en nombre suffisant pour mettre au point une réelle cartographie de la pollution de l’air dans la ville. 
          Notre plus-value : gérer efficacement la collecte des données qui proviendront des capteurs, les analyser, 
          les afficher et les partager de manière ouverte et en temps réel, avec tous les acteurs concernés : 
          les politiques et législateurs, entreprises, organisations non-gouvernementales, et bien sûr les citoyens. 
          
          De plus en plus d’autres villes africaines (Nairobi, Accra, Addis Abbaba… sources) se dotent de tels réseaux de capteurs. 
          Le but de ce projet, c’est de doter Abidjan d’une infrastructure moderne pour piloter sa qualité d’air - comme la ville a 
          pu s’y engager dans le cadre du C40 Cities (source).
          Nous sommes convaincus que cela permettra d’accélérer non seulement la prise de conscience, mais aussi l’engagement citoyen,
            privé et public, en termes d’actions, de mesures et de législations, dans la lutte contre la pollution de l’air.
        </Text>
      </Grid.Col>
    </Grid>
  </div>
}

const App = () => {
  return (
    <>
      <Header />
      <Banner />
      <Projects />
      <Map />
      <Contacts />
      <AppFooter />
    </>

  );
}

export default App;
import { Avatar, Button, Center, Flex, Grid, Group, Input, Paper, Stack, Text, TextInput, Textarea } from "@mantine/core";
import logo from "./assets/logo.jpeg"
import fondPollution from "./assets/pollution.jpg"
import iconFace from "./assets/face.png"
import iconInsta from "./assets/insta.webp"
import iconYoutube from "./assets/youtube.webp"
import iconTwitter from "./assets/twitter.png"
import { IconPhoneCall, IconSend } from "@tabler/icons-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

const Header = () => {
  return <div id="header" className="z-50 h-20 px-5 flex items-center sticky top-0 bg-white">
    <Grid className="w-full" align="center">
      <Grid.Col span={3}>
        <Group>
          <Avatar radius={"md"} src={logo} size={"lg"} alt="Data354 Logo" />
          <Text fw={700} fz="lg">AQ54</Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={9} >
        <Flex gap={50} align={"center"} justify={"end"}>
          <Text fw={600} className="cursor-pointer hover:text-red-800">Qualité de l'air</Text>
          <Text fw={600} className="cursor-pointer hover:text-red-800">Projet AQ54</Text>
          <Text fw={600} className="cursor-pointer hover:text-red-800">Données</Text>
          <Button leftIcon={<IconPhoneCall />} size="md" radius={0} className="bg-red-700 hover:bg-red-800">Contactez-nous</Button>
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
        <Button radius={0} size="lg" className="bg-red-700" mt={50}>En savoir plus</Button>
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


  let zoom: number = 18
  let mapCenter: [number, number] = [0, 0]

  function MapComponent() {

    // const map = useMap()

    // map.setViewer(mapCenter)
    // map.setZoom(zoom)


    return (
      <TileLayer
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />)
  }


  return <MapContainer style={{ height: "50vh", padding: 0 }}>
    <MapComponent />
  </MapContainer>
}

const Contacts = () => {
  return (
    <div className="p-10 bg-gray-900 bg-blend-multiply bg-opacity-80" style={{ backgroundImage: `url("${fondPollution}")` }}>
      <Grid justify="center" align="center">
        {/* <Grid.Col span={2}>
          <Group>
            <Avatar radius={0} src={logo} size={"lg"} alt="Data354 Logo" />
            <Text fw={1000} color="white" fz="xl">AQ54</Text>
          </Group>
        </Grid.Col> */}
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

const Indicator = () => {
  return <div id="banner" className="h-36 bg-green-600">

  </div>
}

const App = () => {
  return (
    <>
      <Header />
      <Banner />
      <Map />
      <Contacts />
      <AppFooter />
    </>

  );
}

export default App;
import { Avatar, Button, Flex, Grid, Group, Text } from "@mantine/core";
import logo from "./assets/logo.jpeg"
import { IconPhoneCall } from "@tabler/icons-react";

const Header = () => {
  return <div className="h-20 px-5 flex items-center">
    <Grid className="w-full">
      <Grid.Col span={3}>
        <Group>
          <Avatar radius={"md"} src={logo} size={"lg"} alt="Data354 Logo" />
          <Text fw={700} fz="lg">AQ54</Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={9} >
        <Flex gap={50} align={"center"} justify={"end"}>
          <Text>Qualité de l'air</Text>
          <Text>Projet AQ54</Text>
          <Text>Données</Text>
          <Button leftIcon={<IconPhoneCall />} variant="filled" className="bg-red-700 hover:bg-red-800">Contactz-nous</Button>
        </Flex>
      </Grid.Col>
    </Grid>
  </div>
}

const App = () => {
  return (
    <>
      <Header />
    </>

  );
}

export default App;
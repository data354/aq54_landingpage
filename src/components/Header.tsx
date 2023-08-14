import { ActionIcon, Avatar, Button, Flex, Grid, Menu } from "@mantine/core"
import { IconExternalLink, IconMenu, IconPhoneCall } from "@tabler/icons-react"
import { SmoothScrolling } from "../pages/Home"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header(){

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
          <a href='https://viz.aq54.data354.com/' target='blank' className="hover:text-red-500 flex">Visualisation des données <IconExternalLink className='ml-2' /></a>
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
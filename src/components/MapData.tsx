import { useEffect, useState } from "react"
import * as d3 from "d3"
import prediction from "../data/predictions.json"
import { Button, CheckIcon, Group, Loader, Modal, MultiSelect, RangeSlider, SegmentedControl, Slider, TextInput, useMantineTheme } from "@mantine/core"
import { IconCheck, IconChevronRight, IconClock, IconMail, IconMapPinCode, IconPhone, IconUser, IconX } from "@tabler/icons-react"
import { MapDataRes } from "../data/aqi"
import sensors from "../data/sensors"
import { useForm } from "@mantine/form"
import axios from "axios"
import { notifications } from "@mantine/notifications"
import Map from "./Map"

export default function MapData() {

  const [data, setData] = useState<MapDataRes[]>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [mapType, setMapType] = useState<"sensor" | "city">("sensor")

  let colors = ['green', 'yellow', 'orange', 'red', 'purple', 'maroon']
  let PM25_breakpoints = [12, 36, 56, 151, 251, 501]
  let colorScale = d3.scaleLinear(PM25_breakpoints, colors)

  let pointsMap = prediction.map(pred => JSON.parse(pred.polygon))

  const projectionPolygon = d3.geoMercator().fitSize([800, 700], { type: "MultiLineString", coordinates: pointsMap })
  const projectionPoint = d3.geoMercator().fitSize([700, 700], { type: "MultiPoint", coordinates: sensors.map(sens => [sens.location.lng, sens.location.lat]) })
  const axisBottom = d3.axisBottom(d3.scaleLinear().domain([0, 500.5]).range([0, 600])).scale();
  const villes = prediction.map(pre => pre.location)


  const polygonPath = d3.line()
    .x(d => {
      let coordinates = projectionPolygon(d)
      if (!!coordinates) return coordinates[0]
      else return d[0]
    })
    .y(d => {
      let coordinates = projectionPolygon(d)
      if (!!coordinates) return coordinates[1]
      else return d[1]
    })

  function PointPosition(d: [number, number]): [number, number] {
    let projection = projectionPoint(d)
    if (!!projection) return projection
    else return [0, 0]
  }

  useEffect(() => {
    if (data) {
      let svg = d3.select("#mapData")
      svg.selectAll("path")
        .data(pointsMap)
        .enter()
        .append("g")
        .append("path")
        .attr("d", (d) => polygonPath(d) + "Z")
        .attr("fill", (_, index) => colorScale(data[index].pm2_5))
        .attr("fill-opacity", "0.5")
        .attr("stroke", "white")
        .append("title")
        .text((_, index) => `${data[index].location}(${data[index].pm2_5})`);

      svg.selectAll("circle")
        .data(sensors)
        .enter()
        .append("circle")
        .attr("cx", (d) => PointPosition([d.location.lng, d.location.lat])[0])
        .attr("cy", (d) => PointPosition([d.location.lng, d.location.lat])[1])
        .attr("fill", "black")
        .attr("c", "50")
        .attr("stroke", "white");

      svg
        .append("g")
        .attr("transform", "translate(50, 630)")
        .selectAll("rect")
        .data(PM25_breakpoints)
        .enter()
        .append("rect")
        .attr("fill", (d, i) => colorScale(d))
        .attr("height", "30")
        .attr("width", (d, i) => Number(axisBottom(d)) - (i === 0 ? 0 : Number(axisBottom(PM25_breakpoints[i - 1]))))
        .attr("opacity", "0.7")
        .attr("x", (d, i) => (i === 0 ? 0 : Number(axisBottom(PM25_breakpoints[i - 1]))))
        .attr("y", "15");

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 675)")
        .call(d3.axisBottom(axisBottom).tickValues(PM25_breakpoints));

    }

  }, [data, mapType])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_HOST}/user/map`)
      .then(async (response) => {
        let result = (await response.json())
        setData(result)
      })
      .catch(async (response) => { })

  }, [])

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      cities: []
    }
  })

  function alertRegister() {
    setOpenModal(false)
    setLoading(true)
    form.validate()


    notifications.show({
      loading: loading,
      title: "Envoie des données en cours ...",
      message: "Vos données inscription a bien été sauvegardée",
      id: "showmessage",
      autoClose: false,
    })
    axios.post(`${import.meta.env.VITE_API_HOST}/souscriptor`, { email: form.values.email, number: form.values.phone, name: form.values.name, cities: form.values.cities })
      .then(async ({ data }) => {
        setLoading(false);
        notifications.update({
          title: "Données enregistrée avec succès",
          message: "Votre inscription a bien été sauvegardée",
          id: "showmessage",
          icon: <CheckIcon />,
          color: "green"
        })
        form.reset()
      })
      .catch(async (response) => {
        setLoading(false)
        notifications.update({
          title: <b>Erreur</b>,
          message: "Une erreur est survenue pendant l'envoie de vos données. Verifier que le mail n'a pas déjà été utilisé.",
          id: "showmessage",
          color: "red",
          icon: <IconX />
        })
      })
  }

  return (
    <>
      <Modal
        overlayProps={{ opacity: 0, blur: 10 }}
        centered opened={openModal} onClose={() => setOpenModal(false)}
        title={<b>Confirmation</b>}
        style={{ zIndex: 10001 }}
      >
        <p className="leading-8">Veuillez confirmer votre inscription pour recevoir les informations sur la qualité de l'air à Abidjan</p>
        <Group position="right" mt={20}>
          <Button color="gray" variant="light" onClick={() => setOpenModal(false)}>Retour</Button>
          <Button loading={loading} loaderPosition="right" loaderProps={{ variant: "dots", color: "white", size: "sm" }} color="green" className="bg-green-600" onClick={() => alertRegister()}>Confirmer l'inscription</Button>
        </Group>
      </Modal>
      <div id="realTimeMap" className='p-10 md:p-28 bg-slate-200'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-slate-700'>La qualité de l'air à Abidjan</h2>
          <div className="mt-10">
            <SegmentedControl
              data={[
                { label: 'Vue par capteur', value: 'sensor' },
                { label: 'Vue par commune', value: 'city', disabled: true },
              ]}
              onChange={(value: "sensor" | "city") => setMapType(value)}
            />
          </div>
          <div className="flex mt-5 space-x-20">
            {
              mapType === "sensor" ?
                <Map />
                :
                <>
                  <p className='text-slate-500 lg:text-2xl sm:text-xl'>Il y a six jours</p>
                  <svg className="mx-auto" id="mapData" width="800" height="700"></svg>
                </>
            }
            <div className="flex-1  flex flex-col justify-between">
              <p className="leading-8 text-left text-xl">Inscrivez-vous pour être informé sur la qualité de l'air à Abidjan. Vous serez alerté lorsque le taux de PM2.5 dans l'air exedera 30 µg/m³.</p>
              <TextInput required label="Nom et prenoms" {...form.getInputProps("name")} icon={<IconUser />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Nom et Prenoms" />
              <TextInput required label="Email" {...form.getInputProps("email")} icon={<IconMail />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Email" />
              <TextInput required label="Tel" {...form.getInputProps("phone")} icon={<IconPhone />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Numero de telephone" />
              <MultiSelect required label="Selectionnez des communes" {...form.getInputProps("cities")} data={villes} icon={<IconMapPinCode />} style={{ zIndex: 0 }} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Selectionnez des communes" />
              <Button type="submit" onClick={() => setOpenModal(true)} rightIcon={<IconChevronRight />} className="bg-slate-700 hover:bg-slate-900" size="lg">Inscrivez-vous</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
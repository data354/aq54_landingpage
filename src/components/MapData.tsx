import { useEffect, useState } from "react"
import * as d3 from "d3"
import prediction from "../data/predictions.json"
import { Button, CheckIcon, Group, Modal, MultiSelect, SegmentedControl, TextInput } from "@mantine/core"
import { IconMail, IconMapPinCode, IconPhone, IconUser, IconX } from "@tabler/icons-react"
import { MapDataRes } from "../data/aqi"
import { useForm } from "@mantine/form"
import axios from "axios"
import { notifications } from "@mantine/notifications"
import Map from "./Map"
import moment from "moment"
import _ from "lodash"

export default function MapData() {
  function getProjectionWidth(width: number): number {
    if (width < 1024) return width
    else if (width >= 1024 && width < 1280) return 500
    else if (width >= 1280 && width < 1536) return 650
    else if (width >= 1536) return 800
    else return width
  }

  const [data, setData] = useState<MapDataRes[]>()
  const [date, setDate] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [mapType, setMapType] = useState<"sensor" | "city">("sensor")

  let colors = ['green', 'yellow', 'orange', 'red', 'purple', 'maroon']
  let PM25_breakpoints = [12, 36, 56, 151, 251, 501]
  let colorScale = d3.scaleLinear(PM25_breakpoints, colors)

  let pointsMap = prediction.map(pred => JSON.parse(pred.polygon))
  let projestWidth = getProjectionWidth(window.innerWidth)

  const projectionPolygon = d3.geoMercator().fitSize([projestWidth, 700], { type: "MultiLineString", coordinates: pointsMap })
  const axisBottom = d3.axisBottom(d3.scaleLinear().domain([0, 500.5]).range([0, projestWidth - 20])).scale();
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

      svg
        .append("g")
        .attr("transform", `translate(10, 630)`)
        .selectAll("rect")
        .data(PM25_breakpoints)
        .enter()
        .append("rect")
        .attr("fill", (d, i) => colorScale(d))
        .attr("height", "10")
        .attr("width", (d, i) => Number(axisBottom(d)) - (i === 0 ? 0 : Number(axisBottom(PM25_breakpoints[i - 1]))))
        .attr("opacity", "0.7")
        .attr("x", (d, i) => (i === 0 ? 0 : Number(axisBottom(PM25_breakpoints[i - 1]))))
        .attr("y", "35");

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(10, 675)")
        .call(d3.axisBottom(axisBottom).tickValues(PM25_breakpoints));
    }

  }, [data, mapType])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_HOST}/user/map`)
      .then(async (response) => {
        let result = _.sortBy((await response.json()), "location")
        setData(result)
        setDate(result[0].date)
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
                { label: 'Vue par commune', value: 'city' },
              ]}
              onChange={(value: "sensor" | "city") => setMapType(value)}
            />
          </div>
          <div className="flex space-y-10 flex-col lg:flex-row lg:space-x-20 mt-5">
            {
              mapType === "sensor" ?
                <div className="space-y-5">
                  <p>Date de mise à jour : {moment().subtract(1, "hours").format("YYYY-MM-DD HH:00")}</p>
                  <Map />
                </div>
                :
                <div>
                  <p>Date de mise à jour : {date}</p>
                  <svg id="mapData" className="w-full lg:w-[500px] xl:w-[650px] 2xl:w-[800px]" height="700"></svg>
                </div>
            }
            <form className="flex flex-col space-y-5"
              onSubmit={form.onSubmit((values) => { setOpenModal(true) })}
            >
              <p className="leading-8 text-left text-xl">Inscrivez-vous pour être informé sur la qualité de l'air à Abidjan. Vous serez alerté lorsque le taux de PM2.5 dans l'air excédera 30 µg/m³.</p>
              <TextInput required label="Nom et prenoms" {...form.getInputProps("name")} icon={<IconUser />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Nom et Prenoms" />
              <TextInput type="email" required label="Email" {...form.getInputProps("email")} icon={<IconMail />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Email" />
              <TextInput required label="Tel" {...form.getInputProps("phone")} icon={<IconPhone />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Numero de telephone" />
              <MultiSelect required label="Selectionnez des communes" {...form.getInputProps("cities")} data={villes} icon={<IconMapPinCode />} style={{ zIndex: 0 }} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Selectionnez des communes" />
              <button type="submit" className="bg-slate-700 hover:bg-slate-900 text-white p-5">Inscrivez-vous </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
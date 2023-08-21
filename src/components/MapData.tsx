import { useEffect, useState } from "react"
import * as d3 from "d3"
import prediction from "../data/predictions.json"
import { Button, CheckIcon, Group, Loader, Modal, RangeSlider, Slider, TextInput, useMantineTheme } from "@mantine/core"
import { IconCheck, IconChevronRight, IconClock, IconMail, IconPhone, IconUser, IconX } from "@tabler/icons-react"
import { MapDataRes } from "../data/aqi"
import sensors from "../data/sensors"
import { useForm } from "@mantine/form"
import axios from "axios"
import { notifications } from "@mantine/notifications"

export default function MapData() {

  const [data, setData] = useState<MapDataRes[]>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  let colors = d3.schemeAccent // ['green', 'yellow', 'orange', 'red', 'purple', 'maroon']
  let PM25_breakpoints = [12, 36, 56, 151, 251, 501]
  let colorScale = d3.scaleLinear(PM25_breakpoints, colors)

  let pointsMap = prediction.map(pred => JSON.parse(pred.polygon))

  const projectionPolygon = d3.geoMercator().fitSize([700, 700], { type: "MultiLineString", coordinates: pointsMap })
  const projectionPoint = d3.geoMercator().fitSize([700, 700], { type: "MultiPoint", coordinates: sensors.map(sens => [sens.location.lng, sens.location.lat]) })
  const axisBottom = d3.axisBottom(d3.scaleLinear().domain([0, 500.5]).range([0, 600])).scale();

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

  }, [data])

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
      rangePm: [50, 500]
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
    axios.post(`${import.meta.env.VITE_API_HOST}/souscriptor`, { email: form.values.email, number: form.values.phone, name: form.values.name, minPm: form.values.rangePm[0], maxPm: form.values.rangePm[1] })
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
        title={<b>Confirmation</b>}>
        <p className="leading-8">Veuillez confirmer votre inscription à la newletters pour recevoir les informations sur la qualité de l'air à Abidjan</p>
        <Group position="right" mt={20}>
          <Button color="gray" variant="light" onClick={() => setOpenModal(false)}>Retour</Button>
          <Button loading={loading} loaderPosition="right" loaderProps={{ variant: "dots", color: "white", size: "sm" }} color="green" className="bg-green-600" onClick={() => alertRegister()}>Confirmer l'inscription</Button>
        </Group>
      </Modal>
      <div id="realTimeMap" className='p-10 md:p-28 bg-slate-200'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-slate-700'>La qualité de l'air à Abidjan</h2>
          <p className='text-slate-500 lg:text-2xl sm:text-xl'>Il y a six jours</p>
          <div className="flex">
            <svg className="mx-auto" id="mapData" width="800" height="700"></svg>
            <div className="flex-1 md:p-20  flex flex-col">
              <div className="space-y-5">
                <p className="leading-8 text-left">Inscrivez-vous et recevez quotidiennement des alertes sur la qualité de l'air à Abidjan</p>
                <TextInput {...form.getInputProps("name")} icon={<IconUser />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Nom et Prenoms" />
                <TextInput {...form.getInputProps("email")} icon={<IconMail />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Email" />
                <TextInput {...form.getInputProps("phone")} icon={<IconPhone />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Numero de telephone" />
                <p className="leading-8">Veuillez selectionner l'intervalle à partir duquel vous souhaitez etre informé</p>
                <RangeSlider
                  color="gray"
                  max={500}
                  {...form.getInputProps("rangePm")}
                  marks={[
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                    { value: 150, label: '150' },
                    { value: 200, label: '200' },
                    { value: 300, label: '300' },
                    { value: 500, label: '500' },
                  ]}
                />
              </div>
              <Button onClick={() => setOpenModal(true)} rightIcon={<IconChevronRight />} className="bg-slate-600 hover:bg-slate-700 mt-16" size="lg">Envoyez vos données</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
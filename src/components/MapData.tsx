import { useEffect, useState } from "react"
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
import Heatmap from "./Heatmap"

export default function MapData(props: Readonly<{ locations: any }>) {
  const [data, setData] = useState<MapDataRes[]>()
  const [date, setDate] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [mapType, setMapType] = useState<"sensor" | "city">("sensor")
  const villes = prediction.map(pre => pre.location)

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
                  <Heatmap
                    className="w-full h-[700px] lg:w-[500px] xl:w-[650px] 2xl:w-[800px]"
                    //@ts-ignore
                    locations={props.locations}
                    tileUrl={import.meta.env.VITE_OPEN_STREET_TILE_URL}
                    data={data ?? []}
                    mapOptions={{
                      center: [5.3484501, -3.979665],
                      zoom: 10.5
                    }}
                    scaleOptions={{
                      grades: [0, 50, 100, 150, 200, 300],
                      labels: [],
                      colors: ['green', 'yellow', 'orange', 'red', 'purple', 'maroon'],
                    }}
                    cacheStorageKey={import.meta.env.VITE_AQ_MAP_CACHE_STORAGE_KEY}
                  />
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
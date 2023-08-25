import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet"
import sensors from "../data/sensors"
import { Text } from "@mantine/core"
import { getIcon } from "../functions/getIcon"
import { useEffect, useState } from "react"
import moment from "moment"
export default function Map() {

  let mapZoom: number = 16
  let mapCenter: [number, number] = [5.3679, -3.959]

  const [sensors_values, set_sensors_values] = useState<[number, number]>([0, 0])
  const [sensors_date, set_sensors_date] = useState<string>("")

  function getSensorsValues() {
    fetch(`${import.meta.env.VITE_API_HOST}/user/stationData/byday/${moment().format("YYYY-MM-DD")}`)
      .then(async (response) => {
        let result = (await response.json())
        let length = new Date().getHours() - 1
        let data: [number, number] = [result["SMART188"]["PM2_5"].data[length].y, result["SMART189"]["PM2_5"].data[length].y]
        set_sensors_values(data)
        set_sensors_date(result["SMART188"]["PM2_5"].data[length].x)
      })
      .catch(async (response) => { })
  }

  useEffect(() => {
    getSensorsValues()
  }, [])

  function MapComponent() {
    return (
      <>
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {sensors.map((sensor, index: number) => <Marker key={index} position={{ lat: sensor.location.lat, lng: sensor.location.lng }} icon={getIcon(15)}>
          <Tooltip className="p-0">
            <img src={sensor.picture} alt="" />
            <div className="flex flex-col p-2">
              <Text>{sensor.name}</Text>
              <Text>{sensor.emplacement}</Text>
              <Text size={"xs"} color='dimmed'>{sensor.description}</Text>
              <Text>PM2.5 : {sensors_values[index]} µg/m³</Text>
            </div>
          </Tooltip>
        </Marker>)}
      </>
    )
  }

  return <MapContainer style={{ height: 600, zIndex: 0 }} className='p-0 w-full lg:w-[500px] xl:w-[650px] 2xl:w-[800px]' zoom={mapZoom} center={mapCenter} >
    <MapComponent />
  </MapContainer>
}
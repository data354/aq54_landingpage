import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet"
import { Text } from "@mantine/core"
import { getIcon } from "../functions/getIcon"
import { useEffect, useState, useTransition } from "react"
import { getSensors, Sensor } from "../data/sensors"
import { AirQualityByDay, getAirQualityAverageDayData } from "../data/aq-data"
import { Loader } from "@mantine/core"
export default function Map() {

  let mapZoom: number = 16
  let mapCenter: [number, number] = [5.3679, -3.959]

  const [sensors, setSensors] = useState<{ data: (Sensor & AirQualityByDay)[], count: number }>({ data: [], count: 0 })
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    startTransition(() => {
      getSensors().then((sensors) => {
        getAirQualityAverageDayData({
          date: new Date(),
          sensorName: sensors.data[0].name,
        }).then((data) => {
          setSensors({ data: sensors.data.map((sensor) => ({ ...sensor, ...data })), count: sensors.count });
        });
      });
    });
  }, []);



  function MapComponent() {
    return (

      <>
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {sensors.data.map((sensor, index: number) => <Marker key={index} position={{ lat: sensor.location.lat, lng: sensor.location.lng }} icon={getIcon(15)}>
          <Tooltip className="p-0">
            <img src={sensor.picture} alt="" />
            <div className="flex flex-col p-2">
              <Text>{sensor.name}</Text>
              <Text>{sensor.emplacement}</Text>
              <Text size={"xs"} color='dimmed'>{sensor.description}</Text>
              <Text>PM2.5 : {sensor.particulateMatter2_5} µg/m³</Text>
            </div>
          </Tooltip>
        </Marker>)}
      </>
    )
  }

  return isPending ? <Loader className="h-full w-full flex justify-center items-center" /> : <MapContainer style={{ height: 600, zIndex: 0 }} className='p-0 w-full lg:w-[500px] xl:w-[650px] 2xl:w-[800px]' zoom={mapZoom} center={mapCenter} >
    <MapComponent />
  </MapContainer>
}

import { useEffect, useMemo, useState } from "react"
import { MapContainer, Marker, TileLayer, Tooltip, CircleMarker, Popup } from "react-leaflet"
import { getSensors, type Sensor } from "../data/sensors"
import { type AirQualityByDay, getAirQualityAverageDayData } from "../data/aq-data"
import { getIcon } from "../functions/getIcon"
import { Alert, Loader, Text } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import defaultPicture from "../assets/sensor.jpg"
type SensorWithAQ = Sensor & AirQualityByDay

export default function Map() {
  const [sensors, setSensors] = useState<{ data: SensorWithAQ[]; count: number }>({ data: [], count: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Calculate map center based on sensor locations
  const mapCenter = useMemo(() => {
    if (sensors.count === 0) return [5.3679, -3.959] as [number, number] // Default center

    const centerLat = sensors.data.reduce((sum, station) => sum + station.location.lat, 0) / sensors.count
    const centerLng = sensors.data.reduce((sum, station) => sum + station.location.lng, 0) / sensors.count

    return [centerLat, centerLng] as [number, number]
  }, [sensors.data, sensors.count])

  // Group sensors by location to avoid overlapping markers
  const stationGroups = useMemo(() => {
    return sensors.data.reduce(
      (groups, station) => {
        const key = `${station.location.lat},${station.location.lng}`
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(station)
        return groups
      },
      {} as Record<string, SensorWithAQ[]>,
    )
  }, [sensors.data])

  // Fetch sensor data and air quality data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const sensorsData = await getSensors()

        if (sensorsData.data.length === 0) {
          setError("No sensor data available")
          setIsLoading(false)
          return
        }

        // Fetch air quality data for all sensors in parallel
        const aqPromises = sensorsData.data.map(
          (sensor) =>
            getAirQualityAverageDayData({
              date: new Date(),
              sensorName: sensor.name,
            }).catch(() => null), // Handle individual sensor data failure
        )

        const aqDataResults = await Promise.all(aqPromises)

        // Combine sensor data with air quality data
        const combinedData = sensorsData.data.map((sensor, index) => ({
          ...sensor,
          ...(aqDataResults[index] || {}), // Use empty object if AQ data fetch failed
        }))

        setSensors({
          data: combinedData as SensorWithAQ[],
          count: sensorsData.count,
        })
      } catch (err) {
        setError("Failed to load sensor data. Please try again later.")
        console.error("Error fetching sensor data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="h-[600px] w-full flex justify-center items-center bg-gray-50">
        <Loader className="h-8 w-8" />
        <span className="ml-2 text-muted-foreground">Loading sensor data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[600px] w-full flex justify-center items-center">
        <Alert variant="destructive" className="max-w-md">
          <IconAlertCircle className="h-4 w-4" />
          <Text>{error}</Text>
        </Alert>
      </div>
    )
  }

  return (
    <MapContainer
      style={{ height: 600 }}
      className="w-full lg:w-[500px] xl:w-[650px] 2xl:w-[800px]"
      zoom={14}
      center={mapCenter}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {Object.entries(stationGroups).map(([key, stations], index) => {
        const [lat, lng] = key.split(",").map(Number)

        // Single sensor at this location
        if (stations.length === 1) {
          const station = stations[0]
          return (
            <Marker key={`marker-${index}`} position={[lat, lng]} icon={getIcon(15)}>
              <Tooltip className="p-0 max-w-xs">
                {station.picture && (
                  <div className="w-full h-32 overflow-hidden">
                    <img
                      src={station.picture || defaultPicture}
                      alt={`${station.name} location`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col p-3">
                  <Text className="font-medium text-base">{station.name}</Text>
                  <Text className="text-sm">{station.emplacement}</Text>
                  <Text className="text-xs text-muted-foreground mt-1">{station.description}</Text>
                  <div className="mt-2 p-2 bg-primary/10 rounded-md">
                    <Text className="text-sm">
                      PM2.5: <span className="font-medium">{station.particulateMatter2_5 ?? "N/A"} µg/m³</span>
                    </Text>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          )
        }

        // Multiple sensors at this location - use a circle marker
        return (
          <CircleMarker
            key={`circle-${index}`}
            center={[lat, lng]}
            radius={15}
            pathOptions={{
              fillColor: "#3388ff",
              fillOpacity: 0.6,
              color: "#3388ff",
              weight: 1,
            }}
          >
            <Popup className="sensor-group-popup" maxWidth={300} minWidth={250}>
              <div className="flex flex-col p-2">
                <Text className="font-medium text-base">Group of {stations.length} sensors</Text>
                <div className="mt-2 space-y-3 max-h-[300px] overflow-y-auto">
                  {stations.map((station, i) => (
                    <div className="flex gap-2">
                      <div className="w-10 h-10 overflow-hidden rounded-md">
                        <img src={station.picture || defaultPicture} alt={`${station.name} location`} className="w-full h-full object-cover" />
                      </div>
                      <div key={i} className="p-2 border-b last:border-b-0">
                        <Text className="font-medium">{station.name}</Text>
                        <Text className="text-xs text-muted-foreground">{station.description}</Text>
                        <Text className="text-sm mt-1">
                          PM2.5:{" "}
                          <span className="font-medium">
                            {station.particulateMatter2_5 ?? "N/A"} µg/m³
                          </span>
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}


import fondSmart188 from "../assets/sensor188_3.jpeg";
import fondSmart189 from "../assets/sensor189_2.jpeg";
import defaultSensor from "../assets/sensor.jpg";
import { api } from "../lib/api-client";

export type Sensor = {
  name: string;
  emplacement: string;
  description: string;
  picture: string;
  location: {
    lat: number;
    lng: number;
  };
};

const defaultSensors = [
  {
    name: "SMART188",
    emplacement: "Pharmarcie du Bonheur",
    description: "Pres d'une rue bitumée",
    picture: fondSmart188,
  },
  {
    name: "SMART189",
    emplacement: "Pharmarcie Ministre",
    description: "Près d'une rue non bitumée",
    picture: fondSmart189,
  },
];

export const getSensors = async (): Promise<{
  data: Sensor[];
  count: number;
}> => {
  const sensors = await api.get<Record<string, string>[]>(`/getStations`);
  const data = sensors.map((sensor) => ({
    name: sensor.station_name,
    emplacement:
      defaultSensors.find((s) => s.name === sensor.station_name)?.emplacement ||
      "Université de Cocody",
    description:
      defaultSensors.find((s) => s.name === sensor.station_name)?.description ||
      "Près d'une rue bitumée",
    picture:
      defaultSensors.find((s) => s.name === sensor.station_name)?.picture ||
      defaultSensor,
    location: {
      lat: parseFloat(sensor.latitude),
      lng: parseFloat(sensor.longitude),
    },
  }));

  return {
    data,
    count: data.length,
  };
};

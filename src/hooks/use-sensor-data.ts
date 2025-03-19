import { useState, useEffect } from "react";
import { getSensors, type Sensor } from "../data/sensors";
import {
  type AirQualityByDay,
  getAirQualityAverageDayData,
} from "../data/aq-data";

export type SensorWithAQ = Sensor & AirQualityByDay;

export interface SensorDataState {
  data: SensorWithAQ[];
  count: number;
  isLoading: boolean;
  error: string | null;
}

export function useSensorData() {
  const [state, setState] = useState<SensorDataState>({
    data: [],
    count: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensorsData = await getSensors();

        if (sensorsData.data.length === 0) {
          setState({
            data: [],
            count: 0,
            isLoading: false,
            error: "No sensor data available",
          });
          return;
        }

        // Fetch air quality data for all sensors in parallel
        const aqPromises = sensorsData.data.map((sensor) =>
          getAirQualityAverageDayData({
            date: new Date(),
            sensorName: sensor.name,
          }).catch(() => null)
        );

        const aqDataResults = await Promise.all(aqPromises);

        // Combine sensor data with air quality data
        const combinedData = sensorsData.data.map((sensor, index) => ({
          ...sensor,
          ...(aqDataResults[index] || {}),
        }));

        setState({
          data: combinedData as SensorWithAQ[],
          count: sensorsData.count,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load sensor data. Please try again later.",
        }));
        console.error("Error fetching sensor data:", err);
      }
    };

    fetchData();
  }, []);

  return state;
}

import dayjs from "dayjs";
import { api } from "../lib/api-client";
type GetAirQualityDayDataByHoursProps = {
  date: Date;
  sensorName: string;
};

/**
 * Interface représentant une mesure de la qualité de l'air.
 */
export interface AirQuality {
  /**
   * Horodatage du relevé (format ISO 8601 : "YYYY-MM-DD HH:mm:ss").
   */
  timestamp: string;

  /**
   * Concentration en monoxyde de carbone (CO) dans l'air.
   * Un gaz toxique issu des combustions incomplètes (voitures, chauffage, etc.).
   * Unité : µg/m³.
   */
  carbonMonoxide: number;

  /**
   * Concentration en dioxyde d'azote (NO2).
   * Principalement émis par le trafic routier et l'industrie.
   * Peut provoquer des irritations et affecter les voies respiratoires.
   * Unité : µg/m³.
   */
  nitrogenDioxide: number;

  /**
   * Concentration en ozone troposphérique (O3).
   * Polluant secondaire formé sous l'effet du soleil.
   * Peut être irritant pour les yeux et les poumons.
   * Unité : µg/m³.
   */
  ozone: number;

  /**
   * Concentration de particules fines de diamètre ≤ 10 µm (PM10).
   * Peut pénétrer dans les voies respiratoires et causer des problèmes de santé.
   * Unité : µg/m³.
   */
  particulateMatter10: number;

  /**
   * Concentration de particules ultrafines de diamètre ≤ 2.5 µm (PM2.5).
   * Plus dangereuses que PM10 car elles peuvent entrer dans la circulation sanguine.
   * Unité : µg/m³.
   */
  particulateMatter2_5: number;

  /**
   * Humidité relative de l'air.
   * Peut influencer la dispersion des polluants et le confort thermique.
   * Unité : pourcentage (%).
   */
  humidity: number;

  /**
   * Température de l'air extérieur.
   * Influence la formation de polluants secondaires comme l'ozone.
   * Unité : degrés Celsius (°C).
   */
  temperatureOutdoor: number;

  /**
   * Température mesurée à l'intérieur.
   * Peut être utile pour surveiller le confort thermique des bâtiments.
   * Unité : degrés Celsius (°C).
   */
  temperatureIndoor?: number;
}

export interface AirQualityByHour extends AirQuality {
  hour: string;
  day: string;
}

export interface AirQualityByDay extends Omit<AirQuality, "timestamp"> {
  day: string;
}

export type SensorData = {
  CO: number;
  NO2: number;
  O3: number;
  PM10: number;
  PM2_5: number;
  RH: number;
  T: number;
  T_int?: number;
  timestamp: string;
};

export function airQualityDataMapper(data: SensorData): AirQuality {
  return {
    timestamp: data.timestamp,
    carbonMonoxide: data.CO,
    nitrogenDioxide: data.NO2,
    ozone: data.O3,
    particulateMatter10: data.PM10,
    particulateMatter2_5: data.PM2_5,
    humidity: data.RH,
    temperatureOutdoor: data.T,
    temperatureIndoor: data.T_int,
  };
}

export const getAirQualityDayDataByHours = async (
  params: GetAirQualityDayDataByHoursProps
): Promise<AirQualityByHour[]> => {
  try {
    const formatDate = dayjs(params.date).format("YYYY-MM-DD");
    const sensorData = await api.get<(SensorData | { message: string })[]>(
      `/${params.sensorName}/${formatDate}`
    );

    if (sensorData && "message" in sensorData[0]) {
      return [];
    }

    const airQualityData = (sensorData as SensorData[]).map((data) =>
      airQualityDataMapper(data)
    );

    return airQualityData.map((data) => {
      const [day, hour] = data.timestamp.split(" ");

      return {
        ...data,
        day,
        hour: hour.split(":")[0],
      };
    });
  } catch (error) {
    console.error(
      "Something failed when gettting air quality data by hours for ",
      params.sensorName
    );
    throw error;
  }
};

export const getAirQualityAverageDayData = async (
  params: GetAirQualityDayDataByHoursProps
): Promise<AirQualityByDay> => {
  const airQualityData = await getAirQualityDayDataByHours(params);

  const count = airQualityData.length;
  const defaultValue = {
    carbonMonoxide: 0,
    nitrogenDioxide: 0,
    ozone: 0,
    particulateMatter10: 0,
    particulateMatter2_5: 0,
    humidity: 0,
    temperatureOutdoor: 0,
    temperatureIndoor: 0,
  };
  if (count >= 1) {
    const aqSum = airQualityData.reduce((acc, data) => {
      const sum = {
        carbonMonoxide: acc.carbonMonoxide + data.carbonMonoxide,
        nitrogenDioxide: acc.nitrogenDioxide + data.nitrogenDioxide,
        ozone: acc.ozone + data.ozone,
        particulateMatter10: acc.particulateMatter10 + data.particulateMatter10,
        particulateMatter2_5:
          acc.particulateMatter2_5 + data.particulateMatter2_5,
        humidity: acc.humidity + data.humidity,
        temperatureOutdoor: acc.temperatureOutdoor + data.temperatureOutdoor,
        temperatureIndoor:
          acc.temperatureIndoor + (data.temperatureIndoor || 0),
      };

      return sum;
    }, defaultValue);

    const average = {
      carbonMonoxide: parseFloat((aqSum.carbonMonoxide / count).toFixed(2)),
      nitrogenDioxide: parseFloat((aqSum.nitrogenDioxide / count).toFixed(2)),
      ozone: parseFloat((aqSum.ozone / count).toFixed(2)),
      particulateMatter10: parseFloat(
        (aqSum.particulateMatter10 / count).toFixed(2)
      ),
      particulateMatter2_5: parseFloat(
        (aqSum.particulateMatter2_5 / count).toFixed(2)
      ),
      humidity: parseFloat((aqSum.humidity / count).toFixed(2)),
      temperatureOutdoor: parseFloat(
        (aqSum.temperatureOutdoor / count).toFixed(2)
      ),
      temperatureIndoor: parseFloat(
        (aqSum.temperatureIndoor / count).toFixed(2)
      ),
    };
    return {
      ...average,
      day: airQualityData[0].day,
    };
  } else {
    return {
      ...defaultValue,
      day: dayjs(params.date).format("YYYY-MM-DD"),
    };
  }
};

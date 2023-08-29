export interface AQIINFO {
  Most_Responsible_Pollutant: "PM2.5" | "PM10" | "NO2" | "CO" | "O3"
  Gravity: number
  AQI: number
  Recommendation: string
}

export interface PM_NOWCAST {
  Category: string
  Color: string
  Gravity: number
  PM2_5: number
  PM2_5_AQI_max: number
  PM2_5_AQI_min: number
  Recommendation: string
  max: number
  min: number
  timestamp: string
}

export interface MapDataRes {
  date: string
  location: string
  pm2_5: number
}

const indicators = {
  "PM2.5": { unit: "µg/m³", label: 'PM2_5' },
  PM10: { unit: "µg/m³", label: 'PM10' },
  NO2: { unit: "ppb", label: 'NO2' },
  CO: { unit: "ppm", label: 'CO' },
  O3: { unit: "ppm", label: 'O3' }
}

const aqiRanges = {
  NO2: [
    "0 < AQI < 50 Good",
    "0 < AQI < 50 Moderate",
    "0 < AQI < 50 Unhealthy for sensitive",
    "0 < AQI < 500 Unhealthy",
    "0 < AQI < 500 Very Unhealthy",
    "0 < AQI < 500 Hazardous",
  ],
  CO: [
    "0 < AQI < 50 Good",
    "0 < AQI < 50 Moderate",
    "0 < AQI < 50 Unhealthy for sensitive",
    "0 < AQI < 500 Unhealthy",
    "0 < AQI < 500 Very Unhealthy",
    "0 < AQI < 500 Hazardous",
  ],
  O3: [
    "0 < AQI < 50 Good",
    "0 < AQI < 50 Moderate",
    "0 < AQI < 50 Unhealthy for sensitive",
    "0 < AQI < 500 Unhealthy",
    "0 < AQI < 500 Very Unhealthy",
    "0 < AQI < 500 Hazardous",
  ],
  PM10: [
    "0 < AQI < 50 Good",
    "0 < AQI < 50 Moderate",
    "0 < AQI < 50 Unhealthy for sensitive",
    "0 < AQI < 500 Unhealthy",
    "0 < AQI < 500 Very Unhealthy",
    "0 < AQI < 500 Hazardous",
  ],
  "PM2.5": [
    "0 < AQI < 50 Good",
    "51 < AQI < 100 Moderate",
    "101 < AQI < 150 Unhealthy for sensitive",
    "151 < AQI < 200 Unhealthy",
    "201 < AQI < 300 Very Unhealthy",
    "301 < AQI < 500 Hazardous",
  ]
}

export default { aqiRanges, indicators }
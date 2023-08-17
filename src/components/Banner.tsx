import { useEffect, useState } from "react";
import aqi, { AQIINFO } from "../data/aqi";
import moment from "moment";
import { Button, HoverCard, Loader } from "@mantine/core";
import { SmoothScrolling } from "../pages/Home";
import { IconArrowDown } from "@tabler/icons-react";
import GaugeComponent from "react-gauge-component";

export default function Banner(){

  const [aqiInfo, setAqiInfo] = useState<AQIINFO>()
  const [sensorsValues, setSensorsValues] = useState()
  const [sensorsValuesLength, setSensorsValuesLength] = useState<number>(1)
  const [loading, setLoading] = useState(false)

  function getAQIs() {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_HOST}/user/stationAQI/byday/SMART189/${moment().format("YYYY-MM-DD")}`)
      .then(async (response) => {
        let result = (await response.json())[0]
        setLoading(false);
        setAqiInfo(result)
      })
      .catch(async (response) => { setLoading(false) })
  }

  function getCategory(aqi: number): string {
    switch (aqi) {
      case 1: return "Bon"
      case 2: return "Modéré"
      case 3: return "Mauvais pour la santé des personnes sensibles"
      case 4: return "Mauvais pour la santé"
      case 5: return "Tres Mauvais pour la santé"
      case 6: return "Dangereux";
    }

    return ""
  }

  function getSensorsValues() {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_HOST}/user/stationData/byday/${moment().format("YYYY-MM-DD")}`)
      .then(async (response) => {
        let result = (await response.json())
        setSensorsValues(result)
        setSensorsValuesLength(result["SMART189"]["CO"]["data"].length)
      })
      .catch(async (response) => { setLoading(false) })
  }

  useEffect(() => {
    getAQIs()
    getSensorsValues()
  }, [])

  return <div id="banner"
    className="bg-cover bg-slate-950 p-10 md:p-20 lg:p-36 lg:min-h-screen">
    <div className='text-white grid gap-5 grid-cols-2 lg:gap-20 xl:grid-cols-4'>
      <div id='infoTitle' className='col-span-2 '>
        <h2 className='text-4xl font-bold md:text-6xl lg:text-7xl'>L'Open data contre la pollution de l'air</h2>
        <p className='text-xl text-white lg:text-3xl my-5 lg:my-20 text-justify md:mt-10 font-extralight'>
          La pollution de l’air est un enjeu de premier rang pour la santé publique,
          le climat et la société. Aujourd’hui, il y a un manque cruel de données ouvertes
          sur la qualité de l’air en Côte d’Ivoire.
        </p>
        <Button onClick={() => SmoothScrolling('pollutionDescription')} rightIcon={<IconArrowDown />} radius={0} size='lg' className="btn-primary" mt={30}>En savoir plus</Button>
      </div>
      <div id='infoPopup' className='col-span-2 md:col-span-1 md:max-xl:col-start-2 xl:col-span-2 xl:-mb-96 xl:-mt-96'>
        <div className="sticky top-36 xl:max-w-md mx-auto">
          <div className='shadow-2xl bg-slate-950 bg-opacity-80 backdrop-blur border border-slate-900 border-opacity-10'>
            <div className="flex items-center justify-center">
              <p className='text-slate-100 p-3 text-center font-extralight flex-1'>Qualité de l'air à <b className='font-extrabold'>Abidjan</b></p>
              {loading && <Loader variant='dots' />}
            </div>
            <div className="p-5 ">
              {
                !!aqiInfo &&
                <>
                  <GaugeComponent
                    value={aqiInfo.AQI} maxValue={500} minValue={0} id="gauge-component1"
                    type="radial"
                    labels={{
                      markLabel: {
                        type: "inner",
                        marks: [
                          { value: 50 },
                          { value: 100 },
                          { value: 150 },
                          { value: 200 },
                          { value: 300 },
                          { value: 500 }
                        ]
                      }
                    }}
                    arc={{
                      colorArray: ['green', 'yellow', 'orange', 'red', 'purple', 'maroon'],
                      subArcs: [
                        { limit: 50, tooltip: { text: "Bon" } },
                        { limit: 100, tooltip: { text: "Moderée" } },
                        { limit: 150, tooltip: { text: "Mauvais pour la santé des groupes sensibles" } },
                        { limit: 200, tooltip: { text: "Mauvais pour la santé" } },
                        { limit: 300, tooltip: { text: "Très mauvais pour la santé" } },
                        { limit: 500, tooltip: { text: "Dangereux" } }
                      ],
                      padding: 0.05,
                      width: 0.05,
                    }}
                    pointer={{
                      elastic: true,
                      animationDelay: 0
                    }}
                  />
                  <p className="text-center text-gray-300">{getCategory(aqiInfo.Gravity)}</p>
                </>
              }
            </div>
            {
              !!aqiInfo && !!sensorsValues && <div className='p-2 flex justify-center text-center'><small className='text-slate-100'>La concentration actuelle en <b>{aqiInfo.Most_Responsible_Pollutant}</b> dans l'air est de <b>{Math.ceil(sensorsValues["SMART189"][aqi.indicators[aqiInfo.Most_Responsible_Pollutant].label]["data"][sensorsValuesLength - 1]["y"])}</b> {aqi.indicators[aqiInfo["Most_Responsible_Pollutant"]].unit} </small></div>
            }
          </div>
          <div className="bg-slate-950 bg-opacity-80 text-md backdrop-blur-xl p-2">
            {
              !!aqiInfo &&
              <HoverCard withArrow width={"target"} shadow="md">
                <HoverCard.Target>
                  <small className='line-clamp-1'>Recommandations :  {aqiInfo.Recommendation} </small>
                </HoverCard.Target>
                <HoverCard.Dropdown className='bg-slate-950 bg-opacity-80 text-md backdrop-blur-xl text-white border-none'>
                  <small>{aqiInfo.Recommendation}</small>
                </HoverCard.Dropdown>
              </HoverCard>
            }
          </div>
        </div>
      </div>
      <div id='bannerBottom' className="p-5 col-span-2"></div>
    </div>
  </div>
}
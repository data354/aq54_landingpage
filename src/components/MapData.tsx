import { useEffect } from "react"
import * as d3 from "d3"
import prediction from "../data/predictions.json"
import { Button, Modal, RangeSlider, Slider, TextInput, useMantineTheme } from "@mantine/core"
import { IconChevronRight, IconMail, IconPhone, IconUser } from "@tabler/icons-react"

export default function MapData() {
  useEffect(() => {

    let colors = ['green', 'yellow', 'orange', 'red', 'purple', 'maroon']
    let pointsMap = prediction.map(pred => JSON.parse(pred.polygon))

    const projection = d3.geoMercator().fitSize([800, 700], { type: "MultiLineString", coordinates: pointsMap })

    const polygonPath = d3.line()
      .x(d => {
        let coordinates = projection(d)
        if (!!coordinates) return coordinates[0]
        else return d[0]
      })
      .y(d => {
        let coordinates = projection(d)
        if (!!coordinates) return coordinates[1]
        else return d[1]
      })

    let svg = d3.select("#mapData")

    svg.selectAll("path")
      .data(pointsMap)
      .enter()
      .append("g")
      .attr("title", "Abidjan")
      .append("path")
      .attr("d", (d) => polygonPath(d) + "Z")
      .attr("fill", (_, index) => d3.schemeSpectral[11][index])
      // .attr("fill-opacity", "0.5")
      .attr("stroke", "white");

  }, [])

  const theme = useMantineTheme();

  return (
    <>
      {/* <Modal
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 6,
        }}
        centered opened={true} onClose={() => { }} title="Authentication">
        <p>Voulez vous</p>
      </Modal> */}
      <div id="realTimeMap" className='p-10 md:p-28 bg-slate-200'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-slate-700'>La qualité de l'air à Abidjan</h2>
          <p className='text-slate-500 lg:text-2xl sm:text-xl'>En temps réel</p>
          <div className="flex">
            <svg className="mx-auto" id="mapData" width="800" height="700"></svg>
            <div className="flex-1 p-20  flex flex-col">
              <div className="space-y-5">
                <p className="leading-8">Inscrivez vous et recevez chaque jour des alertes sur la qualité de l'air à Abidjan</p>
                <TextInput icon={<IconUser />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Nom et Prenoms" />
                <TextInput icon={<IconMail />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Email" />
                <TextInput icon={<IconPhone />} variant="filled" className="drop-shadow-sm" size="lg" placeholder="Numero de telephone" />
                <p className="leading-8">Veuillez selectionner l'intervalle à partir duquel vous souhaitez etre informé</p>
                <RangeSlider
                  color="gray"
                  max={500}
                  defaultValue={[50, 500]}
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
              <Button rightIcon={<IconChevronRight />} className="bg-slate-700 hover:bg-slate-800 mt-10" size="lg">Envoyez vos données</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
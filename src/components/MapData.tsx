import { useEffect } from "react"
import * as d3 from "d3"
import prediction from "../data/predictions.json"
import { Button, Slider, TextInput } from "@mantine/core"

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
      .attr("stroke-opacity", 0.7)
      .attr("stroke", "white");

  }, [])

  return <div id="realTimeMap" className='p-10 md:p-28 bg-slate-200'>
    <div className='max-w-7xl mx-auto'>
      <h2 className='text-slate-700'>La qualité de l'air à Abidjan</h2>
      <p className='text-slate-500 lg:text-2xl sm:text-xl'>En temps réel</p>
      <div className="flex">
        <svg className="mx-auto" id="mapData" width="800" height="700"></svg>
        <div className="flex-1 p-20 space-y-6 flex flex-col">
          <p className="leading-8">Inscrivez vous et recevez chaque jour les informations sur la qualitéde l'air à Abidjan</p>
          <TextInput variant="filled" className="border-none outline-none" size="lg" placeholder="Nom et Prenoms" />
          <TextInput variant="filled" size="lg" placeholder="Email" />
          <TextInput variant="filled" size="lg" placeholder="Numero de telephone" />
          <Slider
            marks={[
              { value: 20, label: '20%' },
              { value: 50, label: '50%' },
              { value: 80, label: '80%' },
            ]}
          />
          <Button className="bg-slate-900 hover:bg-slate-800 mt-10" size="lg">Enregistrez vos informations</Button>
        </div>
      </div>
    </div>
  </div>
}
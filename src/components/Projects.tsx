import { IconChartHistogram, IconCodeDots, IconTopologyStar3 } from "@tabler/icons-react";
import fondAq54 from "../assets/aq54Page.png"

export default function Projects() {
  return <div id="projects" className='bg-zinc-100 p-10 md:p-28 md:py-20 md:mb-80'>
    <div className='max-w-7xl mx-auto'>
      <h2 className='text-red-600'>Le projet AQ54</h2>
      <p className='text-slate-500 lg:text-2xl sm:text-xl'>Une ambition globale</p>
      <p className='text-lg text-slate-600 font-extralight sm:text-3xl text-center my-10'>Pour accélerer la lutte contre la pollution de l’air, le projet vise à :</p>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-7">
        <div className='bg-white p-8 flex flex-col items-center space-y-5'>
          <IconTopologyStar3 size={80} className='text-zinc-400' />
          <p className='text-center'> Doter Abidjan d’un <b>réseau de capteurs</b> afin de <b>cartographier la qualité de l’air</b> en temps réel.</p></div>
        <div className='bg-white p-8  flex flex-col items-center space-y-5'>
          <IconCodeDots size={80} className='text-red-400' />
          <p className='text-center'><b> Collecter, traiter, analyser</b> les données pour comprendre et agir contre la pollution aérienne.</p></div>
        <div className='bg-white p-8  flex flex-col items-center space-y-5'>
          <IconChartHistogram size={80} className='text-red-400' />
          <p className='text-center'> Développer une <b>plateforme de visualisation</b> des données et les <b>diffuser ouvertement</b>.</p></div>
      </div>
      <img className='mt-10 md:-mb-96 drop-shadow-lg' src={fondAq54} />
    </div>
  </div>
}
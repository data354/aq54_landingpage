import { IconChartHistogram, IconCodeDots, IconTopologyStar3 } from "@tabler/icons-react";

export default function Projects() {
  return <div id="projects" className='bg-slate-950 bg-blend-multiply bg-opacity-90 p-10 md:p-28 '>
    <div className='max-w-7xl mx-auto'>
      <h2 className='text-red-500'>Le projet AQ54</h2>
      <p className='text-slate-400 lg:text-2xl sm:text-xl'>Une ambition globale</p>
      <p className='text-lg text-slate-400 font-extralight sm:text-3xl text-center my-10'>Pour accélerer la lutte contre la pollution de l’air, le projet vise à :</p>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-7">
        <div className='bg-slate-900 p-8 flex flex-col items-center space-y-5 bg-opacity-60 backdrop-blur-3xl'>
          <IconTopologyStar3 size={80} className='text-zinc-400' />
          <p className='text-center text-zinc-300'> Doter Abidjan d’un <b>réseau de capteurs</b> afin de <b>cartographier la qualité de l’air</b> en temps réel.</p></div>
        <div className='bg-slate-900 p-8  flex flex-col items-center space-y-5 bg-opacity-60 backdrop-blur-3xl'>
          <IconCodeDots size={80} className='text-red-500' />
          <p className='text-center text-zinc-300'><b> Collecter, traiter, analyser</b> les données pour comprendre et agir contre la pollution aérienne.</p></div>
        <div className='bg-slate-900 p-8  flex flex-col items-center space-y-5 bg-opacity-60 backdrop-blur-3xl'>
          <IconChartHistogram size={80} className='text-red-500' />
          <p className='text-center text-zinc-300'> Développer une <b>plateforme de visualisation</b> des données et les <b>diffuser ouvertement</b>.</p></div>
      </div>
    </div>
  </div>
}
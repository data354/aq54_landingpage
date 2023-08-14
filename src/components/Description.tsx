import { useNavigate } from "react-router-dom"
import fondDechets from "../assets/dechets.jpeg"
import fondTraffic from "../assets/traffic.webp"
import fondUsine from "../assets/industrie.jpg"

export default function PollutioDescription(){
  const navigate = useNavigate()
  return <div id="pollutionDescription" className='p-10'>
    <div className="lg:py-20 max-w-7xl mx-auto">
      <h2 className='text-slate-700'>La qualité de l'air</h2>
      <p className='text-slate-500 lg:text-2xl sm:text-xl'>Un enjeu majeur</p>
      <div className="lg:mt-20 grid xl:grid-cols-3 gap-5 lg:gap-10">
        <p>
          Selon l’OMS, plus de 9 personnes sur 10 sur Terre respirent un air de mauvaise qualité. C’est particulièrement le cas dans les zones urbaines comme Abidjan, qui concentrent de nombreuses différentes sources émettrices de polluants. La pollution de l’air constitue en Côte d’Ivoire le deuxième facteur de risque de mortalité après la malnutrition. C’est également un grand enjeu climatique puisque les polluants atmosphériques à courte durée de vie accélèrent localement la hausse des températures.
          <a onClick={() => navigate("/article")} className='text-blue-500 hover:text-blue-600 cursor-pointer'>En savoir plus </a>
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:col-span-2 xl:gap-0">
          <div style={{ backgroundImage: `url("${fondTraffic}")` }}
            className='h-44 lg:h-80 xl:h-96 w-full bg-cover'>
            <div className="h-full flex justify-center items-end bg-gradient-to-t from-slate-500 from-5% to-transparent">
              <p className='
          text-white p-2 
          text-lg -tracking-tighter text-center font-extralight' >Trafic</p>
            </div>
          </div>
          <div style={{ backgroundImage: `url("${fondUsine}")` }}
            className='h-44 lg:h-80 xl:h-96  bg-cover picture-animated drop-shadow-2xl '>
            {/* <p className=' text-white p-2 text-lg -tracking-tighter text-center font-extralight' >Trafic</p> */}
          </div>
          <div style={{ backgroundImage: `url("${fondDechets}")` }}
            className={`h-44 lg:h-80 xl:h-96 w-full bg-cover`}>
            <div className="h-full flex justify-center items-end bg-gradient-to-t from-zinc-500 from-5% to-transparent">
              <p className='
          text-white p-2 
          text-lg -tracking-tighter text-center font-extralight' >Incinération de déchets</p>
            </div>
          </div>
          <p className='text-center text-md mt-5 col-span-full'>Sources urbaines de pollution de l'air </p>
        </div>
      </div>
    </div>
  </div>
}

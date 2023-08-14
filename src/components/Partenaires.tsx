import logoAirqino from "../assets/airqino.png"
import logoMinedd from "../assets/minedd.jpg"
import logoDiis from "../assets/diis.png"

export default function Partenaires(){
  return (
    <div id='partners' className='p-10 py-20'>
      <div className="mx-auto max-w-7xl">
        <p className='text-lg text-zinc-500 font-bold sm:text-4xl text-center'>Nos partenaires</p>
        <div className='flex justify-center space-x-20 mt-20'>
          <a className='md:col-start-2 self-center' href="https://environnement.gouv.ci/directions-centrales/ " target="_blank" rel="noopener noreferrer">
            <img className='h-20 xl:h-28' src={logoMinedd} alt="" />
          </a>
          <a className='self-center' href="https://www.airqino.it/en/" target="_blank" rel="noopener noreferrer">
            <img className='h-20 xl:h-28' src={logoAirqino} alt="" />
          </a>
          <a className='self-center' href="https://www.snisdiis.com/" target="_blank" rel="noopener noreferrer">
            <img className='h-20 xl:h-28' src={logoDiis} alt="" />
          </a>
        </div>
        <div className='flex items-center justify-center'>
        </div>
      </div>
    </div>
  )
}
import { IconArrowRight } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import fondSensor188_3 from "../assets/sensor188_3.jpeg"
import fondSensor189_1 from "../assets/sensor189_1.jpeg"
import { Button } from "@mantine/core"

export default function Installations() {
  const navigate = useNavigate()
  return (
    <div className='p-10'>
      <div className="max-w-screen-xl mx-auto">
        <p className='text-6xl font-[10] text-center text-zinc-400'>Agir sans attendre : Lancement de notre projet pilote</p>
        <p className='text-lg text-zinc-500 font-bold sm:text-4xl my-10 text-center '>Nos installations</p>
        <div className='mt-14 grid grid-cols-1 md:grid-cols-2 gap-20'>
          <div className='space-y-6'>
            <p className=''>Le capteur <b className='text-red-500'>SMART188</b> installé à la pharmacie du bonheur près d'une rue bituméé.</p>
            <div style={{ backgroundImage: `url("${fondSensor188_3}")` }}
              className='h-80 lg:h-96 bg-center bg-cover'>
            </div>
          </div>
          <div className="space-y-6">
            <p className=''>Le capteur <b className='text-red-500'>SMART189</b> installé à la pharmacie Ministre près d'une rue non bituméé.</p>
            <div style={{ backgroundImage: `url("${fondSensor189_1}")` }}
              className='h-80 lg:h-96 bg-cover bg-center'>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-center">
          <Button onClick={() => navigate("/project")} className='btn-primary' rightIcon={<IconArrowRight />} size='lg'>En savoir plus sur le projet </Button>
        </div>
      </div>
    </div>
  )
}

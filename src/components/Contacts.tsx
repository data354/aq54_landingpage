import { Avatar } from "@mantine/core";
import iconLinkedin from "../assets/linkedin.png"
import iconGmail from "../assets/gmail.png"

export default function Contacts(){
  return (
    <div id='contacts' className="bg-gray-950 p-10 md:px-20 lg:px-24">
      <p className="font-extrabold text-4xl text-slate-100 text-center">Contactez-nous</p>
      <div className='text-slate-100 space-y-3 mt-10 text-center'>
        <h6><b>Telephone</b> : +225 07 1008 1410</h6>
        <h6><b>Mail</b> : aq54@data354.co</h6>
        <h6><b>Adresse</b> : Cocody, Riviera Boulevard Y4</h6>
        <a href="https://www.linkedin.com/company/data354/" className='inline-block' target="_blank" rel="noopener noreferrer">
          <Avatar alt="logo facebook" src={iconLinkedin} />
        </a>
        <a href="mailto:aq54@data354.com" className='inline-block ml-5' target="_blank" rel="noopener noreferrer">
          <Avatar alt="logo facebook" src={iconGmail} />
        </a>
      </div>
    </div>
  )
}
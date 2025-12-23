import { CompanyBackground } from '@/components/modules/AboutPage/CompanyBackground'
import { Mission } from '@/components/modules/AboutPage/Mission'
import { TeamProfiles } from '@/components/modules/AboutPage/TeamProfiles'


export default function About() {
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <CompanyBackground/>
      <Mission/>
      <TeamProfiles/>
    </div>
  )
}

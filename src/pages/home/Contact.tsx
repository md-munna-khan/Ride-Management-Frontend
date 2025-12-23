import { ContactForm } from '@/components/modules/ContactPage/ContactForm'
import { ContactInfo } from '@/components/modules/ContactPage/ContactInfo'


export default function Contact() {
  return (
    <div className='max-w-6xl mx-auto px-4 py-8 '>
      <ContactForm/>
      <ContactInfo/>
    </div>
  )
}

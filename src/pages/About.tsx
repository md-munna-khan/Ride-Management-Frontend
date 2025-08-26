import { CompanyBackground } from '@/components/modules/AboutPage/CompanyBackground'
import { Mission } from '@/components/modules/AboutPage/Mission'
import { TeamProfiles } from '@/components/modules/AboutPage/TeamProfiles'
import React from 'react'

export default function About() {
  return (
    <div>
      <CompanyBackground/>
      <Mission/>
      <TeamProfiles/>
    </div>
  )
}

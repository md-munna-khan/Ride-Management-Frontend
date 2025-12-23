import { AdminFeatures } from '@/components/modules/FeaturePage/AdminFeatures'
import { DriverFeatures } from '@/components/modules/FeaturePage/DriverFeatures'
import { RiderFeatures } from '@/components/modules/FeaturePage/RiderFeatures'


export default function Features() {
  return (
    <div>
      <AdminFeatures/>
      <DriverFeatures/>
      <RiderFeatures/>
    </div>
  )
}

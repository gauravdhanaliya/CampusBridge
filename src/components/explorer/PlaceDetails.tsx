import { ArrowLeft, Navigation } from 'lucide-react'
import { categories } from '@/config/categories'
import type { Campus, Place, VerificationStatus } from '@/types/place'

interface Props {
  place: Place
  campus: Campus
  onBack: () => void
  onDirections: () => void
}

const verificationLabel: Record<VerificationStatus, string> = {
  'unverified-demo': 'Unverified demo data',
  pending: 'Verification pending',
  verified: 'Verified',
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-sm text-slate-800">{value ?? <span className="text-slate-500">Not provided</span>}</dd>
    </div>
  )
}

export default function PlaceDetails({ place, campus, onBack, onDirections }: Props) {
  const { icon: Icon, color, label } = categories[place.category]
  const verified = place.verification === 'verified'

  return (
    <div className="p-4">
      <button type="button" onClick={onBack} className="mb-3 flex items-center gap-1 text-sm font-semibold text-campus">
        <ArrowLeft size={16} aria-hidden /> Back to results
      </button>

      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white" style={{ background: color }}>
          <Icon size={22} aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-bold leading-tight">{place.name}</h2>
          <p className="text-sm text-slate-600">{label}</p>
          <span
            className={`badge mt-1.5 ${verified ? 'bg-campus-light text-campus' : 'bg-orange-light text-orange-800'}`}
          >
            {verificationLabel[place.verification]}
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-700">{place.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <Row label="Institution" value={campus.institution} />
        <Row label="Campus" value={campus.name} />
        <Row label="Building" value={place.buildingName} />
        <Row label="Floor" value={place.floor} />
        <Row label="Room number" value={place.roomNumber} />
        <Row label="Accessibility" value={place.accessibility} />
      </dl>

      <button type="button" onClick={onDirections} className="btn-primary mt-5 w-full">
        <Navigation size={16} aria-hidden /> Get Directions
      </button>
    </div>
  )
}

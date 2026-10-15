import { GraduationCap } from 'lucide-react'

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <GraduationCap className={light ? 'text-white' : 'text-campus'} size={28} aria-hidden />
      <span className={`font-heading text-lg font-bold ${light ? 'text-white' : 'text-campus'}`}>
        Campus<span className={light ? 'text-white' : 'text-campus-dark'}>Bridge</span>
      </span>
    </span>
  )
}

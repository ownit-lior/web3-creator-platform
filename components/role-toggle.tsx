'use client'

import { Users, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Role } from '@/components/registration-modal'

export function RoleToggle({
  role,
  onChange,
}: {
  role: Role
  onChange: (r: Role) => void
}) {
  const options: { role: Role; label: string; icon: typeof Users }[] = [
    { role: 'fan', label: 'תצוגת קהל', icon: Users },
    { role: 'artist', label: 'תצוגת אמן', icon: Palette },
  ]
  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border bg-secondary/60 p-1"
      role="tablist"
      aria-label="החלפת תצוגה בין קהל לאמן"
    >
      {options.map((o) => {
        const Icon = o.icon
        const isActive = role === o.role
        return (
          <button
            key={o.role}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(o.role)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors md:px-3.5 md:text-sm',
              isActive
                ? 'bg-gradient-to-l from-primary to-accent text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-4" />
            <span className="hidden xs:inline sm:inline">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { StudioSidebar } from '@/components/studio/studio-sidebar'
import {
  StudioCommunitySection,
  StudioCreateDropSection,
  StudioDashboardOverview,
  StudioDropsSection,
  StudioSettingsSection,
} from '@/components/studio/studio-sections'
import { studioCreator, type StudioNavId } from '@/lib/creator-studio-data'

export function StudioShell() {
  const [active, setActive] = useState<StudioNavId>('dashboard')

  function navigate(id: StudioNavId) {
    setActive(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white" dir="rtl">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <StudioSidebar
          active={active}
          onNavigate={navigate}
          clubId={studioCreator.clubId}
        />

        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-10">
          {active === 'dashboard' && (
            <StudioDashboardOverview onCreateDrop={() => navigate('create-drop')} />
          )}
          {active === 'drops' && <StudioDropsSection onCreateDrop={() => navigate('create-drop')} />}
          {active === 'community' && <StudioCommunitySection />}
          {active === 'create-drop' && <StudioCreateDropSection />}
          {active === 'settings' && <StudioSettingsSection />}
        </main>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { PlatformDashboard } from '@/components/platform-dashboard'
import {
  RegistrationModal,
  type Role,
} from '@/components/registration-modal'

export function AppShell() {
  const account = useActiveAccount()
  const [isRegistered, setIsRegistered] = useState(false)
  const [userData, setUserData] = useState<{
    formData: unknown
    role: Role
  } | null>(null)

  useEffect(() => {
    if (account?.address) {
      const savedUser = localStorage.getItem(`vibe_user_${account.address}`)
      if (savedUser) {
        setUserData(JSON.parse(savedUser))
        setIsRegistered(true)
      }
    } else {
      setIsRegistered(false)
      setUserData(null)
    }
  }, [account])

  const handleRegistrationComplete = (data: {
    formData: unknown
    role: Role
  }) => {
    setUserData(data)
    setIsRegistered(true)
  }

  if (isRegistered && userData) {
    return <PlatformDashboard initialRole={userData.role} />
  }

  return (
    <RegistrationModal
      isOpen={true}
      onRegistered={handleRegistrationComplete}
    />
  )
}

'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type DemoRole = 'senior' | 'student' | 'coordinator'

export interface DemoUser {
  role: DemoRole
  name: string
  id: string
  schoolId?: string
}

const DEMO_USERS: Record<DemoRole, DemoUser> = {
  senior: {
    role: 'senior',
    name: 'Eleanor Voss',
    id: 's1',
  },
  student: {
    role: 'student',
    name: 'Maya Reyes',
    id: 'st1',
    schoolId: 'sch1',
  },
  coordinator: {
    role: 'coordinator',
    name: 'Ms. Patricia Holt',
    id: 'coord1',
    schoolId: 'sch1',
  },
}

interface DemoContextValue {
  role: DemoRole
  user: DemoUser
  setRole: (role: DemoRole) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<DemoRole>('student')
  return (
    <DemoContext.Provider value={{ role, user: DEMO_USERS[role], setRole }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used inside DemoProvider')
  return ctx
}

import { createContext, useContext, useState, useEffect } from 'react'

const TeamContext = createContext()
const TEAM_STORAGE_KEY = 'presentation-team-config'

const DEFAULT_TEAM_CONFIG = {
  eyebrow: 'Your Support',
  title: 'Meet Your Elastic Team',
  subtitle: 'Our dedicated team is here to support your success.',
  members: [
    {
      id: 'member-1',
      name: 'Felicia Carr',
      role: 'Senior Account Executive',
      email: 'felicia.carr@elastic.co',
      phone: '301.529.8195',
      color: '#48EFCF',
      initials: 'FC',
      photo: 'photos/felicia-profile.jpeg'
    },
    {
      id: 'member-2',
      name: 'Rich Cabrera',
      role: 'Senior Solutions Architect',
      email: 'rich.cabrera@elastic.co',
      phone: '703.939.4047',
      color: '#0B64DD',
      initials: 'RC',
      photo: 'photos/rich-profile.jpg'
    },
    {
      id: 'member-3',
      name: 'Rob Amos',
      role: 'RVP Federal Civilian',
      email: 'rob.amos@elastic.co',
      phone: '703.209.6480',
      color: '#F04E98',
      initials: 'RA',
      photo: 'photos/rob-profile.jpeg'
    },
    {
      id: 'member-4',
      name: 'Chris Pavona',
      role: 'Sr. Regional Service Provider',
      email: 'chris.pavona@elastic.co',
      phone: '757.553.8015',
      color: '#FEC514',
      initials: 'CP',
      photo: 'photos/chris-profile.jpeg'
    }
  ]
}

export function TeamProvider({ children }) {
  const [teamConfig, setTeamConfig] = useState(() => {
    const saved = localStorage.getItem(TEAM_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return DEFAULT_TEAM_CONFIG
      }
    }
    return DEFAULT_TEAM_CONFIG
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamConfig))
  }, [teamConfig])

  const updateTeamConfig = (newConfig) => {
    setTeamConfig(newConfig)
  }

  const resetTeamConfig = () => {
    setTeamConfig(DEFAULT_TEAM_CONFIG)
  }

  return (
    <TeamContext.Provider value={{ 
      teamConfig, 
      updateTeamConfig, 
      resetTeamConfig,
      isLoading 
    }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeamConfig() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error('useTeamConfig must be used within a TeamProvider')
  }
  return context
}

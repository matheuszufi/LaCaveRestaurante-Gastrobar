import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const HeroContext = createContext(false)
let setHeroGlobal = () => {}

export function HeroProvider({ children }) {
  const [isHero, setIsHero] = useState(false)
  setHeroGlobal = setIsHero
  return <HeroContext.Provider value={isHero}>{children}</HeroContext.Provider>
}

export function useIsHero() {
  return useContext(HeroContext)
}

export function useHeroContext() {
  useEffect(() => {
    setHeroGlobal(true)
    return () => setHeroGlobal(false)
  }, [])
}

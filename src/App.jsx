import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { PollenProvider } from './context/PollenContext'
import NavBar from './components/NavBar'
import Today from './pages/Today'
import Forecast from './pages/Forecast'
import Detail from './pages/Detail'
import Settings from './pages/Settings'

export default function App() {
  const location = useLocation()

  return (
    <PollenProvider>
      <div className="max-w-md mx-auto min-h-dvh flex flex-col">
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Today />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>
        <NavBar />
      </div>
    </PollenProvider>
  )
}

import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Today from './pages/Today'
import Forecast from './pages/Forecast'
import Detail from './pages/Detail'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="max-w-md mx-auto min-h-dvh flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <NavBar />
    </div>
  )
}

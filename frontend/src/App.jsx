import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import SimulationPage from './pages/Simulation/SimulationPage'
import AppLayout from './components/Layout/AppLayout'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulacao" element={<SimulationPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App

import { Routes, Route } from 'react-router'
import AppLoader from './components/loading/AppLoader'
import Home from './pages/Home'
import './App.css'

export default function App() {
  return (
    <AppLoader>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppLoader>
  )
}

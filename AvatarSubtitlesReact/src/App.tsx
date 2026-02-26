import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLoader from './components/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const Episode = lazy(() => import('./pages/Episode'))

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episode/:season/:episode" element={<Episode />} />
      </Routes>
    </Suspense>
  )
}

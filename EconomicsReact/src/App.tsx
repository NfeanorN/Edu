import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLoader from './components/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const Topic = lazy(() => import('./pages/Topic'))

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:slug" element={<Topic />} />
      </Routes>
    </Suspense>
  )
}

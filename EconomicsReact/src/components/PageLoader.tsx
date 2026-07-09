import './PageLoader.scss'

export default function PageLoader(): JSX.Element {
  return (
    <div className="page-loader" role="status" aria-label="Loading">
      <span className="page-loader__spinner" />
      <span>Loading…</span>
    </div>
  )
}

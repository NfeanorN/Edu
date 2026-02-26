import './PageLoader.scss'

export default function PageLoader(): JSX.Element {
  return (
    <div className="page-loader" role="status" aria-label="Загрузка">
      <span className="page-loader__spinner" />
      <span>Загрузка…</span>
    </div>
  )
}

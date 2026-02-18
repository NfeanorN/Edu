import type { ContentBlock, TopicContent } from './types'
import './TopicContent.scss'

function renderBlock(block: ContentBlock, index: number): JSX.Element | null {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={index}>
          {block.en}
          {block.ru != null && ` / ${block.ru}`}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={index}>
          {block.en}
          {block.ru != null && ` / ${block.ru}`}
        </h3>
      )
    case 'h4':
      return (
        <h4 key={index}>
          {block.en}
          {block.ru != null && ` / ${block.ru}`}
        </h4>
      )
    case 'p':
      return (
        <p key={index}>
          {block.en}
          {block.ru != null && (
            <>
              <br />
              <span>{block.ru}</span>
            </>
          )}
        </p>
      )
    case 'ul':
      return (
        <ul key={index}>
          {block.items.map((item, i) => (
            <li key={i}>
              {item.en}
              {item.ru != null && ` / ${item.ru}`}
            </li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <table key={index}>
          <thead>
            <tr>
              {block.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    case 'graph':
      return (
        <div key={index} className="graph-box">
          {block.svg != null ? (
            <div className="graph-svg-wrap" dangerouslySetInnerHTML={{ __html: block.svg }} />
          ) : (
            <pre>{block.ascii}</pre>
          )}
        </div>
      )
    case 'formula':
      return (
        <div key={index} className="formula-box">
          {block.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )
    case 'hr':
      return <hr key={index} />
    default:
      return null
  }
}

interface TopicContentViewProps {
  blocks: TopicContent
}

export default function TopicContentView({ blocks }: TopicContentViewProps): JSX.Element {
  return <>{blocks.map((block, i) => renderBlock(block, i))}</>
}

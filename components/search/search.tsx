import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './search.module.css'

export default function Search() {

  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `/api/search?q=${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          console.log('== info:', res.infos)
          setResults(res.infos)
          setActive(true)
        })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(false)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div
      className={styles.container}
      ref={searchRef}
    >
      <input className="form-control me-2" type="search" placeholder="Search by address/txn hash/block" aria-label="Search"
        onChange={onChange}
        onFocus={onFocus}
        value={query}
      />
      {active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map(({ Id, Title }) => (
            <li className={styles.result} key={Id}>
              <Link href="/posts/[id]" as={`/posts/${Id}`}>
                <a>{Title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
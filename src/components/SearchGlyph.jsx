function SearchGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M10 7.25v5.5M7.25 10h5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.75 14.75 18.5 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default SearchGlyph

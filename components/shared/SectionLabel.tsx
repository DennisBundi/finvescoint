interface Props {
  text: string
  centered?: boolean
}

export default function SectionLabel({ text, centered = false }: Props) {
  return (
    <div className={`flex items-center gap-4 mb-6 ${centered ? 'justify-center' : ''}`}>
      <div className="gold-line" />
      <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">{text}</span>
      {centered && <div className="gold-line" style={{ transform: 'scaleX(-1)' }} />}
    </div>
  )
}

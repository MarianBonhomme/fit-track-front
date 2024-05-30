export default function CardTitle({ text, css, alignLeft }) {
  return (
    <h3 className={`${alignLeft ?? 'text-center'} font-bold ${css && css}`}>{text}</h3>
  )
}
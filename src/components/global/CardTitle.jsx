export default function CardTitle({ text, css }) {
  return (
    <h3 className={`text-center font-bold ${css && css}`}>{text}</h3>
  )
}
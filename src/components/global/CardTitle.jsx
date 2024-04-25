export default function CardTitle({ text, css }) {
  return (
    <h3 className={`text-center text-xl font-bold ${css && css}`}>{text}</h3>
  )
}
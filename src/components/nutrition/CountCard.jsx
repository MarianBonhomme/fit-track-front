export default function CountCard({ count, title, icon }) {
  return (
    <div className="grow bg-dark px-5 py-3 shadow rounded-2xl">
      <h3 className="text-center text-2xl font-bold">{title}</h3>
      <div className="flex justify-center items-center relative p-5">
        <p className="text-5xl font-bold">{count}</p>
        {icon && (
          <img src={`src/assets/icons/${icon}`} alt="icone" className="absolute w-20 right-5"/>
        )}
      </div>
    </div>
  )
}
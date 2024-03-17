import CardTitle from "../../global/CardTitle";

export default function CountCard({ food }) {
  return (
    <div className="flex flex-col items-center bg-black px-5 py-3 shadow rounded-2xl">
      <CardTitle text={food.name} />
      <div className="grow flex justify-center items-center">
        <p className="text-5xl font-bold">{food.totalQuantity}</p>
      </div>
    </div>
  );
}

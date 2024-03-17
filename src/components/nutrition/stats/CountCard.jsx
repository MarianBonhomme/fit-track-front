import CardTitle from "../../global/CardTitle";

export default function CountCard({ food, color }) {
  return (
    <div className={`flex flex-col items-center bg-${color} text-white px-5 py-3 shadow-custom rounded-3xl`}>
      <CardTitle text={food.name} />
      <div className="grow flex justify-center items-center">
        <p className="text-5xl font-bold">{food.totalQuantity}</p>
      </div>
    </div>
  );
}

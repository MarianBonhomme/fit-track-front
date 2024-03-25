import React from 'react'

export default function QuantityUnity({ quantity, unity, quantitySize, unitySize }) {
  return (
    <div className="flex justify-center items-end">
      {unity === "Gram" && (
        quantity > 999 ? (
          <>
            <p className={`${quantitySize && quantitySize} font-bold`}>{quantity / 1000}</p>
            <span className={`${unitySize && unitySize}`}>kg</span>
          </>
        ) : (
          <>
            <p className={`${quantitySize && quantitySize} font-bold`}>{quantity}</p>
            <span className={`${unitySize && unitySize}`}>g</span>
          </>
        )
      )}
      {unity === "Litre" && (
        quantity > 999 ? (
          <>
            <p className={`${quantitySize && quantitySize} font-bold`}>{quantity / 1000}</p>
            <span className={`${unitySize && unitySize}`}>l</span>
          </>
        ) : (
          <>
            <p className={`${quantitySize && quantitySize} font-bold`}>{quantity}</p>
            <span className={`${unitySize && unitySize}`}>ml</span>
          </>
        )
      )}
      {unity === "Portion" && (
        quantity > 999 ? (
          <>
            <p className={`${quantitySize && quantitySize} font-bold`}>{quantity / 1000}</p>
            <span className={`${unitySize && unitySize}`}>p</span>
          </>
        ) : (
          <>
            <p className={`${quantitySize && quantitySize} font-bold`}>{quantity}</p>
            <span className={`${unitySize && unitySize}`}>p</span>
          </>
        )
      )}
    </div>
  )
}
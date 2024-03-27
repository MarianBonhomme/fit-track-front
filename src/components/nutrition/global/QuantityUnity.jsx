import React from 'react'

export default function QuantityUnity({ quantity, unity, quantityStyle, unityStyle }) {
  return (
    <>
      {unity === "Gram" && (
        quantity > 999 ? (
          <p className={`${quantityStyle && quantityStyle}`}>
            {(quantity / 1000).toFixed(2)}
            <span className={`${unityStyle && unityStyle}`}>kg</span>
          </p>
        ) : (
          <p className={`${quantityStyle && quantityStyle}`}>
            {quantity}
            <span className={`${unityStyle && unityStyle}`}>g</span>
          </p>
        )
      )}
      {unity === "Litre" && (
        quantity > 999 ? (
          <p className={`${quantityStyle && quantityStyle}`}>
            {(quantity / 1000).toFixed(2)}
            <span className={`${unityStyle && unityStyle}`}>L</span>
          </p>            
        ) : (        
          <p className={`${quantityStyle && quantityStyle}`}>
            {quantity}
            <span className={`${unityStyle && unityStyle}`}>ml</span>
          </p>         
        )
      )}
      {unity === "Portion" && (
        quantity > 999 ? (
          <p className={`${quantityStyle && quantityStyle}`}>
            {(quantity / 1000).toFixed(2)}
            <span className={`${unityStyle && unityStyle}`}>p</span>
          </p>
        ) : (
          <p className={`${quantityStyle && quantityStyle}`}>
            {quantity}
            <span className={`${unityStyle && unityStyle}`}>p</span>
          </p>          
        )
      )}
    </>
  )
}
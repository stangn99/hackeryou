import React from 'react';

export default (props) => {
  console.log(props)
  return (
    <tr>
      <td className="storeInfo__storeDetails">{props.storeDetails.name}</td>
      <td className="storeInfo__storeDetails">{props.storeDetails.quantity}</td>
    </tr>
  )
}


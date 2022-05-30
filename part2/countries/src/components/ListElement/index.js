import React, { useState } from 'react'
import Detail from '../Detail';

const ListElement = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div key={country.name.common}>{country.name.common}<button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button> </div>
      {
        show && <Detail country={country} />
      }
    </>
  )
}

export default ListElement
import React from 'react'
import { PulseLoader } from 'react-spinners'

const Spinner = props => (
  <div className="Spinner">
    <PulseLoader color={'#1eaedb'} size={30} margin={'3px'} />
  </div>
)

export default Spinner

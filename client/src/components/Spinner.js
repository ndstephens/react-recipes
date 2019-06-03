import React from 'react'
import { PulseLoader } from 'react-spinners'

const Spinner = props => (
  <div className="spinner">
    <PulseLoader color={'#a5d6a7'} size={50} margin={'3px'} />
  </div>
)

export default Spinner

import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

const Searchbar = () => {
  return (
    <div>
      <AsyncPaginate 
      value='Search' placeholder='Search for a city' />
    </div>
  )
}

export default Searchbar

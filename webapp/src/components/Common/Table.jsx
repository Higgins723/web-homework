import React from 'react'
import PropTypes from 'prop-types'

const Table = (props) => {
  const { tableHead, data } = props

  return (
    <table className='table-auto mt-3 mb-10'>
      <thead>
        <tr>
          {tableHead.map((option) => (
            <th className='px-4 py-2' key={option.key}>
              {option.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((option, i) => (
          <tr className={i % 2 === 0 ? 'bg-gray-100' : ''} key={option.id}>
            {tableHead.map((head) => (
              <td className='border px-4 py-2' key={head.key}>
                {option[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  tableHead: PropTypes.instanceOf(Array).isRequired,
  data: PropTypes.instanceOf(Array).isRequired
}

export default Table

import React from 'react'
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
  const tableInformation = [
    {
      id: 1,
      table: 'Employees',
      relation: 'Companies',
      description: 'Holds basic info for created transactions (first name, last name, dob, company)'
    },
    {
      id: 2,
      table: 'Merchants',
      relation: 'None',
      description: 'This table simple holds merchant information (name, category)'
    },
    {
      id: 3,
      table: 'Companies',
      relation: 'None',
      description: 'This table holds info for a company (name, credit line, and available credit)'
    },
    {
      id: 4,
      table: 'Transactions',
      relation: 'Employees, and Merchants',
      description: 'This is the main table to hold transaction info (employee, merchant, description, debit or credit, and amount)'
    }
  ]

  return (
    <div>
      <h1 className='font-thin text-3xl mb-7'>Hello Divvy</h1>
      <p className='font-light'>
        This app is my frontend portion of the assignment.
        I decided to do the backend piece in <code>Django</code> because it made it easier to showcase my ability.
        There are several tables you can check out from the sidebar that will be explained more below:
      </p>
      <table className='table-auto mt-3'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Table</th>
            <th className='px-4 py-2'>Relation</th>
            <th className='px-4 py-2'>Description</th>
          </tr>
        </thead>
        <tbody>
          {tableInformation.map((table) => (
            <tr className={table.id % 2 === 0 ? 'bg-gray-100' : ''} key={table.id}>
              <td className='border px-4 py-2'>{table.table}</td>
              <td className='border px-4 py-2'>{table.relation}</td>
              <td className='border px-4 py-2'>{table.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='font-light mt-5'><span><FontAwesomeIcon icon={faArrowLeft} /></span> To see more information pick a category from the sidebar</p>
    </div>
  )
}

export default Home

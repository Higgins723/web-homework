import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button } from '../Common'
import CreateCompany from './CreateCompany'

const Companies = () => {
  let match = useRouteMatch()
  const [companies, setCompanies] = useState(null)
  const [error, setError] = useState(null)

  const fetch = () => {
    axios.get('http://localhost:8000/api/companies/')
      .then(({ data }) => {
        setCompanies(data)
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [match])

  const formatCurrency = (value) => {
    const newValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return newValue.format(value)
  }

  if (error) return <div className='text-center'>There was an error requesting Companies</div>

  if (!companies) return <Loading />

  return (
    <>
      <Switch>
        <Route path={`${match.path}/create`}>
          <CreateCompany match={match} />
        </Route>

        <Route path={match.path}>
          <Header name='Companies' />

          <table className='table-auto mt-3 mb-10'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Company</th>
                <th className='px-4 py-2'>Credit Line</th>
                <th className='px-4 py-2'>Available Credit</th>
                <th className='px-4 py-2'>Employees</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((table, i) => (
                <tr className={i % 2 === 0 ? 'bg-gray-100' : ''} key={table.id}>
                  <td className='border px-4 py-2'>{table.name}</td>
                  <td className='border px-4 py-2'>{formatCurrency(table.credit_line)}</td>
                  <td className='border px-4 py-2'>{formatCurrency(table.available_credit)}</td>
                  <td className='border px-4 py-2'>
                    <div className='grid grid-flow-row'>
                      {table.employees.map((employee, i) => (
                        <div key={employee.id}>
                          <span>{employee.first_name} {employee.last_name}{i + 1 !== table.employees.length ? ',' : ''}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to={`${match.url}/create`}>
            <Button color='bg-green-600' name='Create Company' />
          </Link>
        </Route>
      </Switch>
    </>
  )
}

export default Companies

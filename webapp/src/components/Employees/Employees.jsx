import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button } from '../Common'
import CreateEmployee from './CreateEmployee'

const Employees = () => {
  let match = useRouteMatch()
  const [employees, setEmployees] = useState(null)
  const [error, setError] = useState(null)

  const fetch = () => {
    axios.get('http://localhost:8000/api/employees/')
      .then(({ data }) => {
        setEmployees(data)
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [match])

  if (error) return <div className='text-center'>There was an error requesting Employees</div>

  if (!employees) return <Loading />

  return (
    <>
      <Switch>
        <Route path={`${match.path}/create`}>
          <CreateEmployee match={match} />
        </Route>

        <Route path={match.path}>
          <Header name='Employees' />

          <table className='table-auto mt-3 mb-10'>
            <thead>
              <tr>
                <th className='px-4 py-2'>First</th>
                <th className='px-4 py-2'>Last</th>
                <th className='px-4 py-2'>Date of Birth</th>
                <th className='px-4 py-2'>Company</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((table, i) => (
                <tr className={i % 2 === 0 ? 'bg-gray-100' : ''} key={table.id}>
                  <td className='border px-4 py-2'>{table.first_name}</td>
                  <td className='border px-4 py-2'>{table.last_name}</td>
                  <td className='border px-4 py-2'>{table.dob}</td>
                  <td className='border px-4 py-2'>{table.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to={`${match.url}/create`}>
            <Button color='bg-green-600' name='Create Employee' />
          </Link>
        </Route>
      </Switch>
    </>
  )
}

export default Employees

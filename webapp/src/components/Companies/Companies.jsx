import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button, formatCurrency, Table } from '../Common'
import CreateCompany from './CreateCompany'

const Companies = () => {
  let match = useRouteMatch()
  const [companies, setCompanies] = useState(null)
  const [error, setError] = useState(null)

  const modifyData = (data) => {
    const temp = data.map((d) => {
      return {
        company: d.name,
        credit_line: formatCurrency(d.credit_line),
        available_credit: formatCurrency(d.available_credit),
        employees: (
          <div className='grid grid-flow-row' key={Math.random()}>
            {d.employees.map((employee, i) => (
              <div key={employee.id}>
                <span>{employee.first_name} {employee.last_name}{i + 1 !== d.employees.length ? ',' : ''}</span>
              </div>
            ))}
          </div>
        )
      }
    })

    return temp
  }

  const fetch = () => {
    axios.get('http://localhost:8000/api/companies/')
      .then(({ data }) => {
        const results = modifyData(data)
        setCompanies(results)
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [match])

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

          <Table
            data={companies}
            tableHead={[
              { key: 'company', name: 'Company' },
              { key: 'credit_line', name: 'Credit Line' },
              { key: 'available_credit', name: 'Available Credit' },
              { key: 'employees', name: 'Employees' }
            ]}
          />

          <Link to={`${match.url}/create`}>
            <Button color='bg-green-600' name='Create Company' />
          </Link>
        </Route>
      </Switch>
    </>
  )
}

export default Companies

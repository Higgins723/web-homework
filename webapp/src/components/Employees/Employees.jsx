import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button, Table } from '../Common'
import CreateEmployee from './CreateEmployee'

const Employees = () => {
  let match = useRouteMatch()
  const [employees, setEmployees] = useState(null)
  const [error, setError] = useState(null)

  const modifyData = (data) => {
    const temp = data.map((d) => {
      return {
        first: d.first_name,
        last: d.last_name,
        dob: d.dob,
        company: d.company.name
      }
    })

    return temp
  }

  const fetch = () => {
    axios.get('http://localhost:8000/api/employees/')
      .then(({ data }) => {
        const results = modifyData(data)
        setEmployees(results)
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

          <Table
            data={employees}
            tableHead={[
              { key: 'first', name: 'First' },
              { key: 'last', name: 'Last' },
              { key: 'dob', name: 'Date of Birth' },
              { key: 'company', name: 'Company' }
            ]}
          />

          <Link to={`${match.url}/create`}>
            <Button color='bg-green-600' name='Create Employee' />
          </Link>
        </Route>
      </Switch>
    </>
  )
}

export default Employees

import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button } from '../Common'
import EditMerchant from './EditMerchant'

const Merchants = () => {
  let match = useRouteMatch()
  const [merchants, setMerchants] = useState(null)
  const [error, setError] = useState(null)

  const fetch = () => {
    axios.get('http://localhost:8000/api/merchants/')
      .then(({ data }) => {
        setMerchants(data)
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [match])

  if (error) return <div className='text-center'>There was an error requesting Merchants</div>

  if (!merchants) return <Loading />

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id/edit`}>
          <EditMerchant match={match} />
        </Route>

        <Route path={`${match.path}/create`}>
          create
        </Route>

        <Route path={match.path}>
          <Header name='Merchants' />

          <table className='table-auto mt-3 mb-10'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Merchant</th>
                <th className='px-4 py-2'>Category</th>
                <th className='px-4 py-2'>Edit</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((table, i) => (
                <tr className={i % 2 === 0 ? 'bg-gray-100' : ''} key={table.id}>
                  <td className='border px-4 py-2'>{table.name}</td>
                  <td className='border px-4 py-2'>{table.category}</td>
                  <td className='border px-4 py-2'>
                    <Link to={`${match.url}/${table.id}/edit`}>
                      <Button color='bg-blue-500' name='Edit' />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to={`${match.url}/create`}>
            <Button color='bg-green-600' name='Create Merchant' />
          </Link>
        </Route>
      </Switch>
    </>
  )
}

export default Merchants

import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button, Table } from '../Common'
import EditMerchant from './EditMerchant'
import CreateMerchant from './CreateMerchant'

const Merchants = () => {
  let match = useRouteMatch()
  const [merchants, setMerchants] = useState(null)
  const [error, setError] = useState(null)

  const modifyData = (data) => {
    const temp = data.map((d) => {
      return {
        merchant: d.name,
        category: d.category,
        edit: (
          <Link to={`${match.url}/${d.id}/edit`}>
            <Button color='bg-blue-500' name='Edit' />
          </Link>
        )
      }
    })

    return temp
  }

  const fetch = () => {
    axios.get('http://localhost:8000/api/merchants/')
      .then(({ data }) => {
        const results = modifyData(data)
        setMerchants(results)
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
          <CreateMerchant match={match} />
        </Route>

        <Route path={match.path}>
          <Header name='Merchants' />

          <Table
            data={merchants}
            tableHead={[
              { key: 'merchant', name: 'Merchant' },
              { key: 'category', name: 'Category' },
              { key: 'edit', name: 'Edit' }
            ]}
          />

          <Link to={`${match.url}/create`}>
            <Button color='bg-green-600' name='Create Merchant' />
          </Link>
        </Route>
      </Switch>
    </>
  )
}

export default Merchants

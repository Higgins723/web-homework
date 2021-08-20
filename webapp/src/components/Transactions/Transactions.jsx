import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button, formatCurrency } from '../Common'
import Pagination from './Pagination'

const Transactions = () => {
  let match = useRouteMatch()
  const [transactions, setTransactions] = useState(null)
  const [error, setError] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [curPage, setCurPage] = useState(1)
  // const [query, updateQuery] = useState({
  //   q: null,
  //   start: null,
  //   end: null,
  //   min: null,
  //   max: null,
  //   type: null
  // })

  const fetch = () => {
    axios.get(`http://localhost:8000/api/transactions/?page=${curPage}`)
      .then(({ data }) => {
        setTransactions(data.results)
        setPageCount(Math.ceil(data.count / 5))
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [match, curPage])

  if (error) return <div className='text-center'>There was an error requesting Transactions</div>

  if (!transactions) return <Loading />

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id/edit`}>
          edit
        </Route>

        <Route path={`${match.path}/:id/delete`}>
          delete
        </Route>

        <Route path={`${match.path}/create`}>
          create
        </Route>

        <Route path={match.path}>
          <Header name='Transactions' />

          <table className='table-auto mt-3 mb-10'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Id</th>
                <th className='px-4 py-2'>User</th>
                <th className='px-4 py-2'>Company</th>
                <th className='px-4 py-2'>Merchant</th>
                <th className='px-4 py-2'>Category</th>
                <th className='px-4 py-2'>Description</th>
                <th className='px-4 py-2'>Type</th>
                <th className='px-4 py-2'>Amount</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((table, i) => (
                <tr className={i % 2 === 0 ? 'bg-gray-100' : ''} key={table.id}>
                  <td className='border px-4 py-2'>{table.id}</td>
                  <td className='border px-4 py-2'>{table.user.first_name} {table.user.last_name}</td>
                  <td className='border px-4 py-2'>{table.user.company.name}</td>
                  <td className='border px-4 py-2'>{table.merchant.name}</td>
                  <td className='border px-4 py-2'>{table.merchant.category}</td>
                  <td className='border px-4 py-2'>{table.description}</td>
                  <td className='border px-4 py-2'>{table.debit ? 'Debit' : 'Credit'}</td>
                  <td className='border px-4 py-2'>{formatCurrency(table.amount)}</td>
                  <td className='border px-4 py-2'>
                    <div className='grid grid-flow-row text-center'>
                      <Link className='mb-3' to={`${match.url}/${table.id}/edit`}>
                        <Button color='bg-blue-500' name='Edit' />
                      </Link>
                      <Link to={`${match.url}/${table.id}/delete`}>
                        <Button color='bg-red-500' name='Delete' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            curPage={curPage}
            pageCount={pageCount}
            setCurPage={setCurPage}
          />

          <Link to={`${match.url}/create`}>
            <Button color='bg-green-600' name='Create Transaction' />
          </Link>
        </Route>
      </Switch>
    </>
  )
}

export default Transactions

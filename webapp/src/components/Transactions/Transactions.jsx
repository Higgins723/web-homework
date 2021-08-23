import React, { useState, useEffect } from 'react'
import {
  useRouteMatch,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, Button, formatCurrency, numToRoman, Table } from '../Common'
import Pagination from './Pagination'
import CustomSwitch from './CustomSwitch'
import ApiQuery from './ApiQuery'
import EditTransaction from './EditTransaction'
import DeleteTransaction from './DeleteTransaction'
import CreateTransaction from './CreateTransaction'

const Transactions = () => {
  let match = useRouteMatch()
  const [showRoman, setShowRoman] = useState(false)
  const [transactions, setTransactions] = useState(null)
  const [error, setError] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [curPage, setCurPage] = useState(1)
  const [query, updateQuery] = useState({
    q: '',
    start: '',
    end: '',
    min: '',
    max: '',
    type: ''
  })
  const [queryLink, setQueryLink] = useState(null)

  const modifyData = (data) => {
    const temp = data.map((d) => {
      return {
        id: showRoman ? numToRoman(d.id) : d.id,
        user: `${d.user.first_name} ${d.user.last_name}`,
        company: d.user.company.name,
        merchant: d.merchant.name,
        category: d.merchant.category,
        description: d.description,
        type: d.debit ? 'Debit' : 'Credit',
        amount: formatCurrency(d.amount),
        actions: (
          <div className='grid grid-flow-row text-center'>
            <Link className='mb-3' to={`${match.url}/${d.id}/edit`}>
              <Button color='bg-blue-500' name='Edit' />
            </Link>
            <Link to={`${match.url}/${d.id}/delete`}>
              <Button color='bg-red-500' name='Delete' />
            </Link>
          </div>
        )
      }
    })

    return temp
  }

  const fetch = () => {
    axios.get(`http://localhost:8000/api/transactions/?page=${curPage}${queryLink || ''}`)
      .then(({ data }) => {
        const results = modifyData(data.results)
        setTransactions(results)
        setPageCount(Math.ceil(data.count / 5))
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [match, curPage, queryLink, showRoman])

  useEffect(() => {
    const { start, end } = query
    let results = ''

    if (start.length > 0 && end.length > 0) {
      results += `&start=${start}&end=${end}`
    }

    for (const [key, value] of Object.entries(query)) {
      if (value.length > 0 && (key !== 'start' && key !== 'end')) {
        results += `&${key}=${value.toLowerCase()}`
      }
    }

    if (results.length > 0) {
      setCurPage(1)
    }
    setQueryLink(results)
  }, [query])

  if (error) return <div className='text-center'>There was an error requesting Transactions</div>

  if (!transactions) return <Loading />

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id/edit`}>
          <EditTransaction match={match} />
        </Route>

        <Route path={`${match.path}/:id/delete`}>
          <DeleteTransaction match={match} />
        </Route>

        <Route path={`${match.path}/create`}>
          <CreateTransaction match={match} />
        </Route>

        <Route path={match.path}>
          <Header name='Transactions' />

          <CustomSwitch label='Show Roman:' toggle={() => setShowRoman(!showRoman)} value={showRoman} />

          <ApiQuery query={query} setCurPage={setCurPage} updateQuery={updateQuery} />

          <Table
            data={transactions}
            tableHead={[
              { key: 'id', name: 'Id' },
              { key: 'user', name: 'User' },
              { key: 'company', name: 'Company' },
              { key: 'merchant', name: 'Merchant' },
              { key: 'category', name: 'Category' },
              { key: 'description', name: 'Description' },
              { key: 'type', name: 'Type' },
              { key: 'amount', name: 'Amount' },
              { key: 'actions', name: 'Actions' }
            ]}
          />

          {transactions.length === 0 && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-sm -mt-7 mb-6' role='alert'>
              <strong className='font-bold mr-3'>Sorry</strong>
              <span className='block sm:inline'>There is no data matching your query.</span>
            </div>
          )}

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

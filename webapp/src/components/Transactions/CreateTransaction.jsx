import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  Redirect
} from 'react-router-dom'
import axios from 'axios'
import { Header, Loading, FormContent, Button } from '../Common'

const CreateTransaction = (props) => {
  const { match } = props
  const [users, setUsers] = useState(null)
  const [merchants, setMerchants] = useState(null)
  const [error, setError] = useState(false)
  const [created, setCreated] = useState(false)
  const [transactionData, setTransactionData] = useState({
    'user': null,
    'merchant': null,
    'description': '',
    'debit': false,
    'credit': false,
    'amount': 0
  })

  const handleChange = (value, target) => {
    setTransactionData(prev => ({
      ...prev,
      [target]: value
    }))
  }

  const handleTypeChange = (value) => {
    if (value === 'Debit') {
      handleChange(true, 'debit')
      handleChange(false, 'credit')
    } else {
      handleChange(false, 'debit')
      handleChange(true, 'credit')
    }
  }

  const fetchUsers = () => {
    axios.get('http://localhost:8000/api/employees/')
      .then(({ data }) => {
        const modified = data.map((user) => {
          return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`
          }
        })
        handleChange(modified[0].id, 'user')
        setUsers(modified)
      })
      .catch(() => {
        setError(true)
      })
  }

  const fetchMerchants = () => {
    axios.get('http://localhost:8000/api/merchants/')
      .then(({ data }) => {
        const modified = data.map((merchant) => {
          return {
            id: merchant.id,
            name: merchant.name
          }
        })
        handleChange(modified[0].id, 'merchant')
        setMerchants(modified)
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetchUsers()
    fetchMerchants()
  }, [])

  const createTransaction = () => {
    axios.post('http://localhost:8000/api/transactions/create/', {
      ...transactionData,
      amount: parseFloat(transactionData.amount)
    })
      .then(() => {
        setCreated(true)
      })
      .catch((err) => {
        window.alert(err.response.data.error)
      })
  }

  if (error) return <div className='text-center'>There was an error requesting Merchants or Employees</div>

  if (!users || !merchants) return <Loading />

  if (created) return <Redirect to={match.path} />

  return (
    <>
      <Header name='Transaction - Create' />

      <form className='w-full max-w-md'>
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-user'
          labelName='Users'
          selectData={users}
          selectValue='id'
          target='user'
          typeSelect
          value={transactionData.user}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-merchant'
          labelName='Merchants'
          selectData={merchants}
          selectValue='id'
          target='merchant'
          typeSelect
          value={transactionData.merchant}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-description'
          labelName='Description'
          target='description'
          typeInput
          value={transactionData.description}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-amount'
          inputType='number'
          labelName='Amount'
          target='amount'
          typeInput
          value={transactionData.amount}
        />
        <FormContent
          handleChange={handleTypeChange}
          htmlFor='inline-type'
          inputType='radio'
          labelName='Type'
          radioOptions={['Debit', 'Credit']}
          target='type'
          typeInput
          value={transactionData.debit ? 'Debit' : 'Credit'}
        />
        <FormContent typeButton>
          <div className='flex'>
            <button
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              onClick={() => createTransaction()}
              type='button'
            >
              Create
            </button>
            <Link className='ml-5' to={match.path}>
              <Button color='bg-red-500' name='Cancel' />
            </Link>
          </div>
        </FormContent>
      </form>
    </>
  )
}

CreateTransaction.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default CreateTransaction

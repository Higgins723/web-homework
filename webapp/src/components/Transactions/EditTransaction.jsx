import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  useParams,
  Redirect,
  Link
} from 'react-router-dom'
import { Header, Loading, FormContent, Button } from '../Common'
import options from '../Merchants/merchantCategories'

const EditTransaction = (props) => {
  const { match } = props
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [error, setError] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [newMerchant, setNewMerchant] = useState({
    name: '',
    category: ''
  })

  const handleChange = (value, target) => {
    setTransaction(prev => ({
      ...prev,
      [target]: value
    }))
  }

  const handleMerchantChange = (value, target) => {
    setNewMerchant(prev => ({
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

  const fetch = () => {
    axios.get(`http://localhost:8000/api/transactions/${id}/`)
      .then(({ data }) => {
        setTransaction(data)
        // following 3 lines to pre-select correct radio button
        const type = data.debit ? 'Debit' : 'Credit'
        const typeNode = document.querySelector(`input[value="${type}"]`)
        typeNode.checked = true
        handleMerchantChange(data.merchant.name, 'name')
        handleMerchantChange(data.merchant.category, 'category')
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [])

  const updateTransaction = () => {
    axios.put(`http://localhost:8000/api/transactions/${id}/update/`, {
      merchant: newMerchant,
      description: transaction.description,
      debit: transaction.debit,
      credit: transaction.credit,
      amount: transaction.amount
    })
      .then(() => {
        setUpdated(true)
      })
      .catch(() => {
        window.alert('Error updating merchant')
      })
  }

  if (error) return <div className='text-center'>There was an error requesting Transaction {id}</div>

  if (!transaction) return <Loading />

  if (updated) return <Redirect to={match.path} />

  return (
    <>
      <Header name='Transaction - Edit' />

      <form className='w-full max-w-md'>
        <FormContent
          handleChange={handleMerchantChange}
          htmlFor='inline-merchant-name'
          labelName='Merchant Name'
          target='name'
          typeInput
          value={newMerchant.name}
        />
        <FormContent
          handleChange={handleMerchantChange}
          htmlFor='inline-merchant-category'
          labelName='Merchant Category'
          selectData={options}
          selectValue='name'
          target='category'
          typeSelect
          value={newMerchant.category}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-description'
          labelName='Description'
          target='description'
          typeInput
          value={transaction.description}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-amount'
          inputType='number'
          labelName='Amount'
          target='amount'
          typeInput
          value={transaction.amount}
        />
        <FormContent
          handleChange={handleTypeChange}
          htmlFor='inline-type'
          inputType='radio'
          labelName='Type'
          radioOptions={['Debit', 'Credit']}
          target='type'
          typeInput
          value={transaction.debit ? 'Debit' : 'Credit'}
        />
        <FormContent typeButton>
          <div className='flex'>
            <button
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              onClick={() => updateTransaction()}
              type='button'
            >
              Update id := {id}
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

EditTransaction.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default EditTransaction

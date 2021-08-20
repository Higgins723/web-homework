import React from 'react'
import PropTypes from 'prop-types'
import { FormContent } from '../Common'

const ApiQuery = (props) => {
  const { query, updateQuery } = props

  const handleChange = (value, target) => {
    updateQuery(prev => ({
      ...prev,
      [target]: value
    }))
  }

  return (
    <div className='my-3'>
      <h3 className='font-thin mb-1'>Query Transactions</h3>

      <form className='w-full max-w-md'>
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-q-query'
          labelName='Query'
          placeholder='User, Company, Merchant, etc.'
          target='q'
          typeInput
          value={query.q}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-date-start'
          inputType='date'
          labelName='Date Start'
          target='start'
          typeInput
          value={query.start}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-date-end'
          inputType='date'
          labelName='End Start'
          target='end'
          typeInput
          value={query.end}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-min'
          inputType='number'
          labelName='Minimum'
          target='min'
          typeInput
          value={query.min}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-max'
          inputType='number'
          labelName='Maximum'
          target='max'
          typeInput
          value={query.max}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-type'
          inputType='radio'
          labelName='Type'
          radioOptions={['Debit', 'Credit']}
          target='type'
          typeInput
          value={query.type}
        />
      </form>
    </div>
  )
}

ApiQuery.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired,
  updateQuery: PropTypes.func.isRequired
}

export default ApiQuery

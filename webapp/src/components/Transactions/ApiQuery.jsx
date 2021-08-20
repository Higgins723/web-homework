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

  const clearQuery = () => {
    updateQuery({
      q: '',
      start: '',
      end: '',
      min: '',
      max: '',
      type: ''
    })

    // clear selected radio buttons for transaction type
    const nodes = document.querySelectorAll('label input')
    nodes.forEach((node) => {
      node.checked = false
    })
  }

  return (
    <div className='my-3'>
      <h3 className='font-thin mb-1'>Query Transactions:</h3>

      <form className='w-full max-w-md'>
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-q-query'
          labelName='Query'
          placeholder='User, Company, Merchant, etc.'
          required={false}
          target='q'
          typeInput
          value={query.q}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-date-start'
          inputType='date'
          labelName='Date Start'
          required={false}
          target='start'
          typeInput
          value={query.start}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-date-end'
          inputType='date'
          labelName='End Start'
          required={false}
          target='end'
          typeInput
          value={query.end}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-min'
          inputType='number'
          labelName='Minimum'
          required={false}
          target='min'
          typeInput
          value={query.min}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-max'
          inputType='number'
          labelName='Maximum'
          required={false}
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
          required={false}
          target='type'
          typeInput
          value={query.type}
        />
        <FormContent typeButton>
          <button
            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            onClick={clearQuery}
            type='button'
          >
            Clear Query
          </button>
        </FormContent>
      </form>
    </div>
  )
}

ApiQuery.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired,
  updateQuery: PropTypes.func.isRequired
}

export default ApiQuery

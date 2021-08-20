import React, { useState } from 'react'
import {
  Redirect,
  Link
} from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Header, Button, FormContent } from '../Common'

const CreateCompany = (props) => {
  const { match } = props
  const [newCompany, updateNewCompany] = useState({
    name: '',
    credit_line: 0,
    available_credit: 0
  })
  const [created, setCreated] = useState(false)

  const handleChange = (value, target) => {
    updateNewCompany(prev => ({
      ...prev,
      [target]: value
    }))
  }

  const createCompany = () => {
    if (newCompany.name.length > 0 && newCompany.credit_line > 0 && newCompany.available_credit > 0) {
      axios.post('http://localhost:8000/api/companies/create/', newCompany)
        .then(() => {
          setCreated(true)
        })
        .catch(() => {
          window.alert('Error creating company')
        })
    }
  }

  if (created) return <Redirect to={match.path} />

  return (
    <>
      <Header name='Company - Create' />

      <div className='mb-10 bg-blue-100 border-l-4 border-orange-500 text-orange-700 p-4' role='alert'>
        <p className='font-bold'>Alert</p>
        <p>To add employee to company, please create company, then go to employees page.</p>
      </div>

      <form className='w-full max-w-md'>
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-company-name'
          labelName='Name'
          target='name'
          typeInput
          value={newCompany.name}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-credit-line'
          inputType='number'
          labelName='Credit Line'
          target='credit_line'
          typeInput
          value={newCompany.credit_line}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-available-credit'
          inputType='number'
          labelName='Available Credit'
          target='available_credit'
          typeInput
          value={newCompany.available_credit}
        />
        <FormContent typeButton>
          <div className='flex'>
            <button
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              onClick={() => createCompany()}
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

CreateCompany.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default CreateCompany

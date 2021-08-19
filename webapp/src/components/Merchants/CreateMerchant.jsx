import React, { useState } from 'react'
import {
  Redirect,
  Link
} from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Header, Button, FormContent } from '../Common'
import options from './merchantCategories'

const CreateMerchant = (props) => {
  const { match } = props
  const [newMerchant, updateNewMerchant] = useState({
    name: '',
    category: options[0].name
  })
  const [created, setCreated] = useState(false)

  const handleChange = (value, target) => {
    updateNewMerchant(prev => ({
      ...prev,
      [target]: value
    }))
  }

  const createMerchant = () => {
    if (newMerchant.name.length > 0) {
      axios.post('http://localhost:8000/api/merchants/create/', newMerchant)
        .then(() => {
          setCreated(true)
        })
        .catch(() => {
          window.alert('Error creating merchant')
        })
    }
  }

  if (created) return <Redirect to={match.path} />

  return (
    <>
      <Header name='Merchant - Create' />

      <form className='w-full max-w-sm'>
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-merchant-name'
          labelName='Name'
          target='name'
          typeInput
          value={newMerchant.name}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-category'
          labelName='Category'
          selectData={options}
          selectValue='name'
          target='category'
          typeSelect
          value={newMerchant.category}
        />
        <FormContent typeButton>
          <div className='flex'>
            <button
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              onClick={() => createMerchant()}
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

CreateMerchant.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default CreateMerchant

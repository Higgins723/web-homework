import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  useParams,
  Redirect,
  Link
} from 'react-router-dom'
import { Header, Loading, FormContent, Button } from '../Common'
import options from './merchantCategories'

const EditMerchant = (props) => {
  const { match } = props
  const { id } = useParams()
  const [merchant, setMerchant] = useState(null)
  const [error, setError] = useState(false)
  const [updated, setUpdated] = useState(false)

  const handleChange = (value, target) => {
    setMerchant(prev => ({
      ...prev,
      [target]: value
    }))
  }

  const fetch = () => {
    axios.get(`http://localhost:8000/api/merchants/${id}/`)
      .then(({ data }) => {
        setMerchant(data)
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [])

  const updateMerchant = () => {
    if (merchant.name.length > 0) {
      axios.put(`http://localhost:8000/api/merchants/${id}/update/`, {
        id: merchant.id,
        name: merchant.name,
        category: merchant.category
      })
        .then(() => {
          setUpdated(true)
        })
        .catch(() => {
          window.alert('Error updating merchant')
        })
    }
  }

  if (error) return <div className='text-center'>There was an error requesting Merchant {id}</div>

  if (!merchant) return <Loading />

  if (updated) return <Redirect to={match.path} />

  return (
    <>
      <Header name='Merchant - Edit' />

      <form className='w-full max-w-sm'>
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-merchant-name'
          labelName='Name'
          target='name'
          typeInput
          value={merchant.name}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-category'
          labelName='Category'
          selectData={options}
          selectValue='name'
          target='category'
          typeSelect
          value={merchant.category}
        />
        <FormContent typeButton>
          <div className='flex'>
            <button
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              onClick={() => updateMerchant()}
              type='button'
            >
              Update :id={id}
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

EditMerchant.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default EditMerchant

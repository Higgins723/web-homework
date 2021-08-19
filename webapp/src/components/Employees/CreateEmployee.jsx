import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Link,
  Redirect
} from 'react-router-dom'
import { Header, Loading, Button, FormContent } from '../Common'

const CreateEmployee = (props) => {
  const { match } = props
  const [companies, setCompanies] = useState(null)
  const [error, setError] = useState(false)
  const [created, setCreated] = useState(false)
  const [newUser, updateNewUser] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    company: ''
  })

  const handleChange = (value, target) => {
    updateNewUser(prev => ({
      ...prev,
      [target]: value
    }))
  }

  const fetchCompanies = () => {
    axios.get('http://localhost:8000/api/companies')
      .then(({ data }) => {
        setCompanies(data)
        // set default company
        handleChange(data[0].id, 'company')
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const createUser = () => {
    if (newUser.firstName.length > 0 && newUser.lastName.length > 0 && newUser.dob.length > 0) {
      axios.post('http://localhost:8000/api/employees/create/', {
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        dob: newUser.dob,
        company: parseInt(newUser.company)
      })
        .then(() => {
          setCreated(true)
        })
        .catch(() => {
          window.alert('Error creating employee')
        })
    }
  }

  if (error) return <div className='text-center'>There was an error requesting companies or creating a new employee</div>

  if (!companies) return <Loading />

  if (created) return <Redirect to={match.path} />

  return (
    <>
      <Header name='Employees - Create' />

      <form className='w-full max-w-sm'>
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-first-name'
          labelName='First Name'
          placeholder='Albert'
          target='firstName'
          typeInput
          value={newUser.firstName}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-last-name'
          labelName='Last Name'
          placeholder='Einstein'
          target='lastName'
          typeInput
          value={newUser.lastName}
        />
        <FormContent
          handleChange={handleChange}
          htmlFor='inline-dob'
          labelName='Date of Birth'
          placeholder='MM-DD-YYYY'
          target='dob'
          typeInput
          value={newUser.dob}
        />
        <FormContent
          companies={companies}
          handleChange={handleChange}
          htmlFor='inline-company'
          labelName='Company'
          target='company'
          typeSelect
          value={newUser.company}
        />
        <FormContent typeButton>
          <div className='flex'>
            <button
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              onClick={() => createUser()}
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

CreateEmployee.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default CreateEmployee

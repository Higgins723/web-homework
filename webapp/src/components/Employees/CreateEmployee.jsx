import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Link,
  Redirect
} from 'react-router-dom'
import { Header, Loading, Button } from '../Common'

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
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-first-name'>
              First Name
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='inline-first-name'
              onChange={(event) => handleChange(event.target.value, 'firstName')}
              placeholder='Albert'
              required
              type='text'
              value={newUser.firstName}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-last-name'>
              Last Name
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='inline-last-name'
              onChange={(event) => handleChange(event.target.value, 'lastName')}
              placeholder='Einstein'
              required type='text'
              value={newUser.lastName}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-dob'>
              Date of Birth
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='inline-dob'
              onChange={(event) => handleChange(event.target.value, 'dob')}
              placeholder='MM-DD-YYYY'
              required
              type='text'
              value={newUser.dob}
            />
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-company'>
              Company
            </label>
          </div>
          <div className='md:w-2/3 relative'>
            <select
              className='block bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='inline-company'
              onChange={(event) => handleChange(parseInt(event.target.value), 'company')}
              required
              value={newUser.company}
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg className='fill-current h-4 w-4' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
            </div>
          </div>
        </div>
        <div className='md:flex md:items-center'>
          <div className='md:w-1/3' />
          <div className='md:w-2/3 flex'>
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
        </div>
      </form>
    </>
  )
}

CreateEmployee.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default CreateEmployee

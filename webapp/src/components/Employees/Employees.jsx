import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading'

const Employees = () => {
  const [employees, setEmployees] = useState(null)
  const [error, setError] = useState(null)

  const fetch = () => {
    axios.get('http://localhost:8000/api/employees/')
      .then(({ data }) => {
        setEmployees(data)
      })
      .catch(() => {
        setError(true)
      })
  }

  useEffect(() => {
    fetch()
  }, [])

  if (error) return <div className='text-center'>There was an error requesting Employees</div>

  if (!employees) return <Loading />

  return (
    <>
      Employees
    </>
  )
}

export default Employees

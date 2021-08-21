import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  useParams,
  Redirect,
  Link
} from 'react-router-dom'
import { Header, Button } from '../Common'

const DeleteTransaction = (props) => {
  const { match } = props
  const { id } = useParams()
  const [deleted, setDeleted] = useState(false)

  const deleteTransaction = () => {
    axios.delete(`http://localhost:8000/api/transactions/${id}/delete/`)
      .then(() => {
        setDeleted(true)
      })
      .catch(() => {
        window.alert(`Could not delete transaction with id: ${id}`)
      })
  }

  if (deleted) return <Redirect to={match.path} />

  return (
    <>
      <Header name='Transaction - Delete' />

      <div className='flex'>
        <button
          className='shadow bg-red-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          onClick={() => deleteTransaction()}
          type='button'
        >
          Delete id := {id}
        </button>
        <Link className='ml-5' to={match.path}>
          <Button color='bg-green-500' name='Cancel' />
        </Link>
      </div>
    </>
  )
}

DeleteTransaction.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default DeleteTransaction

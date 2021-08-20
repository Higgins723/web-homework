import React from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const { pageCount } = props

  // if pagecount is only 1, no need for pagination
  if (!(pageCount > 1)) return

  return (
    <div className='my-6'>
      <nav ariaLabel='Pagination' className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
        <a className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50' href='#'>
          <span className='sr-only'>Previous</span>
          <svg ariaHidden='true' className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path clipRule='evenodd' d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' fillRule='evenodd' />
          </svg>
        </a>
        <a ariaCurrent='page' className='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium' href='#'>
          1
        </a>
        <a className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium' href='#'>
          2
        </a>
        <a className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50' href='#'>
          <span className='sr-only'>Next</span>
          <svg ariaHidden='true' className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path clipRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' fillRule='evenodd' />
          </svg>
        </a>
      </nav>
    </div>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired
}

export default Pagination

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const {
    pageCount,
    curPage,
    setCurPage
  } = props
  const [pageOptions, setPageOptions] = useState(null)

  const handlePageLinks = () => {
    const temp = []

    for (let i = 1; i <= pageCount; i += 1) {
      temp.push({
        link: `page=${i}`,
        number: i
      })
    }

    setPageOptions(temp)
  }

  useEffect(() => {
    handlePageLinks()
  }, [pageCount])

  // if pagecount is only 1, no need for pagination
  if (!(pageCount > 1)) return null

  if (!pageOptions) return null

  const selectedCss = 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
  const defaultCss = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
  const arrowCss = 'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'

  return (
    <div className='my-6'>
      <nav aria-label='Pagination' className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
        <button className={`rounded-l-md ${arrowCss}`}>
          <span className='sr-only'>Previous</span>
          <svg aria-hidden='true' className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path clipRule='evenodd' d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' fillRule='evenodd' />
          </svg>
        </button>
        {pageOptions.map((option) => (
          <button className={option.number === curPage ? selectedCss : defaultCss} key={option.number} onClick={() => setCurPage(option.number)}>
            {option.number}
          </button>
        ))}
        <button className={`rounded-r-md ${arrowCss}`}>
          <span className='sr-only'>Next</span>
          <svg aria-hidden='true' className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path clipRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' fillRule='evenodd' />
          </svg>
        </button>
      </nav>
    </div>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  curPage: PropTypes.number.isRequired,
  setCurPage: PropTypes.func.isRequired
}

export default Pagination

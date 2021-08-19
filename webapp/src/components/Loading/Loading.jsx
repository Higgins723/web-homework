import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center mt-48'>
      <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500' />
    </div>
  )
}

export default Loading

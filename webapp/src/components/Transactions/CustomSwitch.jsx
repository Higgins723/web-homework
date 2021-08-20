import React from 'react'
import PropTypes from 'prop-types'

const CustomSwitch = (props) => {
  const { value, toggle, label } = props

  return (
    <div className='flex'>
      {label && (
        <div className='-mt-px mr-2 font-thin'>{label}</div>
      )}
      <div
        aria-checked={value}
        className={`w-11 h-6 items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer ${value ? 'bg-green-500' : ''}`}
        onClick={() => toggle()}
        onKeyDown={() => {}}
        role='radio'
        tabIndex={0}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${value ? 'translate-x-5' : ''}`}
        />
      </div>
    </div>
  )
}

CustomSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  label: PropTypes.string
}

CustomSwitch.defaultProps = {
  label: null
}

export default CustomSwitch

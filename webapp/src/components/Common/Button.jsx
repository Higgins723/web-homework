import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  const { color, name, type } = props
  const css = `${color} hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`

  return (
    <button className={css} type={type}>
      {name}
    </button>
  )
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.string
}

Button.defaultProps = {
  color: 'bg-white',
  type: ''
}

export default Button

import React from 'react'
import PropTypes from 'prop-types'

const FormContent = (props) => {
  const {
    typeInput,
    typeSelect,
    typeButton,
    handleChange,
    value,
    placeholder,
    labelName,
    htmlFor,
    target,
    selectData,
    selectValue,
    inputType,
    children
  } = props

  const labelCss = 'block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
  const inputCss = 'bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'

  const inputOrSelect = () => {
    if (typeInput) {
      return (
        <input
          className={inputCss}
          id={htmlFor}
          onChange={(event) => handleChange(event.target.value, target)}
          placeholder={placeholder}
          required
          type={inputType}
          value={value}
        />
      )
    }
    return (
      <>
        <select
          className={`block ${inputCss}`}
          id={htmlFor}
          onChange={(event) => handleChange((selectValue === 'id' ? parseInt(event.target.value) : event.target.value), target)}
          required
          value={value}
        >
          {selectData.map((obj) => (
            <option key={obj.id} value={selectValue === 'id' ? obj.id : obj.name}>{obj.name}</option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg className='fill-current h-4 w-4' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
        </div>
      </>
    )
  }

  return (
    <div className='md:flex md:items-center mb-6'>
      <div className='md:w-1/3'>
        {(!typeButton) && (
          <label className={labelCss} htmlFor={htmlFor}>
            {labelName}
          </label>
        )}
      </div>
      <div className={`md:w-2/3 ${typeSelect ? 'relative' : ''}`}>
        {typeButton ? (
          children
        ) : (
          inputOrSelect()
        )}
      </div>
    </div>
  )
}

FormContent.propTypes = {
  typeInput: PropTypes.bool,
  typeSelect: PropTypes.bool,
  typeButton: PropTypes.bool,
  handleChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string,
  labelName: PropTypes.string,
  htmlFor: PropTypes.string,
  target: PropTypes.string,
  selectData: PropTypes.instanceOf(Object),
  selectValue: PropTypes.oneOf(['id', 'name']),
  inputType: PropTypes.string,
  children: PropTypes.element
}

FormContent.defaultProps = {
  typeInput: false,
  typeSelect: false,
  typeButton: false,
  handleChange: () => {},
  placeholder: '',
  labelName: '',
  htmlFor: '',
  target: '',
  selectData: [],
  selectValue: 'id',
  inputType: 'text',
  children: <></>
}

export default FormContent

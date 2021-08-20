const formatCurrency = (value) => {
  const newValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return newValue.format(value)
}

export default formatCurrency

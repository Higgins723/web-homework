import React from 'react'
import {
  Link
} from 'react-router-dom'
import {
  faUsers,
  faHome,
  faStore,
  faBuilding,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navigation = () => {
  const navOptions = [
    {
      id: 1,
      name: 'Home',
      icon: faHome,
      link: '/'
    },
    {
      id: 2,
      name: 'Employees',
      icon: faUsers,
      link: '/employees'
    },
    {
      id: 3,
      name: 'Merchants',
      icon: faStore,
      link: '/merchants'
    },
    {
      id: 4,
      name: 'Companies',
      icon: faBuilding,
      link: '/companies'
    },
    {
      id: 5,
      name: 'Transactions',
      icon: faCreditCard,
      link: '/transactions'
    }
  ]

  return (
    <div className='w-64 h-screen bg-gray-100 shadow'>
      <div className='flex items-center justify-center mt-10'>
        <img alt='Divvy Logo' className='h-6' src='https://app.divvy.co/assets/icons/favicon.ico' />
      </div>

      <nav className='mt-10'>
        {navOptions.map((option) => (
          <Link key={option.id} to={option.link}>
            <div className='w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-200 hover:text-gray-700 focus:outline-none'>
              <span className='flex items-center'>
                <FontAwesomeIcon icon={option.icon} />

                <span className='mx-4 font-medium'>{option.name}</span>
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Navigation

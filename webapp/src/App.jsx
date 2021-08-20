import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navigation from './Navigation'
import Home from './components/Home'
import Employees from './components/Employees'
import Merchants from './components/Merchants'
import Companies from './components/Companies'

const App = () => {
  return (
    <Router>
      <div className='flex justify-start'>
        <Navigation />

        <div className='p-10 flex-1'>
          <Switch>
            <Route path='/transactions'>
              transactions
            </Route>
            <Route path='/companies'>
              <Companies />
            </Route>
            <Route path='/merchants'>
              <Merchants />
            </Route>
            <Route path='/employees'>
              <Employees />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App

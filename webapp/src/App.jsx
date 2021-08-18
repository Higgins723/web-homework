import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navigation from './Navigation'

const App = () => {
  return (
    <Router>
      <div className='flex justify-start'>
        <Navigation />

        <div className='p-10'>
          <Switch>
            <Route path='/transactions'>
              transactions
            </Route>
            <Route path='/companies'>
              companies
            </Route>
            <Route path='/merchants'>
              merchants
            </Route>
            <Route path='/employees'>
              employees
            </Route>
            <Route path='/'>
              home
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App

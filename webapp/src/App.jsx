import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navigation from './Navigation'
import Home from './components/Home'

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
              companies
            </Route>
            <Route path='/merchants'>
              merchants
            </Route>
            <Route path='/employees'>
              employees
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

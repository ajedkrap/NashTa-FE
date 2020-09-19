import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import getStore from './redux/store'

import Home from "./pages/home"
import AddEvent from "./pages/addEvent"
import Dashboard from "./pages/dashboard"
import NotFound from "./pages/notfound"

const App = () => {
  return (
    <>
      <Provider store={getStore.store}>
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/event' exact component={AddEvent} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </>

  );
}

export default App;

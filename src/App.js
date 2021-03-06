import React, { Component } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom'

//redux and react-redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

// Views
import Login from './views/Pages/Login/ManifoldLogin';
import Register from './views/Pages/Register/';
import Page404 from './views/Pages/Page404/';
import Page500 from './views/Pages/Page500/';

import GithubAuthSuccess from './views/Pages/Login/LoginComponents/GithubAuthSuccess';
import { GITHUB_DEFINED } from './utils/config';

//Oauth
import Code from './components/oauth/code';
import { requireAuth } from './utils/AuthService';

//redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

//drag-n-drop
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { fromJS } from 'immutable';

//landing pages
import SafeAndMine from './components/LandingPages/SafeAndMine';
import UTA from './components/LandingPages/UTA/UTA';
import PicoTagPage from './components/LandingPages/PicoTagPage';
import SquareTagPage from './components/LandingPages/SquareTagPage';

const initialState = fromJS({
  manifoldInfo: {
    things: {},
    communities: {}
  },
  identities: {}
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga);

class App extends Component {
  displayAppLandingPages() {
    let landingPages = [];
    //do some dynamic looping or such to figure out how many apps there are
    landingPages.push(
      <Route key="dynamic-route-1" path="/picolabs/safeandmine" name="Safe and Mine" component={SafeAndMine} />
    );
    landingPages.push(
      <Route key="dynamic-route-2" path="/picolabs/bus" name="UTA" component={UTA} />
    );
    landingPages.push(
      <Route key="dynamic-route-3" path="/picolabs/tag" name="PicoTag" component={PicoTagPage} />
    );
    landingPages.push(
      <Route key="dynamic-route-4" path="/sqtg/tag" name="SquarTag" component={SquareTagPage} />
    );
    return landingPages;
  }

  render() {
    return(
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login}/>
            {GITHUB_DEFINED && <Route exact path="/github/authsuccess/:uuid" name="Github Auth Success" component={GithubAuthSuccess}/>}
            <Route exact path="/register" name="Register Page" component={Register}/>
            <Route exact path="/404" name="Page 404" component={Page404}/>
            <Route exact path="/500" name="Page 500" component={Page500}/>
            <Route path="/code" component={Code}/>
            {this.displayAppLandingPages()}
            <Route path="/" name="Home" render={requireAuth}/>
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);

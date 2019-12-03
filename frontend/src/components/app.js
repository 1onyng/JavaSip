import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import ShopsFormContainer from './shops/shops_index';
import { Route } from 'react-router-dom';
import MainPage from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import BusinessShowContainer from "./businesses/business_show_container";
import BusinessSearchContainer from "./businesses/business_search_container";

const App = () => (
  <div>
    <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/search/:search" component={BusinessSearchContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/ShopsForm" component={ShopsFormContainer} />
        <Route exact path ='/businesses/:businessId' component={BusinessShowContainer}/>
    </Switch>
  </div>
);

export default App;
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import ShopsFormContainer from './shops/shops_index';
import { Route } from 'react-router-dom';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import BusinessShowContainer from "./businesses/business_show_container";
import BusinessSearchContainer from "./businesses/business_search_container";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faLaptop, faSearch, faStar, faMapMarkerAlt, faPhone, faWindowRestore, faCamera, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  library.add(fab, faLaptop, faSearch, faStar, faMapMarkerAlt, faPhone, faWindowRestore, faCamera, faTrashAlt);
  return(
  <div>
      <Switch>
          <Route exact path="/" component={MainPage}/>
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <AuthRoute exact path="/ShopsForm" component={ShopsFormContainer} />
          <Route exact path ='/businesses/:businessId' component={BusinessShowContainer}/>
          <Route exact path='/businesses/search' component={BusinessSearchContainer} />  
      </Switch>
    </div>
  );
};

export default App;
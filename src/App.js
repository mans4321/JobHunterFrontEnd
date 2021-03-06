import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './hoc/Layout/Layout';
import SearchEngine from './containers/SearchEngine/SearchEngine';
import Auth from './containers/Auth/Auth';
import JobsList from './containers/JobsList/JobsList';
import Logout from './containers/Auth/Logout/Logout';
import RestPassword from './containers/Auth/ForgetPassword/ForgetPassword';
import * as actions from './store/actions/index';

toast.configure({
    autoClose: 5000,
    position: toast.POSITION.TOP_CENTER
});

class App extends React.Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }



  render(){

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/JobsList" component={JobsList} />
        <Route path="/resetPassword" component={RestPassword} />
        <Route path="/" exact component={SearchEngine} />
        <Redirect to="/" />
      </Switch>
      );

      return (
        <div className="App">
          <Layout>
             {routes}
          </Layout>
        </div>
      )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( null, mapDispatchToProps )( App ) );

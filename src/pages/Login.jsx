import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Login extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleUser = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    history.push('/search');
  };

  render() {
    const { user, isLoading } = this.state;
    return (

      (
        isLoading ? <Loading />

          : (
            <div
              data-testid="page-login"
            >
              <Header />
              <form>
                <label htmlFor="user">
                  <input
                    data-testid="login-name-input"
                    type="text"
                    value={ user }
                    name="user"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="button">
                  <input
                    data-testid="login-submit-button"
                    value="Entrar"
                    disabled={ user.length < +'3' }
                    type="button"
                    name="button"
                    onClick={ this.handleUser }
                  />
                </label>
              </form>
              Login
            </div>))

    );
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;

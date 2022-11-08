import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
/* import Header from '../../components/Header'; */
import Logo from '../../assets/logo.svg';
import './style.css';

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
            <div className="container-pai">
              <div
                data-testid="page-login"
                className="login-container"
              >
                <img src={ Logo } alt="logo-app" />
                <form>
                  <label htmlFor="user">
                    <input
                      data-testid="login-name-input"
                      id="user"
                      type="text"
                      placeholder="Qual é o seu nome ?"
                      value={ user }
                      name="user"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    data-testid="login-submit-button"
                    disabled={ user.length < +'3' }
                    id="button"
                    type="button"
                    name="button"
                    onClick={ this.handleUser }
                    className="buton-login"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>))

    );
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;

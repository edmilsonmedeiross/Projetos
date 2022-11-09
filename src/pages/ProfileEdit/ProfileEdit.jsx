import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateUser, getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import './profileEdit.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isButtonLocked: true,
    emailIsValid: false,
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const k = await getUser();
    const { name, email, description, image } = k;
    this.setState({ name, email, description, image, isLoading: false });
  }

  hadleValidateButton = () => {
    const { name, email, description, image } = this.state;
    const isTrue = name.length && email.length && description.length && image.length > 0;
    this.setState({ isButtonLocked: !isTrue });
  };

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    this.setState({ emailIsValid: re.test(email) });
  };

  userUpdated = async () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    await updateUser({
      name, email, image, description,
    });
    history.push('/profile');
  };

  handleChange = (event) => {
    const { email } = this.state;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.validateEmail(email);
  };

  render() {
    const { name, email, description,
      image, isButtonLocked, emailIsValid, isLoading } = this.state;
    return (
      <div>
        <Header />
        <div
          data-testid="page-profile-edit"
        />
        {isLoading && <Loading />}
        <section className="page- edit">
          <fieldset
            onChange={ this.hadleValidateButton }
            className="form-edit"
          >
            Editar Perfil
            <label htmlFor="name">
              <input
                data-testid="edit-input-name"
                onChange={ this.handleChange }
                value={ name }
                type="text"
                name="name"
                id="name"
                placeholder="Digite seu nome"
              />
            </label>
            <label htmlFor="email">
              <input
                data-testid="edit-input-email"
                onChange={ this.handleChange }
                value={ email }
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu email"
              />
            </label>
            <textarea
              data-testid="edit-input-description"
              onChange={ this.handleChange }
              value={ description }
              placeholder="Insira sua descrição"
              name="description"
              id="description"
              cols="30"
              rows="10"
            />
            <label htmlFor="image">
              <input
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                value={ image }
                type="text"
                name="image"
                id="image"
                placeholder="Insira um link"
              />
            </label>
          </fieldset>
          <button
            className="botton-save"
            data-testid="edit-button-save"
            type="button"
            onClick={ this.userUpdated }
            disabled={ isButtonLocked || !emailIsValid }
          >
            Salvar
          </button>
        </section>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProfileEdit;

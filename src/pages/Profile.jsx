import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    person: {},
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const p = await getUser();
    this.setState({ person: p, isLoading: false });
  }

  render() {
    const { person: { name, image, email, description }, isLoading } = this.state;
    return (
      <div>
        <div
          data-testid="page-profile"
        >
          Profile
        </div>
        {isLoading && <Loading />}
        <section>
          <img data-testid="profile-image" src={ image } alt={ name } />
          <p>{ name }</p>
          <p>{ description }</p>
          <p>{ email }</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </section>
      </div>
    );
  }
}

export default Profile;

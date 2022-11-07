import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

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
    const { person: { name, email, description }, isLoading } = this.state;
    return (
      <div>
        <Header />
        <div
          data-testid="page-profile"
        />
        {isLoading && <Loading />}
        <section>
          <h4>{ name }</h4>
          <p>{ description }</p>
          <p>{ email }</p>
          <Link to="/profile/edit"><p>Editar perfil</p></Link>
        </section>
      </div>
    );
  }
}

export default Profile;

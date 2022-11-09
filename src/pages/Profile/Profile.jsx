import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import './profile.css';

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
    const { person: { name, email, description, image }, isLoading } = this.state;
    return (
      <main className="page-profile">
        <Header />
        {isLoading && <Loading />}
        <header className="top-bar-profile">
          <img src={ image } alt={ name } />
        </header>
        <section className="perfil">
          <div className="container-profile">
            <h3>Nome</h3>
            <h4>{ name }</h4>
          </div>
          <div className="container-profile">
            <h3>Descrição</h3>
            <p>{ description }</p>
          </div>
          <div className="container-profile">
            <h3>Email</h3>
            <p>{ email }</p>
            <Link className="button" to="/profile/edit"><p>Editar perfil</p></Link>
          </div>
        </section>
      </main>
    );
  }
}

export default Profile;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    isLoading: false,
    user: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const b = await getUser();
    this.setState({ user: b, isLoading: false });
  }

  render() {
    const { isLoading, user: { name, image } } = this.state;
    return (
      <header
        data-testid="header-component"
      >

        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>

        { isLoading ? <Loading />
          : (
            <section>
              <h3 data-testid="header-user-name">{ name }</h3>
              <img src={ image } alt={ name } />
            </section>)}
      </header>
    );
  }
}

export default Header;

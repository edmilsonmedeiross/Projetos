import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading';
import { getUser } from '../../services/userAPI';
import './style.css';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';
import { ReactComponent as Profileicon } from '../../assets/profileicon.svg';
import { ReactComponent as Staricon } from '../../assets/staricon.svg';
import Logo from '../../assets/logo.svg';

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
      <aside
        data-testid="header-component"
        className="header-navbar"
      >
        <img className="logo" src={ Logo } alt="app-logo" />

        <div className="container-nav">
          <span className="nav-link">
            <NavLink
              className="link"
              activeClassName="active"
              data-testid="link-to-search"
              to="/search"
            >
              <Lupa />
              Pesquisar
            </NavLink>
          </span>
          <span className="nav-link">
            <NavLink
              data-testid="link-to-favorites"
              to="/favorites"
              className="link"
              activeClassName="active"
            >
              <Staricon />
              Favoritas
            </NavLink>
          </span>
          <span className="nav-link">
            <NavLink
              data-testid="link-to-profile"
              to="/profile"
              className="link"
              activeClassName="active"
            >
              <Profileicon />
              Perfil
            </NavLink>
          </span>
        </div>
        { isLoading ? <Loading />
          : (
            <section>
              <h3 data-testid="header-user-name">{ name }</h3>
              <img src={ image } alt={ name } />
            </section>)}
      </aside>
    );
  }
}

export default Header;

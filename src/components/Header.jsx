import React, { Component } from 'react';
import Loading from '../pages/Loading';
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
    const { isLoading, user: { name } } = this.state;
    return (
      <div>
        <header
          data-testid="header-component"
        />
        { isLoading ? <Loading />
          : <span data-testid="header-user-name">{ name }</span>}
      </div>
    );
  }
}

export default Header;

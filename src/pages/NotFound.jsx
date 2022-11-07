import React, { Component } from 'react';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />
        <div
          data-testid="page-not-found"
        >
          NotFound
        </div>
      </div>
    );
  }
}

export default NotFound;

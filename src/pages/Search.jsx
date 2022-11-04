import React, { Component } from 'react';

class Search extends Component {
  state = {
    search: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
    return (
      <div>
        <span
          data-testid="page-search"
        >
          Search
        </span>
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChange }
              name="search"
              id="search"
              value={ search }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ search.length < +'2' }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

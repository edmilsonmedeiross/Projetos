import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Header from '../../components/Header';
import './style.css';

class Search extends Component {
  state = {
    search: '',
    isLoading: false,
    text: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value, text: false, artist: value,
    });
  };

  handleSearch = async () => {
    const { search } = this.state;
    this.setState({ isLoading: true });
    const albums = await searchAlbumsAPI(search);
    this.setState({ isLoading: false, text: true, search: '', albums });
  };

  render() {
    const { search, isLoading, text, artist, albums } = this.state;
    return (
      <section className="page-section">
        <Header />
        <section className="filha-main">
          <span
            data-testid="page-search"
          />
          <form className="container-search">
            {isLoading ? <Loading />
              : (
                <div>
                  <label htmlFor="search">
                    <input
                      data-testid="search-artist-input"
                      type="text"
                      onChange={ this.handleChange }
                      placeholder="Busque um Artista ou Banda"
                      name="search"
                      id="search"
                      value={ search }
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ search.length < +'2' }
                    onClick={ this.handleSearch }
                  >
                    Pesquisar
                  </button>
                </div>
              )}
          </form>
          {text
          && (
            albums.length
              ? (
                <section className="result">
                  <h2>
                    Resultado para álbuns de:
                    {' '}
                    { artist }
                  </h2>
                  <div className="albums">
                    {albums.map((album) => (
                      <div className="card" key={ album.collectionId }>
                        <img
                          alt={ album.collectionName }
                          src={ album.artworkUrl100 }
                        />
                        <span>{ album.collectionName }</span>
                        <span>{ album.artistName }</span>
                        <Link
                          data-testid={ `link-to-album-${album.collectionId}` }
                          to={ `/album/${album.collectionId}` }
                        >
                          Detalhes
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              ) : <span>Nenhum álbum foi encontrado</span>
          )}
        </section>
      </section>
    );
  }
}

export default Search;

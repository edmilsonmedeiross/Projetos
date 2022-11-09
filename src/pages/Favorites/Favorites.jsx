import React, { Component } from 'react';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Header from '../../components/Header';
import './favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    await this.handlePageFavorite();
  }

  handlePageFavorite = async () => {
    const y = await getFavoriteSongs();
    this.setState({ favoriteSongs: y });
  };

  render() {
    const { favoriteSongs } = this.state;

    return (
      <div className="page-favorites">
        <Header />
        <header className="top-bar">
          <h2>Músicas Favoritas</h2>
        </header>
        <section className="favorites-musics">
          <ol>
            <MusicCard callback={ this.handlePageFavorite } album={ favoriteSongs } />
          </ol>
        </section>
      </div>
    );
  }
}

export default Favorites;

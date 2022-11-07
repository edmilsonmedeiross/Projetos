import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';

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
      <div>
        <Header />
        <div
          data-testid="page-favorites"
        />
        <ol>
          <MusicCard callback={ this.handlePageFavorite } album={ favoriteSongs } />
        </ol>
      </div>
    );
  }
}

export default Favorites;

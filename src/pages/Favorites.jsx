import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
        <div
          data-testid="page-favorites"
        >
          Favorites
        </div>
        <ol>
          <MusicCard callback={ this.handlePageFavorite } album={ favoriteSongs } />
        </ol>
      </div>
    );
  }
}

export default Favorites;

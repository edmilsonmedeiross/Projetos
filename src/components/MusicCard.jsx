import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    await this.handleFavoriteMusics();
  }

  handleFavoriteMusics = async () => {
    const z = await getFavoriteSongs();
    this.setState({ favoriteSongs: z });
  };

  handleFavorites = async (infos) => {
    this.setState({ isLoading: true });
    await addSong(infos);
    this.setState({ isLoading: false });
  };

  render() {
    const { album } = this.props;
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div>
        <h3>Musics</h3>
        {
          album.map((track) => (
            <div key={ track.trackName }>
              <li>
                { track.trackName }
              </li>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label
                htmlFor="favorites"
              >
                Favorita
                <input
                  onChange={ async () => {
                    await this.handleFavorites(track);
                    await this.handleFavoriteMusics();
                  } }
                  data-testid={ `checkbox-music-${track.trackId}` }
                  type="checkbox"
                  name="check"
                  id={ track.trackId }
                  checked={ favoriteSongs.some((song) => song.trackId === track.trackId) }
                />
              </label>
            </div>
          ))
        }
        {isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MusicCard;

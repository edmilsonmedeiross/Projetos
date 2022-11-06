import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  handleFavorites = async (infos, { checked }) => {
    const { callback } = this.props;
    this.setState({ isLoading: true });
    if (checked) {
      await addSong(infos);
    } else {
      await removeSong(infos);
      await callback();
    }
    await this.handleFavoriteMusics();
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
                htmlFor={ track.trackId }
              >
                Favorita
                <input
                  onChange={ async ({ target }) => {
                    await this.handleFavorites(track, target);
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
  callback: PropTypes.func,
};

MusicCard.defaultProps = {
  callback: () => {},
};

export default MusicCard;
// requisito 11 tbm foi no commit anterior

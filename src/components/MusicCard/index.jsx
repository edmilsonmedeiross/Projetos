import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './style.css';

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
            <div
              key={ track.trackName }
              className="card-music"
            >
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
                className="label"
              >
                <input
                  type="checkbox"
                  id={ track.trackId }
                  onChange={ async ({ target }) => {
                    await this.handleFavorites(track, target);
                  } }
                  className="favorite"
                  data-testid={ `checkbox-music-${track.trackId}` }
                  name="check"
                  checked={ favoriteSongs
                    .some((song) => song.trackId === track.trackId) }
                />

                <svg
                  className="meusvg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4.318 6.318a4.5 4.5
                       0 000 6.364L12 20.364l7.682-7.682a4.5
                        4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
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

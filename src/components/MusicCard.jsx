import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  handleFavorites = async (infos) => {
    this.setState({ isLoading: true });
    await addSong(infos);
    this.setState({ isLoading: false });
  };

  render() {
    const { album } = this.props;
    const { isLoading } = this.state;
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
                  onChange={ () => { this.handleFavorites(track); } }
                  data-testid={ `checkbox-music-${track.trackId}` }
                  type="checkbox"
                  name="check"
                  id={ track.trackId }
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { album } = this.props;
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
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MusicCard;

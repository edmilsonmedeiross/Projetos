import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: [],
    info: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const [info, ...album] = await getMusics(id);
    this.setState({ album, info });
  }

  render() {
    const { album, info } = this.state;
    return (
      <div>
        <div
          data-testid="page-album"
        >
          Album
        </div>
        <img src={ info.artworkUrl100 } alt={ info.collectionName } />
        <span data-testid="artist-name">{ info.artistName }</span>
        <span data-testid="album-name">{ info.collectionName }</span>
        <div>
          <ol>
            <MusicCard album={ album } />
          </ol>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
    id: PropTypes.string,
  }).isRequired,
};

export default Album;

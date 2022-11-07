import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

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
        <Header />
        <div
          data-testid="page-album"
        />
        <img src={ info.artworkUrl100 } alt={ info.collectionName } />
        <h2 data-testid="artist-name">{ info.artistName }</h2>
        <h4 data-testid="album-name">{ info.collectionName }</h4>
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

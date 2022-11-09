import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';
import Header from '../../components/Header';
import './style.css';

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
      <main className="page-album">
        <Header />
        <header className="bar-top">
          <div>
            <h4 data-testid="album-name">{ info.collectionName }</h4>
            <h2 data-testid="artist-name">{ info.artistName }</h2>
          </div>
          <section className="album-image">
            <img src={ info.artworkUrl100 } alt={ info.collectionName } />
          </section>
        </header>
        <section className="card-musics">
          <ol>
            <MusicCard album={ album } />
          </ol>
        </section>
      </main>
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

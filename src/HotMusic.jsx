import React, { Component } from 'react';
import axios from 'axios';

class HotMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveMusic: false,
      newMusic: [],
      currGenre: 'pop'
    };
    this.getMusic = this.getMusic.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getMusic() {
    {/*use https://openwhyd.org/hot/GENRE */}
    const url ='/api/music?genre=' + this.state.currGenre;
    axios.get(url)
      .then(results => {
        return results.data;
      }).then(newMusic => {
        this.setState({
          haveMusic: true,
          newMusic: newMusic.tracks
        });
      });
  }

  handleChange(event) {
    this.setState({
      currGenre: event.target.value
    });
  }

  render() {
    const tracks = this.state.newMusic.map(track => {
      let trackInfo = track.name;
      if (track.eId) {
        let link = '';
        switch (track.eId.substring(1,3)) {
          case 'yt':
            link = "https://youtube.com/watch?v=" + track.eId.substring(4);
            break;
          case 'sc':
            link = ""; //track.eId.substring(track.eId.indexOf("https"));
            break;
          case 'vi':
            link = "https://vimeo.com/" + track.eId.substring(4);
            break;
          default:
        }
        trackInfo = (<a href={ link } target='_blank' rel='noopener'>{ track.name }</a>);
      }
      return (
        <tr key={ track.trackId }>
          <td>{ trackInfo }</td>
          <td>{ track.uNm }</td>
          <td><img src={ track.img } width='60' /></td>
        </tr>
  );
    });
    return (
      <div>
      <div className={ !this.state.haveMusic ? 'panel-body' : 'hidden'}>
        <figure>
          <img src='headphones.jpg' className='img-rounded img-responsive center-block' />
        </figure>
      </div>
      <div className={ this.state.haveMusic ? 'panel-body' : 'hidden'}>
        <div className='row'>
          <table className='table table-condensed'>
            <thead><tr><th>Track</th><th>Recommender</th><th>Art</th></tr></thead>
            <tbody>
            { tracks }
            </tbody>
          </table>
        </div>
      </div>
      <div className='panel-footer'>
        <div className='row center block'>
          <div className='col-md-3'>
            <label>Select Genre: </label>
          </div>
          <div className='col-md-9'>
            <select name='genre' value={ this.state.currGenre } onChange={ this.handleChange }> 
              <option value="blues">Blues</option>
              <option value="classical">Classical</option>
              <option value="electro">Electro</option>
              <option value="folk">Folk</option>
              <option value="hip hop">Hip Hop</option>
              <option value="indie">Indie</option>
              <option value="jazz">Jazz</option>
              <option value="latin">Latin</option>
              <option value="metal">Metal</option>
              <option value="pop">Pop</option>
              <option value="punk">Punk</option>
              <option value="reggae">Reggae</option>
              <option value="rock">Rock</option>
              <option value="soul">Soul</option>
              <option value="world">World</option>
            </select>
          </div>
        </div>
        <button className='btn btn-warning btn-block' onClick={ this.getMusic }>Find new music</button>
      </div>
      </div>
    );
  }
}

export default HotMusic;

import React, { Component } from 'react';

class RandomIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveIdea: false,
      activity: '',
      accessibility: 0,
      type: '',
      participants: 0,
      price: 0,
      link: '',
      key: ''
    };
    this.getIdea = this.getIdea.bind(this);
  }

  getIdea() {
    fetch('https://www.boredapi.com/api/activity')
      .then(results => {
        return results.json();
      }).then(newIdea => {
        this.setState({
          haveIdea: true,
          activity: newIdea.activity,
          accessibility: newIdea.accessibility,
          type: newIdea.type,
          participants: newIdea.participants,
          price: newIdea.price,
          link: newIdea.link,
          key: newIdea.key
        })
      });
  }

  render() {
    const activity = this.state.link.length > 0 ? (<p><a href={"" +this.state.link} target="_blank" rel="noopener">${this.state.activity}</a></p>) : (<p>{this.state.activity}</p>);
    return (
      <div>
      <div className={ !this.state.haveIdea ? 'panel-body' : 'hidden'}>
        <figure>
          <img src='dice.png' className='img-rounded img-responsive center-block' />
        </figure>
      </div>
      <div className={ this.state.haveIdea ? 'panel-body' : 'hidden'}>
        {/*use https://www.boredapi.com/api/activity*/}
        <div className='row'>
          <div className='col-md-3'>
            <label>Activity:</label>
          </div>
          <div className='col-md-9'>
            { activity }
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Easiness of activity:</label>
          </div>
          <div className='col-md-9'>
            <p><meter className='access' min='0' max='1' value={ this.state.accessibility }></meter></p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Type of activity:</label>   
          </div>
          <div className='col-md-9'>
            <p>{this.state.type }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label># of people needed:</label>   
          </div>
          <div className='col-md-9'>
              <p>{this.state.participants }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Price:</label>   
          </div>
          <div className='col-md-9'>
              <p><meter min='0' max='1' value={ this.state.price }></meter></p>
          </div>
        </div>
      </div>
      <div className='panel-footer'>
        <button className='btn btn-success btn-block' onClick={ this.getIdea }>Get a new idea</button>
      </div>
      </div>
    );
  }
}

export default RandomIdea;

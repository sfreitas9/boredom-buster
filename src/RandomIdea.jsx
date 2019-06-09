import React, { Component } from 'react';

class RandomIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          activity: newIdea.activity,
          accessiblity: newIdea.accessibility,
          type: newIdea.type,
          participants: newIdea.participants,
          price: newIdea.price,
          link: newIdea.link,
          key: newIdea.key
        });
      });
  }

  render() {
    return (
      <div className='panel-body'>
        {/*use https://www.boredapi.com/api/activity*/}
        <button className='btn btn-success' onClick={ getIdea }>Get a new idea</button>
        <p>Activity: { this.state.activity }</p>
        <p>Accessibility<meter min='0' max='1' value={ this.state.accessibility }></meter></p>
      </div>

    );
  }
}
import React, { Component } from 'react';
import RandomIdea from './RandomIdea';
import Jeopardy from './Jeopardy';
import News from './News';
import Music from './HotMusic';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='container'>
        <h1>Boredom Buster</h1>
        <h3 className='mb-5'>No need to be bored, pick a box and get an idea of how to get rid of your boredom.  Have fun!</h3>
        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                <h3>Discover a random activity</h3>
              </div>
              <RandomIdea />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-primary'>
              <div className='panel-heading'>
                <h3>Practice for Jeopardy</h3>
              </div>
              <Jeopardy />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-info'>
              <div className='panel-heading'>
                <h3>Catch up on the news</h3>
              </div>
              <News />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-warning'>
              <div className='panel-heading'>
                <h3>Find music to enjoy</h3>
              </div>
              <Music />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

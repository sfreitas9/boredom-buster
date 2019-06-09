import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div className='container'>
        <h1>Boredom Buster</h1>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel'>
              <div className='panel-heading'>
                Random Ideas to bust your boredom
              </div>
              <RandomIdea />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel'>
              <div className='panel-heading'>
                Discover "hot" music
              </div>
              <div className='panel-body'>
                {/*use https://openwhyd.org/hot/electro */}
              </div>  
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel'>
              <div className='panel-heading'>
                Practice for Jeopardy
              </div>
              <div className='panel-body'>
                {/*use http://jservice.io/api/random*/}
                </div>  
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel'>
              <div className='panel-heading'>
                TBD
              </div>
              <div className='panel-body'>
                {/*do something requiring an api */}
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

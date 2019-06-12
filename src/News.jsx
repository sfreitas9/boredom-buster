import React, { Component } from 'react';
const axios = require('axios'); 

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveIdea: false,
      latestNews: [],
      currIndex: 0,
      title: '',
      description: '',
      url: '',
      author: '',
      category: '',
      published: '',
      error: ''
    };
    this.getNews = this.getNews.bind(this);
    this.getNext = this.getNext.bind(this);
  }

  getNews() {
    axios.get('/api/news').then(results => {
        if (results.status === 200) {
          return results.data;
        }
      }).then(newNews => {
      // Test data
      //  let newNews = [
      //   {
      //       "id": "05039bdf-6537-4c2f-a1f2-3c4765a4dcf0",
      //       "title": "U.S. antitrust chief blasts Google and Amazon, citing historic breakups",
      //       "description": "Justice Department antitrust chief Makan Delrahim, shown in June 2018, on Tuesday compared today's technology giants to Standard Oil and other companies the U.S. government broke up....",
      //       "url": "http://www.latimes.com/business/la-fi-tn-antitrust-google-amazon-technology-20190611-story.html",
      //       "author": "Ben Brody",
      //       "image": "None",
      //       "language": "en",
      //       "category": [
      //           "technology"
      //       ],
      //       "published": "2019-06-11 21:41:33 +0000"
      //   },
      //   {
      //       "id": "aafe0a5a-8989-4ff4-a7aa-081e354622d1",
      //       "title": "James Corden failed to impress as Tony Awards host",
      //       "description": "\"Now his body’s fatter, ego’s bigger and magic’s thinner. The Tonys’ splashy opening? Big rehearsal. Small twinkle.\"...",
      //       "url": "https://pagesix.com/2019/06/11/james-corden-failed-to-impress-as-tony-awards-host/",
      //       "author": "Cindy Adams",
      //       "image": "None",
      //       "language": "en",
      //       "category": [
      //           "entertainment"
      //       ],
      //       "published": "2019-06-11 21:41:33 +0000"
      //   }];
        const index = 0;
        this.setState({
          haveNews: true,
          latestNews: newNews,
          currIndex: index, 
          title: newNews[index].title,
          description: newNews[index].description,
          url: newNews[index].url,
          author: newNews[index].author,
          category: newNews[index].category.join(),
          published: new Date(newNews[index].published).toLocaleDateString(),
          error: ''
        });
      }).catch(error => {
        this.setState({
          haveNews: false,
          latestNews: [],
          error: 'Sorry cannot get news today'
        })
      });
  }

  getNext() {
    this.setState({
      currIndex: this.state.currIndex + 1, 
      title: this.state.latestNews[this.state.currIndex].title,
      description: this.state.latestNews[this.state.currIndex].description,
      url: this.state.latestNews[this.state.currIndex].url,
      author: this.state.latestNews[this.state.currIndex].author,
      category: this.state.latestNews[this.state.currIndex].category.join(),
      published: new Date(this.state.latestNews[this.state.currIndex].published).toLocaleDateString(),
      error: ''
  });
}


  render() {
    const article = this.state.url.length > 0 ? (<p><a href={"" +this.state.url} target="_blank" rel="noopener">{ this.state.title }</a></p>) : (<p>{ this.state.title }</p>);
    return (
      <div>
      <div className={ !this.state.haveNews ? 'panel-body' : 'hidden'}>
        <h4 className='center-block text-danger'>{ this.state.error }</h4>
        <figure>
          <img src='news.png' className='img-rounded img-responsive center-block' />
        </figure>
      </div>
      <div className={ this.state.haveNews ? 'panel-body' : 'hidden'}>
        <div className='row'>
          <div className='col-md-3'>
            <label>Article:</label>
          </div>
          <div className='col-md-9'>
            { article }
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Description:</label>
          </div>
          <div className='col-md-9'>
            <p>{ this.state.description }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Author:</label>   
          </div>
          <div className='col-md-9'>
            <p>{this.state.author }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Topic:</label>   
          </div>
          <div className='col-md-9'>
              <p>{this.state.category }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Date:</label>   
          </div>
          <div className='col-md-9'>
              <p>{ this.state.published }</p>
          </div>
        </div>
        <div className='row'>
         <button className='btn btn-default center-block' onClick={ this.getNext }>Get next story</button>
        </div>
      </div>
      <div className='panel-footer'>
        <button className='btn btn-info btn-block' onClick={ this.getNews }>Get latest news</button>
      </div>
      </div>
    );
  }
}

export default News;

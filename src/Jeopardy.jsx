import React, { Component } from 'react';
import Bounce from 'react-reveal/Bounce'; 
import axios from 'axios';

class Jeopardy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveQuestion: false,
      showAnswer: false,
      category: '',
      points: 0,
      question: '',
      answer: '',
      currAns: '',
      correct: '',
      score: 0
    };
    this.getQuestion = this.getQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getQuestion() {
    axios.get('/api/jeopardy').then(results => {
        if (results.status === 200) {
          return results;
        }
    }).then(newQuestion => {
        newQuestion = newQuestion.data[0];
        this.setState({
          haveQuestion: true,
          showAnswer: false,
          category: newQuestion.category.title.split(' ').map(function(word) {
            return word[0].toUpperCase() + word.slice(1)
            }).join(' '),
          points: newQuestion.value,
          question: newQuestion.question,
          answer: newQuestion.answer,  //TODO: need to strip HTML from answer
          currAns: '',
          correct: ''
        });
        console.log(`answer is ${this.state.answer}`);
      });
  }

  checkAnswer() {
    if (this.state.currAns.toLowerCase() === this.state.answer.toLowerCase() && !this.state.correct) {
      this.setState({
        score: this.state.score + this.state.points,
        correct: 'bg-success',
        showAnswer: true
      });
    } else {
      this.setState({
        correct: 'bg-danger'
      })
    }
  }

  showAnswer() {
    this.setState({
      showAnswer: true
    });
  }

  handleChange(event) {
    this.setState({
      currAns: event.target.value
    });
  }

  render() {
    return (
    <div>
      <div className={ !this.state.haveQuestion ? 'panel-body' : 'hidden'}>
        <figure>
          <img src='jeopardy-logo.jpg' className='img-rounded img-responsive' />
          <figcaption>© "JEOPARDY!" is a registered trademark of Jeopardy Productions, Inc. License: All Rights Reserved.</figcaption>
        </figure>
      </div>
      <div className={ this.state.haveQuestion ? 'panel-body' : 'hidden'}>
        {/*use http://jservice.io/api/random*/}
        <div className='row'>
          <div className='col-md-3'>
            <label>Category:</label>
          </div>
          <div className='col-md-9'>
            <p>{ this.state.category }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Points:</label><br />
          </div>
          <div className='col-md-9'>
            <p>{ this.state.points }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label>Answer:</label>
          </div>
          <div className='col-md-9'>
            <p>{ this.state.question }</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label htmlFor='answer'>What is/are...</label>   
          </div>
          <div className='col-md-9'>
            <input type="text" name='answer' value={ this.state.currAns } autoComplete='off' className={ this.state.correct } onChange={ this.handleChange }/> ?
            <button className='btn btn-default ml-md' onClick={ this.checkAnswer }>Answer</button>
            <button className='btn btn-default ml-md' onClick={ this.showAnswer }>Give Up</button>
            <div className={ this.state.showAnswer ? this.state.correct ? 'visibile text-success' : 'visibile text-danger' : 'invisible'}>{ this.state.answer }</div>
          </div>
        </div>
        <div className='row'>
          <hr />
          <div className='col-md-3'>
            <label>Current Score:</label>
          </div>
          <div className='col-md-9'>
            <Bounce when={ this.state.correct } collapse>
              <p>{ this.state.score }</p>
            </Bounce>
            <Bounce when={ !this.state.correct } collapse>
              <p>{ this.state.score }</p>
            </Bounce>
          </div>
        </div>
      </div>
      <div className='panel-footer'>
        <button className='btn btn-primary btn-block' onClick={ this.getQuestion }>Get new question</button>
      </div>
    </div>
    );
  }
}

export default Jeopardy;

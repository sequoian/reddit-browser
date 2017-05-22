import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import './reset.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Reddit Archaeologist</h1>
        <div>Browse the top reddit posts from any period of time</div>
      </header>
    );
  }
}

class LinkController extends Component {
  createLink() {
    const startTime = this.props.startDate.unix();
    const endTime = this.props.endDate.unix();
    const subreddit = this.props.subreddit || 'all';

    return `https://www.reddit.com/r/${subreddit}/search?q=timestamp:${startTime}..${endTime}&sort=top&restrict_sr=on&syntax=cloudsearch`
  }

  render() {
    if (this.props.startDate && this.props.endDate) {
      const link = this.createLink()
      const dateDisplayFormat = 'MMM DD, YYYY';
      return (
        <div>
          <a href={link} id="reddit-link">Browse!</a>
          <div>
            <button onClick={this.props.moveDateBackward}>Previous</button>
            <span className="range-display">
              {this.props.startDate.format(dateDisplayFormat)} - {this.props.endDate.format(dateDisplayFormat)}
            </span>
            <button onClick={this.props.moveDateForward}>Next</button>
          </div>
        </div>
      );
    }
    else {
      return null;
    }  
  }
}

class DateForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="start-date">From:</label>
        <DatePicker 
          id="start-date" 
          placeholderText="Click to select a date" 
          selected={this.props.startDate}
          onChange={this.props.changeStartDate}
          selectsStart
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <label htmlFor="end-date">To:</label>
        <DatePicker 
          id="end-date" 
          placeholderText="Click to select a date" 
          selected={this.props.endDate}
          onChange={this.props.changeEndDate}
          selectsEnd
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"        
        />
        <label htmlFor="subreddit">Subreddit:</label>
        <input 
          type="text" 
          placeholder="all" 
          id="subreddit"
          value={this.props.subreddit}
          onChange={this.props.changeSubreddit} 
        />
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      subreddit: ''
    }
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeSubreddit = this.changeSubreddit.bind(this);
  }

  changeStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  changeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  changeSubreddit(event) {
    this.setState({
      subreddit: event.target.value
    });
  }

  render() {
    
    return (
      <div className="App">
        <Header />
        <LinkController
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          subreddit={this.state.subreddit}
        />
        <DateForm
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          subreddit={this.state.subreddit}
          changeStartDate={this.changeStartDate}
          changeEndDate={this.changeEndDate}
          changeSubreddit={this.changeSubreddit}
        />
      </div>
    );
  }
}

export default App;

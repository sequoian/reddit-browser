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
  render() {
    return (
      <div>
        <a href={this.props.redditLink} id="reddit-link">Browse!</a>
        <div>
          <button onClick={this.props.moveDateBackward}>Previous</button>
          <span className="range-display">
            {this.props.startDate} - {this.props.endDate}
          </span>
          <button onClick={this.props.moveDateForward}>Next</button>
        </div>
      </div>
    );
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
      startDate: moment(),
      endDate: moment().add(7, 'days'),
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
    const dateDisplayFormat = 'MMM DD, YYYY';
    return (
      <div className="App">
        <Header />
        <LinkController
          redditLink="#"
          startDate={this.state.startDate.format(dateDisplayFormat)}
          endDate={this.state.endDate.format(dateDisplayFormat)}
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

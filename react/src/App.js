import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

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
    // Create new moments from props, then change their time value to fully cover range
    const startDate = moment(this.props.startDate);
    const endDate = moment(this.props.endDate);
    startDate.startOf('day');
    endDate.endOf('day');

    const startTime = startDate.unix();
    const endTime = endDate.unix();
    const subreddit = this.props.subreddit || 'all';

    return `https://www.reddit.com/r/${subreddit}/search?q=timestamp:${startTime}..${endTime}&sort=top&restrict_sr=on&syntax=cloudsearch`
  }

  render() {
    if (this.props.startDate && this.props.endDate) {
      const link = this.createLink()
      const dateDisplayFormat = 'MMM DD, YYYY';
      const range = this.props.getDateRange();
      return (
        <div id="link-area">
          <a href={link} id="reddit-link" className="active">Browse!</a>
          <div>
            <button onClick={this.props.moveDateBackward}>Previous</button>
            <span className="date-display">
              {this.props.startDate.format(dateDisplayFormat)} - {this.props.endDate.format(dateDisplayFormat)}
            </span>
            <button onClick={this.props.moveDateForward}>Next</button>
          </div>
          <div className="range-display">
            Range: {range} {range === 1 ? 'day' : 'days'}
          </div>   
        </div>
      );
    }
    else {
      return(
        <div id="link-area">
          <div id="reddit-link">Browse!</div>
          <p>Select the dates to see the top posts for that date range.</p>
        </div>
      );
    }  
  }
}

class DateForm extends Component {
  render() {
    return (
      <form>
        <div className="dates">
          <div>
            <label htmlFor="start-date">From:</label>
            <DatePicker 
              id="start-date" 
              placeholderText="Click to select a date" 
              selected={this.props.startDate}
              onChange={this.props.changeStartDate}
              selectsStart
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              maxDate={this.props.endDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              isClearable={true}
            />
          </div>
          <div>
            <label htmlFor="end-date">To:</label>
            <DatePicker 
              id="end-date" 
              placeholderText="Click to select a date" 
              selected={this.props.endDate}
              onChange={this.props.changeEndDate}
              selectsEnd
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              minDate={this.props.startDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" 
              isClearable={true}       
          />
          </div>
        </div>
        <div>
          <label htmlFor="subreddit">Subreddit:</label>
          <input 
            type="text" 
            placeholder="all" 
            id="subreddit"
            value={this.props.subreddit}
            onChange={this.props.changeSubreddit} 
          />
        </div>
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
    this.moveDates = this.moveDates.bind(this);
    this.moveDateForward = this.moveDateForward.bind(this);
    this.moveDateBackward = this.moveDateBackward.bind(this);
    this.getDateRange = this.getDateRange.bind(this);
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

  /**
   * Moves the current date range forward or backward in time by the length of the range.
   * Callback is expected to be a moment.js mutation: add or subtract, which causes
   * the range to move forward or backward in time, respectively.
   */ 
  moveDates(callback) {
    if (this.state.startDate && this.state.endDate) {
      this.setState((prevState) => {
        const range = this.getDateRange();
        const newStart = callback.apply(prevState.startDate, [range, 'days'])
        const newEnd = callback.apply(prevState.endDate, [range, 'days']);
        return {
          startDate: newStart,
          endDate: newEnd
        };
      });
    }
  }

  moveDateForward() {
    this.moveDates(moment.prototype.add);
  }

  moveDateBackward() {
    this.moveDates(moment.prototype.subtract);
  }

  getDateRange() {
    const difference = this.state.startDate.diff(this.state.endDate);
    const duration = moment.duration(Math.abs(difference));
    return Math.round(duration.asDays() + 1); // add 1 to include endDate in range
  }

  render() {
    return (
      <div className="App">
        <Header />
        <LinkController
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          subreddit={this.state.subreddit}
          moveDateForward={this.moveDateForward}
          moveDateBackward={this.moveDateBackward}
          getDateRange={this.getDateRange}
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

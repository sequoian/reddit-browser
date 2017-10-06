import React, { Component } from 'react';
import moment from 'moment';

import DateForm from './DateForm'

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
    this.search = this.search.bind(this)
  }

  search() {
    let {startDate, endDate, subreddit} = this.state

    if (!startDate || !endDate) {
      return null
    }

    let startFormat = moment(this.props.startDate);
    let endFormat = moment(this.props.endDate);
    startFormat = startFormat.startOf('day');
    endFormat = endFormat.endOf('day');

    const start = startFormat.unix();
    const end = endFormat.unix();
    const sub = subreddit.trim() || 'all';
    const url = `/search?start=${start}&end=${end}&sub=${sub}`

    fetch(url)
      .then(response => {
        if (response.status > 400) {
          throw new Error(response.status)
        }
        else {
          return response.json()
        }  
      })
      .then(json => {
        console.log(json.data.children)
      })
      .catch(e => {
        console.log(e)
      })
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
        <DateForm
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          subreddit={this.state.subreddit}
          changeStartDate={this.changeStartDate}
          changeEndDate={this.changeEndDate}
          changeSubreddit={this.changeSubreddit}
          search={this.search}
        />
      </div>
    );
  }
}

export default App;

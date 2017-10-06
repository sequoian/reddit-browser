import React, { Component } from 'react';

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

export default LinkController
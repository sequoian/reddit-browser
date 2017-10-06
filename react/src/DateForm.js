import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

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

        <button
          type="button"
          onClick={this.props.search}
        >Search</button>
      </form>
    );
  }
}

export default DateForm
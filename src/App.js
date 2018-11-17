import React, { Component } from 'react';
import { connect } from 'react-redux'

import RedditDisplay  from './RedditDisplay';
import Actions  from './Actions'

import './App.css';



const mapStateToProps = (state, ownProps) => {
  return {
    subReddit : state
  }
}

const mapDispatchToProps = dispatch =>  Actions(dispatch)

class App extends Component {
  componentWillMount() {
    this.props.fetchReddit();
    this.keyPressed = "previous";
  }

  componentDidMount() {
    this.textInput.focus();
  }

  renderSubreddits() {
    var _this = this;

    return this.props.subReddit.data.map(function(item, index) {
      if (item.data.thumbnail_width) {
        return <RedditDisplay
            index={index}
            currentDisplayIndex = {_this.props.subReddit.currentDisplayIndex}
            keyPressed = {_this.keyPressed}
            key={index}
            item={item}/>
      } else {
        return <div key={index} ></div>
      }
    });
  }

  showNext() {
    this.keyPressed = "next";
    this.props.showNext();
  }

  showPrevious() {
    this.keyPressed = "previous";
    this.props.showPrevious();
  }

  handleKeyDown=(e)=> {
    if (e.which == "39") {
      this.showNext();
    } else if (e.which == "37"){
      this.showPrevious();
    }
  }

  handleClick = () => {
    this.textInput.focus();
  }

  render() {

    return (
      <div onClick={this.handleClick} className="MainContainer">
        <input
          style={{position: "absolute", right: "9999px", top: "9999px"}}
          ref={(input) => { this.textInput = input; }}
          onKeyDown={this.handleKeyDown} autoFocus/>
        <div className="MainView">
          {this.renderSubreddits()}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

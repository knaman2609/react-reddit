import React, { Component } from 'react';
import './App.css';

class RedditDisplay extends Component {
  componentWillMount() {
    if (!window.__SPACE)
      window.__SPACE = 1000;

    this.offset = window.__SPACE * this.props.index / 450;
    window.__SPACE += this.offset;

    this.setState({insideDisplay: false});
  }

  renderFullSizeImage = () => {
    if (this.state.insideDisplay) {
      return <img  className="RedditFullImage" src={this.props.item.data.url}/>
    } else {
      return null
    }
  }

  mouseEnter = () => {
    if (this.props.index == this.props.currentDisplayIndex)
    this.setState({insideDisplay: true});
  }

  mouseLeave = () => {
    this.setState({insideDisplay: false});
  }

  render() {

    var offset;
    var visibility = "display";

    if (this.props.keyPressed == "previous") {
      if (this.props.index > this.props.currentDisplayIndex)
        visibility = "none";
      else
        visibility = "block";
    } else {
      if (this.props.index <= this.props.currentDisplayIndex)
        visibility = "block";
      else
        visibility = "none";
    }

    var backgroundImage = this.props.item.data.thumbnail;

    return (
      <div onMouseEnter={this.mouseEnter}  onMouseLeave={this.mouseLeave} className="RedditDisplay" style={{left: this.offset , top: this.offset, display: visibility}}>
        <div className="RedditCoverImage" style={{backgroundImage: "url(" + backgroundImage + ")"}}></div>
        <div className="RedditText" >{this.props.item.data.title}</div>
        {this.renderFullSizeImage()}
      </div>
    );
  }
}

export default RedditDisplay;

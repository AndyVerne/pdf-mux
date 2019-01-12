import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Viewer from "./Viewer.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
      close: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handle = () => {};

  render() {
    return (
      <div>
        {this.state.close ? null : (
          <Viewer
            handle={this.handle}
            height={this.state.height}
            file={null}
            value={"none"}
            currentPage={0}
          />
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Viewer from "./Viewer.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      close: false
    };
  }

  render() {
    return (
      <div>
        {this.state.close ? null : (
          <Viewer
            handle={() => {}}
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

import React, { Component } from 'react';
import SplitPane from 'react-split-pane'
import PdfViewer from './PdfViewer';
import _ from 'lodash'

class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      split: "",
      size: "50%",
      resizerStyle: "",
      allowResize: true,
      close: 0,
      lr: "",
      file: null,
    };
  }

  componentWillMount = () => {
    if (this.props.file !== null) {
      this.setState(() => ({
        file: this.props.file
      }))
    }
  }

  vSplit = () => {
    this.setState(() => ({ 
      split: "vertical",
    }));
  }
  
  hSplit = () => {
    this.setState(() => ({ 
      split: "horizontal",
    }));
  }

  lClose = () => {
    if (this.state.close >= 1) {
      this.props.handle()
    }
    this.setState((state) => ({
      size: "0%",
      allowResize: false,
      resizerStyle: {
        display: "none"
      },
      lr: "left",
      close: state.close + 1
    }));
  }

  rClose = () => {
    if (this.state.close >= 1) {
      this.props.handle()
    } 
    this.setState((state) => ({
      size: "100%",
      allowResize: false,
      resizerStyle: {
        display: "none"
      },
      lr: "right",
      close: state.close + 1
    }));
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  }

  render() {
    const id = _.uniqueId();
    return (
        <div>
        {this.state.split === "" ? 
          <div>
            <div style={{width: "100%", background: "white", display: "flex", justifyContent: "center"}}>
              <button style={{ marginRight: "auto"}}></button>
              <button onClick={this.vSplit}></button>
              <button onClick={this.hSplit}></button>
              <button onClick={this.props.close}></button>
              <input
                type="file"
                onChange={this.onFileChange}
                style={{display: "none"}}
                id={id}
              />
              <label htmlFor={id}></label>
              <div style={{marginLeft: "auto", width: "70px", textAlign: "center", color: "gray"}}>12</div>
            </div>
            <PdfViewer 
              file={this.state.file}
            ></PdfViewer>
          </div>:
          <SplitPane 
            split={this.state.split} 
            size={this.state.size}
            resizerStyle={this.state.resizerStyle}
            paneStyle={{background: "white"}}
            pane2Style={this.state.split === "vertical" ? {width: "0%"} : null}
            allowResize={this.state.allowResize}
            onDragFinished={this.update}
          >
            {this.state.lr === "left" ? <div></div>: 
            <div style={{flex: 1}}>
              <Viewer
                close={this.lClose}
                handle={this.rClose}
                file={this.state.file}
              ></Viewer>
            </div>}
            {this.state.lr === "right" ? <div></div>: 
            <Viewer
              close={this.rClose}
              handle={this.lClose}
              file={this.state.file}
            ></Viewer>}
          </SplitPane>}
        </div>
    )
  }
}

export default Viewer;
import React, { Component } from "react";
import SplitPane from "react-split-pane";
import PdfViewer from "./PdfViewer";
import _ from "lodash";

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
      numPages: 0,
      currentPage: 0,
      page: "",
      setPage: null
    };
  }

  componentWillMount = () => {
    if (this.props.file !== null) {
      this.setState(() => ({
        file: this.props.file
      }));
    }
  };

  vSplit = () => {
    this.setState(() => ({
      split: "vertical"
    }));
  };

  hSplit = () => {
    this.setState(() => ({
      split: "horizontal"
    }));
  };

  lClose = () => {
    if (this.state.close >= 1) {
      this.props.handle();
    }
    this.setState(state => ({
      size: "0%",
      allowResize: false,
      resizerStyle: {
        display: "none"
      },
      lr: "left",
      close: state.close + 1
    }));
  };

  rClose = () => {
    if (this.state.close >= 1) {
      this.props.handle();
    }
    this.setState(state => ({
      size: "100%",
      allowResize: false,
      resizerStyle: {
        display: "none"
      },
      lr: "right",
      close: state.close + 1
    }));
  };

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  getNumPages = numPages => {
    this.setState({
      numPages
    });
  };

  getCurrentPage = currentPage => {
    if (currentPage !== this.state.currentPage) {
      this.setState({
        currentPage
      });
    }
  };

  getPage = event => {
    if (event.keyCode === 13) {
      const page = parseInt(this.state.page);
      if (page !== NaN && page > 0 && page <= this.state.numPages) {
        this.state.setPage(page);
        console.log(page);
      }
      this.setState({
        page: ""
      });
    }
  };

  setPage = sP => {
    this.state.setPage = sP;
  };

  render() {
    const id = _.uniqueId();
    return (
      <div>
        {this.state.split === "" ? (
          <div>
            <div
              style={{
                width: "100%",
                background: "white",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <button style={{ marginRight: "auto", marginLeft: "20px" }} />
              <button onClick={this.vSplit} />
              <button onClick={this.hSplit} />
              <button onClick={this.props.close} />
              <input
                type="file"
                onChange={this.onFileChange}
                style={{ display: "none" }}
                id={id}
              />
              <label htmlFor={id} />
              <div style={{ marginLeft: "auto" }}>
                <div
                  style={{
                    marginRight: "20px",
                    display: "inline-block",
                    textAlign: "right",
                    color: "gray"
                  }}
                >
                  <input
                    type="text"
                    style={{ width: "20px" }}
                    value={this.state.page}
                    placeholder={this.state.currentPage}
                    onChange={e => this.setState({ page: e.target.value })}
                    onKeyDown={this.getPage}
                  />
                  ( {this.state.currentPage} of {this.state.numPages} )
                </div>
              </div>
            </div>
            <PdfViewer
              file={this.state.file}
              getNumPages={this.getNumPages}
              getCurrentPage={this.getCurrentPage}
              setPage={this.setPage}
            />
          </div>
        ) : (
          <SplitPane
            split={this.state.split}
            size={this.state.size}
            resizerStyle={this.state.resizerStyle}
            paneStyle={{ background: "white" }}
            pane2Style={
              this.state.split === "vertical" ? { width: "0%" } : null
            }
            allowResize={this.state.allowResize}
            onDragFinished={this.update}
          >
            {this.state.lr === "left" ? (
              <div />
            ) : (
              <div style={{ flex: 1 }}>
                <Viewer
                  close={this.lClose}
                  handle={this.rClose}
                  file={this.state.file}
                />
              </div>
            )}
            {this.state.lr === "right" ? (
              <div />
            ) : (
              <Viewer
                close={this.rClose}
                handle={this.lClose}
                file={this.state.file}
              />
            )}
          </SplitPane>
        )}
      </div>
    );
  }
}

export default Viewer;

import { FixedSizeList as List } from "react-window";
import React, { Component } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import Measure from "react-measure";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true
};

export default class PdfViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdf: null,
      width: 0,
      height: 0,
      itemScale: 0,
      loaded: false,
      numPages: null,
      currentPage: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.file !== nextProps.file || this.state.loaded === false) {
      this.state.currentPage = 0;
      this.state.loaded = false;
      return true;
    } else {
      return false;
    }
  }

  onDocumentLoadSuccess = pdf => {
    const promise = pdf.getPage(1);
    if (this.state.pdf !== null) {
      this.state.pdf.destroy();
      this.state.pdf=null;
    }
    promise.then(page => {
      const viewport = page.getViewport(1);
      this.props.getNumPages(pdf.numPages);
      this.props.getSetPage(this.setPage);
      this.listRef = React.createRef();
      this.setState({
        pdf,
        numPages: pdf.numPages,
        itemScale: viewport.height / viewport.width,
        loaded: true
      });
    });
  };

  updateCurrentVisiblePage = ({ visibleStopIndex }) => {
    if (this.state.loaded === true && this.state.currentPage !== 0) {
      this.state.currentPage = visibleStopIndex + 1;
      this.props.getCurrentPage(this.state.currentPage);
    }
  };

  setPage = page => {
    if (page !== 0) {
      this.state.currentPage = page;
      this.props.getCurrentPage(this.state.currentPage);
      this.listRef.current.scrollToItem(page - 1, "start");
    }
  };

  componentDidUpdate = () => {
    if (this.state.loaded === true && this.state.currentPage === 0) {
      this.setPage(this.props.currentPage);
    }
  };

  componentWillUnmount = () => {
    if (this.state.pdf !== null) {
      this.state.pdf.destroy();
      this.state.pdf=null;
      this.setState({
        loaded: false
      });
    }
    console.log('unmout pdf')
  }

  onItemClick = ({pageNumber}) => {
    this.props.pushStack(this.state.currentPage);
    this.setPage(pageNumber);
  }

  render() {
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({
            width: contentRect.bounds.width,
            height: contentRect.bounds.height
          });
        }}
      >
        {({ measureRef }) => (
          <div
            className="viewer"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              position: "absolute"
            }}
            ref={measureRef}
          >
            <div className="document_container">
              <Document
                file={this.props.file}
                onLoadSuccess={this.onDocumentLoadSuccess}
                onItemClick={this.onItemClick}
                options={options}
                noData=""
                loading=""
              >
                {this.state.loaded ? (
                  <List
                    ref={this.listRef}
                    height={this.state.height}
                    width={this.state.width}
                    itemSize={this.state.itemScale * this.state.width}
                    itemCount={this.state.numPages}
                    onItemsRendered={this.updateCurrentVisiblePage}
                    overscanCount={1}
                  >
                    {({ style, index }) => (
                      <div style={style} key={index}>
                        <Page
                          pageNumber={index + 1}
                          width={this.state.width - 20}
                          renderAnnotationLayer={true}
                          loading=""
                        />
                      </div>
                    )}
                  </List>
                ) : null}
              </Document>
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

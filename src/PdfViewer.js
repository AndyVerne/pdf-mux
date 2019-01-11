import React, { Component } from 'react';
import { pdfjs, Document, Page, Outline } from 'react-pdf';
import _ from "lodash"
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js'


const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

export default class PdfViewer extends Component {
  state = {
    numPages: null,
  }


  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { numPages } = this.state;

    return (
      <div className="viewer" style={{overflow: "scroll", height: "100%", display: "block", position: "absolute"}}>
        <div className="document_container">
          <Document
            file={this.props.file}
            onLoadSuccess={this.onDocumentLoadSuccess}
            options={options}
            noData=""
            loading=""
          >
            {Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={this.props.width}
                  renderAnnotationLayer={false}
                  loading=""
                />
              ),
            )}
          </Document>
        </div>
      </div>
    );
  }
}
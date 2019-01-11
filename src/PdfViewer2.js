import { VariableSizeList as List } from 'react-window'
import React, { Component } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Measure from 'react-measure'
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js'


const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

export default class PdfViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pdf: null,
            numPages: null,
            width: 0,
            height: 0,
        }
    }


  onDocumentLoadSuccess = (pdf) => {
    this.setState({ 
        numPages: pdf.numPages,
        pdf: pdf,
    },
        console.log(this.props)
    );
  }


  render() {
    return (
        <Measure
            bounds
            onResize={contentRect => {
                this.setState({
                    width: contentRect.bounds.width,
                    height: contentRect.bounds.height,
                })
            }}
        >
        {({measureRef}) => (
        <div 
            className="viewer" 
            style={{width: "100%", height: "100%", display: "block", position: "absolute"}}
            ref={measureRef}
        >
        <div className="document_container">
          <Document
            file={this.props.file}
            onLoadSuccess={this.onDocumentLoadSuccess}
            options={options}
            noData=""
            loading=""
          >
            <List
                height={this.state.height}
                width={this.state.width}
                itemSize={() => 840}
                itemCount={this.state.numPages}
            >
                {({ style, index }) => (
                    <div style={style}>
                        <Page
                            pageNumber={index + 1}
                            width={this.state.width}
                            renderAnnotationLayer={false}
                            loading=""
                        ></Page>
                    </div>
                )}
            </List>
          </Document>
        </div>
        </div>
        )}
        </Measure>
    );
  }
}

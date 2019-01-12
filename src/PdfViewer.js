import { FixedSizeList as List } from 'react-window'
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
            width: 0,
            height: 0,
            itemScale: 0,
            loaded: false,
            numPages: null,
            currentPage: 1,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.file !== nextProps.file || this.state.loaded === false) {
            this.state.loaded = false
            return true;
        } else {
            return false;
        }
    }

    onDocumentLoadSuccess = (pdf) => {
        const promise = pdf.getPage(1)
        promise.then(page => {
            const viewport = page.getViewport(1);
            this.props.getNumPages(pdf.numPages)
            this.setState({ 
                numPages: pdf.numPages,
                itemScale: viewport.height/viewport.width,
                loaded: true,
            });
        })
    }

    updateCurrentVisiblePage = ({ visibleStopIndex }) => {
        this.state.currentPage = visibleStopIndex + 1
        this.props.getCurrentPage(this.state.currentPage)
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
            {this.state.loaded ? 
                <List
                    height={this.state.height}
                    width={this.state.width}
                    itemSize={this.state.itemScale * this.state.width}
                    itemCount={this.state.numPages}
                    onItemsRendered={this.updateCurrentVisiblePage}
                    overscanCount={2}
                >
                    {({ style, index }) => (
                        <div style={style} key={index}>
                            <Page
                                pageNumber={index + 1}
                                width={this.state.width}
                                renderAnnotationLayer={false}
                                loading=""
                            ></Page>
                        </div>
                    )}
                </List>:
            null}
          </Document>
        </div>
        </div>
        )}
        </Measure>
    );
  }
}

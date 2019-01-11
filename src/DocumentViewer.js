import PageRenderer from './PageRenderer'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { VariableSizeList as List } from 'react-window'
import { pdfjs, Document } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js'

const file = "sample.pdf"

const propTypes = {
  scale: PropTypes.number.isRequired
}

// PDFjs options
const options = {}

class DocumentViewer extends Component {
  static propTypes = propTypes

  constructor (props) {
    super(props)

    this.state = {
      containerWidth: undefined,
      containerHeight: undefined,
      numPages: undefined,
      currentPage: 1,
      cachedPageDimensions: null
    }

    this.viewerContainerRef = React.createRef()
    this.listRef = React.createRef()
  }

  componentDidMount () {
    this._mounted = true
    this.calculateContainerBounds()
    window.addEventListener('resize', this.handleWindowResize, true)
  }

  componentWillUnmount () {
    this._mounted = false
    window.removeEventListener('resize', this.handleWindowResize, true)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.scale !== this.props.scale) {
      this.recomputeRowHeights()
    }
  }

  /**
   * Load all pages to cache all page dimensions.
   */
  cachePageDimensions (pdf) {
    const promises = Array.from({ length: pdf.numPages }, (v, i) => i + 1).map(
      pageNumber => pdf.getPage(pageNumber)
    )

    // Assuming all pages may have different heights. Otherwise we can just
    // load the first page and use its height for determining all the row
    // heights.
    Promise.all(promises).then(values => {
      if (!this._mounted) {
        return null
      }

      const pageDimensions = values.reduce((accPageDimensions, page) => {
        accPageDimensions.set(page.pageIndex + 1, [
          page.view[2],
          page.view[3] + 1
        ])
        return accPageDimensions
      }, new Map())

      this.setState({
        cachedPageDimensions: pageDimensions
      })
    })
  }

  calculateContainerBounds = () => {
    this.setState({
      containerWidth: this.props.width,
      containerHeight: this.props.height
    })
  }

  recomputeRowHeights = () => {
    this.listRef.current.resetAfterIndex(0)
  }

  /*
    HANDLERS
  */

  onDocumentLoadSuccess = pdf => {
    this.setState({
      numPages: pdf.numPages
    })
    this.cachePageDimensions(pdf)
    this.calculateContainerBounds()
  }

  handleWindowResize = debounce(() => {
    this.calculateContainerBounds()
  }, 300)

  updateCurrentVisiblePage = ({ visibleStopIndex }) => {
    this.setState({
      currentPage: visibleStopIndex + 1
    })
  }

  /*
    GETTERS
  */

  getItemSize = index => {
    return this.state.cachedPageDimensions.get(index + 1)[1] * this.props.scale
  }

  /*
    RENDERERS
  */

  render () {
    const { 
      numPages, 
      cachedPageDimensions,
      containerHeight
    } = this.state

    const itemData = {
      scale: this.props.scale,
      cachedPageDimensions: cachedPageDimensions
    }
    return (
      <div className='dv' ref={this.viewerContainerRef}>
        <Document
          className='dv__document'
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          options={options}
          loading=""
        >
          {cachedPageDimensions != null && (
            <List
              height={containerHeight}
              itemCount={numPages}
              itemSize={this.getItemSize}
              itemData={itemData}
              overscanCount={2}
              onItemsRendered={this.updateCurrentVisiblePage}
              ref={this.listRef}
            >
              {PageRenderer}
            </List>
          )}
        </Document>
      </div>
    )
  }
}

export default DocumentViewer

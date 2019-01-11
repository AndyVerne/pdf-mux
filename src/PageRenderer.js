import React from 'react'
import PropTypes from 'prop-types'

import { pdfjs, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js'

const propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default class PageRenderer extends React.PureComponent {
  static propTypes = propTypes

  render () {
    const { index, data } = this.props
    const { cachedPageDimensions, scale } = data

    const pageNumber = index + 1
    const pageDimensions = cachedPageDimensions.get(pageNumber)

    const width = pageDimensions[0] * scale
    const style = {
      ...this.props.style,
      width,
      left: '50%',
      WebkitTransform: 'translateX(-50%)',
      transform: 'translateX(-50%)'
    }
    return (
      <div
        className='dv__page-wrapper'
        key={`page_${pageNumber}`}
        style={style}
      >
        <Page
          className='dv__page'
          pageNumber={pageNumber}
          scale={scale}
          renderAnnotationLayer={false}
        />
      </div>
    )
  }
}
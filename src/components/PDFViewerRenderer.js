import React from 'react';
import { PDFUIRenderToElementContext } from './FoxitWebPDFContexts';
import './PDFViewerRenderer.css';

export const PDFViewerRenderer = React.memo(function () {
    return <PDFUIRenderToElementContext.Consumer>
        {(ref) => {
            return <div className="foxit-pdf-viewer-container" ref={ref}></div>
        }}
    </PDFUIRenderToElementContext.Consumer>
});

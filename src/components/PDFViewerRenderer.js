import React from 'react';
import { PDFUIRenderToElementContext } from './FoxitWebPDFContexts';
import './PDFViewerRenderer.css';

export const PDFViewerRenderer = function () {
    return <PDFUIRenderToElementContext.Consumer>
        {(ref) => {
            return <div id="pdf-ui" ref={ref}></div>
        }}
    </PDFUIRenderToElementContext.Consumer>
}
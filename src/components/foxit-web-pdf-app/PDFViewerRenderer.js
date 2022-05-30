import React from 'react';
import './PDFViewerRenderer.css';

export class PDFViewerRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.pdfui = props.pdfui;
        this.targetElement = props.element;
        console.log(this.pdfui);
    }
    componentDidMount(){
        this.ref.current.append(this.targetElement);
    }
    componentWillUnmount() {
        this.targetElement.remove();
    }
    render() {
        return <div ref={this.ref} className="foxit-pdf-viewer-container"></div>
    }
}
import React from "react";
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css";

export default class PDFViewer extends React.Component {
    constructor() {
        super();
        this.elementRef = React.createRef();
    }

    render() {
        return <div className = "foxit-PDF"
        ref = {
            this.elementRef
        }
        />;
    }

    componentDidMount() {
        const element = this.elementRef.current;
        const libPath = "/foxit-lib/";
        this.pdfui = new UIExtension.PDFUI({
            viewerOptions: {
                libPath,
                jr: {
                    readyWorker: window.readyWorker
                }
            },
            renderTo: element,
            addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
                libPath + 'uix-addons/allInOne.mobile.js' : libPath + 'uix-addons/allInOne.js'
        });
        window.pdfui = this.pdfui
    }
    componentWillUnmount() {
        this.pdfui.destroy();
    }
}
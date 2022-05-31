import React from "react";
import { PDFUIInstanceContext, PDFUIRenderToElementContext } from './FoxitWebPDFContexts';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css";
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
import * as mobileAddons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.mobile.js';
import { licenseKey, licenseSN } from '../license-key';

if (module.hot) {
    module.hot.dispose(() => {
        window.location.reload();
    });
}

class FoxitWebPDFAppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerRef: React.createRef()
        };
    }
    componentDidMount() {
        const libPath = "/foxit-lib/";
        const renderToElement = document.createElement('div');
        renderToElement.id = 'pdf-ui';
        const pdfui = new UIExtension.PDFUI({
            viewerOptions: {
                libPath,
                jr: {
                    workerPath: libPath,
                    enginePath: libPath + '/jr-engine/gsdk',
                    fontPath: '/external/brotli',
                    licenseSN,
                    licenseKey,
                }
            },
            renderTo: renderToElement,
            addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ? mobileAddons : Addons
        });
        this.setState({
            pdfui
        });
    }
    render() {
        return (
            <PDFUIRenderToElementContext.Provider value={this.state.containerRef}>
                {
                    this.state.pdfui
                        ? (
                            <PDFUIInstanceContext.Provider value={this.state.pdfui}>
                                {this.props.children}
                            </PDFUIInstanceContext.Provider>
                        )
                        : this.props.children
                }
            </PDFUIRenderToElementContext.Provider>
        );
    }
    componentDidUpdate(){
        const pdfui = this.state.pdfui;
        const container = this.state.containerRef.current;
        if(pdfui && container) {
            pdfui.renderTo.remove();
            container.appendChild(pdfui.renderTo);
        }
    }
    componentWillUnmount() {
        if(this.state.pdfui) {
            this.state.pdfui.destroy();
        }
    }
}
export const FoxitWebPDFApp = React.memo(FoxitWebPDFAppComponent);

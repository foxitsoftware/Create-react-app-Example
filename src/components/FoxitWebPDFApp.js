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

class FoxitWebPDFAppComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            elementRef: React.createRef()
        };
    }
    componentDidMount() {
        const libPath = "/foxit-lib/";
        const pdfui = new UIExtension.PDFUI({
            viewerOptions: {
                libPath,
                jr: {
                    workerPath: libPath,
                    enginePath: libPath + '/jr-engine/gsdk',
                    fontPath: '/external/broli',
                    licenseSN,
                    licenseKey,
                }
            },
            renderTo: this.state.elementRef.current,
            addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ? mobileAddons : Addons
        });
        this.setState({
            elementRef: this.ref,
            pdfui
        });
    }
    render() {
        return (
            <PDFUIRenderToElementContext.Provider value={this.state.elementRef}>
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
    componentWillUnmount() {
        this.state.pdfui.destroy();
    }
}
export const FoxitWebPDFApp = React.memo(FoxitWebPDFAppComponent);

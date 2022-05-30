import React from "react";
import { PDFViewerContext } from './PDFViewerContext';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css";
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
import * as mobileAddons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.mobile.js';
import { licenseKey, licenseSN } from '../../license-key';

let _pdfui;
const IS_DEVELOPMENT_ENV =  process.env.NODE_ENV === 'development';

if(module.hot) {
    module.hot.dispose(() => {
        module.hot.invalidate();
    });
}

export class FoxitWebPDFApp extends React.PureComponent {
    constructor(props) {
        super(props);
        let pdfui;
        const libPath = "/foxit-lib/";
        if(IS_DEVELOPMENT_ENV && !!_pdfui) {
            pdfui = _pdfui;
        } else {
            const pdfuiContainer = document.createElement('div');
            pdfuiContainer.id = 'pdf-ui';
            _pdfui = pdfui = new UIExtension.PDFUI({
                viewerOptions: {
                    libPath,
                    jr: {
                        workerPath: libPath,
                        enginePath: libPath+'/jr-engine/gsdk',
                        fontPath: '/external/broli',
                        licenseSN,
                        licenseKey,
                    }
                },
                renderTo: pdfuiContainer,
                addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile? mobileAddons:Addons
            });
        }
        this.state = {
            pdfui,
            element: pdfui.renderTo
        };
    }
    render() {
        return (
            <PDFViewerContext.Provider value={this.state}>
                {this.props.children}
            </PDFViewerContext.Provider>
        );
    }
    componentWillUnmount() {
        if(IS_DEVELOPMENT_ENV) {
            _pdfui = null;
        } else {
            this.pdfui.destroy();
        }
        this.setState({
            pdfui: null,
            element: null
        });
    }
}
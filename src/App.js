import './App.css';
import { PDFViewerContext } from './components/foxit-web-pdf-app/PDFViewerContext';
import { FoxitWebPDFApp } from './components/foxit-web-pdf-app/FoxitWebPDFApp';
import { PDFViewerRenderer } from './components/foxit-web-pdf-app/PDFViewerRenderer';
function App() {
  return (
    <div className="App">
      <FoxitWebPDFApp>
        <PDFViewerContext.Consumer>
          {({pdfui, element}) => {
            return <PDFViewerRenderer pdfui={pdfui} element={element}></PDFViewerRenderer>
          }}
        </PDFViewerContext.Consumer>
      </FoxitWebPDFApp>
    </div>
  );
}

export default App;
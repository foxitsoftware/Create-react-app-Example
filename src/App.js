import './App.css';
import { PDFViewerContext } from './components/PDFViewerContext';
import { FoxitWebPDFApp } from './components/FoxitWebPDFApp';
import { PDFViewerRenderer } from './components/PDFViewerRenderer';
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
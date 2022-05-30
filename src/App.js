import './App.css';
import { PDFUIInstanceContext } from './components/FoxitWebPDFContexts';
import { FoxitWebPDFApp } from './components/FoxitWebPDFApp';
import { PDFViewerRenderer } from './components/PDFViewerRenderer';

function App() {
  return (
    <div className="App">
      <FoxitWebPDFApp>
        <PDFViewerRenderer />
        <PDFUIInstanceContext.Consumer>
          {(pdfui) => {
            return <></>;
          }}
        </PDFUIInstanceContext.Consumer>
        <PDFUIInstanceContext.Consumer>
          {(pdfui) => {
            return <></>;
          }}
        </PDFUIInstanceContext.Consumer>
      </FoxitWebPDFApp>
    </div>
  );
}

export default App;
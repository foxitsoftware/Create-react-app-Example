# Foxit PDF SDK for Web Example - React.js created by "create-react-app"

This guide shows two examples. One introduces how to quickly run the out-of-the-box sample for react.js created by "
create-react-app" in Foxit PDF SDK for Web package, and the other presents a way to integrate Foxit PDF SDK for Web into
React app created by "create-react-app".

## Quickly run the out-of-the-box sample for create-react-app

_Note:The root folder of `Foxit PDF SDK for Web` is referred as `root` in the following._

Foxit PDF SDK for Web provides a boilerplate project for React app which was created by "create-react-app".

### Overview the project structure

```bash
├─public
│   └── index.html
├─src/
│  ├─components/
│  │  ├─FoxitWebPDFApp.js
│  │  ├─FoxitWebPDFContexts.js
│  │  ├─PDFViewerRenderer.css
│  │  └─PDFViewerRenderer.js
│  ├─App.css
│  ├─App.js
│  ├─index.css
│  ├─index.js
│  └──license-key.js
├─.eslintignore
├─config-overrides.js
├─package.json
```

#### Key directory and files descriptions

| File/Folder                           | Description                                                                                                                                                                                                                                                                                     |
|:--------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| src/                                  | Contains all JS and CSS files for the app.                                                                                                                                                                                                                                                      |
| src/components/FoxitWebPDFApp.js      | Initialize FoxitPDFSDK for Web and share pdfui instance through `React Context`.                                                                                                                                                                                                                |
| src/components/FoxitWebPDFContexts.js | Contains `PDFUIInstanceContext` and `PDFUIRenderToElementContext`. Subcomponents can obtain a `pdfui` instance via `PDFUIInstanceContext.Consumer`, and `PDFUIRenderToElementContext` is used in `PDFViewerRenderer.js` to provide a React ref to the `FoxitWebPDFApp` component to render PDF. |
| src/components/PDFViewerRenderer.js   | Provides an entry point for the application layer to flexibly specify where to render the PDF                                                                                                                                                                                                   |
| src/license-key.js                    | The license-key                                                                                                                                                                                                                                                                                 |
| src/App.js                            | The entry point for application.                                                                                                                                                                                                                                                                |
| config-overrides.js                   | Adjust the Webpack configuration                                                                                                                                                                                                                                                                |
| package.json                          | Lists dependencies, version build information and ect.                                                                                                                                                                                                                                          |

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com) ( Node >= 14.0.0 and npm >= 5.6 )
- [Foxit PDF SDK for Web](https://developers.foxit.com/products/web/)

### Getting started

Let's call the *Foxit PDF SDK for Web* as SDK.

- Clone this repository to any location

  ```bash
  git clone https://github.com/foxitsoftware/Create-react-app-Example.git
  ```

- Place the `license-key.js` into `./src/`, You can find the license information at `SDK/examples/`.

- Navigate to `./create-react-app-foxitpdfsdkweb` folder, and execute:

```bash
    npm install
    npm run start
```

Now everything is set up. Open your browser, navigate to <http://localhost:3000/> to launch this application.

### Reference the fonts

If some text in a PDF document requires a specific font to render correctly, you need to specify a font loading path
during initialization. In this example, you can refer to the `fontPath` configuration in `src/components/FoxitWebPDFApp.js`. What we need
to do is to copy the `external` folder in the SDK to the `public` folder so that the special font can be rendered
normally.

## Integrate Web SDK to an existing project created by "create-react-app"

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)  ( Node >= 14.0.0 and npm >= 5.6 )
- [React.js created by create-react-app](https://reactjs.org/docs/create-a-new-react-app.html)
- [Foxit PDF SDK for Web](https://developers.foxit.com/products/web/)

### Getting started

1. Suppose you already have a project created
   with [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html) and the directory name is `app`. If
   not, you can also create an empty project yourself:

   ```bash  
   `npx create-react-app app`
   ```

2. In `app` folder, Update `package.json`:

    ```json
    "scripts": {
        "start": "react-app-rewired --max_old_space_size=8192 start",
        "build": "react-app-rewired --max_old_space_size=8192 build",
        "test": "react-app-rewired --max_old_space_size=8192 test --env=jsdom",
        "eject": "react-app-rewired --max_old_space_size=8192 eject"
    },
    ```

    This step avoids `'JavaScript heap out of memory'` errors during the build process.

3. In `app` folder, add `config-overrides.js`:
   ```js
    const CopyWebpackPlugin = require("copy-webpack-plugin");
    const { override, addWebpackPlugin, addWebpackExternals} = require('customize-cra');
    const path = require("path")
    
    const libraryModulePath = path.resolve('node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library');
    const libPath = path.resolve(libraryModulePath, 'lib');
    
    module.exports = override(    
        addWebpackPlugin(
            new CopyWebpackPlugin({
                patterns: [{
                    from: libPath,
                    to: 'foxit-lib',
                    force: true
                }]
            })
        ),
        addWebpackExternals(
            'UIExtension', 
            'PDFViewCtrl'
        )
    )
   ```

4. Copy the `external` folder inside SDK to `public` folder.
5. Copy these files to your `src` folder:
   ```txt
   src/component/FoxitWebPDFApp.js
   src/component/FoxitWebPDFContexts.js
   src/component/PDFViewerRenderer.css
   src/component/PDFViewerRenderer.js
   ```
   Of course, in order to ensure that the project structure is not disrupted, you can create another directory to store them.

6. Add the following code into your component(Please remember to import them):
    ```js
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
    ```
   For detailed usage, please refer to `src/App.js`

7. Update the container size and ensure it is displayed correctly, you can refer to `src/App.css`:
    ```css
   .App {
        width: 100vw;
        height: 100vh;
   }
   ```
8. Add `license-key.js` to the `.eslintignore` file:
    ```text
    license-key.js
    ```

9. Install your dependencies and run:
    ```bash
    cd app
    npm install
    npm install -S @foxitsoftware/foxit-pdf-sdk-for-web-library 
    npm install -D copy-webpack-plugin customize-cra react-app-rewired
    npm run start
    ```
    > **NOTE**
    > If you get this error: `TypeError: compilation.getCache is not a function`
    > Please refer to: <https://github.com/webpack-contrib/copy-webpack-plugin/issues/575>

10. Remove the Strict mode in `src/index.js`:
    ```diff
    // ...
    ReactDOM.render(
    -     <React.StrictMode>
            <App />
    -     </React.StrictMode>,
        document.getElementById('root')
    );
    // ...
    ```

11. Now everything is set up. Open your browser, navigate to <http://localhost:3000/> to launch your application.

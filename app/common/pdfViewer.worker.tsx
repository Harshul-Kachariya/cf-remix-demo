import * as Comlink from "comlink";
import React from "react";
import ReactDOMServer from "react-dom/server";
import PdfViewer from "~/routes/pdfViewer";

const renderComponent = () => {
  const html = ReactDOMServer.renderToString(React.createElement(PdfViewer));
  return html;
};

Comlink.expose({ renderComponent });

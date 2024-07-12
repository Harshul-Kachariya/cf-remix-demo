import * as Comlink from "comlink";
import React from "react";
import ReactDOMServer from "react-dom/server";
import InputFiles from "~/routes/inputFiles";

const renderComponent = () => {
  const html = ReactDOMServer.renderToString(React.createElement(InputFiles));
  return html;
};

Comlink.expose({ renderComponent });

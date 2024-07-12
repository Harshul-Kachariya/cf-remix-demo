import React from "react";
import { createRoot } from "react-dom/client";

import InputFiles from "~/routes/inputFiles";

const mountComponent = (
  Component: React.ComponentType,
  containerId: string
) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<Component />);
  }
};

mountComponent(InputFiles, "root1");

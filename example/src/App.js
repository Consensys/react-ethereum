import React from "react";

import EthereumContext from "./ethereum";
import Content from "./Content";

export default function App() {
  return (
    <div>
      <h3>Hello d-app user</h3>
      <EthereumContext.Provider>
        <Content />
      </EthereumContext.Provider>
    </div>
  );
}

import React, { useContext } from "react";

import EthereumContext from "./ethereum";

export default function Content(props) {
  const {
    ethereum,
    accounts,
    chainId,
    awaiting,
    error,
    requestConnection,
  } = useContext(EthereumContext);

  return (
    <div {...props}>
      <p>Press here:</p>
      <button type="button" onClick={requestConnection}>
        Action
      </button>
      <ul>
        <li>
          Ethereum object with: <code>{Object.keys(ethereum).join(", ")}</code>
        </li>
        <li>Account: {accounts.join(", ")}</li>
        <li>Network: {chainId}</li>
        <li>Waiting for user: {String(awaiting)}</li>
        <li>Error: {error && error.message}</li>
      </ul>
    </div>
  );
}

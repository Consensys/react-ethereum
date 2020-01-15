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
        {accounts.length === 0 ? "Connect" : "Already connected"}
      </button>
      <ul>
        {ethereum ? (
          <li>
            <code>ethereum</code> object with:{" "}
            <ul>
              {Object.getOwnPropertyNames(ethereum).map(name => (
                <li key={name}>
                  <code>{name}</code>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li>
            <code>ethereum</code> object is <code>null</code>
          </li>
        )}
        <li>
          <code>accounts</code> array with:
          <ol>
            {accounts.map(account => (
              <li key={account}>
                <code>{account}</code>
              </li>
            ))}
          </ol>
        </li>
        <li>
          Network (<code>chainId</code>): <code>{chainId}</code>
        </li>
        <li>
          Waiting for user (<code>awaiting</code>):{" "}
          <code>{String(awaiting)}</code>
        </li>
        <li>
          <code>error</code>: <code>{error ? error.message : "null"}</code>
        </li>
      </ul>
    </div>
  );
}

# @daisypayments/react-ethereum

> Ethereum context for React, **compatible with react-hooks!**

## Install

```sh
yarn add @daisypayments/react-ethereum
```

## Example

Create a file with the instantiation of Ethereum's Context:

```js
// ethereum.js
import { createEthereumContext } from "@daisypayments/react-ethereum";

const EthereumContext = createEthereumContext();
export default EthereumContext;
```

Then make sure to render the `Provider` on the top entry file of your app:

```js
// App.js (_app.js if using Next.js)
import React from "react";

import EthereumContext from "./ethereum";

export default function App() {
  return (
    <div>
      <EthereumContext.Provider>
        ...
      </EthereumContext.Provider>
    </div>
  )
}
```

Finally use the context wherever you need (example using React Hooks):

```js
// EthereumButton.js
import React, { useContext } from "react";

import EthereumContext from "./ethereum";

export default function EthereumButton() {
  const {
    ethereum,
    accounts: [account],
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
        <li>Account: {account}</li>
        <li>Network: {chainId}</li>
        <li>Waiting for user: {String(awaiting)}</li>
        <li>Error: {error && error.message}</li>
      </ul>
    </div>
  );
}
```

### HOC for React classes

In case you are not using React Hooks and you need access to `ethereum` and the other params, you can use a High-Order-Component like this:

```js
// ethereum.js
import React from "react";
import PropTypes from "prop-types";
import { createEthereumContext } from "@daisypayments/react-ethereum";

const EthereumContext = createEthereumContext();

export default EthereumContext;
```

```js
// EthereumButton.js
import React, { Component } from "react";
import { withEthereum, PropTypesEthereumObject } from "@daisypayments/react-ethereum";

import EthereumContext from "./ethereum";

class EthereumButton extends Component {
  static propTypes = {
    ethereum: PropTypesEthereumObject.isRequired,
  };

  componentDidMount() {
    const { ethereum, accounts } = this.props.metamask;
    // ...
  }

  render() {
    const { accounts, requestConnection, error } = this.props.metamask;

    if (accounts.length === 0) {
      return <span>Not connected</span>;
    }

    // ...
  }
}

export default withEthereum(EthereumContext)(EthereumButton);
```

## License

MIT

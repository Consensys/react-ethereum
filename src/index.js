/* eslint-disable consistent-return */
/* eslint-disable no-void */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable class-methods-use-this */
import React, { Component } from "react"; // eslint-disable-line import/no-unresolved
import PropTypes from "prop-types";

function isBrowser() {
  return typeof window !== "undefined";
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function createEthereumContext(initial = null) {
  const Context = React.createContext(initial);
  Context.displayName = "EthereumContext";

  const ContextProvider = Context.Provider;

  class EthereumContextProvider extends Component {
    constructor(props) {
      super(props);

      this.state = {
        ethereum: isBrowser() ? window.ethereum : null,
        chainId: null,
        accounts: [],
        awaiting: false,
        error: null,
      };

      this.listenerClose = null;
      this.listenerNetwork = null;
      this.listenerChain = null;
      this.listenerAccount = null;
    }

    async componentDidMount() {
      if (!isBrowser()) {
        return void 0;
      }

      this.listenerClose = window.ethereum.on("close", this.handleClose);
      this.listenerNetwork = window.ethereum.on(
        "networkChanged",
        this.handleChainChange,
      );
      this.listenerChain = window.ethereum.on(
        "chainChanged",
        this.handleChainChange,
      );
      this.listenerAccount = window.ethereum.on(
        "accountsChanged",
        this.handleAccountChange,
      );

      const [{ result: chainId }, { result: accounts }] = await Promise.all([
        window.ethereum.send("eth_chainId"),
        window.ethereum.send("eth_accounts"),
      ]);
      // const { result: chainId } = await window.ethereum.send("eth_chainId");
      // const { result: accounts } = await window.ethereum.send("eth_accounts");

      this.setState({
        chainId: Number(chainId) || null,
        accounts,
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      // if any of this values changes to `undefined` we will re-render.
      if (this.state.ethereum !== nextState.ethereum) {
        return true;
      }

      const equal =
        this.state.chainId === nextState.chainId &&
        this.state.accounts[0] === nextState.accounts[0] &&
        this.state.awaiting === nextState.awaiting &&
        this.state.error === nextState.error;
      return !equal;
    }

    componentWillUnmount() {
      window.ethereum.removeListener("close", this.handleClose);
      window.ethereum.removeListener("networkChanged", this.handleChainChange);
      window.ethereum.removeListener("chainChanged", this.handleChainChange);
      window.ethereum.removeListener(
        "accountsChanged",
        this.handleAccountChange,
      );
    }

    handleConnect = async () => {
      try {
        this.setState({ awaiting: true });
        const response = await window.ethereum.send("eth_requestAccounts");
        this.setState({
          accounts: response["result"],
          awaiting: false,
          error: null,
        });
        return {
          ethereum: window.ethereum,
          accounts: response["result"],
          error: null,
        };
      } catch (error) {
        this.setState({ error, awaiting: false });
        return { ethereum: window.ethereum, accounts: [], error };
      }
    };

    handleChainChange = chainId => {
      if (chainId) {
        this.setState({ chainId: Number(chainId) });
      } else {
        this.setState({ chainId: null });
      }
    };

    handleChainChangeError = error => {
      // Metamask says this should never happen
      this.setState({ error });
    };

    handleAccountChange = async accounts => {
      this.setState({ accounts });
    };

    handleAccountChangeError = error => {
      // Metamask says this should never happen
      this.setState({ error });
    };

    handleClose = (code, reason) => {
      const error = new Error(`Connection closed`);
      error.code = code;
      error.reason = reason;
      this.setState({ accounts: [], chainId: null, error });
    };

    render() {
      const internalValue = {
        ethereum: this.state.ethereum,
        accounts: this.state.accounts,
        error: this.state.error,
        chainId: this.state.chainId,

        awaiting: this.state.awaiting,
        requestConnection: this.handleConnect,
      };

      return <ContextProvider {...this.props} value={internalValue} />;
    }
  }

  Context.Provider = EthereumContextProvider;
  return Context;
}

export function withEthereum(EthereumContext) {
  return function withEthereumContext(Comp) {
    const ComponentWithEthereum = React.forwardRef((props, ref) => (
      <EthereumContext.Consumer>
        {ethereum => <Comp ref={ref} ethereum={ethereum} {...props} />}
      </EthereumContext.Consumer>
    ));

    ComponentWithEthereum.displayName = `withEthereum(${getDisplayName(Comp)})`;

    return ComponentWithEthereum;
  };
}

export const PropTypesEthereum = {
  ethereum: PropTypes.object,
  accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.object, // `Error` type
  chainId: PropTypes.number.isRequired,
  awaiting: PropTypes.bool.isRequired,
  requestConnection: PropTypes.func.isRequired,
};

export const PropTypesEthereumObject = PropTypes.shape(PropTypesEthereum);

import { useConnect } from "wagmi";

export const WalletConnection = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <div key={connector.uid}>
      <button onClick={() => connect({ connector })}>{connector.name}</button>
      {/* <img src={connector.icon} /> */}
    </div>
  ));
};

"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button className="btn btn--ghost" onClick={() => disconnect()} type="button">
        {shortenAddress(address)}
      </button>
    );
  }

  return (
    <button
      className="btn btn--lime"
      onClick={() => connectors[0] && connect({ connector: connectors[0] })}
      type="button"
      disabled={isPending || !connectors[0]}
    >
      {isPending ? "Connecting" : "Connect Wallet"}
    </button>
  );
}

import { createPublicClient, createWalletClient, http } from "viem";
import { polygonAmoy } from "viem/chains";

export function init({ account }) {
  const commonConfig = {
    chain: polygonAmoy,
    transport: http(),
  };

  const walletClient = createWalletClient({
    account,
    ...commonConfig,
  });

  const publicClient = createPublicClient(commonConfig);

  return { account, walletClient, publicClient };
}

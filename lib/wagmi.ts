import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const BUILDER_CODE = "bc_uc3nv503";
export const BUILDER_CODE_DATA_SUFFIX = "0x62635f7563336e763530330b0080218021802180218021802180218021";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "task-board",
      preference: {
        options: "smartWalletOnly",
        attribution: {
          dataSuffix: BUILDER_CODE_DATA_SUFFIX,
        },
      },
    }),
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});

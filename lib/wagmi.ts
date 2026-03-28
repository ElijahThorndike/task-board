import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const BUILDER_CODE = "bc_uc3nv503";
export const BUILDER_CODE_DATA_SUFFIX = "0x62635f7563336e763530330b0080218021802180218021802180218021";
// TODO: Attach BUILDER_CODE_DATA_SUFFIX to the preferred Base/Coinbase wallet connector
// when switching from the generic injected connector to the final production wallet flow.

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});

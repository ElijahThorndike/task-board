import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const BUILDER_CODE_DATA_SUFFIX = "TODO_REPLACE_WITH_BASE_BUILDER_CODE_SUFFIX";
// TODO: Replace the placeholder above with the final Builder Code data suffix.
// TODO: Add the suffix to the preferred Base/Coinbase wallet connector config.

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

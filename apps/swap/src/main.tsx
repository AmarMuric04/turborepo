/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

// Import the generated route tree
import { routeTree } from "src/routeTree.gen";

import "./styles.css";
import reportWebVitals from "src/reportWebVitals";
import { config } from "wagmi.config";
import { hashFn } from "wagmi/query";
import {
  darkTheme,
  RainbowKitProvider,
  type DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { Provider } from "react-redux";
import { store } from "src/store";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: hashFn,
    },
  },
});

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement),
    Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
      <Text>
        By connecting your wallet, you agree to the{" "}
        <Link href="https://termsofservice.xyz">Terms of Service</Link> and
        acknowledge you have read and understand the protocol{" "}
        <Link href="https://disclaimer.xyz">Disclaimer</Link>
      </Text>
    );

  root.render(
    <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              ...darkTheme.accentColors.green,
              borderRadius: "large",
              fontStack: "system",
              overlayBlur: "large",
            })}
            modalSize="wide"
            initialChain={1}
            locale="en"
            showRecentTransactions={true}
            appInfo={{
              appName: "MurgaSwap",
              learnMoreUrl: "https://learnaboutcryptowallets.example",
              disclaimer: Disclaimer,
            }}
          >
            <Provider store={store}>
              <RouterProvider router={router} />
            </Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>
  );
}

//   root.render(
//     <StrictMode>
//       <WagmiProvider config={config}>
//         <QueryClientProvider client={queryClient}>
//           <RouterProvider router={router} />
//         </QueryClientProvider>
//       </WagmiProvider>
//     </StrictMode>
//   );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// const NIMALabs = () => true;

// const NIMAEnterprises = true;

// const NIMA = {
//   Labs: true,
//   Enterprises: false,
// };

// const iRanOutOfNames = (NIMA: boolean) => {};

// NIMALabs();

// console.log(NIMAEnterprises);

// iRanOutOfNames(NIMA.Labs);

// ---

// const NIMALabs = (NIMA: number, Labs: number) => {};

// const NIMAEnterprises = (NIMA: number, { Labs }: { Labs: number }) => {};

// ["NIMA", "Labs"].map((e, index) => {});

// NIMALabs(1, 2);

// NIMAEnterprises(1, { Labs: 2 });

// ---

// console.log("NIMA Labs");

// console.error("NIMA Enterprises");

// console.warn("NIMA");

// ---

// useEffect(() => {}, [{ NIMA: "Labs" }]);

// ---

// const clickHandler = () => {};

// function NIMALabs() {}

// const NIMAEnterprises = function NIMA() {};

// const NIMA = {
//   Labs() {},
// };

// ---

// export const NIMA = () => <></>;

// export default function NIMALabs() {
// return <></>;
// }

// ---

// const NIMALabs = () => <></>;

// NIMALabs();

// const process = ({
//   settings: { active, visible },
// }: {
//   settings: { active: boolean; visible: boolean };
// }) => {
//   console.log(active, visible);
// };

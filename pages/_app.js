import SupportEngine from "../components/chat-engine/SupportEngine";
import Sound from "../components/Sound";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import {
  CurrencyContext,
  AdEmailContext,
  GoldContext,
  CustomerEmailContext,
  PlayContext,
  setWelcomeNotify,
  CustomerAuthContext,
  CustomerRecoveredPassword,
} from "../store/store";
import { useState, useEffect } from "react";
import { ShopProvider } from "../context/ShopProvider";
import shopReducer, { initialState } from "../context/ShopReducer";
import Processing from "../components/Processing";

function MyApp({ Component, pageProps, session }) {
  const [currency, setCurrency] = useState({ curr: "usd", rate: 1 });
  const [adEmail, setAdEmail] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [sellGold, setSellGold] = useState([]);
  const [play, setPlay] = useState(false);
  const [notify, setNotify] = useState(false);
  const [passReset, setPassReset] = useState(false);
  const [customerAuth, setCustomerAuth] = useState(null);

  return (
    <SessionProvider session={session}>
      <AdEmailContext.Provider value={{ adEmail, setAdEmail }}>
        <CustomerAuthContext.Provider value={{ customerAuth, setCustomerAuth }}>
          <ShopProvider initialState={initialState} reducer={shopReducer}>
            <CurrencyContext.Provider value={{ currency, setCurrency }}>
              <PlayContext.Provider value={{ play, setPlay }}>
                <GoldContext.Provider value={{ sellGold, setSellGold }}>
                  <setWelcomeNotify.Provider value={{ notify, setNotify }}>
                    <CustomerRecoveredPassword.Provider
                      value={{ passReset, setPassReset }}
                    >
                      <CustomerEmailContext.Provider
                        value={{ customerEmail, setCustomerEmail }}
                      >
                        <Processing />
                        <SupportEngine />
                        <Sound />
                        <Component {...pageProps} />
                      </CustomerEmailContext.Provider>
                    </CustomerRecoveredPassword.Provider>
                  </setWelcomeNotify.Provider>
                </GoldContext.Provider>
              </PlayContext.Provider>
            </CurrencyContext.Provider>
          </ShopProvider>
        </CustomerAuthContext.Provider>
      </AdEmailContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;

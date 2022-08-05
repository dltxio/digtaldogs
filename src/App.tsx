import "./App.css";
import Navigation from "./Navigation";
import { WalletProvider } from "./components/Providers/Wallet";

const App = () => {
  return (
    <div className="App">
      <WalletProvider>
        <Navigation />
      </WalletProvider>
    </div>
  );
};

export default App;

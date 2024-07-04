import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
// import Products from "scenes/products";
// import Customers from "scenes/customers";
// import Transactions from "scenes/transactions";
// import Geography from "scenes/geography";
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";
import Banks from "scenes/banks";
import Countries from "scenes/countries";
import Currency from "scenes/currency";
import MainOperation from "scenes/mainOperation";
import SubOperation from "scenes/subOperation";
import Agents from "scenes/agents";
import AgentClients from "scenes/agentClients";
import AssignClientToAgent from "scenes/assignClientToAgent";
import AgentOperation from "scenes/agentOperation";
import Commissions from "scenes/commissions";
import AgentTypes from "scenes/agentTypes";
import SystemInfo from "scenes/systemInfo";
import UsernameAgent from "scenes/usernameAgent";
import AgentAccountTypes from "scenes/agentAccountTypes";
import AllowedLg from "scenes/allowedLg";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/banks" element={<Banks />} />
              <Route path="/agenttypes" element={<AgentTypes />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/currency" element={<Currency />} />
              <Route path="/mainoperation" element={<MainOperation />} />
              <Route path="/suboperation" element={<SubOperation />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agentsclients" element={<AgentClients />} />
              <Route path="/systeminfo" element={<SystemInfo />} />
              <Route
                path="/assignclienttoagent"
                element={<AssignClientToAgent />}
              />
              <Route path="/agentoperation" element={<AgentOperation />} />
              <Route path="/usernameagent" element={<UsernameAgent />} />
              <Route
                path="/customeraccounttypes"
                element={<AgentAccountTypes />}
              />
              <Route
                path="/allowedlg"
                element={<AllowedLg />}
              />
              <Route path="/commissions" element={<Commissions />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

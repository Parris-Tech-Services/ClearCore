import { Switch, Route, Router as WouterRouter } from "wouter";
import { AppStateProvider } from "@/state/AppStateProvider";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import FunControls from "@/components/FunControls";

// Pages
import Home from "@/pages/Home";
import Daily from "@/pages/Daily";
import SOS from "@/pages/SOS";
import Log from "@/pages/Log";
import Progress from "@/pages/Progress";
import Settings from "@/pages/Settings";
import Review from "@/pages/Review";
import SlipResponse from "@/pages/SlipResponse";
import AllPages from "@/pages/AllPages";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/daily" component={Daily} />
      <Route path="/sos" component={SOS} />
      <Route path="/log" component={Log} />
      <Route path="/progress" component={Progress} />
      <Route path="/settings" component={Settings} />
      <Route path="/review" component={Review} />
      <Route path="/slip-response" component={SlipResponse} />
      <Route path="/all-pages" component={AllPages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const routerBase = baseUrl === "/" ? undefined : baseUrl.replace(/\/$/, "");

  return (
    <WouterRouter base={routerBase}>
      <AppStateProvider>
        <Toaster />
        <FunControls />
        <AppRoutes />
      </AppStateProvider>
    </WouterRouter>
  );
}

export default App;
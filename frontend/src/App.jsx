import AppRouter from "./router/AppRouter";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import Loader from "./components/Loader";
import { injectLoader } from "./api/axios";

function AppContent() {
  const { loading, setLoading } = useLoading();

  // Inject loader handler into axios
  injectLoader(setLoading);

  return (
    <>
      {loading && <Loader />}
      <AppRouter />
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

import { FC } from 'react';
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';
import Home from './components/pages/Home';

interface AppProps {
  title: string
}

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home name="Thomas A Mendez" jobTitle='Software Engineer and Game Developer'/> },
  ]);
  return routes;
};

const App: FC<AppProps> = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App

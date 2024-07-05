import { FC} from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';
import Home from './components/views/Home';
import Work from './components/views/Work';
import SkillsTools from './components/views/SkillsTools';
import Projects from './components/views/Projects';

const isAuthEnabled = import.meta.env.VITE_AUTH_ENABLED

interface AppProps {
  title: string
}

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home name="Thomas A Mendez" jobTitle='Software Engineer and Game Developer'/> },
    { path: '/work', element: <Work /> },
    { path: '/skillsTools', element: <SkillsTools /> },
    { path: '/projects', element: <Projects /> }
  ]);
  return routes;
};

const App: FC<AppProps> = () => {
  return (
    <>
      {isAuthEnabled === "true" ? (
        <Authenticator>
          <Router>
            <AppRoutes />
          </Router>
        </Authenticator>
      ) : (
        <Router>
          <AppRoutes />
        </Router>
      )}
    </>
  );
}

export default App

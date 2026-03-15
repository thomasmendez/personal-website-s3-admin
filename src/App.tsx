import { FC, ReactNode } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import SignOut from './auth/SignOut';

import {
  BrowserRouter as Router,
  useRoutes,
  Navigate
} from 'react-router-dom';
import Home from './components/views/Home';
import Work from './components/views/Work';
import SkillsTools from './components/views/SkillsTools';
import Projects from './components/views/Projects';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Websites } from './types/websiteTypes';

import components from './auth/components';
import { useSelector } from 'react-redux';
import { getDarkMode } from './store/darkModeSlice';
import TitleHeader from './components/TitleHeader/TitleHeader';

interface AppPage {
  pageComponent: ReactNode
  title?: string
}

const AppPage: FC<AppPage> = ({ pageComponent, title }) => {
  const darkMode = useSelector(getDarkMode)

  const websites: Websites[] = [
    {
      text: "Created with React!",
      link: "https://github.com/thomasmendez/personal-website-s3",
      icon: "react",
    },
    {
      text: "Check out the Vue version!",
      link: "https://vue.thomasamendez.com",
      icon: "vue",
    }
  ]

  return(
    <div className={`${darkMode && "dark"}`}>
      <Header/>
      {title && <TitleHeader title={title}/>}
      {pageComponent}
      <Footer websites={websites}/>
    </div>
  )
}

const LoginPage = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  // Redirect if already authenticated
  if (authStatus === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return <Authenticator components={components} />;
};

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <AppPage pageComponent={<Home name="Thomas A. Mendez" jobTitle="Software Engineer and Game Developer" />} />},
    { path: '/about', element: <AppPage pageComponent={<Home name="Thomas A. Mendez" jobTitle="Software Engineer and Game Developer" />} />},
    { path: '/work', element: <AppPage title='Where I Worked' pageComponent={<Work />} /> },
    { path: '/skills-tools', element: <AppPage title='Skills & Tools' pageComponent={<SkillsTools />} /> },
    { path: '/vr-ar', element: <AppPage title='Virtual Reality (VR) / Augmented Reality (AR) Projects' pageComponent={<Projects />} /> },
    { path: '/software-engineering', element: <AppPage title='Software Engineering Projects' pageComponent={<Projects />} /> },
    { path: '/login', element: <Authenticator components={components}><LoginPage /></Authenticator> },
    { path: '/sign-out', element: <AppPage pageComponent={<SignOut />} /> },
  ]);
  return routes;
}

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App
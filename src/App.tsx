import { FC, ReactNode } from 'react';
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
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Websites } from './types/websiteTypes';

import components from './auth/components';
import { useSelector } from 'react-redux';
import { getDarkMode } from './store/darkModeSlice';
import TitleHeader from './components/TitleHeader/TitleHeader';

const isAuthEnabled = import.meta.env.VITE_AUTH_ENABLED

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

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <AppPage pageComponent={<Home name="Thomas A. Mendez" jobTitle="Software Engineer and Game Developer" />} />},
    { path: '/about', element: <AppPage pageComponent={<Home name="Thomas A. Mendez" jobTitle="Software Engineer and Game Developer" />} />},
    { path: '/work', element: <AppPage title='Where I Worked' pageComponent={<Work />} /> },
    { path: '/skills-tools', element: <AppPage title='Skills & Tools' pageComponent={<SkillsTools />} /> },
    { path: '/vr-ar', element: <AppPage title='Virtual Reality (VR) / Augmented Reality (AR) Projects' pageComponent={<Projects />} /> },
    { path: '/software-engineering', element: <AppPage title='Software Engineering Projects' pageComponent={<Projects />} /> }
  ]);
  return routes;
}

const App = () => {
  return (
    <>
      {isAuthEnabled === "true" ? (
        <Authenticator components={components}>
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

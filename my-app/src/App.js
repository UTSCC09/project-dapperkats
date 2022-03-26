import './App.css';
import { CreateMarker } from './components/CreateMarker/CreateMarker';
import NavBar from './components/NavBar/NavBar';
import { ViewJourney } from './components/ViewJourney/ViewJourney';
import { CreateJourney } from './components/CreateJourney/CreateJourney';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Journeys } from './components/Journeys/Journeys';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { Comment } from './components/Comments/Comment/Comment';
import { CommentForm } from './components/Comments/CommentForm/CommentForm';
import { Follow } from './components/Follow/Follow';
import { gql, useLazyQuery } from "@apollo/client";
import { CommentList } from './components/Comments/CommentList/CommentList';
import React, { useEffect, useState } from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  // uri: 'http://147.182.149.236:5000/graphql',
  uri: 'https://api.coordinatea.me',
  credentials: 'include'
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

const theme = createTheme({
  palette: {
    primary: {
      light: '#e6ffff',
      main: '#b3e5fc',
      dark: '#82b3c9',
      contrastText: '#000',
    },
    secondary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#fff',
    },
  },
});

const getUserQuery = gql`
  query {
    getUser {
      username
    }
  }
`

function App() {

  const [username, setUsername] = useState(null);

  const [getUser, { loading, error, data }] = useLazyQuery(getUserQuery, {
    onCompleted: (data) => {
      if (data.getUser)
        setUsername(data.getUser.username);
    }
  })

  useEffect(() => {
    getUser()
  }, [])
  // let element = useRoutes([
  //   {
  //     path: "/",
  //     element: <Journeys />,
  //   },
  //   { path: "/journey/:id", element: <ViewJourney /> },
  //   { path: "/signup/", element: <SignIn /> },
  //   { path: "/sigin/", element: <SignUp /> },
  //   { path: "/follow/", element: <Follow /> },

  //   { path: "/journey/:id/:id2", element: <ViewJourney /> },
  //   { path: "/journey/create", element: <CreateJourney /> },
  // ]);
  // return element;

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <NavBar username={username} setUsername={setUsername}></NavBar>
          <Routes>
            <Route path="/" element={<Journeys />}></Route>
            <Route path="/journey/:journeyId" element={<ViewJourney />}></Route>
            <Route path="/journey/:journeyId/:markerId" element={<ViewJourney />}></Route>
            <Route path="/journey/create/" element={<CreateJourney />}></Route>
            <Route path="/journey/create/:journeyId" element={<CreateMarker />}></Route>
            <Route path="/signin/" element={<SignIn setUsername={setUsername} />}></Route>
            <Route path="/signup/" element={<SignUp setUsername={setUsername} />}></Route>
            <Route path="/follow/" element={<Follow />}></Route>
            <Route path="/comment/" element={
              <div>
                <CommentList username={'A'} />
              </div>}
            ></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );

}

export default App;

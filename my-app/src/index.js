import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";

const env = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/graphql' : 'https://api.coordinatea.me/graphql';
const link = createHttpLink({
  uri: env,
  credentials: 'include'
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <CookiesProvider>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </CookiesProvider>
    </React.StrictMode>
  </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

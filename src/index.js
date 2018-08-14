import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

import { injectGlobal, ThemeProvider } from 'styled-components';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import 'minireset.css/minireset.css';

import { configureStore } from './common/configureStore';
import { theme } from './style/theme';
import Alverata from './assets/fonts/Alverata-Black.otf';
import SFPro from './assets/fonts/SF-Pro-Display-Regular.otf';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';

const store = configureStore();
addLocaleData([...en, ...es]);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);

// Global style
injectGlobal`
@font-face {
  font-family: 'Alverata-Black';
  font-weight: bold;
  src: url(${Alverata}) format("opentype");
}

@font-face {
  font-family: 'SF-Pro';
  font-weight: normal;
  src: url(${SFPro}) format("opentype");
}

html {
  height: 100%;
}

body {
  font-family: 'SF-Pro';
  font-size: 16px;
  height: 100%;
}
h1 {
  font-size: 2em;
}
h1, h2, h3 {
  font-family: 'Alverata-Black';
  margin: 1em 0;
}
#root{
  height: 100%;
}
`;

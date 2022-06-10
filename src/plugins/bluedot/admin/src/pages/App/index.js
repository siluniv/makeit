/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, useParams, Redirect } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';

import pluginId from '../../pluginId';
import { Helmet } from 'react-helmet';
import { Layout } from '@strapi/design-system/Layout'

import HomePage from '../HomePage';
import PluginInfosPage from '../PluginInfosPage';
import PostPage from '../PostPage';
import MemberPage from '../MemberPage';

import SettingsNav from './components/SettingsNav';

const App = () => {
  return (
    <Layout sideNav={<SettingsNav />}>
      <Helmet title="Bluedot" />

      <Switch>
      <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route path={`/plugins/${pluginId}/plugin-infos`} component={PluginInfosPage} />
        <Route path={`/plugins/${pluginId}/posts`} component={PostPage} />
        <Route path={`/plugins/${pluginId}/members`} component={MemberPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;

/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { Routes, Redirect, Route, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Layout } from '@strapi/design-system/Layout'
import { Main } from '@strapi/design-system/Main';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';

import { Link } from '@strapi/design-system/v2/Link';
import { NavLink } from 'react-router-dom';

import PluginInfosPage from './pages/PluginInfosPage';
import PostPage from './pages/PostPage';

const HomePage = () => {

  return (
    <Layout>
      Test
    </Layout>
  );
};

export default memo(HomePage);

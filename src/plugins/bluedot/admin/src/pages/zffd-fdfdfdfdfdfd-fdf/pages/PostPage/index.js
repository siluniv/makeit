/*
 *
 * PostPage
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
import pluginId from '../../../../pluginId';
import { Layout } from '@strapi/design-system/Layout'
import { Main } from '@strapi/design-system/Main';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';

import { Link } from '@strapi/design-system/v2/Link';
import { NavLink } from 'react-router-dom';

const PostPage = () => {
  return (
    <Layout>
      <Main>
        <Box padding={10}>
          <Grid>
            <GridItem col={8} s={12}>
              <Link as={NavLink} to={'/plugins/'+pluginId+'/posts'}>Post Page</Link>
            </GridItem>
          </Grid>
{/*

      <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding ddd</p>
    </div> */}
        </Box>
      </Main>
    </Layout>
  );
};

export default memo(PostPage);

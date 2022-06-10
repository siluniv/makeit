import React from 'react';
import { useAppInfos, SettingsPageTitle, useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, Layout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Typography } from '@strapi/design-system/Typography';

const PluginInfosPage = () => {

  return (
    <Layout>
      {/* <SettingsPageTitle name="Application" /> */}
      <Main>
        <HeaderLayout
          title={formatMessage({ id: 'Bluedot.plugin.title', defaultMessage: 'Overview' })}
          subtitle={formatMessage({
            id: 'Bluedot.plugin.description',
            defaultMessage: 'Administration panel’s global information',
          })}
        />
      </Main>
    </Layout>
  );
};

export default PluginInfosPage;

/**
 *
 * HomePage
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Button } from '@strapi/design-system/Button';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <Helmet title="Bluedot" />

      <HeaderLayout
        title={formatMessage({ id: 'Bluedot.home.title', defaultMessage: 'Home' })}
        subtitle={formatMessage({
          id: 'Bluedot.home.description',
          defaultMessage: '',
        })}
      />
      <ContentLayout>
        <div>home</div>
      </ContentLayout>

    </Main>
  );
};

export default HomePage;

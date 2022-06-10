/**
 *
 * MemberPage
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Button } from '@strapi/design-system/Button';

import memberRequests from '../../api/member';

const MemberPage = () => {
  const { formatMessage } = useIntl();

  const apiTest = async () => {
    const resulsts = await memberRequests.collect();
    console.log(resulsts)
  }

  return (
  <Main>
    <Helmet title="Bluedot" />

    <HeaderLayout
      title={formatMessage({ id: 'Bluedot.members.title', defaultMessage: 'Member' })}
      subtitle={formatMessage({
        id: 'Bluedot.members.description',
        defaultMessage: 'Bluedot admin panel',
      })}
    />
    <ContentLayout>
      <Button
        onClick={() => apiTest()}
      >
        Collect Posts
      </Button>
      <div>members</div>
    </ContentLayout>
  </Main>
  );
};

export default MemberPage;

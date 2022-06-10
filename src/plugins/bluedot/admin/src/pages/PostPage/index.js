/**
 *
 * PostPage
 *
 */
import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Button } from '@strapi/design-system/Button';

import postRequests from '../../api/post';

const PostPage = () => {
  const { formatMessage } = useIntl();

  const apiTest = async () => {
    const resulsts = await postRequests.collect();
    console.log(resulsts)
  }

  return (
  <Main>
    <Helmet title="Bluedot" />

    <HeaderLayout
      title={formatMessage({ id: 'Bluedot.posts.title', defaultMessage: 'Post' })}
      subtitle={formatMessage({
        id: 'Bluedot.posts.description',
        defaultMessage: '-',
      })}
    />
    <ContentLayout>
      <Button
        onClick={() => apiTest()}
      >
        Collect Posts
      </Button>
      <div>posts</div>
    </ContentLayout>
  </Main>
  );
};

export default PostPage;

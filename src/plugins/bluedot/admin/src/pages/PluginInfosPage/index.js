import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useAppInfos, SettingsPageTitle, useFocusWhenNavigate } from '@strapi/helper-plugin';
import { HeaderLayout, Layout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';

import postRequests from '../../api/post';

const PluginInfosPage = () => {
  const { formatMessage } = useIntl();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postRequests.getPosts().then(res => {
      setPosts(res.data);
    });
  }, [setPosts]);



  const handlePost = async () => {
    console.log('test')
    const result = await postRequests.process();
    console.log(result)
    // const entry = await strapi.entityService.create('plugin::bluedot.post', {
    //   data: {
    //     title: 'My Article',
    //   },
    // });
    // console.log(entry)

    // const entries = await strapi.entityService.findMany('api::article.article', {
    //   fields: ['title']
    // });
    // console.log(entries);

    // const test = strapi.controller('plugin::bluedot.postController')
    // console.log(test)
  }

  return (
    <Layout>
      <Helmet title="Overview - Bluedot" />

      <Main>
        <HeaderLayout
          title={formatMessage({ id: 'Bluedot.plugin.title', defaultMessage: 'Overview' })}
          subtitle={formatMessage({
            id: 'Bluedot.plugin.description',
            defaultMessage: 'Administration panel’s global information',
          })}
        />
        <ContentLayout>
          <div>overview</div>
          {/* <Button
            onClick={() => handlePost()}
          >
            Test
          </Button>

          {posts.length > 0 && (
          <Box background="neutral0" hasRadius={true} shadow="filterShadow">
            <Flex justifyContent="center" padding={8}>
              <Typography variant="alpha">You have a total of {posts.length} tasks 🚀</Typography>
            </Flex>
          </Box>
          )} */}
        </ContentLayout>
      </Main>
    </Layout>
  );
};

export default PluginInfosPage;

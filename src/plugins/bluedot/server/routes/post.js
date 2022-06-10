'use strict';

module.exports = {
  type: 'admin', // other type available: content-api.
  routes: [
    {
      method: 'GET',
      path: '/posts',
      handler: 'postController.findMany',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/posts/:id',
      handler: 'postController.findOne',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/posts/:id',
      handler: 'postController.update',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/posts',
      handler: 'postController.create',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/posts/collect',
      handler: 'postController.collect',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};

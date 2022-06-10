'use strict';

function getParams(url) {
  const queryString = url.substr(url.indexOf("?") + 1);
  const params = new URLSearchParams(decodeURIComponent(queryString));
  if (params.has('data')) {
    return JSON.parse(params.get('data'));
  }
  return null;
}

module.exports = {
  async findMany(ctx) {
    try {
      const data = getParams(ctx.request.url);
      ctx.body = await strapi
        .plugin('bluedot')
        .service('postService')
        .findMany(data);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async findOne(ctx) {
    try {
      console.log(ctx.params)
      ctx.body = await strapi
        .plugin('bluedot')
        .service('postService')
        .findOne(ctx.params.id);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async update(ctx) {
    try {
      ctx.body = await strapi
      .plugin('bluedot')
      .service('postService')
      .update(ctx.params.id, ctx.request.body.data);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async create(ctx) {
    try {
      ctx.body = await strapi
      .plugin('bluedot')
      .service('postService')
      .create(ctx.request.body);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async collect(ctx) {
    try {
      ctx.body = await strapi
      .plugin('bluedot')
      .service('postService')
      .collect();
    } catch (error) {
      ctx.throw(500, error);
    }
  }
};

'use strict';

module.exports = {
  async sites(ctx) {
    ctx.body = await strapi
      .plugin('bluedot')
      .service('siteService')
      .getSites();
  },
  // posts(ctx) {
  //   ctx.body = 'bluedot';
  // }
};

'use strict';

module.exports = ({ strapi }) => ({
  async getSites() {
    return await strapi.query('plugin::bluedot.site').findMany()
  }
});

'use strict';

const dayjs = require('dayjs')
const BluedotContentAPI = require('./utils/BluedotContentAPI');

const exitstMember = async (member) => {
  const results = await strapi.query('plugin::bluedot.member').findOne({
    where: {
      site_id: member.site_id,
      uuid: member.uuid
    }
  });
  return results;
}

const updateMember = async (member, newMember) => {
  try {
    if (dayjs(member.origin_updated_at).diff(dayjs(newMember.origin_updated_at)) < 0) {
      const results = await strapi.query('plugin::bluedot.member').update({
        where: {
          id: member.id
        },
        data : newMember,
      });
      return results;
    }
    return null;
  } catch (error) {
    throw new Error(error)
  }
}

const createMany = async (site_id, members) => {
  try {
    const values = []
    for (const member of members) {
      const data = {
        site_id: site_id,
        uuid: member.uuid,
        email: member.email,
        name: member.name,
        avatar_image: member.avatar_image,
        status: member.status,
        origin_created_at: dayjs(member.created_at).format('YYYY-MM-DD HH:mm:ss'),
        origin_updated_at: dayjs(member.updated_at).format('YYYY-MM-DD HH:mm:ss'),
      }

      const searchedMember = await exitstMember(data);
      if (searchedMember !== null) {
        await updateMember(searchedMember, data);
      } else {
        values.push(data)
      }
    }
    if (values.length > 0) {
      await strapi.query('plugin::bluedot.member').createMany({ data: values });
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getBluedotContentAPI = site => {
  try {
    return new BluedotContentAPI({
      url: site.url,
      key: site.content_api,
      version: 'canary'
    });
  } catch (error) {
    throw new Error(error)
  }
};

const memberCollection = async (options) => {
  const _options = Object.assign({}, {
    site: null,
    limit: 5,
    page: 1,
  }, options);

  if (_options.site === null || _options.page === null || _options.page > 10)
    return true;

  const api = getBluedotContentAPI(_options.site);

  const members = await api.members
    .browse(_options)
    .catch(err => {
      console.error(err);
    });

  await createMany(_options.site.id, members);

  _options.page = members.meta.pagination.next;
  await memberCollection(_options);
}

module.exports = ({ strapi }) => ({
  // async findMany(data) {
  //   return await strapi.query('plugin::bluedot.post').findMany(data);
  // },
  // async findOne(id) {
  //   return await strapi.query('plugin::bluedot.post').findOne({
  //     where: {
  //       id: id
  //     }
  //   })
  // },
  // async update(id, data) {
  //   return await strapi.query('plugin::bluedot.post').update({
  //     where: {
  //       id: id
  //     },
  //     data : data,
  //   });
  // },
  // async create(data) {
  //   return await strapi.query('plugin::bluedot.post').create(data)
  // },
  async collect(options) {
    const sites = await strapi.query('plugin::bluedot.site').findMany();
    for(const site of sites) {
      const collect = await strapi.query('plugin::bluedot.collect').create({
        data: {
          site_id: site.id,
          type: "member",
          status: "start"
        }
      });
      console.log(collect);

      await memberCollection({ site: site });

      await strapi.query('plugin::bluedot.collect').update({
        where: { id: collect.id },
        data: {
          status: "completed"
        }
      });
    }
    return true;
  }
});

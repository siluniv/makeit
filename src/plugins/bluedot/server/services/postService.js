'use strict';

const dayjs = require('dayjs')
const BluedotContentAPI = require('./utils/BluedotContentAPI');

const exitstPost = async (post) => {
  const results = await strapi.query('plugin::bluedot.post').findOne({
    where: {
      site_id: post.site_id,
      uuid: post.uuid
    }
  });
  return results;
}

const updatePost = async (post, newPost) => {
  try {
    if (dayjs(post.origin_updated_at).diff(dayjs(newPost.origin_updated_at)) < 0) {
      const results = await strapi.query('plugin::bluedot.post').update({
        where: {
          id: post.id
        },
        data : newPost,
      });
      return results;
    }
    return null;
  } catch (error) {
    throw new Error(error)
  }
}

const createMany = async (site_id, posts) => {
  try {
    const values = []
    let keys = []
    let first = true

    for (const post of posts) {
      const data = {
        site_id: site_id,
        uuid: post.uuid,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        feature_image: post.feature_image,
        featured: post.featured,
        status: 'published',
        visibility: post.visibility,
        comment_count: post.comment_count,
        origin_created_at: dayjs(post.created_at).format('YYYY-MM-DD HH:mm:ss'),
        origin_updated_at: dayjs(post.updated_at).format('YYYY-MM-DD HH:mm:ss'),
        origin_published_at: dayjs(post.published_at).format('YYYY-MM-DD HH:mm:ss'),
        canonical_url: post.url,
      }
      if (first) {
        keys = Object.keys(data)
        first = false
      }

      const searchedPost = await exitstPost(data);
      if (searchedPost !== null) {
        await updatePost(searchedPost, data);
      } else {
        values.push(data)
      }
    }
    if (values.length > 0) {
      await strapi.query('plugin::bluedot.post').createMany({ data: values });
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
      version: 'v3.0'
    });
  } catch (error) {
    throw new Error(error)
  }
};

const postCollection = async (options) => {
  const _options = Object.assign({}, {
    site: null,
    limit: 5,
    page: 1,
  }, options);

  if (_options.site === null || _options.page === null || _options.page > 10)
    return true;

  const api = getBluedotContentAPI(_options.site);

  const posts = await api.posts
    .browse(_options)
    .catch(err => {
      console.error(err);
    });

  await createMany(_options.site.id, posts);

  _options.page = posts.meta.pagination.next;
  await postCollection(_options);
}

module.exports = ({ strapi }) => ({
  async findMany(data) {
    return await strapi.query('plugin::bluedot.post').findMany(data);
  },
  async findOne(id) {
    return await strapi.query('plugin::bluedot.post').findOne({
      where: {
        id: id
      }
    })
  },
  async update(id, data) {
    return await strapi.query('plugin::bluedot.post').update({
      where: {
        id: id
      },
      data : data,
    });
  },
  async create(data) {
    return await strapi.query('plugin::bluedot.post').create(data)
  },
  async collect(options) {
    const sites = await strapi.query('plugin::bluedot.site').findMany();
    for(const site of sites) {
      const collect = await strapi.query('plugin::bluedot.collect').create({
        data: {
          site_id: site.id,
          type: "post",
          status: "start"
        }
      });
      const results = await postCollection({ site: site });
      console.log(results);
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

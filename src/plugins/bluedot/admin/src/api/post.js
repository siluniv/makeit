import axiosInstance from '../../src/utils/axiosInstance';

const postRequests = {
  findMany: async (data) => {
    return await axiosInstance.get(`/bluedot/posts`, { params: { data: data }});
  },
  findOne: async (id) => {
    return await axiosInstance.get(`/bluedot/posts/${id}`);
  },
  update: async (id, data) => {
    return await axiosInstance.put(`/bluedot/posts/${id}`, {
      data: data,
    })
  },
  create: async data => {
    return await axiosInstance.post(`/bluedot/posts`, {
      data: data,
    })
  },
  existPost: async (site_id, uuid) => {
    return await axiosInstance.get(`/bluedot/posts`, {
      params: {
        data: {
          where: {
            site_id: site_id,
            uuid: uuid
          }
        }
      }
    })
  },
  collect: async () => {
    return await axiosInstance.post(`/bluedot/posts/collect`);
  }
};
export default postRequests;

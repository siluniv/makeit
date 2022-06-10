import axiosInstance from '../../src/utils/axiosInstance';

const memberRequests = {
  // findMany: async (data) => {
  //   return await axiosInstance.get(`/bluedot/members`, { params: { data: data }});
  // },
  // findOne: async (id) => {
  //   return await axiosInstance.get(`/bluedot/members/${id}`);
  // },
  // update: async (id, data) => {
  //   return await axiosInstance.put(`/bluedot/members/${id}`, {
  //     data: data,
  //   })
  // },
  // create: async data => {
  //   return await axiosInstance.post(`/bluedot/members`, {
  //     data: data,
  //   })
  // },
  // existPost: async (site_id, uuid) => {
  //   return await axiosInstance.get(`/bluedot/members`, {
  //     params: {
  //       data: {
  //         where: {
  //           site_id: site_id,
  //           uuid: uuid
  //         }
  //       }
  //     }
  //   })
  // },
  collect: async () => {
    return await axiosInstance.post(`/bluedot/members/collect`);
  }
};
export default memberRequests;

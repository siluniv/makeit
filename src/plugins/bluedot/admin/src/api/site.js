import axiosInstance from '../../src/utils/axiosInstance';

const siteRequests = {
  getSites: async () => {
    const responses = await axiosInstance.get(`/bluedot/sites`);
    return responses.data;
  }
};
export default siteRequests;

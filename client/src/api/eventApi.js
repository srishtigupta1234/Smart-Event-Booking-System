import axiosInstance from "./axiosInstance";

export const getAllEventsApi = async () => {
  const res = await axiosInstance.get("/events");
  return res.data;
};

export const createEventApi = async (data) => {
  const res = await axiosInstance.post("/events", data);
  return res.data;
};

export const updateEventApi = async (id, data) => {
  const res = await axiosInstance.put(`/events/${id}`, data);
  return res.data;
};

export const deleteEventApi = async (id) => {
  const res = await axiosInstance.delete(`/events/${id}`);
  return res.data;
};
export const getEventByIdApi = async (id) => {
  const res = await axiosInstance.get(`/events/${id}`);
  return res.data;
};
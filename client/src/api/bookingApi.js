import axiosInstance from "./axiosInstance";

export const bookEventApi = async (data) => {
  const res = await axiosInstance.post("/bookings", data);
  return res.data;
};

export const getUserBookingsApi = async () => {
  const res = await axiosInstance.get("/bookings");
  return res.data;
};

export const cancelBookingApi = async (id) => {
  const res = await axiosInstance.delete(`/bookings/${id}`);
  return res.data;
};
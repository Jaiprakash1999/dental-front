import moment from "moment";

export const formatDateTime = (timestamp) => {
  return moment(timestamp).format("DD MMM YYYY");
};

export const formatTime = (timestamp) => {
  return moment(timestamp).format("hh:mm A");
};

export const formatTimeWithDay = (timestamp) => {
  return moment(timestamp).format("dddd");
};

export const formatTimeDateWithIST = (timestamp) => {
  return moment(timestamp).utcOffset(330).format("YYYY-MM-DDTHH:mm:ss.SSSX");
};

export const formatDateAndTime = (timestamp) => {
  return moment(timestamp).format("YYYY-MM-DDTHH:mm");
};

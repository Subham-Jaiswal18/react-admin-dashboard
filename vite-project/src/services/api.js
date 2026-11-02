import {
  dashboardData,
  ordersData,
  productsData,
  profileData,
  settingsData,
  usersData,
} from '../dummyData/dummyData';

const delay = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Dashboard API

const getDashboard = async () => {
  await delay();
  return dashboardData;
};

// User API

const getUsers = async () => {
  await delay();
  return usersData;
};

// Product API

const getProducts = async () => {
  await delay();
  return productsData;
};

// Order API

const getOrders = async () => {
  await delay();
  return ordersData;
};

// Settings API

const getSettings = async () => {
  await delay();
  return settingsData;
};

// Profile API

const getProfile = async () => {
  await delay();
  return profileData;
};

export const api = {
  getDashboard,
  getOrders,
  getProducts,
  getProfile,
  getSettings,
  getUsers,
};

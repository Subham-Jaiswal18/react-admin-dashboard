export const dashboardData = {
  stats: {
    totalUsers: 1247,
    activeUsers: 892,
    totalOrders: 3456,
    revenue: 89420,
    growth: 12.5,
  },

  recentOrders: [
    {
      id: 1,
      customer: "Rahul Sharma",
      amount: 2499,
      status: "Completed",
      date: "2026-08-10",
    },
    {
      id: 2,
      customer: "Priya Patel",
      amount: 1899,
      status: "Pending",
      date: "2026-08-10",
    },
    {
      id: 3,
      customer: "Amit Kumar",
      amount: 3599,
      status: "Shipped",
      date: "2026-08-09",
    },
    {
      id: 4,
      customer: "Sneha Reddy",
      amount: 1299,
      status: "Completed",
      date: "2026-08-09",
    },
    {
      id: 5,
      customer: "Vikram Singh",
      amount: 4999,
      status: "Cancelled",
      date: "2026-08-08",
    },
    {
      id: 6,
      customer: "Neha Jain",
      amount: 799,
      status: "Completed",
      date: "2026-08-08",
    },
  ],

  chartData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    values: [4200, 5800, 4900, 7400, 9100, 10500, 12400],
  },
};



export const usersData = {
  items: [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Admin",
      status: "Active",
      joined: "2026-01-15",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      role: "Editor",
      status: "Active",
      joined: "2026-02-20",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      role: "Viewer",
      status: "Inactive",
      joined: "2026-03-10",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha@example.com",
      role: "Editor",
      status: "Active",
      joined: "2026-04-05",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@example.com",
      role: "Admin",
      status: "Active",
      joined: "2026-05-12",
    },
    {
      id: 6,
      name: "Neha Jain",
      email: "neha@example.com",
      role: "Viewer",
      status: "Active",
      joined: "2026-06-18",
    },
    {
      id: 7,
      name: "Deepak Gupta",
      email: "deepak@example.com",
      role: "Editor",
      status: "Inactive",
      joined: "2026-07-01",
    },
    {
      id: 8,
      name: "Kavya Nair",
      email: "kavya@example.com",
      role: "Admin",
      status: "Active",
      joined: "2026-07-22",
    },
  ],

  total: 8,
  page: 1,
  limit: 10,
};

export const productsData = {
  items: [
    {
      id: 1,
      name: "Laptop Pro X",
      category: "Electronics",
      price: 89999,
      stock: 45,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      category: "Audio",
      price: 2499,
      stock: 120,
      status: "In Stock",
    },
    {
      id: 3,
      name: "Smart Watch V3",
      category: "Wearables",
      price: 15999,
      stock: 28,
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      category: "Accessories",
      price: 3499,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 5,
      name: "USB-C Hub",
      category: "Accessories",
      price: 1899,
      stock: 67,
      status: "In Stock",
    },
    {
      id: 6,
      name: 'Monitor 27" 4K',
      category: "Electronics",
      price: 45999,
      stock: 15,
      status: "In Stock",
    },
  ],

  total: 6,
  page: 1,
  limit: 10,
};

export const ordersData = {
  items: [
    {
      id: 101,
      customer: "Rahul Sharma",
      total: 2499,
      status: "Completed",
      date: "2026-08-10",
      items: 2,
    },
    {
      id: 102,
      customer: "Priya Patel",
      total: 1899,
      status: "Pending",
      date: "2026-08-10",
      items: 1,
    },
    {
      id: 103,
      customer: "Amit Kumar",
      total: 3599,
      status: "Shipped",
      date: "2026-08-09",
      items: 3,
    },
    {
      id: 104,
      customer: "Sneha Reddy",
      total: 1299,
      status: "Completed",
      date: "2026-08-09",
      items: 1,
    },
    {
      id: 105,
      customer: "Vikram Singh",
      total: 4999,
      status: "Cancelled",
      date: "2026-08-08",
      items: 4,
    },
    {
      id: 106,
      customer: "Neha Jain",
      total: 799,
      status: "Completed",
      date: "2026-08-08",
      items: 1,
    },
    {
      id: 107,
      customer: "Deepak Gupta",
      total: 6499,
      status: "Shipped",
      date: "2026-08-07",
      items: 2,
    },
  ],

  total: 7,
  page: 1,
  limit: 10,
};

export const settingsData = {
  siteName: "Admin Dashboard",
  theme: "Light",
  notifications: true,
  language: "English",
  timezone: "Asia/Kolkata",
  twoFactor: false,
};

export const profileData = {
  id: 1,
  name: "Admin User",
  email: "admin@gmail.com",
  role: "Super Admin",
  joined: "2026-01-01",
  bio: "Full-stack developer with 8+ years of experience. Passionate about building beautiful, scalable products.",
  location: "Mumbai, India",
  website: "https://admin.com",
  phone: "+91 98765 43210",
};

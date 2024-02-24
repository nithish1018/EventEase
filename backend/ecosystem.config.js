module.exports = {
  apps: [
    {
      name: "your-app-name",
      script: "app.js", // or the entry point to your application
      instances: "max", // "max" will use as many instances as available CPU cores
      exec_mode: "cluster", // enable clustering
      env: {
        NODE_ENV: "production",
        PORT: 3000, // Set the port your application should listen to
      },
    },
  ],
};
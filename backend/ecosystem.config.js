module.exports = {
  apps: [
    {
      name: "EventEase",
      script: "index.js",
      instances: "max",
      exec_mode: "cluster",
      env_production: {
        PORT: 3000,
      },
      
    },
  ],
};

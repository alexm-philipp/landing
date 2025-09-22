module.exports = {
  apps: [{
    name: 'landing',
    script: 'npm',
    args: 'start',
    cwd: '/path/to/your/landing/directory', // Update this path
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};

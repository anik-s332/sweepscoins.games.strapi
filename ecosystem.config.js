require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'blog',
      cwd: __dirname,
      script: 'node',
      args: 'node_modules/@strapi/strapi/bin/strapi.js start',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 1337
      }
    }
  ]
}

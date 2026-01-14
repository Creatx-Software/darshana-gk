export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://darshanagalketayam.lk', 'https://api.darshanagalketayam.lk', 'https://*.cloudflare.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://darshanagalketayam.lk', 'https://api.darshanagalketayam.lk'],
          'script-src': ["'self'", "'unsafe-inline'", 'https://static.cloudflareinsights.com'],
          'script-src-elem': ["'self'", "'unsafe-inline'", 'https://static.cloudflareinsights.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:3000', 'https://darshanagalketayam.lk', 'https://api.darshanagalketayam.lk'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

const config = {
  API_URL: process.env.REACT_APP_API_URL ?? 'localhost',
  API_PORT: process.env.REACT_APP_API_PORT ?? 3030,
  SECRET_KEY: process.env.REACT_APP_SECRET ?? '',
};

export default config;
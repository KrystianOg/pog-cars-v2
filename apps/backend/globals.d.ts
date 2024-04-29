declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'staging' | 'production';
      PG_CONNECTION_STRING: string;
      JWT_SECRET: string;
    }
  }
}

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'staging' | 'production';
      JWT_SECRET: string;
      POSTGRES_USER: string;
      POSTGRES_HOST: string;
      POSTGRES_DB: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_PORT: number;
    }
  }
}

export { };

import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572881627964_4040';

  // add your egg config in here
  config.middleware = [];
  config.typeorm = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '19970311',
  database: 'complaint',
  synchronize: true,
  logging: false,
  entities: [ 'app/entity/**/*.ts' ],
  migrations: [ 'app/migration/**/*.ts' ],
  subscribers: [ 'app/subscriber/**/*.ts' ],
  cli: {
    entitiesDir: 'app/entity',
    migrationsDir: 'app/migration',
    subscribersDir: 'app/subscriber',
    },

  };
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
      useSession: false,
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token',
      bodyName: '_csrf',
      queryName: '_csrf',
    },
    domainWhiteList: [ '*' ],
  };
  config.security = {
　　csrf: {
　　　　enable: false,
　　　　},
　　domainWhiteList: [ '*' ],
　　};
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
};
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

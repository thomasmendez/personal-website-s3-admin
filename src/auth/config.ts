import { ResourcesConfig } from '@aws-amplify/core';

const authEnabled = import.meta.env.VITE_AUTH_ENABLED === 'true';

const authConfig: ResourcesConfig = {
  ...(authEnabled && {
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
        loginWith: {
          email: true,
        },
      },
    },
  }),
};

export default authConfig;

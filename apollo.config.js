module.exports = {
  client: {
    service: {
      name: 'frimane',
      url: 'https://frimane.hasura.app/v1/graphql',
      headers: {
        'x-hasura-admin-secret': `${process.env.HASURA_ADMIN_SECRET}`,
      },
    },
    includes: [
      'src/**/*.tsx',
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.graphql',
    ],
  },
};

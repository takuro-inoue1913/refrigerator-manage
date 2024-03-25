module.exports = {
  client: {
    service: {
      name: 'Frimane-GraphQL-Sche-sl6cmx@current',
      url: 'https://current--frimane-graphql-sche-sl6cmx.apollographos.net/graphql',
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

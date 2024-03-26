module.exports = {
  client: {
    service: {
      name: 'Frimane-GraphQL-Sche-w2z77f@current',
      url: 'https://current--frimane-graphql-sche-w2z77f.apollographos.net/graphql',
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

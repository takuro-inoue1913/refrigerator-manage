module.exports = {
  client: {
    service: {
      name: 'Frimane-GraphQL-Schema@current',
      url: 'https://current--frimane-graphql-schema.apollographos.net/graphql',
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

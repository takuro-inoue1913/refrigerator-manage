module.exports = {
  client: {
    service: {
      name: 'Frimane-GraphQL-Schem-s0ry8@current',
      url: 'https://current--frimane-graphql-schem-s0ry8.apollographos.net/graphql',
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

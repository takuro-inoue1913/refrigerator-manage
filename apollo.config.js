module.exports = {
  client: {
    service: {
      name: 'takuro-inoues-Team@current',
      url: 'https://current--takuro-inoues-team.apollographos.net/graphql',
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

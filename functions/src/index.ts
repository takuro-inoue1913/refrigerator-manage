import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp(functions.config().firebase);

const createUser = `
mutation createUser($id: String = '', $email: String = '') {
  insert_users_one(object: {id: $id, email: $email}, on_conflict: {constraint: users_pkey, update_columns: []}) {
    id
    email
  }
}
`;

exports.processSignUp = functions.auth.user().onCreate((user) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  };

  return admin.auth().setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      const queryStr = {
        'query': createUser,
        'variables': {id: user.uid, email: user.email},
      };

      axios({
        method: 'post',
        url: 'https://refrigerator-manage.hasura.app/v1/graphql',
        data: queryStr,
        headers: {
          'x-hasura-admin-secret': 'yBH2ZlHhkPyjI3qPevJKKQcpqYjMJ1Sl8uApj4ns1Cks69Us6ccDewiSEpAGMORm',
        },
      });

      admin
        .firestore()
        .collection('user_meta')
        .doc(user.uid)
        .create({
          refreshTime: admin.firestore.FieldValue.serverTimestamp(),
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

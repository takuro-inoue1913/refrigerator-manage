import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp(functions.config().firebase);

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  };
  const hasuraAdminSecret = functions.config().hasura.admin_secret;

  try {
    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    axios({
      method: 'post',
      url: 'https://frimane.hasura.app/v1/graphql',
      data: {
        query: `
            mutation {
              insert_users_one(
                object: { 
                  id: "${user.uid}", 
                  email: "${user.email}"
                }, 
                on_conflict: {
                  constraint: users_pkey, 
                  update_columns: []
                }
              ) {
                id
                email
              }
            }
          `,
      },
      headers: {
        'x-hasura-admin-secret': hasuraAdminSecret,
      },
    });

    admin.firestore().collection('user_meta').doc(user.uid).create({
      refreshTime: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
});

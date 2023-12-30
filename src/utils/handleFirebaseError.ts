type FirebaseAuthErrorCode =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/operation-not-allowed'
  | 'auth/weak-password'
  | 'auth/invalid-credential';

/**
 * Firebase Authのエラーコードを日本語に変換する。
 * TODO: https://firebase.google.com/docs/auth/admin/errors?hl=ja に記載されているエラーコードを必要に応じて追加する。
 */
export const handleFirebaseError = (
  errorCode: FirebaseAuthErrorCode,
): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません。';
    case 'auth/user-disabled':
      return 'このアカウントは無効化されています。';
    case 'auth/user-not-found':
      return 'このメールアドレスは登録されていません。';
    case 'auth/wrong-password':
      return 'パスワードが間違っています。';
    case 'auth/email-already-in-use':
      return 'このメールアドレスは既に使用されています。';
    case 'auth/operation-not-allowed':
      return 'このメールアドレスは使用できません。';
    case 'auth/weak-password':
      return 'パスワードは6文字以上である必要があります。';
    case 'auth/invalid-credential':
      return 'メールアドレス、またはパスワードが正しくありません。';
    default:
      return 'エラーが発生しました。';
  }
};

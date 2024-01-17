import { ref, deleteObject } from 'firebase/storage';
import { storage } from '@src/utils/firebaseSettings';

/**
 * Firebase Storage から指定されたパスの画像ファイルを削除する。
 * @param {string} storagePath - 削除するファイルがあるStorage内のパス
 */
export const deleteUserImage = async (storagePath: string): Promise<void> => {
  // firebase の Storage URL からパスを抽出
  const matches = storagePath.match(/o\/(.+?)\?alt=media/);
  if (!matches || matches.length < 2) {
    throw new Error('Invalid storage path');
  }

  // 抽出したパスをデコード
  const url = decodeURIComponent(matches[1]);

  // Storageの参照を作成
  const storageRef = ref(storage, url);

  // ファイルを削除
  try {
    await deleteObject(storageRef);
    return Promise.resolve();
  } catch (error) {
    console.error('There was an error deleting the image:', error);
    return Promise.reject(error);
  }
};

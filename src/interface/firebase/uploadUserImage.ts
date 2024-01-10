import dayjs from 'dayjs';
import { storage } from '@src/utils/firebaseAuth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

/**
 * 対象の画像を firebase の指定 Path にアップロードする。
 * @param {string} imageUri
 * @param {string} storagePath
 */
export const uploadUserImage = async (
  imageUri: string,
  storagePath: string,
) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const filename =
    dayjs().format('YYYY-MMDD-HHmmss') +
    '-' +
    Math.random().toString(36).substring(2, 15);
  const storageRef = ref(storage, `${storagePath}/${filename}`);
  const snapshot = await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};

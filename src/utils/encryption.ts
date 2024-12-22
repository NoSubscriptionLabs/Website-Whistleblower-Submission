import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = crypto.getRandomValues(new Uint8Array(32)).join('');

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const generateReference = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `WB-${timestamp}-${random}`.toUpperCase();
};
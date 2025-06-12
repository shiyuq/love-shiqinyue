import OSS from "ali-oss";
import cryptojs from "crypto-js";

const SECRET_KEY_AKI = "ce450c6b-50aa-4a57-92a0-78cfefd82cf7";
const SECRET_KEY_AKS = "3012dcda-59dc-410e-bbc7-8e02be83abdf";

const decryptData = (data, key) => {
  const bytes = cryptojs.AES.decrypt(data, key);
  return bytes.toString(cryptojs.enc.Utf8);
};

const client = new OSS({
  accessKeyId: decryptData(
    "U2FsdGVkX19zuEMAAQEx2aDHh52NHpXmRVqw8eYeoAMi/TGBONn+YT9NgtHNIy8T",
    SECRET_KEY_AKI
  ),
  accessKeySecret: decryptData(
    "U2FsdGVkX19pjvhRF9ImXo96E25RHUZo5Cc4yGz7c75pSJlXh5rj587Lvcy8UngN",
    SECRET_KEY_AKS
  ),
  bucket: "shiqinyue",
  endpoint: "oss-cn-shanghai.aliyuncs.com",
  timeout: "60s"
});

const getFileExtension = file => {
  const name = file.name || "";
  return name.substring(name.lastIndexOf(".")) || "";
};

const uploadToOSS = async (fileInfo, filename) => {
  if (!fileInfo) return;

  const ext = getFileExtension(fileInfo);
  const fileName = `photo/${filename}${ext}`;

  try {
    const result = await client.put(fileName, fileInfo);
    return result.url;
  } catch (err) {
    throw err;
  }
};

export { uploadToOSS };

export default {
  uploadToOSS
};

import { AppConfigPath, HttpMethod, TransformedFeatureItem } from "../types";
import { enc, HmacSHA256, SHA256 } from "crypto-js";
import axios, { AxiosRequestConfig } from "axios";
import { getFunctionAppConfig } from "../utils";

function signRequest(
  host: string,
  method: HttpMethod,
  url: string,
  credential: string,
  secret: string,
  body: string = ""
) {
  const utcNow = new Date().toUTCString();
  const bodyHash = SHA256(body).toString(enc.Base64);

  const headersToSign = "x-ms-date;host;x-ms-content-sha256";
  const headerValues = `${method}\n${url}\n${utcNow};${host};${bodyHash}`;
  const headersSignature = HmacSHA256(
    headerValues,
    enc.Base64.parse(secret)
  ).toString(enc.Base64);

  return {
    "x-ms-date": utcNow,
    "x-ms-content-sha256": bodyHash,
    Authorization: `HMAC-SHA256 Credential=${credential}&SignedHeaders=${headersToSign}&Signature=${headersSignature}`,
  };
}

async function sendGetRequestToAppConfig(
  host: string,
  path: AppConfigPath,
  responseTransformer: (data: string) => TransformedFeatureItem[]
) {
  const appConfigUrl = getFunctionAppConfig("APP_CONFIG_INSTANCE_URL");
  const accessKeyId = getFunctionAppConfig("APP_CONFIG_READ_ONLY_KEY_ID");
  const accessKeySecret = getFunctionAppConfig("APP_CONFIG_READ_ONLY_SECRET");

  const headers = signRequest(
    host,
    HttpMethod.GET,
    path,
    accessKeyId,
    accessKeySecret
  );

  const options: AxiosRequestConfig = {
    baseURL: appConfigUrl,
    url: path,
    method: HttpMethod.GET,
    headers: headers,
    transformResponse: responseTransformer,
  };

  return axios(options);
}

export { sendGetRequestToAppConfig, signRequest };

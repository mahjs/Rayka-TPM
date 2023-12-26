import ClientApi from "./clientApi";

const axios = new ClientApi();

const ROOT_ADDRESS = "http://185.11.89.120:22664";

export const sendCode = async (mobile: string) =>
  await axios.http.post(ROOT_ADDRESS + "/send-code", {
    mobile,
  });

export const verifyCode = async (mobile: string, code: string) =>
  await axios.http.post(ROOT_ADDRESS + "/verify", {
    mobile,
    code,
  });

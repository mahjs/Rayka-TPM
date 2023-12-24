const config = {
  rootAddress: "http://2.189.59.122:2312",
  timeout: 25000,
  tokenName: "tpm_token",
  refreshTokenName: "",
};

export type AxiosReturnType<T> = {
  status: number;
  data: T;
  message: string;
};

export default config;

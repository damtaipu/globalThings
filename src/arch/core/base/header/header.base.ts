import { HttpHeaders } from "@angular/common/http";

const setHeader = (autorization?: string) => {
  let headToken: HttpHeaders;
  headToken = new HttpHeaders()
    .append("accept", "application/json")
    .append("Access-Control-Allow-Origin", "*")
    .append("accept", "text/plain")
    .append("accessKey", autorization);

  return headToken;
};

export const getHeader = () => {
  const authorizationToken = "640af625f9e141a59b9671c776896e29";
  return setHeader(authorizationToken);
};

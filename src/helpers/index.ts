import crypto from "crypto";

const SECRET = "TIMMY_REST-API";
export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: String) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

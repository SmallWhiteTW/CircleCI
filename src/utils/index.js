import * as R from "ramda";

export const hasData = R.compose(R.not, R.either(R.isNil, R.isEmpty));

export const filterEmpty = (arr) => arr.filter((a) => hasData(a));

export function BearerToken(token) {
  const fmtToken = token ? `Bearer ${token}` : token;
  return fmtToken;
}

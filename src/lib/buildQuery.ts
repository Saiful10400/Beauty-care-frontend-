type QueryValue = string | number | boolean | Array<string | number | boolean>;

function buildQuery(params: Record<string, QueryValue>): string {
  const queryObj: Record<string, string> = {};

  for (const key in params) {
    const val = params[key];

    if (Array.isArray(val)) {
      queryObj[key] = JSON.stringify(val);
    } else if (val !== undefined && val !== null) {
      queryObj[key] = String(val);
    }
  }

  return new URLSearchParams(queryObj).toString();
}

export default buildQuery
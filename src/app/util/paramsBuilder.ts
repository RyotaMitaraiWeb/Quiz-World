import { HttpParams } from '@angular/common/http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function paramsBuilder(options: Record<string, any> | undefined) {
  let params = new HttpParams();

  if (!options) {
    return params;
  }

  for (const key of Object.keys(options)) {
    const value = options[key as string];

    if (value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach(v => {
        params = params.append(key, String(v));
      });
    } else {
      params = params.append(key, String(value));
    }
  }

  return params;
}

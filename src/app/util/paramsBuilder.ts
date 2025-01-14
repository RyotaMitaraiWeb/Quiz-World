import { HttpParams } from "@angular/common/http";
import { SearchOptions } from "../types/search";

type searchOptionsKey = keyof SearchOptions;


export function paramsBuilder(searchOptions: SearchOptions | undefined) {
  let params = new HttpParams();

  if (!searchOptions) {
    return params;
  }
  
  for (const key in searchOptions) {
    const value = searchOptions[key as searchOptionsKey];
    if (value !== undefined) {
      params = params.append(key, value);
    }
  }

  return params;
}
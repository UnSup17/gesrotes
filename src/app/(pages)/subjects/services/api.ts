import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { tokenReceived, loggedOut } from './authSlice'
import { Mutex } from 'async-mutex'


const baseQuery = fetchBaseQuery({ baseUrl: '/' })
export const baseQueryAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // create a new mutex
  const mutex = new Mutex()

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (!result.error) {
    return result
  }

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  const release = await mutex.acquire()

  try {
    const refreshResult = await baseQuery(
      '/refreshToken',
      api,
      extraOptions
    )

    if (refreshResult.data) {
      api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(loggedOut())
    }

  } finally {
    // release must be called once the mutex should be released again.
    release()
  }

  return result;
}
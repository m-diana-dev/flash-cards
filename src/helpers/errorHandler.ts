import { toast } from 'react-toastify'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export type ErrorData = { field: string; message: string }

export type ServerErrorResponse = {
  errorMessages: ErrorData[]
}

export const errorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (error) {
    if ('status' in error) {
      if (error.status === 'FETCH_ERROR') {
        toast('Network Error')
      } else {
        if ((error.data as ServerErrorResponse).errorMessages) {
          toast(JSON.stringify((error.data as ServerErrorResponse).errorMessages[0].message))
        } else {
          toast(JSON.stringify((error.data as Error).message))
        }
      }
    }
  }
}

import {
  isSeamHttpOptionsWithApiKey,
  isSeamHttpOptionsWithClientSessionToken,
  SeamHttpInvalidOptionsError,
  type SeamHttpOptionsWithApiKey,
  type SeamHttpOptionsWithClientSessionToken,
} from './options.js'
import type { Options } from './parse-options.js'

type Headers = Record<string, string>

export const getAuthHeaders = (options: Options): Headers => {
  if ('publishableKey' in options) {
    return getAuthHeadersForPublishableKey(options.publishableKey)
  }

  if (isSeamHttpOptionsWithApiKey(options)) {
    return getAuthHeadersForApiKey(options)
  }

  if (isSeamHttpOptionsWithClientSessionToken(options)) {
    return getAuthHeadersForClientSessionToken(options)
  }

  throw new SeamHttpInvalidOptionsError(
    'Must specify an apiKey, clientSessionToken, or publishableKey',
  )
}

const getAuthHeadersForApiKey = ({
  apiKey,
}: SeamHttpOptionsWithApiKey): Headers => {
  if (isClientSessionToken(apiKey)) {
    throw new SeamHttpInvalidTokenError(
      'A Client Session Token cannot be used as an apiKey',
    )
  }

  if (isJwt(apiKey)) {
    throw new SeamHttpInvalidTokenError('A JWT cannot be used as an apiKey')
  }

  if (isAccessToken(apiKey)) {
    throw new SeamHttpInvalidTokenError(
      'An Access Token cannot be used as an apiKey',
    )
  }

  if (isPublishableKey(apiKey)) {
    throw new SeamHttpInvalidTokenError(
      'A Publishable Key cannot be used as an apiKey',
    )
  }

  if (!isSeamToken(apiKey)) {
    throw new SeamHttpInvalidTokenError(
      `Unknown or invalid apiKey format, expected token to start with ${tokenPrefix}`,
    )
  }

  return {
    authorization: `Bearer ${apiKey}`,
  }
}

const getAuthHeadersForClientSessionToken = ({
  clientSessionToken,
}: SeamHttpOptionsWithClientSessionToken): Headers => {
  if (isJwt(clientSessionToken)) {
    throw new SeamHttpInvalidTokenError(
      'A JWT cannot be used as a clientSessionToken',
    )
  }

  if (isAccessToken(clientSessionToken)) {
    throw new SeamHttpInvalidTokenError(
      'An Access Token cannot be used as a clientSessionToken',
    )
  }

  if (isPublishableKey(clientSessionToken)) {
    throw new SeamHttpInvalidTokenError(
      'A Publishable Key cannot be used as a clientSessionToken',
    )
  }

  if (!isClientSessionToken(clientSessionToken)) {
    throw new SeamHttpInvalidTokenError(
      `Unknown or invalid clientSessionToken format, expected token to start with ${clientSessionTokenPrefix}`,
    )
  }

  return {
    authorization: `Bearer ${clientSessionToken}`,
    'client-session-token': clientSessionToken,
  }
}

const getAuthHeadersForPublishableKey = (publishableKey: string): Headers => {
  if (isJwt(publishableKey)) {
    throw new SeamHttpInvalidTokenError(
      'A JWT cannot be used as a publishableKey',
    )
  }

  if (isAccessToken(publishableKey)) {
    throw new SeamHttpInvalidTokenError(
      'An Access Token cannot be used as a publishableKey',
    )
  }

  if (isClientSessionToken(publishableKey)) {
    throw new SeamHttpInvalidTokenError(
      'A Client Session Token Key cannot be used as a publishableKey',
    )
  }

  if (!isPublishableKey(publishableKey)) {
    throw new SeamHttpInvalidTokenError(
      `Unknown or invalid publishableKey format, expected token to start with ${publishableKeyTokenPrefix}`,
    )
  }

  return {
    'seam-publishable-key': publishableKey,
  }
}

export class SeamHttpInvalidTokenError extends Error {
  constructor(message: string) {
    super(`SeamHttp received an invalid token: ${message}`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export const warnOnInsecureuserIdentifierKey = (
  userIdentifierKey: string,
): void => {
  if (isEmail(userIdentifierKey)) {
    // eslint-disable-next-line no-console
    console.warn(
      ...[
        'Using an email for the userIdentifierKey is insecure and may return an error in the future!',
        'This is insecure because an email is common knowledge or easily guessed.',
        'Use something with sufficient entropy known only to the owner of the client session.',
        'For help choosing a user identifier key see',
        'https://docs.seam.co/latest/seam-components/overview/get-started-with-client-side-components#3-select-a-user-identifier-key',
      ],
    )
  }
}

const tokenPrefix = 'seam_'

const clientSessionTokenPrefix = 'seam_cst'

const publishableKeyTokenPrefix = 'seam_pk'

const isClientSessionToken = (token: string): boolean =>
  token.startsWith(clientSessionTokenPrefix)

const isAccessToken = (token: string): boolean => token.startsWith('seam_at')

const isJwt = (token: string): boolean => token.startsWith('ey')

const isSeamToken = (token: string): boolean => token.startsWith(tokenPrefix)

const isPublishableKey = (token: string): boolean =>
  token.startsWith(publishableKeyTokenPrefix)

// SOURCE: https://stackoverflow.com/a/46181
const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

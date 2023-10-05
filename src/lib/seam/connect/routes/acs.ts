/*
 * Automatically generated by generate-routes.ts.
 * Do not edit this file or add other files to this directory.
 */

import {
  type Client,
  type ClientOptions,
  createClient,
} from 'lib/seam/connect/client.js'
import {
  isSeamHttpOptionsWithApiKey,
  isSeamHttpOptionsWithClient,
  isSeamHttpOptionsWithClientSessionToken,
  SeamHttpInvalidOptionsError,
  type SeamHttpOptions,
  type SeamHttpOptionsWithApiKey,
  type SeamHttpOptionsWithClient,
  type SeamHttpOptionsWithClientSessionToken,
} from 'lib/seam/connect/options.js'
import { parseOptions } from 'lib/seam/connect/parse-options.js'

import { SeamHttpAcsAccessGroups } from './acs-access-groups.js'
import { SeamHttpAcsCredentials } from './acs-credentials.js'
import { SeamHttpAcsSystems } from './acs-systems.js'
import { SeamHttpAcsUsers } from './acs-users.js'
import { warnOnInsecureuserIdentifierKey } from './auth.js'
import { SeamHttpClientSessions } from './client-sessions.js'

export class SeamHttpAcs {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const clientOptions = parseOptions(apiKeyOrOptions)
    this.client = createClient(clientOptions)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpAcs {
    const constructorOptions = { ...options, client }
    if (!isSeamHttpOptionsWithClient(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpAcs(constructorOptions)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpAcs {
    const constructorOptions = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpAcs(constructorOptions)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpAcs {
    const constructorOptions = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpAcs(constructorOptions)
  }

  static async fromPublishableKey(
    publishableKey: string,
    userIdentifierKey: string,
    options: ClientOptions = {},
  ): Promise<SeamHttpAcs> {
    warnOnInsecureuserIdentifierKey(userIdentifierKey)
    const clientOptions = parseOptions({ ...options, publishableKey })
    const client = createClient(clientOptions)
    const clientSessions = SeamHttpClientSessions.fromClient(client)
    // TODO: clientSessions.getOrCreate({ user_identifier_key: userIdentifierKey })
    const { token } = await clientSessions.create({
      user_identifier_key: userIdentifierKey,
    })
    return SeamHttpAcs.fromClientSessionToken(token, options)
  }

  get accessGroups(): SeamHttpAcsAccessGroups {
    return SeamHttpAcsAccessGroups.fromClient(this.client)
  }

  get credentials(): SeamHttpAcsCredentials {
    return SeamHttpAcsCredentials.fromClient(this.client)
  }

  get systems(): SeamHttpAcsSystems {
    return SeamHttpAcsSystems.fromClient(this.client)
  }

  get users(): SeamHttpAcsUsers {
    return SeamHttpAcsUsers.fromClient(this.client)
  }
}

import { warnOnInsecureuserIdentifierKey } from './auth.js'
import { type Client, createClient } from './client.js'
import {
  isSeamHttpOptionsWithApiKey,
  isSeamHttpOptionsWithClient,
  isSeamHttpOptionsWithClientSessionToken,
  type SeamHttpFromPublishableKeyOptions,
  SeamHttpInvalidOptionsError,
  type SeamHttpOptions,
  type SeamHttpOptionsWithApiKey,
  type SeamHttpOptionsWithClient,
  type SeamHttpOptionsWithClientSessionToken,
} from './options.js'
import { parseOptions } from './parse-options.js'
import {
  SeamHttpAccessCodes,
  SeamHttpAcs,
  SeamHttpActionAttempts,
  SeamHttpClientSessions,
  SeamHttpConnectedAccounts,
  SeamHttpConnectWebviews,
  SeamHttpDevices,
  SeamHttpEvents,
  SeamHttpLocks,
  SeamHttpNoiseSensors,
  SeamHttpThermostats,
  SeamHttpWebhooks,
  SeamHttpWorkspaces,
} from './routes/index.js'

export class SeamHttp {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const clientOptions = parseOptions(apiKeyOrOptions)
    this.client = createClient(clientOptions)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttp {
    const constructorOptions = { ...options, client }
    if (!isSeamHttpOptionsWithClient(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttp(constructorOptions)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttp {
    const constructorOptions = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttp(constructorOptions)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttp {
    const constructorOptions = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttp(constructorOptions)
  }

  static async fromPublishableKey(
    publishableKey: string,
    userIdentifierKey: string,
    options: SeamHttpFromPublishableKeyOptions = {},
  ): Promise<SeamHttp> {
    warnOnInsecureuserIdentifierKey(userIdentifierKey)
    const clientOptions = parseOptions({ ...options, publishableKey })
    const client = createClient(clientOptions)
    const clientSessions = SeamHttpClientSessions.fromClient(client)
    const { token } = await clientSessions.getOrCreate({
      user_identifier_key: userIdentifierKey,
    })
    return SeamHttp.fromClientSessionToken(token, options)
  }

  get accessCodes(): SeamHttpAccessCodes {
    return SeamHttpAccessCodes.fromClient(this.client)
  }

  get acs(): SeamHttpAcs {
    return SeamHttpAcs.fromClient(this.client)
  }

  get actionAttempts(): SeamHttpActionAttempts {
    return SeamHttpActionAttempts.fromClient(this.client)
  }

  get clientSessions(): SeamHttpClientSessions {
    return SeamHttpClientSessions.fromClient(this.client)
  }

  get connectedAccounts(): SeamHttpConnectedAccounts {
    return SeamHttpConnectedAccounts.fromClient(this.client)
  }

  get connectWebviews(): SeamHttpConnectWebviews {
    return SeamHttpConnectWebviews.fromClient(this.client)
  }

  get devices(): SeamHttpDevices {
    return SeamHttpDevices.fromClient(this.client)
  }

  get events(): SeamHttpEvents {
    return SeamHttpEvents.fromClient(this.client)
  }

  get locks(): SeamHttpLocks {
    return SeamHttpLocks.fromClient(this.client)
  }

  get noiseSensors(): SeamHttpNoiseSensors {
    return SeamHttpNoiseSensors.fromClient(this.client)
  }

  get thermostats(): SeamHttpThermostats {
    return SeamHttpThermostats.fromClient(this.client)
  }

  get webhooks(): SeamHttpWebhooks {
    return SeamHttpWebhooks.fromClient(this.client)
  }

  get workspaces(): SeamHttpWorkspaces {
    return SeamHttpWorkspaces.fromClient(this.client)
  }
}

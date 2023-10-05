/*
 * Automatically generated by generate-routes.ts.
 * Do not edit this file or add other files to this directory.
 */

import type {
  RouteRequestBody,
  RouteRequestParams,
  RouteResponse,
} from '@seamapi/types/connect'
import type { SetNonNullable } from 'type-fest'

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

export class SeamHttpConnectWebviews {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpConnectWebviews {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpConnectWebviews(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpConnectWebviews {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpConnectWebviews(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpConnectWebviews {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpConnectWebviews(opts)
  }

  static async fromPublishableKey(
    publishableKey: string,
    userIdentifierKey: string,
    options: ClientOptions = {},
  ): Promise<SeamHttp> {
    const opts = parseOptions(options)
    const client = createClient({ ...opts, publishableKey })
    const clientSessions = SeamHttpClientSessions.fromClient(client)
    // TODO: clientSessions.getOrCreate({ user_identifier_key: userIdentifierKey })
    const { token } = await clientSessions.create({
      user_identifier_key: userIdentifierKey,
    })
    return SeamHttp.fromClientSessionToken(token, options)
  }

  async create(
    body: ConnectWebviewsCreateBody,
  ): Promise<ConnectWebviewsCreateResponse['connect_webview']> {
    const { data } = await this.client.request<ConnectWebviewsCreateResponse>({
      url: '/connect_webviews/create',
      method: 'post',
      data: body,
    })
    return data.connect_webview
  }

  async delete(body: ConnectWebviewsDeleteBody): Promise<void> {
    await this.client.request<ConnectWebviewsDeleteResponse>({
      url: '/connect_webviews/delete',
      method: 'post',
      data: body,
    })
  }

  async get(
    body: ConnectWebviewsGetBody,
  ): Promise<ConnectWebviewsGetResponse['connect_webview']> {
    const { data } = await this.client.request<ConnectWebviewsGetResponse>({
      url: '/connect_webviews/get',
      method: 'post',
      data: body,
    })
    return data.connect_webview
  }

  async list(
    body: ConnectWebviewsListBody,
  ): Promise<ConnectWebviewsListResponse['connect_webviews']> {
    const { data } = await this.client.request<ConnectWebviewsListResponse>({
      url: '/connect_webviews/list',
      method: 'post',
      data: body,
    })
    return data.connect_webviews
  }

  async view(params?: ConnectWebviewsViewParams): Promise<void> {
    await this.client.request<ConnectWebviewsViewResponse>({
      url: '/connect_webviews/view',
      method: 'get',
      params,
    })
  }
}

export type ConnectWebviewsCreateBody =
  RouteRequestBody<'/connect_webviews/create'>

export type ConnectWebviewsCreateResponse = SetNonNullable<
  Required<RouteResponse<'/connect_webviews/create'>>
>

export type ConnectWebviewsDeleteBody =
  RouteRequestBody<'/connect_webviews/delete'>

export type ConnectWebviewsDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/connect_webviews/delete'>>
>

export type ConnectWebviewsGetBody = RouteRequestBody<'/connect_webviews/get'>

export type ConnectWebviewsGetResponse = SetNonNullable<
  Required<RouteResponse<'/connect_webviews/get'>>
>

export type ConnectWebviewsListBody = RouteRequestBody<'/connect_webviews/list'>

export type ConnectWebviewsListResponse = SetNonNullable<
  Required<RouteResponse<'/connect_webviews/list'>>
>

export type ConnectWebviewsViewParams =
  RouteRequestParams<'/connect_webviews/view'>

export type ConnectWebviewsViewResponse = SetNonNullable<
  Required<RouteResponse<'/connect_webviews/view'>>
>

/*
 * Automatically generated by generate-routes.ts.
 * Do not edit this file or add other files to this directory.
 */

import type {
  RouteRequestBody,
  RouteRequestParams,
  RouteResponse,
} from '@seamapi/types/connect'
import type { Axios } from 'axios'
import type { SetNonNullable } from 'type-fest'

import { createClient } from 'lib/seam/connect/client.js'
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

export class SeamHttpWebhooks {
  client: Axios

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpWebhooks {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpWebhooks(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpWebhooks {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpWebhooks(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpWebhooks {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpWebhooks(opts)
  }

  async create(
    body: WebhooksCreateBody,
  ): Promise<WebhooksCreateResponse['webhook']> {
    const { data } = await this.client.request<WebhooksCreateResponse>({
      url: '/webhooks/create',
      method: 'post',
      data: body,
    })
    return data.webhook
  }

  async delete(body: WebhooksDeleteBody): Promise<void> {
    await this.client.request<WebhooksDeleteResponse>({
      url: '/webhooks/delete',
      method: 'post',
      data: body,
    })
  }

  async get(body: WebhooksGetBody): Promise<WebhooksGetResponse['webhook']> {
    const { data } = await this.client.request<WebhooksGetResponse>({
      url: '/webhooks/get',
      method: 'post',
      data: body,
    })
    return data.webhook
  }

  async list(
    params?: WebhooksListParams,
  ): Promise<WebhooksListResponse['webhooks']> {
    const { data } = await this.client.request<WebhooksListResponse>({
      url: '/webhooks/list',
      method: 'get',
      params,
    })
    return data.webhooks
  }
}

export type WebhooksCreateBody = RouteRequestBody<'/webhooks/create'>

export type WebhooksCreateResponse = SetNonNullable<
  Required<RouteResponse<'/webhooks/create'>>
>

export type WebhooksDeleteBody = RouteRequestBody<'/webhooks/delete'>

export type WebhooksDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/webhooks/delete'>>
>

export type WebhooksGetBody = RouteRequestBody<'/webhooks/get'>

export type WebhooksGetResponse = SetNonNullable<
  Required<RouteResponse<'/webhooks/get'>>
>

export type WebhooksListParams = RouteRequestParams<'/webhooks/list'>

export type WebhooksListResponse = SetNonNullable<
  Required<RouteResponse<'/webhooks/list'>>
>

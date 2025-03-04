/*
 * Automatically generated by generate-routes.ts.
 * Do not edit this file or add other files to this directory.
 */

import type { RouteRequestBody, RouteResponse } from '@seamapi/types/connect'
import type { SetNonNullable } from 'type-fest'

import { warnOnInsecureuserIdentifierKey } from 'lib/seam/connect/auth.js'
import { type Client, createClient } from 'lib/seam/connect/client.js'
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
} from 'lib/seam/connect/options.js'
import { parseOptions } from 'lib/seam/connect/parse-options.js'

import { SeamHttpClientSessions } from './client-sessions.js'

export class SeamHttpDevicesUnmanaged {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const clientOptions = parseOptions(apiKeyOrOptions)
    this.client = createClient(clientOptions)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpDevicesUnmanaged {
    const constructorOptions = { ...options, client }
    if (!isSeamHttpOptionsWithClient(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpDevicesUnmanaged(constructorOptions)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpDevicesUnmanaged {
    const constructorOptions = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpDevicesUnmanaged(constructorOptions)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpDevicesUnmanaged {
    const constructorOptions = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpDevicesUnmanaged(constructorOptions)
  }

  static async fromPublishableKey(
    publishableKey: string,
    userIdentifierKey: string,
    options: SeamHttpFromPublishableKeyOptions = {},
  ): Promise<SeamHttpDevicesUnmanaged> {
    warnOnInsecureuserIdentifierKey(userIdentifierKey)
    const clientOptions = parseOptions({ ...options, publishableKey })
    const client = createClient(clientOptions)
    const clientSessions = SeamHttpClientSessions.fromClient(client)
    const { token } = await clientSessions.getOrCreate({
      user_identifier_key: userIdentifierKey,
    })
    return SeamHttpDevicesUnmanaged.fromClientSessionToken(token, options)
  }

  async get(
    body: DevicesUnmanagedGetBody,
  ): Promise<DevicesUnmanagedGetResponse['device']> {
    const { data } = await this.client.request<DevicesUnmanagedGetResponse>({
      url: '/devices/unmanaged/get',
      method: 'post',
      data: body,
    })
    return data.device
  }

  async list(
    body: DevicesUnmanagedListBody,
  ): Promise<DevicesUnmanagedListResponse['devices']> {
    const { data } = await this.client.request<DevicesUnmanagedListResponse>({
      url: '/devices/unmanaged/list',
      method: 'post',
      data: body,
    })
    return data.devices
  }

  async update(body: DevicesUnmanagedUpdateBody): Promise<void> {
    await this.client.request<DevicesUnmanagedUpdateResponse>({
      url: '/devices/unmanaged/update',
      method: 'post',
      data: body,
    })
  }
}

export type DevicesUnmanagedGetBody = RouteRequestBody<'/devices/unmanaged/get'>

export type DevicesUnmanagedGetResponse = SetNonNullable<
  Required<RouteResponse<'/devices/unmanaged/get'>>
>

export type DevicesUnmanagedListBody =
  RouteRequestBody<'/devices/unmanaged/list'>

export type DevicesUnmanagedListResponse = SetNonNullable<
  Required<RouteResponse<'/devices/unmanaged/list'>>
>

export type DevicesUnmanagedUpdateBody =
  RouteRequestBody<'/devices/unmanaged/update'>

export type DevicesUnmanagedUpdateResponse = SetNonNullable<
  Required<RouteResponse<'/devices/unmanaged/update'>>
>

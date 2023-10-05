/*
 * Automatically generated by generate-routes.ts.
 * Do not edit this file or add other files to this directory.
 */

import type { RouteRequestBody, RouteResponse } from '@seamapi/types/connect'
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

import { SeamHttpDevicesUnmanaged } from './devices-unmanaged.js'

export class SeamHttpDevices {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpDevices {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpDevices(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpDevices {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpDevices(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpDevices {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpDevices(opts)
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

  get unmanaged(): SeamHttpDevicesUnmanaged {
    return SeamHttpDevicesUnmanaged.fromClient(this.client)
  }

  async delete(body: DevicesDeleteBody): Promise<void> {
    await this.client.request<DevicesDeleteResponse>({
      url: '/devices/delete',
      method: 'post',
      data: body,
    })
  }

  async get(body: DevicesGetBody): Promise<DevicesGetResponse['device']> {
    const { data } = await this.client.request<DevicesGetResponse>({
      url: '/devices/get',
      method: 'post',
      data: body,
    })
    return data.device
  }

  async list(body: DevicesListBody): Promise<DevicesListResponse['devices']> {
    const { data } = await this.client.request<DevicesListResponse>({
      url: '/devices/list',
      method: 'post',
      data: body,
    })
    return data.devices
  }

  async listDeviceProviders(
    body: DevicesListDeviceProvidersBody,
  ): Promise<DevicesListDeviceProvidersResponse['device_providers']> {
    const { data } =
      await this.client.request<DevicesListDeviceProvidersResponse>({
        url: '/devices/list_device_providers',
        method: 'post',
        data: body,
      })
    return data.device_providers
  }

  async update(body: DevicesUpdateBody): Promise<void> {
    await this.client.request<DevicesUpdateResponse>({
      url: '/devices/update',
      method: 'post',
      data: body,
    })
  }
}

export type DevicesDeleteBody = RouteRequestBody<'/devices/delete'>

export type DevicesDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/devices/delete'>>
>

export type DevicesGetBody = RouteRequestBody<'/devices/get'>

export type DevicesGetResponse = SetNonNullable<
  Required<RouteResponse<'/devices/get'>>
>

export type DevicesListBody = RouteRequestBody<'/devices/list'>

export type DevicesListResponse = SetNonNullable<
  Required<RouteResponse<'/devices/list'>>
>

export type DevicesListDeviceProvidersBody =
  RouteRequestBody<'/devices/list_device_providers'>

export type DevicesListDeviceProvidersResponse = SetNonNullable<
  Required<RouteResponse<'/devices/list_device_providers'>>
>

export type DevicesUpdateBody = RouteRequestBody<'/devices/update'>

export type DevicesUpdateResponse = SetNonNullable<
  Required<RouteResponse<'/devices/update'>>
>

/*
 * Automatically generated by generate-routes.ts.
 * Do not edit this file or add other files to this directory.
 */

import type { RouteRequestBody, RouteResponse } from '@seamapi/types/connect'
import type { Axios } from 'axios'
import type { SetNonNullable } from 'type-fest'

import { createAxiosClient } from 'lib/seam/connect/axios.js'
import {
  isSeamHttpOptionsWithApiKey,
  isSeamHttpOptionsWithClient,
  isSeamHttpOptionsWithClientSessionToken,
  SeamHttpInvalidOptionsError,
  type SeamHttpOptions,
  type SeamHttpOptionsWithApiKey,
  type SeamHttpOptionsWithClient,
  type SeamHttpOptionsWithClientSessionToken,
} from 'lib/seam/connect/client-options.js'
import { parseOptions } from 'lib/seam/connect/parse-options.js'

export class SeamHttpNoiseSensorsNoiseThresholds {
  client: Axios

  constructor(apiKeyOrOptions: string | SeamHttpOptions) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createAxiosClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpNoiseSensorsNoiseThresholds {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpNoiseSensorsNoiseThresholds(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpNoiseSensorsNoiseThresholds {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpNoiseSensorsNoiseThresholds(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpNoiseSensorsNoiseThresholds {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpNoiseSensorsNoiseThresholds(opts)
  }

  async create(
    body: NoiseSensorsNoiseThresholdsCreateBody,
  ): Promise<NoiseSensorsNoiseThresholdsCreateResponse['noise_sensor']> {
    const { data } =
      await this.client.request<NoiseSensorsNoiseThresholdsCreateResponse>({
        url: '/noise_sensors/noise_thresholds/create',
        method: 'post',
        data: body,
      })
    return data.noise_sensor
  }

  async delete(body: NoiseSensorsNoiseThresholdsDeleteBody): Promise<void> {
    await this.client.request<NoiseSensorsNoiseThresholdsDeleteResponse>({
      url: '/noise_sensors/noise_thresholds/delete',
      method: 'post',
      data: body,
    })
  }

  async get(
    body: NoiseSensorsNoiseThresholdsGetBody,
  ): Promise<NoiseSensorsNoiseThresholdsGetResponse['noise_sensor']> {
    const { data } =
      await this.client.request<NoiseSensorsNoiseThresholdsGetResponse>({
        url: '/noise_sensors/noise_thresholds/get',
        method: 'post',
        data: body,
      })
    return data.noise_sensor
  }

  async list(
    body: NoiseSensorsNoiseThresholdsListBody,
  ): Promise<NoiseSensorsNoiseThresholdsListResponse['noise_sensors']> {
    const { data } =
      await this.client.request<NoiseSensorsNoiseThresholdsListResponse>({
        url: '/noise_sensors/noise_thresholds/list',
        method: 'post',
        data: body,
      })
    return data.noise_sensors
  }

  async update(body: NoiseSensorsNoiseThresholdsUpdateBody): Promise<void> {
    await this.client.request<NoiseSensorsNoiseThresholdsUpdateResponse>({
      url: '/noise_sensors/noise_thresholds/update',
      method: 'put',
      data: body,
    })
  }
}

type NoiseSensorsNoiseThresholdsCreateBody = SetNonNullable<
  Required<RouteRequestBody<'/noise_sensors/noise_thresholds/create'>>
>

type NoiseSensorsNoiseThresholdsCreateResponse = SetNonNullable<
  Required<RouteResponse<'/noise_sensors/noise_thresholds/create'>>
>

type NoiseSensorsNoiseThresholdsDeleteBody = SetNonNullable<
  Required<RouteRequestBody<'/noise_sensors/noise_thresholds/delete'>>
>

type NoiseSensorsNoiseThresholdsDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/noise_sensors/noise_thresholds/delete'>>
>

type NoiseSensorsNoiseThresholdsGetBody = SetNonNullable<
  Required<RouteRequestBody<'/noise_sensors/noise_thresholds/get'>>
>

type NoiseSensorsNoiseThresholdsGetResponse = SetNonNullable<
  Required<RouteResponse<'/noise_sensors/noise_thresholds/get'>>
>

type NoiseSensorsNoiseThresholdsListBody = SetNonNullable<
  Required<RouteRequestBody<'/noise_sensors/noise_thresholds/list'>>
>

type NoiseSensorsNoiseThresholdsListResponse = SetNonNullable<
  Required<RouteResponse<'/noise_sensors/noise_thresholds/list'>>
>

type NoiseSensorsNoiseThresholdsUpdateBody = SetNonNullable<
  Required<RouteRequestBody<'/noise_sensors/noise_thresholds/update'>>
>

type NoiseSensorsNoiseThresholdsUpdateResponse = SetNonNullable<
  Required<RouteResponse<'/noise_sensors/noise_thresholds/update'>>
>

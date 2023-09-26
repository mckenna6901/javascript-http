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

export class SeamHttpThermostatsClimateSettingSchedules {
  client: Axios

  constructor(apiKeyOrOptions: string | SeamHttpOptions) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createAxiosClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpThermostatsClimateSettingSchedules {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpThermostatsClimateSettingSchedules(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpThermostatsClimateSettingSchedules {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpThermostatsClimateSettingSchedules(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpThermostatsClimateSettingSchedules {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpThermostatsClimateSettingSchedules(opts)
  }

  async create(
    body: ThermostatsClimateSettingSchedulesCreateBody,
  ): Promise<ThermostatsClimateSettingSchedulesCreateResponse['thermostat']> {
    const { data } =
      await this.client.request<ThermostatsClimateSettingSchedulesCreateResponse>(
        {
          url: '/thermostats/climate_setting_schedules/create',
          method: 'post',
          data: body,
        },
      )
    return data.thermostat
  }

  async delete(
    body: ThermostatsClimateSettingSchedulesDeleteBody,
  ): Promise<void> {
    await this.client.request<ThermostatsClimateSettingSchedulesDeleteResponse>(
      {
        url: '/thermostats/climate_setting_schedules/delete',
        method: 'put',
        data: body,
      },
    )
  }

  async get(
    body: ThermostatsClimateSettingSchedulesGetBody,
  ): Promise<ThermostatsClimateSettingSchedulesGetResponse['thermostat']> {
    const { data } =
      await this.client.request<ThermostatsClimateSettingSchedulesGetResponse>({
        url: '/thermostats/climate_setting_schedules/get',
        method: 'post',
        data: body,
      })
    return data.thermostat
  }

  async list(
    body: ThermostatsClimateSettingSchedulesListBody,
  ): Promise<ThermostatsClimateSettingSchedulesListResponse['thermostats']> {
    const { data } =
      await this.client.request<ThermostatsClimateSettingSchedulesListResponse>(
        {
          url: '/thermostats/climate_setting_schedules/list',
          method: 'post',
          data: body,
        },
      )
    return data.thermostats
  }

  async update(
    body: ThermostatsClimateSettingSchedulesUpdateBody,
  ): Promise<void> {
    await this.client.request<ThermostatsClimateSettingSchedulesUpdateResponse>(
      {
        url: '/thermostats/climate_setting_schedules/update',
        method: 'put',
        data: body,
      },
    )
  }
}

type ThermostatsClimateSettingSchedulesCreateBody = SetNonNullable<
  Required<RouteRequestBody<'/thermostats/climate_setting_schedules/create'>>
>

type ThermostatsClimateSettingSchedulesCreateResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/create'>>
>

type ThermostatsClimateSettingSchedulesDeleteBody = SetNonNullable<
  Required<RouteRequestBody<'/thermostats/climate_setting_schedules/delete'>>
>

type ThermostatsClimateSettingSchedulesDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/delete'>>
>

type ThermostatsClimateSettingSchedulesGetBody = SetNonNullable<
  Required<RouteRequestBody<'/thermostats/climate_setting_schedules/get'>>
>

type ThermostatsClimateSettingSchedulesGetResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/get'>>
>

type ThermostatsClimateSettingSchedulesListBody = SetNonNullable<
  Required<RouteRequestBody<'/thermostats/climate_setting_schedules/list'>>
>

type ThermostatsClimateSettingSchedulesListResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/list'>>
>

type ThermostatsClimateSettingSchedulesUpdateBody = SetNonNullable<
  Required<RouteRequestBody<'/thermostats/climate_setting_schedules/update'>>
>

type ThermostatsClimateSettingSchedulesUpdateResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/update'>>
>

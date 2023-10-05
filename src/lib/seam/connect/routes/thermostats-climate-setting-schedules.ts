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

export class SeamHttpThermostatsClimateSettingSchedules {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createClient(options)
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
    body: ThermostatsClimateSettingSchedulesCreateBody,
  ): Promise<
    ThermostatsClimateSettingSchedulesCreateResponse['climate_setting_schedule']
  > {
    const { data } =
      await this.client.request<ThermostatsClimateSettingSchedulesCreateResponse>(
        {
          url: '/thermostats/climate_setting_schedules/create',
          method: 'post',
          data: body,
        },
      )
    return data.climate_setting_schedule
  }

  async delete(
    body: ThermostatsClimateSettingSchedulesDeleteBody,
  ): Promise<void> {
    await this.client.request<ThermostatsClimateSettingSchedulesDeleteResponse>(
      {
        url: '/thermostats/climate_setting_schedules/delete',
        method: 'post',
        data: body,
      },
    )
  }

  async get(
    body: ThermostatsClimateSettingSchedulesGetBody,
  ): Promise<
    ThermostatsClimateSettingSchedulesGetResponse['climate_setting_schedule']
  > {
    const { data } =
      await this.client.request<ThermostatsClimateSettingSchedulesGetResponse>({
        url: '/thermostats/climate_setting_schedules/get',
        method: 'post',
        data: body,
      })
    return data.climate_setting_schedule
  }

  async list(
    body: ThermostatsClimateSettingSchedulesListBody,
  ): Promise<
    ThermostatsClimateSettingSchedulesListResponse['climate_setting_schedules']
  > {
    const { data } =
      await this.client.request<ThermostatsClimateSettingSchedulesListResponse>(
        {
          url: '/thermostats/climate_setting_schedules/list',
          method: 'post',
          data: body,
        },
      )
    return data.climate_setting_schedules
  }

  async update(
    body: ThermostatsClimateSettingSchedulesUpdateBody,
  ): Promise<void> {
    await this.client.request<ThermostatsClimateSettingSchedulesUpdateResponse>(
      {
        url: '/thermostats/climate_setting_schedules/update',
        method: 'post',
        data: body,
      },
    )
  }
}

export type ThermostatsClimateSettingSchedulesCreateBody =
  RouteRequestBody<'/thermostats/climate_setting_schedules/create'>

export type ThermostatsClimateSettingSchedulesCreateResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/create'>>
>

export type ThermostatsClimateSettingSchedulesDeleteBody =
  RouteRequestBody<'/thermostats/climate_setting_schedules/delete'>

export type ThermostatsClimateSettingSchedulesDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/delete'>>
>

export type ThermostatsClimateSettingSchedulesGetBody =
  RouteRequestBody<'/thermostats/climate_setting_schedules/get'>

export type ThermostatsClimateSettingSchedulesGetResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/get'>>
>

export type ThermostatsClimateSettingSchedulesListBody =
  RouteRequestBody<'/thermostats/climate_setting_schedules/list'>

export type ThermostatsClimateSettingSchedulesListResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/list'>>
>

export type ThermostatsClimateSettingSchedulesUpdateBody =
  RouteRequestBody<'/thermostats/climate_setting_schedules/update'>

export type ThermostatsClimateSettingSchedulesUpdateResponse = SetNonNullable<
  Required<RouteResponse<'/thermostats/climate_setting_schedules/update'>>
>

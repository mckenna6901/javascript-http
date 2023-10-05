/*
 * Automatically generated by generate-routes.ts.
 * Do not edit this file or add other files to this directory.
 */

import type { RouteRequestBody, RouteResponse } from '@seamapi/types/connect'
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

export class SeamHttpAcsUsers {
  client: Axios

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpAcsUsers {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpAcsUsers(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpAcsUsers {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpAcsUsers(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpAcsUsers {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpAcsUsers(opts)
  }

  async addToAccessGroup(body: AcsUsersAddToAccessGroupBody): Promise<void> {
    await this.client.request<AcsUsersAddToAccessGroupResponse>({
      url: '/acs/users/add_to_access_group',
      method: 'post',
      data: body,
    })
  }

  async create(
    body: AcsUsersCreateBody,
  ): Promise<AcsUsersCreateResponse['acs_user']> {
    const { data } = await this.client.request<AcsUsersCreateResponse>({
      url: '/acs/users/create',
      method: 'post',
      data: body,
    })
    return data.acs_user
  }

  async delete(body: AcsUsersDeleteBody): Promise<void> {
    await this.client.request<AcsUsersDeleteResponse>({
      url: '/acs/users/delete',
      method: 'post',
      data: body,
    })
  }

  async get(body: AcsUsersGetBody): Promise<AcsUsersGetResponse['acs_user']> {
    const { data } = await this.client.request<AcsUsersGetResponse>({
      url: '/acs/users/get',
      method: 'post',
      data: body,
    })
    return data.acs_user
  }

  async list(
    body: AcsUsersListBody,
  ): Promise<AcsUsersListResponse['acs_users']> {
    const { data } = await this.client.request<AcsUsersListResponse>({
      url: '/acs/users/list',
      method: 'post',
      data: body,
    })
    return data.acs_users
  }

  async removeFromAccessGroup(
    body: AcsUsersRemoveFromAccessGroupBody,
  ): Promise<void> {
    await this.client.request<AcsUsersRemoveFromAccessGroupResponse>({
      url: '/acs/users/remove_from_access_group',
      method: 'post',
      data: body,
    })
  }

  async suspend(body: AcsUsersSuspendBody): Promise<void> {
    await this.client.request<AcsUsersSuspendResponse>({
      url: '/acs/users/suspend',
      method: 'post',
      data: body,
    })
  }

  async unsuspend(body: AcsUsersUnsuspendBody): Promise<void> {
    await this.client.request<AcsUsersUnsuspendResponse>({
      url: '/acs/users/unsuspend',
      method: 'post',
      data: body,
    })
  }

  async update(body: AcsUsersUpdateBody): Promise<void> {
    await this.client.request<AcsUsersUpdateResponse>({
      url: '/acs/users/update',
      method: 'post',
      data: body,
    })
  }
}

export type AcsUsersAddToAccessGroupBody =
  RouteRequestBody<'/acs/users/add_to_access_group'>

export type AcsUsersAddToAccessGroupResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/add_to_access_group'>>
>

export type AcsUsersCreateBody = RouteRequestBody<'/acs/users/create'>

export type AcsUsersCreateResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/create'>>
>

export type AcsUsersDeleteBody = RouteRequestBody<'/acs/users/delete'>

export type AcsUsersDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/delete'>>
>

export type AcsUsersGetBody = RouteRequestBody<'/acs/users/get'>

export type AcsUsersGetResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/get'>>
>

export type AcsUsersListBody = RouteRequestBody<'/acs/users/list'>

export type AcsUsersListResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/list'>>
>

export type AcsUsersRemoveFromAccessGroupBody =
  RouteRequestBody<'/acs/users/remove_from_access_group'>

export type AcsUsersRemoveFromAccessGroupResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/remove_from_access_group'>>
>

export type AcsUsersSuspendBody = RouteRequestBody<'/acs/users/suspend'>

export type AcsUsersSuspendResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/suspend'>>
>

export type AcsUsersUnsuspendBody = RouteRequestBody<'/acs/users/unsuspend'>

export type AcsUsersUnsuspendResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/unsuspend'>>
>

export type AcsUsersUpdateBody = RouteRequestBody<'/acs/users/update'>

export type AcsUsersUpdateResponse = SetNonNullable<
  Required<RouteResponse<'/acs/users/update'>>
>

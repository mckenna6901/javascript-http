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

export class SeamHttpAcsAccessGroups {
  client: Axios

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createAxiosClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpAcsAccessGroups {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpAcsAccessGroups(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpAcsAccessGroups {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpAcsAccessGroups(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpAcsAccessGroups {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpAcsAccessGroups(opts)
  }

  async addUser(body: AcsAccessGroupsAddUserBody): Promise<void> {
    await this.client.request<AcsAccessGroupsAddUserResponse>({
      url: '/acs/access_groups/add_user',
      method: 'post',
      data: body,
    })
  }

  async create(
    body: AcsAccessGroupsCreateBody,
  ): Promise<AcsAccessGroupsCreateResponse['acs_access_group']> {
    const { data } = await this.client.request<AcsAccessGroupsCreateResponse>({
      url: '/acs/access_groups/create',
      method: 'post',
      data: body,
    })
    return data.acs_access_group
  }

  async delete(body: AcsAccessGroupsDeleteBody): Promise<void> {
    await this.client.request<AcsAccessGroupsDeleteResponse>({
      url: '/acs/access_groups/delete',
      method: 'post',
      data: body,
    })
  }

  async get(
    body: AcsAccessGroupsGetBody,
  ): Promise<AcsAccessGroupsGetResponse['acs_access_group']> {
    const { data } = await this.client.request<AcsAccessGroupsGetResponse>({
      url: '/acs/access_groups/get',
      method: 'post',
      data: body,
    })
    return data.acs_access_group
  }

  async list(
    body: AcsAccessGroupsListBody,
  ): Promise<AcsAccessGroupsListResponse['acs_access_groups']> {
    const { data } = await this.client.request<AcsAccessGroupsListResponse>({
      url: '/acs/access_groups/list',
      method: 'post',
      data: body,
    })
    return data.acs_access_groups
  }

  async listUsers(
    body: AcsAccessGroupsListUsersBody,
  ): Promise<AcsAccessGroupsListUsersResponse['acs_users']> {
    const { data } =
      await this.client.request<AcsAccessGroupsListUsersResponse>({
        url: '/acs/access_groups/list_users',
        method: 'post',
        data: body,
      })
    return data.acs_users
  }

  async removeUser(body: AcsAccessGroupsRemoveUserBody): Promise<void> {
    await this.client.request<AcsAccessGroupsRemoveUserResponse>({
      url: '/acs/access_groups/remove_user',
      method: 'post',
      data: body,
    })
  }

  async update(body: AcsAccessGroupsUpdateBody): Promise<void> {
    await this.client.request<AcsAccessGroupsUpdateResponse>({
      url: '/acs/access_groups/update',
      method: 'post',
      data: body,
    })
  }
}

export type AcsAccessGroupsAddUserBody =
  RouteRequestBody<'/acs/access_groups/add_user'>

export type AcsAccessGroupsAddUserResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/add_user'>>
>

export type AcsAccessGroupsCreateBody =
  RouteRequestBody<'/acs/access_groups/create'>

export type AcsAccessGroupsCreateResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/create'>>
>

export type AcsAccessGroupsDeleteBody =
  RouteRequestBody<'/acs/access_groups/delete'>

export type AcsAccessGroupsDeleteResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/delete'>>
>

export type AcsAccessGroupsGetBody = RouteRequestBody<'/acs/access_groups/get'>

export type AcsAccessGroupsGetResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/get'>>
>

export type AcsAccessGroupsListBody =
  RouteRequestBody<'/acs/access_groups/list'>

export type AcsAccessGroupsListResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/list'>>
>

export type AcsAccessGroupsListUsersBody =
  RouteRequestBody<'/acs/access_groups/list_users'>

export type AcsAccessGroupsListUsersResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/list_users'>>
>

export type AcsAccessGroupsRemoveUserBody =
  RouteRequestBody<'/acs/access_groups/remove_user'>

export type AcsAccessGroupsRemoveUserResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/remove_user'>>
>

export type AcsAccessGroupsUpdateBody =
  RouteRequestBody<'/acs/access_groups/update'>

export type AcsAccessGroupsUpdateResponse = SetNonNullable<
  Required<RouteResponse<'/acs/access_groups/update'>>
>

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

export class SeamHttpWorkspaces {
  client: Axios

  constructor(apiKeyOrOptions: string | SeamHttpOptions) {
    const options = parseOptions(apiKeyOrOptions)
    this.client = createAxiosClient(options)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpWorkspaces {
    const opts = { ...options, client }
    if (!isSeamHttpOptionsWithClient(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpWorkspaces(opts)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpWorkspaces {
    const opts = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpWorkspaces(opts)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpWorkspaces {
    const opts = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(opts)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpWorkspaces(opts)
  }

  async get(
    params?: WorkspacesGetParams,
  ): Promise<WorkspacesGetResponse['workspace']> {
    const { data } = await this.client.request<WorkspacesGetResponse>({
      url: '/workspaces/get',
      method: 'get',
      params,
    })
    return data.workspace
  }

  async list(
    params?: WorkspacesListParams,
  ): Promise<WorkspacesListResponse['workspaces']> {
    const { data } = await this.client.request<WorkspacesListResponse>({
      url: '/workspaces/list',
      method: 'get',
      params,
    })
    return data.workspaces
  }

  async resetSandbox(body: WorkspacesResetSandboxBody): Promise<void> {
    await this.client.request<WorkspacesResetSandboxResponse>({
      url: '/workspaces/reset_sandbox',
      method: 'post',
      data: body,
    })
  }
}

export type WorkspacesGetParams = SetNonNullable<
  Required<RouteRequestParams<'/workspaces/get'>>
>

export type WorkspacesGetResponse = SetNonNullable<
  Required<RouteResponse<'/workspaces/get'>>
>

export type WorkspacesListParams = SetNonNullable<
  Required<RouteRequestParams<'/workspaces/list'>>
>

export type WorkspacesListResponse = SetNonNullable<
  Required<RouteResponse<'/workspaces/list'>>
>

export type WorkspacesResetSandboxBody = SetNonNullable<
  Required<RouteRequestBody<'/workspaces/reset_sandbox'>>
>

export type WorkspacesResetSandboxResponse = SetNonNullable<
  Required<RouteResponse<'/workspaces/reset_sandbox'>>
>

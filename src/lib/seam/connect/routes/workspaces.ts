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

import { warnOnInsecureuserIdentifierKey } from './auth.js'
import { SeamHttpClientSessions } from './client-sessions.js'

export class SeamHttpWorkspaces {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const clientOptions = parseOptions(apiKeyOrOptions)
    this.client = createClient(clientOptions)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpWorkspaces {
    const constructorOptions = { ...options, client }
    if (!isSeamHttpOptionsWithClient(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpWorkspaces(constructorOptions)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpWorkspaces {
    const constructorOptions = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpWorkspaces(constructorOptions)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpWorkspaces {
    const constructorOptions = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpWorkspaces(constructorOptions)
  }

  static async fromPublishableKey(
    publishableKey: string,
    userIdentifierKey: string,
    options: ClientOptions = {},
  ): Promise<SeamHttpWorkspaces> {
    warnOnInsecureuserIdentifierKey(userIdentifierKey)
    const clientOptions = parseOptions({ ...options, publishableKey })
    const client = createClient(clientOptions)
    const clientSessions = SeamHttpClientSessions.fromClient(client)
    // TODO: clientSessions.getOrCreate({ user_identifier_key: userIdentifierKey })
    const { token } = await clientSessions.create({
      user_identifier_key: userIdentifierKey,
    })
    return SeamHttpWorkspaces.fromClientSessionToken(token, options)
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

export type WorkspacesGetParams = RouteRequestParams<'/workspaces/get'>

export type WorkspacesGetResponse = SetNonNullable<
  Required<RouteResponse<'/workspaces/get'>>
>

export type WorkspacesListParams = RouteRequestParams<'/workspaces/list'>

export type WorkspacesListResponse = SetNonNullable<
  Required<RouteResponse<'/workspaces/list'>>
>

export type WorkspacesResetSandboxBody =
  RouteRequestBody<'/workspaces/reset_sandbox'>

export type WorkspacesResetSandboxResponse = SetNonNullable<
  Required<RouteResponse<'/workspaces/reset_sandbox'>>
>

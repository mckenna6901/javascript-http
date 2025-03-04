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

export class SeamHttpLocks {
  client: Client

  constructor(apiKeyOrOptions: string | SeamHttpOptions = {}) {
    const clientOptions = parseOptions(apiKeyOrOptions)
    this.client = createClient(clientOptions)
  }

  static fromClient(
    client: SeamHttpOptionsWithClient['client'],
    options: Omit<SeamHttpOptionsWithClient, 'client'> = {},
  ): SeamHttpLocks {
    const constructorOptions = { ...options, client }
    if (!isSeamHttpOptionsWithClient(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing client')
    }
    return new SeamHttpLocks(constructorOptions)
  }

  static fromApiKey(
    apiKey: SeamHttpOptionsWithApiKey['apiKey'],
    options: Omit<SeamHttpOptionsWithApiKey, 'apiKey'> = {},
  ): SeamHttpLocks {
    const constructorOptions = { ...options, apiKey }
    if (!isSeamHttpOptionsWithApiKey(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing apiKey')
    }
    return new SeamHttpLocks(constructorOptions)
  }

  static fromClientSessionToken(
    clientSessionToken: SeamHttpOptionsWithClientSessionToken['clientSessionToken'],
    options: Omit<
      SeamHttpOptionsWithClientSessionToken,
      'clientSessionToken'
    > = {},
  ): SeamHttpLocks {
    const constructorOptions = { ...options, clientSessionToken }
    if (!isSeamHttpOptionsWithClientSessionToken(constructorOptions)) {
      throw new SeamHttpInvalidOptionsError('Missing clientSessionToken')
    }
    return new SeamHttpLocks(constructorOptions)
  }

  static async fromPublishableKey(
    publishableKey: string,
    userIdentifierKey: string,
    options: SeamHttpFromPublishableKeyOptions = {},
  ): Promise<SeamHttpLocks> {
    warnOnInsecureuserIdentifierKey(userIdentifierKey)
    const clientOptions = parseOptions({ ...options, publishableKey })
    const client = createClient(clientOptions)
    const clientSessions = SeamHttpClientSessions.fromClient(client)
    const { token } = await clientSessions.getOrCreate({
      user_identifier_key: userIdentifierKey,
    })
    return SeamHttpLocks.fromClientSessionToken(token, options)
  }

  async get(body: LocksGetBody): Promise<LocksGetResponse['device']> {
    const { data } = await this.client.request<LocksGetResponse>({
      url: '/locks/get',
      method: 'post',
      data: body,
    })
    return data.device
  }

  async list(body: LocksListBody): Promise<LocksListResponse['devices']> {
    const { data } = await this.client.request<LocksListResponse>({
      url: '/locks/list',
      method: 'post',
      data: body,
    })
    return data.devices
  }

  async lockDoor(
    body: LocksLockDoorBody,
  ): Promise<LocksLockDoorResponse['action_attempt']> {
    const { data } = await this.client.request<LocksLockDoorResponse>({
      url: '/locks/lock_door',
      method: 'post',
      data: body,
    })
    return data.action_attempt
  }

  async unlockDoor(
    body: LocksUnlockDoorBody,
  ): Promise<LocksUnlockDoorResponse['action_attempt']> {
    const { data } = await this.client.request<LocksUnlockDoorResponse>({
      url: '/locks/unlock_door',
      method: 'post',
      data: body,
    })
    return data.action_attempt
  }
}

export type LocksGetBody = RouteRequestBody<'/locks/get'>

export type LocksGetResponse = SetNonNullable<
  Required<RouteResponse<'/locks/get'>>
>

export type LocksListBody = RouteRequestBody<'/locks/list'>

export type LocksListResponse = SetNonNullable<
  Required<RouteResponse<'/locks/list'>>
>

export type LocksLockDoorBody = RouteRequestBody<'/locks/lock_door'>

export type LocksLockDoorResponse = SetNonNullable<
  Required<RouteResponse<'/locks/lock_door'>>
>

export type LocksUnlockDoorBody = RouteRequestBody<'/locks/unlock_door'>

export type LocksUnlockDoorResponse = SetNonNullable<
  Required<RouteResponse<'/locks/unlock_door'>>
>

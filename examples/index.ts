#!/usr/bin/env tsx

import { env } from 'node:process'

import landlubber, {
  type DefaultContext,
  defaultMiddleware,
  type EmptyOptions,
  type Handler as DefaultHandler,
  type MiddlewareFunction,
} from 'landlubber'

import { SeamHttp } from '@seamapi/http/connect'

import * as workspace from './workspace.js'

export type Handler<Options = EmptyOptions> = DefaultHandler<Options, Context>

type Context = DefaultContext & ClientContext

interface ClientContext {
  client: SeamHttp
}

const commands = [workspace]

const createAppContext: MiddlewareFunction = async (argv) => {
  const apiKey = argv['api-key']
  if (typeof apiKey !== 'string') throw new Error('Missing Seam API key')
  const client = SeamHttp.fromApiKey(apiKey)
  argv['client'] = client
}

const middleware = [...defaultMiddleware, createAppContext]

await landlubber<Context>(commands, { middleware })
  .describe('api-key', 'Seam API key')
  .string('api-key')
  .default('api-key', env['SEAM_API_KEY'], 'SEAM_API_KEY')
  .demandOption('api-key')
  .parse()

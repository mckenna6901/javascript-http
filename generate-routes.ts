import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { camelCase, pascalCase, snakeCase } from 'change-case'
import { ESLint } from 'eslint'
import { format, resolveConfig } from 'prettier'

interface Route {
  namespace: string
  endpoints: Endpoint[]
}

interface Endpoint {
  name: string
  path: string
  namespace: string
  resource: string
  method: 'GET' | 'POST'
  requestFormat: 'params' | 'body'
}

const renderRoute = (route: Route): string => `
/*
* Automatically generated by generate-routes.ts.
* Do not edit this file or add other files to this directory.
*/

${renderImports()}

${renderClass(route)}

${renderExports(route)}
`

const renderImports = (): string =>
  `
import type { RouteRequestParams, RouteResponse } from '@seamapi/types/connect'
import { Axios } from 'axios'
import type { SetNonNullable } from 'type-fest'

import { createAxiosClient } from 'lib/seam/connect/axios.js'
import type { SeamHttpOptions } from 'lib/seam/connect/client-options.js'
import { parseOptions } from 'lib/seam/connect/parse-options.js'
`

const renderClass = ({ endpoints }: Route): string =>
  `
export class SeamHttpWorkspaces {
  client: Axios

  constructor(apiKeyOrOptionsOrClient: Axios | string | SeamHttpOptions) {
    if (apiKeyOrOptionsOrClient instanceof Axios) {
      this.client = apiKeyOrOptionsOrClient
      return
    }

    const options = parseOptions(apiKeyOrOptionsOrClient)
    this.client = createAxiosClient(options)
  }

  ${endpoints.map(renderClassMethod).join('\n')}
}
`

const renderClassMethod = ({
  name,
  requestFormat,
  method,
  namespace,
  resource,
  path,
}: Endpoint): string => `
  async ${camelCase(name)}(
    ${requestFormat}: ${renderRequestType({
      name,
      namespace,
      requestFormat,
    })} = {},
  ): Promise<${renderResponseType({ name, namespace })}['${resource}']> {
    const { data } = await this.client.request<${renderResponseType({
      name,
      namespace,
    })}>({
      url: '${path}',
      method: '${snakeCase(method)}', ${
        requestFormat === 'params' ? 'params,' : ''
      } ${requestFormat === 'body' ? 'data: body,' : ''}
    })
    return data.${resource}
  }
  `

const renderExports = (route: Route): string =>
  route.endpoints.map(renderEndpointExports).join('\n')

const renderEndpointExports = ({
  name,
  path,
  namespace,
  requestFormat,
}: Endpoint): string => `
type ${renderRequestType({
  name,
  namespace,
  requestFormat,
})} = SetNonNullable<
  Required<RouteRequest${pascalCase(requestFormat)}<'${path}'>>
>

type ${renderResponseType({ name, namespace })}= SetNonNullable<
  Required<RouteResponse<'${path}'>>
>
  `

const getRequestFormat = (
  method: Endpoint['method'],
): Endpoint['requestFormat'] =>
  ['GET', 'DELETE'].includes(method) ? 'params' : 'body'

const renderRequestType = ({
  name,
  namespace,
  requestFormat,
}: Pick<Endpoint, 'name' | 'namespace' | 'requestFormat'>): string =>
  [pascalCase(namespace), pascalCase(name), pascalCase(requestFormat)].join('')

const renderResponseType = ({
  name,
  namespace,
}: Pick<Endpoint, 'name' | 'namespace'>): string =>
  [pascalCase(namespace), pascalCase(name), 'Response'].join('')

const exampleRoute: Route = {
  namespace: 'workspaces',
  endpoints: [
    {
      name: 'get',
      namespace: 'workspaces',
      path: '/workspaces/get',
      method: 'GET',
      resource: 'workspace',
      requestFormat: getRequestFormat('GET'),
    },
  ],
}

const write = async (data: string, ...path: string[]): Promise<void> => {
  const filePath = resolve(...path)
  const fixedOutput = await eslintFixOutput(data, filePath)
  const prettyOutput = await prettierOutput(fixedOutput, filePath)
  await writeFile(filePath, prettyOutput)
}

const prettierOutput = async (
  data: string,
  filepath: string,
): Promise<string> => {
  const config = await resolveConfig(filepath)
  if (config == null) {
    throw new Error('Failed to resolve Prettier config')
  }
  return await format(data, { ...config, filepath })
}

const eslintFixOutput = async (
  data: string,
  filePath: string,
): Promise<string> => {
  const eslint = new ESLint({ fix: true })

  const [linted] = await eslint.lintText(data, { filePath })

  if (linted == null) {
    throw new Error('ESLint returned empty results')
  }

  if (linted.fatalErrorCount > 0) {
    throw new Error(
      `ESLint returned fatal errors:\n${JSON.stringify(
        linted.messages,
        null,
        2,
      )}`,
    )
  }

  return linted.output ?? linted.source ?? data
}

const routeRootPath = resolve('src', 'lib', 'seam', 'connect', 'routes')
const writeRoute = async (route: Route): Promise<void> => {
  await write(renderRoute(route), routeRootPath, `${route.namespace}.ts`)
}

const routes = [exampleRoute]

await Promise.all(routes.map(writeRoute))

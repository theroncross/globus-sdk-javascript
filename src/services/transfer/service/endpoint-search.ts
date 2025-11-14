import { ID as service } from '../config.js';
import { RESOURCE_SERVERS } from '../../auth/config.js';
import { serviceRequest } from '../../shared.js';

import type { JSONFetchResponse, ServiceMethod } from '../../../services/types.js';
import type { PaginatedResponse, QueryParameters } from '../types.js';
import type { EntityType, EndpointListDocument } from './endpoint.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const resource_server = RESOURCE_SERVERS[service];

/**
 * @see https://docs.globus.org/api/transfer/endpoint_search/#search_scope
 */
export type EndpointSearchScope =
  | 'all'
  | 'my-endpoints'
  | 'my-gcp-endpoints'
  | 'recently-used'
  | 'in-use'
  | 'shared-by-me'
  | 'shared-with-me'
  | 'hide-no-permissions'
  | 'administered-by-me';

/**
 * @see https://docs.globus.org/api/transfer/endpoint_search/#endpoint_search
 */
export type EndpointSearchQuery = QueryParameters<
  {
    filter_scope?: EndpointSearchScope;
    filter_entity_type?: EntityType;
    filter_fulltext?: string;
    filter_owner_id?: string;
    filter_host_endpoint?: string;
    filter_non_functional?: 0 | 1 | null;
  },
  'Offset'
>;

export type EndpointSearchResult = PaginatedResponse<
  'Offset',
  Omit<EndpointListDocument, 'length'>
>;

/**
 * Get a list of endpoints matching the search filters in a given search scope.
 * @see https://docs.globus.org/api/transfer/endpoint_search/#endpoint_search
 */
export const endpointSearch = function (
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<EndpointSearchResult>> {
  const serviceRequestOptions = {
    ...options,
    query: options?.query,
  };
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v0.10/endpoint_search`,
    },
    serviceRequestOptions,
    sdkOptions,
  );
} satisfies ServiceMethod<
  {
    query?: EndpointSearchQuery;
  },
  JSONFetchResponse<EndpointSearchResult>
>;

export default endpointSearch;

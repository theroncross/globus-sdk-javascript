import { ID as service } from '../../config.js';
import { RESOURCE_SERVERS } from '../../../auth/config.js';
import { serviceRequest } from '../../../shared.js';

import type {
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
  ServiceMethod,
} from '../../../../services/types.js';
import type { PaginatedResponse, QueryParameters } from '../../types.js';
import type { AccessListDocument } from '../access.js';
import type { EndpointDocument, EndpointListDocument } from '../endpoint.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const resource_server = RESOURCE_SERVERS[service];

/**
 * Fetch an endpoint by its UUID as an administrator.
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#mc_get_endpoint
 */
export const get = function (
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<EndpointDocument>> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: never;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_hosted_endpoint_list
 */
export const getHostedEndpoints = function (
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<PaginatedResponse<'Offset', EndpointListDocument>>> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}/hosted_endpoint_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<'Offset'>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_task_events
 */
export const getAccessList = function (
  endpoint_xid,
  options?,
  sdkOptions?,
): Promise<JSONFetchResponse<AccessListDocument>> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v0.10/endpoint_manager/endpoint/${endpoint_xid}/access_list`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: QueryParameters<'Offset'>;
    payload?: never;
  }
>;

/**
 * @see https://docs.globus.org/api/transfer/advanced_endpoint_management/#get_monitored_endpoints
 */
export const getMonitoredEndpoints = function (
  options = {},
  sdkOptions?,
): Promise<
  JSONFetchResponse<
    PaginatedResponse<
      'Offset',
      Omit<EndpointListDocument, 'DATA_TYPE'> & {
        DATA_TYPE: 'monitored_endpoints';
      }
    >
  >
> {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v0.10/endpoint_manager/monitored_endpoints`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: QueryParameters<'Offset'>;
  payload?: never;
}>;

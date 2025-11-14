import { ID as service } from '../../config.js';
import { RESOURCE_SERVERS } from '../../../auth/config.js';
import { serviceRequest } from '../../../../services/shared.js';

import type { ServiceMethod, ServiceMethodDynamicSegments } from '../../../types.js';

export * as consents from './consents.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const resource_server = RESOURCE_SERVERS[service];

/**
 * Fetch a single Identity by ID.
 * @see https://docs.globus.org/api/auth/reference/#get_identities
 */
export const get = function (identity_id, options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/api/identities/${identity_id}`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethodDynamicSegments<string, Record<string, any>>;

/**
 * Return a list of identities that match provided query parameters.
 * @see https://docs.globus.org/api/auth/reference/#get_identities
 */
export const getAll = function (options = {}, sdkOptions?) {
  return serviceRequest(
    {
      service,
      resource_server,
      path: `/v2/api/identities`,
    },
    options,
    sdkOptions,
  );
} satisfies ServiceMethod<{
  query?: {
    ids?: string | string[];
    usernames?: string | string[];
  };
  headers?: Record<string, string>;
  payload?: never;
}>;

// GENERATED FILE. Do not edit by hand.
// Source: server/src/common/permissions/registry.ts
// Regenerate: cd server && npm run gen:client-permissions

export const PERMISSION_CODES = [
    'meeting:view',
    'meeting:create',
    'meeting:update',
    'meeting:delete',
    'member:view',
    'member:create',
    'member:update',
    'member:delete',
    'ledger:view',
    'ledger:post',
    'ledger:reverse',
    'loan:view',
    'loan:create',
    'loan:approve',
    'loan:record_payment',
    'report:view',
    'report:export',
    'daybook:view',
    'user:view',
    'user:create',
    'user:assign_role',
] as const;

export type PermissionCode = (typeof PERMISSION_CODES)[number];

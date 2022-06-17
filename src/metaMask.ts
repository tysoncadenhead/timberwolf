const keysToMask = [
  'FullName',
  'FirstName',
  'LastName',
  'ContactInfo',
  'Gender',
  'District',
  'subscriberNo',
  'SubscriberNo',
  'CustomerNo',
  'NS1:CustomerNo',
  'serviceNumber',
  'callerId',
  'callerPassword',
  'username',
  'Username',
  'U',
  'P',
  'wsse:Username',
  'password',
  'wsse:Password',
  'Password',
  'fullphone',
  'FullPhone',
  'PhoneNumber',
  'adslNumber',
  'hostname',
  'port',
  'host',
  'CustomerContactNumber',
  'CustomerAccountNumber',
  'Authorization',
  'headers',
  'Followup_Number',
  'followup_Number',
  'tem:ServiceNumber',
  'CallerPassword',
  'CallerID',
];

interface IKeysToMask {
  [key: string]: boolean;
}

const keysToMaskObject = keysToMask.reduce((prev, current) => {
  return {
    ...prev,
    [current]: true,
  };
}, {}) as IKeysToMask;

const MASK = '******';

export const metaMask = (meta: any): object => {
  if (typeof meta === 'object') {
    return Object.keys(meta).reduce((prev, key) => {
      const value = meta[key];
      return {
        ...prev,
        [key]: keysToMaskObject[key]
          ? MASK
          : typeof value === 'object' && Array.isArray(value)
          ? value.map(metaMask)
          : typeof value === 'object'
          ? metaMask(value)
          : value,
      };
    }, {});
  }

  return meta;
};

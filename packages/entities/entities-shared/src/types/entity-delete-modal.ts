
export enum EntityTypes {
  GatewayService = 'service',
  Route = 'route',
  Consumer = 'consumer',
  ConsumerGroup = 'consumer group',
  Plugin = 'plugin',
  Upstream = 'upstream',
  Certificate = 'certificate',
  CACertificate = 'ca certificate',
  SNI = 'SNI',
  Key = 'key',
  KeySet = 'key set',
  Vault = 'vault',
  Application = 'application',
  Developer = 'developer',
  acls = 'ACL Credential',
  'basic-auth' = 'Basic Auth Credential',
  'key-auth' = 'Key Auth Credential',
  'key-auth-enc' = 'Key Auth Encrypted Credential',
  oauth2 = 'OAuth 2.0 Credential',
  'hmac-auth' = 'HMAC Credential',
  jwt = 'JWT Credential',
  Target = 'target',
  Policy = 'policy',
}

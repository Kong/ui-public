import type { RouteLocationRaw } from 'vue-router'
import type { KonnectBaseFormConfig, KongManagerBaseFormConfig } from '@kong-ui-public/entities-shared'
import type { EntityType } from './plugin'
import type { CommonSchemaFields } from './plugins/shared'
import type { ApplicationRegistrationSchema } from './plugins/application-registration-schema'
import type { StatsDSchema } from './plugins/stats-d'
import type { MockingSchema } from './plugins/mocking'
import type { DatadogSchema } from './plugins/datadog-schema'
import type { StatsDAdvancedSchema } from './plugins/stats-d-advanced'
import type { KafkaSchema } from './plugins/kafka-schema'
import type { UpstreamTlsSchema } from './plugins/upstream-tls'
import type { RateLimitingSchema } from './plugins/rate-limiting'
import type { GraphQLRateLimitingAdvancedSchema } from './plugins/graphql-rate-limiting-advanced'

export interface BasePluginFormConfig {
  /** A function that returns the route for creating a plugin */
  getCreateRoute: (id: string) => RouteLocationRaw
  /** Route to return to if canceling create a Plugin (go back to plugin selection page) */
  backRoute: RouteLocationRaw
  /** Current entity type and id for plugins for specific entity */
  entityType?: EntityType
  entityId?: string
  /** The type of plugin to be created or edited */
  pluginType?: string
}

/** Konnect Plugin form config */
export interface KonnectPluginFormConfig extends BasePluginFormConfig, KonnectBaseFormConfig {
  /** Route for creating a custom plugin */
  createCustomRoute?: RouteLocationRaw
  /** A function that returns the route for editing a custom plugin */
  getCustomEditRoute?: (id: string) => RouteLocationRaw
}

/** Kong Manager Plugin form config */
export interface KongManagerPluginFormConfig extends BasePluginFormConfig, KongManagerBaseFormConfig {}

export interface PluginFormFields extends Record<string, any> {}

export interface PluginFormState {
  /** Form fields */
  fields: Record<string, any>
  /** Form readonly state (only used when saving entity details) */
  isReadonly: boolean
  /** The error message to show on the form */
  errorMessage: string
}

export type PluginFieldType = 'switch' | 'input' | 'foreign' | 'selectionGroup' | 'tag' | 'multiselect' | 'select'

export interface PluginTags {
  label: string
  name: string
  type: 'switch' | 'input' | 'foreign' | 'selectionGroup' | 'tag'
  inputType: string
  valueType: string
  valueArrayType: string
  placeholder: string
  help: string
  hint: string
}

export interface DefaultPluginsFormSchema {
  type: PluginFieldType
  default?: boolean | string[] | string
  model?: 'enabled' | 'disabled'
  label?: string
  textOn?: string
  textOff?: string
  styleClasses?: string
  inputType?: 'hidden' | 'text'
  // Will be fixed in KHCP-6469
  fields? : any
  help?: string
  tags?: PluginTags
  values?: Array<Record<string, string | number | boolean>>
  placeholder?: string
  required?: boolean,
  // Will be fixed in KHCP-6469
  getColumnFields?: (schema: unknown) => object
}

export type PartiallyRequired<T, K extends keyof T> = { [k in K]-?: T[k] } & { [k in keyof T]: T[k] };

export type GetRequiredFieldsByContext<T extends DefaultPluginsFormSchema> = T['type'] extends 'input' ? PartiallyRequired<DefaultPluginsFormSchema, 'inputType'> : DefaultPluginsFormSchema

export type DefaultPluginsSchemaRecord = Record<string, GetRequiredFieldsByContext<DefaultPluginsFormSchema>>

/**
 * Types for schemas
 */

export interface Tags {
  label: string
  name: string
  type: string
  inputType: string
  valueType: string
  valueArrayType: string
  placeholder: string
  help: string
  hint: string
}

export interface AppRegFormSchema {
  enabled: {
    type: string
    model: string
    label: string
    textOn: string
    textOff: string
    inputType: string
    styleClasses: string
    default: boolean
  },
  name: {
    default: string
    type: string
    inputType: string
    styleClasses: string
  }
  'service-id': {
    type: string
    label: string,
    styleClasses: string
    description: string
    model: string
    entity: string
    placeholder: string
    inputValues: {
      fields: string[]
    },
    help: string
  },
  tags: Tags
}

export interface Item {
  inputAttributes?: any
  newElementButtonLabel?: string
}

interface ArrayItem {
  type: string
  itemContainerComponent: string
  fieldClasses: string
  fieldItemsClasses: string
  newElementButtonLabelClasses: string
  inputAttributes: {
    class: string
    style: {
      minWidth: string
    }
    [key: string]: any
  },
  removeElementButtonLabel: string
  styleClasses: string
  inputType: string
  valueType: string
  valueArrayType: string
}

export type ReturnArrayItem = ArrayItem & Item

export interface CustomSchemas {
  'application-registration': ApplicationRegistrationSchema
  datadog: DatadogSchema
  'upstream-tls': UpstreamTlsSchema
  'kafka-upstream': KafkaSchema
  'kafka-log': KafkaSchema
  statsd: StatsDSchema
  'statsd-advanced': StatsDAdvancedSchema
  mocking: MockingSchema
  'rate-limiting': RateLimitingSchema
  'rate-limiting-advanced': RateLimitingSchema
  'route-by-header': { configurationDisabled: boolean } & CommonSchemaFields
  'graphql-rate-limiting-advanced': GraphQLRateLimitingAdvancedSchema
  'response-ratelimiting': RateLimitingSchema
  'pre-function': CommonSchemaFields & Record<string, any>
  'post-function': CommonSchemaFields & Record<string, any>
  'request-transformer-advanced': CommonSchemaFields & Record<string, any>
  'request-validator': CommonSchemaFields & Record<string, any>
  zipkin: CommonSchemaFields & Record<string, any>
}

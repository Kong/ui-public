import type { App } from 'vue'
import VueFormGenerator from './generator/FormGenerator.vue'
import * as sharedForms from './forms'

// Export Vue plugin as the default
export default {
  install: (app: App): void => {
    app.component('VueFormGenerator', VueFormGenerator)
  },
}

export { customFields } from './generator/fields/exports'
export { VueFormGenerator, sharedForms }

export const getSharedFormName = (modelName: string): string => {
  const mapping:Record<string, string> = {
    'openid-connect': 'OIDCForm',
    'post-function': 'PostFunction',
    // Pre and Post function plugins are using same component
    'pre-function': 'PostFunction',
    'exit-transformer': 'ExitTransformer',
    'rate-limiting-advanced': 'RLAForm',
  }

  return mapping[modelName]
}

export * from './const'
export * from './types'
export * as abstractField from './generator/fields/abstractField'

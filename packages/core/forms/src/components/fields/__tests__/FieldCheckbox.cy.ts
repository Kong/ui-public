import type { FormSchema } from '../../../types'
import FieldTester from '../../../../sandbox/FieldTester.vue'

describe('<FieldTester /> - FieldCheckbox', () => {
  const fieldKey = 'coolness'
  const fieldLabel = 'Is Cool?'
  const fieldValue = true
  const schema: FormSchema = {
    fields: [{
      type: 'checkbox',
      model: fieldKey,
      id: fieldKey,
      label: fieldLabel,
      help: 'Check if the cat is cool.',
      required: true,
      styleClasses: 'cool-cats',
    }],
  }

  it('renders default state correctly - without model', () => {
    cy.mount(FieldTester, {
      props: {
        schema,
      },
    })

    cy.get('.field-tester-container').should('exist')

    // check VFG input value
    cy.get(`#${fieldKey}`).should('be.visible')
    cy.get(`#${fieldKey}`).should('not.be.checked')

    // initial model is empty after load
    cy.getTestId(`field-tester-form-model-${fieldKey}-value`).should('not.exist')

    // check VFG label is set correctly
    cy.get(`.form-group-label[for="${fieldKey}"]`).should('be.visible')
    cy.get(`.form-group-label[for="${fieldKey}"]`).should('contain.text', fieldLabel)

    // check required state
    if (schema.fields[0].required) {
      cy.get('.required').find(`.form-group-label[for="${fieldKey}"]`).should('exist')
    } else {
      cy.get('.required').find(`.form-group-label[for="${fieldKey}"]`).should('not.exist')
    }

    // check style classes
    if (schema.fields[0].styleClasses) {
      cy.get('.form-group.field-checkbox').should('have.class', schema.fields[0].styleClasses)
    }

    // check help text
    if (schema.fields[0].help) {
      cy.get(`label[for="${fieldKey}"] .info-icon`).should('be.visible')
      cy.get(`label[for="${fieldKey}"]`).should('contain.text', schema.fields[0].help)
    }
  })

  it('renders default state correctly - with model', () => {
    cy.mount(FieldTester, {
      props: {
        schema,
        model: {
          [fieldKey]: fieldValue,
        },
      },
    })

    cy.get('.field-tester-container').should('exist')

    // check VFG input value
    cy.get(`#${fieldKey}`).should('be.visible')
    cy.get(`#${fieldKey}`).should('be.checked')

    // check field test form model matches
    cy.getTestId(`field-tester-form-model-${fieldKey}-value`).should('be.visible')
    cy.getTestId(`field-tester-form-model-${fieldKey}-value`).should('contain.text', fieldValue)
  })

  it('handles input changes', () => {
    cy.mount(FieldTester, {
      props: {
        schema,
        model: {
          [fieldKey]: fieldValue,
        },
      },
    })

    cy.get('.field-tester-container').should('exist')

    // edit the input value
    cy.get(`#${fieldKey}`).should('be.visible')
    cy.get(`#${fieldKey}`).click()

    // check VFG input value
    cy.get(`#${fieldKey}`).should('not.be.checked')
    // check field test form model
    cy.getTestId(`field-tester-form-model-${fieldKey}-value`).should('contain.text', 'false')
  })

  it('handles programmatic input changes', () => {
    const updatedFieldValue = false

    cy.mount(FieldTester, {
      props: {
        schema,
        model: {
          [fieldKey]: fieldValue,
        },
        modifiedModel: {
          [fieldKey]: updatedFieldValue,
        },
      },
    })

    cy.get('.field-tester-container').should('exist')

    // initial value loaded
    cy.getTestId(`field-tester-form-model-${fieldKey}-value`).should('be.visible')
    cy.getTestId(`field-tester-form-model-${fieldKey}-value`).should('contain.text', fieldValue)

    // programmatic update
    cy.getTestId('tester-update-button').should('be.visible')
    cy.getTestId('tester-update-button').click()

    // check VFG input value
    cy.get(`#${fieldKey}`).should('not.be.checked')
    // check field test form model also matches
    cy.getTestId(`field-tester-form-model-${fieldKey}-value`).should('contain.text', updatedFieldValue)
  })
})

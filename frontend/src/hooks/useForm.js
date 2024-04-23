import { useEffect, useMemo, useState } from "react";

/**
 * 
 * @param {object} initialForm, Object with the form fields 
  * @returns {object, function} formState object with the form fields as properties and function onInputChange to update the states 
 */
export const useForm = (initialForm = {}, formValidations = {}) => {

  // Field state of the form
  const [formState, setFormState] = useState(initialForm);

  // Validation State
  const [formValidation, setFormValidation] = useState({});

  // Memorize if the form is valid, it will be memorized when the form validation changes
  const isFormValid = useMemo(() => {

    // Iterate through all formValidation's keys and check if any are invalid
    for (const formValue of Object.keys(formValidation)) {
      if(formValidation[formValue] !== null) return false;
    }
    return true
  }, [formValidation])

  // When the formState changes invoke createValidators 
  useEffect(() => {
    createValidators();
  }, [formState])


  /**
   * Function to update the state, stored the field values into 
   * @param {e.target} target of event, unstructured property and set the new state
   */
  const onInputChange = ({ target }) => {

    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value
    });
  }

  /**
   * Reset the form field to the initial state
   */
  const onResetForm = () => {
    setFormState(initialForm);
  }

  const createValidators = () => {
    const formCheckedValues = {};

    // Iterate through all formValidations's keys
    for (const formField of Object.keys(formValidations)) {
      // Retrieve the fn and errorMessage of the current key
      const [fn, errorMessage = "This field is required"] = formValidations[formField];

      // Create a computed prop and its value will can be null or errorMessage when the state of the current field changes
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }
    setFormValidation(formCheckedValues);
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}

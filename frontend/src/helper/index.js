/**
 * helper functions to use globaly
 */
import {ErrorMsgMap} from "../constants"

/**
 * Validation setting for product data input form
 * Check the user input name include invalid string such as number or !@#*&^
 */
export const NAME_VALIDATOR = {
    validator: (_, value) => {
      const pattern = /^[a-zA-Z\s]+$/;
      if (!pattern.test(value)) {
        return Promise.reject(`${ErrorMsgMap.validationError}`);
      }
      return Promise.resolve();
    },
    validateTrigger: "onBlur",
  };
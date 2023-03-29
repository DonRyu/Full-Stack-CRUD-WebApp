import {ErrorMsgMap} from "../constants"

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
const NAME_ALPHAMENURIC_SPECIAL = /^\d*[a-zA-Z][a-zA-Z0-9\s.@#&%!\$\-\_\':"^*\+\=[\](){}]*$/;
const NAME_ALPHAMENURIC_SPACE = /^[^\s][\d\a-zA-Z\s\-\_]*$/;
const NAME_ALPHA = /^[a-zA-Z ]*$/;
export const VALIDATION_REGEX = {
  NAME_ALPHAMENURIC_SPECIAL,
  EMAIL: /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/,
  ALPHABET_ONLY: /^[a-zA-Z. ]+$/,
  NUMBER_ONLY: /^[0-9]*$/,
  UPPER_LOWER_ALPHANUMRIC_SPECIAL: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/,
  MOBILE: /^[1-9]{1}[0-9]{9}$/,
  MOBILE_GLOBAL:/^[1-9]{1}[0-9]{9}$/,
  VALID_NAME: NAME_ALPHAMENURIC_SPACE,
  MOBILE_US:/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  CARD_INFO:/^[0-9]{1}[0-9]{15}$/,
  CVV:/^[0-9]{1}[0-9]{2}$/,
  CARD_EXPIRY_DATE:/^(0\d|1[0-2])\/\d{2}$/,
  ZIP: /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/,
};

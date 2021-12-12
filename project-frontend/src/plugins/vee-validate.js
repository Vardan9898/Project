import { required, email, regex, numeric} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("regex", {
  message: "Choose another password",
  validate(value){
    let reg = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$');
    return reg.test(value)
  }
})
extend("numeric", {
  ...numeric,
  message: "This field must be a valid number"
});



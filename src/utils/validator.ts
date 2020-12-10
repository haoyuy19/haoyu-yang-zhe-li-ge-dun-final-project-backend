import validator from "validator";
import { IUserDocument } from "../models/User";
import HttpException from "../exceptions/HttpException";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";

interface RegisterInputError extends Partial<IUserDocument> {
  confirmPassword?: string;
}

export interface LoginInputError extends Partial<IUserDocument> {
  general?: string;
}

export const validateLoginInput = (
  username: IUserDocument["username"],
  password: IUserDocument["password"]
) => {
  let errors: LoginInputError = {};

  if (validator.isEmpty(username.trim())) {
    errors.username = "Username must not be empty";
  }

  if (validator.isEmpty(password.trim())) {
    errors.password = "Password must not be empty";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

export const validateRegisterInput = (
  username: IUserDocument["username"],
  password: IUserDocument["password"],
  confirmPassword: IUserDocument["password"],
  email: IUserDocument["email"]
) => {
  let errors: RegisterInputError = {};

  if (validator.isEmpty(username.trim())) {
    errors.username = "Username must not be empty";
  }

  if (validator.isEmpty(password.trim())) {
    errors.password = "Password must not be empty";
  }

  if (validator.isEmpty(confirmPassword.trim())) {
    errors.confirmPassword = "Confirmed password must not be empty";
  }

  if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  if (validator.isEmpty(email.trim())) {
    errors.email = "Email must not be empty";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Email must be a valid email address";
  }


  if(!validator.isLength(password , {min:0, max:8})){

    errors.password = "Password should have";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

export const checkBody = (body: string) => {
  if (validator.isEmpty(body.trim())) {
    throw new HttpException(UNPROCESSABLE_ENTITY, "Body must be not empty", {
      body: "The body must be not empty"
    });
  }
};

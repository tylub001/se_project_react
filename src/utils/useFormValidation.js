import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({ name: "", imageUrl: "", weather: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]:
        e.target.validationMessage ||
        (name === "name" && value.length < 2
          ? "Name must be at least 2 characters"
          : ""),
    });

    setIsValid(
      e.target.closest("form").checkValidity() &&
        values.name?.length >= 2 &&
        values.imageUrl &&
        value
    );
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

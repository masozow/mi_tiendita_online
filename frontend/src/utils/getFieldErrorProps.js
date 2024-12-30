const getFieldErrorProps = (fieldName, errors) => ({
  error: !!errors[fieldName],
  helperText: errors[fieldName]?.message,
});

export default getFieldErrorProps;

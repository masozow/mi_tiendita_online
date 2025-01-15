import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useQueryHook } from "../../hooks/useQueryHook";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";
import getFieldErrorProps from "../../utils/getFieldErrorProps"; // Import the getFieldErrorProps function

const SelectCustomControlled = forwardRef(
  (
    {
      label,
      handleSelectionChange,
      id,
      incomingStateValue,
      queryKey,
      URL,
      errors,
      fieldName,
      slotProps: { ...slotProps } = {},
    },
    ref
  ) => {
    const { data, isLoading, error: queryError } = useQueryHook(queryKey, URL);
    const selectRef = useRef();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useImperativeHandle(ref, () => ({
      focus: () => {
        selectRef.current.focus();
      },
    }));

    useEffect(() => {
      if (data && data.data) {
        setIsDataLoaded(true);
      }
    }, [data]);

    const errorProps = getFieldErrorProps(fieldName, errors);

    return (
      <FormControl fullWidth margin="normal" error={errorProps.error}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={`${id}-select`}
          value={isDataLoaded ? incomingStateValue : ""}
          label={label}
          slotProps={{ ...slotProps }}
          onChange={(event) => handleSelectionChange(event.target.value)}
          ref={selectRef}>
          <MenuItem value={""}>
            <em>--Ninguna--</em>
          </MenuItem>
          {isLoading ? (
            <MenuItem value="">
              <em>Cargando...</em>
            </MenuItem>
          ) : (
            data.data?.map((item) => (
              <MenuItem key={item.ID} value={item.ID}>
                {item.NOMBRE}
              </MenuItem>
            ))
          )}
        </Select>
        {errorProps.helperText && (
          <FormHelperText>{errorProps.helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default SelectCustomControlled;

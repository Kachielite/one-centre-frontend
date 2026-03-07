import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/core/components/ui/field.tsx"
import { Input } from "@/core/components/ui/input.tsx"

interface CustomInputProps<T extends FieldValues> {
  id: Path<T>
  formController: UseFormReturn<T>
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

function CustomTextInput<T extends FieldValues>({
  id,
  formController,
  placeholder,
  required,
  label,
  disabled,
}: CustomInputProps<T>) {
  return (
    <Controller
      name={id}
      control={formController.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <Input
            {...field}
            id={id}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            required={required}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default CustomTextInput

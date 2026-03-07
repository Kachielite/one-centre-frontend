import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/core/components/ui/field.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/core/components/ui/input-group.tsx"

interface CustomTextAreaInputProps<T extends FieldValues> {
  id: Path<T>
  formController: UseFormReturn<T>
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  maxLength?: number
  shouldShowCharacterCount?: boolean
}

function CustomTextAreaInput<T extends FieldValues>({
  id,
  formController,
  placeholder,
  required,
  label,
  disabled,
  rows = 6,
  maxLength = -1,
  shouldShowCharacterCount = true,
}: CustomTextAreaInputProps<T>) {
  return (
    <Controller
      name={id}
      control={formController.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              {...field}
              id={id}
              placeholder={placeholder}
              rows={rows}
              className="min-h-24 resize-none"
              aria-invalid={fieldState.invalid}
              required={required}
              disabled={disabled}
              maxLength={maxLength > 0 ? maxLength : undefined}
            />
            {shouldShowCharacterCount && (
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {field.value.length}/100 characters
                </InputGroupText>
              </InputGroupAddon>
            )}
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default CustomTextAreaInput

import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { UserDataInputProps } from "../../interfaces/UserDataInput.types";

/**
 *
 * @param {string} header  - Text display above the text box
 * @param {string} subText - Text displayed under the textbox
 * @param {string} buttonText - Button Text
 * @param {string} textboxPlaceholder - Placeholder of text wanted in the textbox
 * @param {string} errorStateText - Text you want to display to user when a problem has happened
 * @param {boolean} errorState - A boolean you pass to tell the errorStateText to display
 * @param {string} successText - Text you want to display to user when a request was successful
 * @param {boolean} success - A boolean you pass to tell the successText to display
 * @returns
 */
function UserDataInput({
  header,
  subText,
  buttonText,
  textboxPlaceholder,
  onChange,
  actionWanted,
  errorState,
  errorStateText,
  success,
  successText,
  value,
}: UserDataInputProps) {
  return (
    <>
      <div className="w-2/4">
        <FieldGroup className="text-white">
          <Field>
            <FieldLabel htmlFor="fieldgroup-name" className="text-white">
              {header ? header : "header"}
            </FieldLabel>
            <Input
              className="bg-white text-black"
              id="fieldgroup-name"
              placeholder={textboxPlaceholder}
              value={value}
              onChange={(input) => onChange(input.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && actionWanted();
              }}
            />
            <FieldDescription className={errorState ? "text-red-500" : ""}>
              {errorState ? errorStateText : success ? successText : subText}
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white px-6"
              type="submit"
              onClick={() => actionWanted()}
            >
              {buttonText}
            </Button>
          </Field>
        </FieldGroup>
      </div>
    </>
  );
}

export default UserDataInput;

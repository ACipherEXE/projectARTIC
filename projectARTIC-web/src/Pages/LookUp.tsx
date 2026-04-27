import { useEffect, useState } from "react";
import { getStudentInfo } from "../API/time-entry-calls";
import UserDataInput from "../components/custom/UserDataInput";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../components/ui/field";
import { Input } from "../components/ui/input";

function LookUp() {
  const [studentID, setStudentID] = useState("");
  const [errorState, setErrorState] = useState(false);
  const defaultErrorState = "Something went wrong, try once more";
  const [errorDescription, setErrorDescription] = useState(defaultErrorState);
  const [wasSuccess, setWasSuccess] = useState(false);
  const [studentData, setStudentData] = useState(null);

  async function searchStudentID() {
    if (!studentID) {
      setErrorDescription("Enter a student ID");
      setErrorState(true);
    } else {
      try {
        await getStudentInfo(studentID).then((result) => {
          if (!result || Object.keys(result).length === 0) {
            setErrorDescription("Student ID not found, try once more");
            setWasSuccess(false);
            setErrorState(true);
            return;
          }
          setErrorDescription(defaultErrorState);
          setWasSuccess(true);
          setErrorState(false);
          console.log("result", result);
          setStudentData(result);
          return;
        });
      } catch {
        setErrorDescription(defaultErrorState);
        setWasSuccess(false);
        setErrorState(true);
        return;
      }
    }
  }

  // Timer to reset the output to normal
  useEffect(() => {
    const timer = setTimeout(() => {
      setWasSuccess(false);
      setErrorState(false);
    }, 3000);
    // Clean up of timer
    return () => clearTimeout(timer);
  }, [wasSuccess]);

  return (
    <>
      <UserDataInput
        header={"Student Look Up"}
        subText={"Enter a student ID to look up"}
        buttonText={"Look Up"}
        textboxPlaceholder={"EX: STU001"}
        onChange={(value: string): void => {
          setStudentID(value);
        }}
        actionWanted={(): void => {
          searchStudentID();
        }}
        errorStateText={errorDescription}
        success={wasSuccess}
        successText={`Student ${studentID} has been found`}
        errorState={errorState}
      />
      <div className="w-full max-w-md">
        {studentData && (
          <form>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Student Info</FieldLegend>
                <FieldGroup>
                  <FieldGroup className="grid max-w-sm grid-cols-2 text-white">
                    <Field>
                      <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                      <Input
                        id="first-name"
                        className="text-white"
                        value={studentData?.firstname ?? ""}
                        disabled
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Last Name</FieldLabel>
                      <Input
                        id="last-name"
                        value={studentData?.lastname ?? ""}
                        disabled
                      />
                    </Field>
                  </FieldGroup>
                  <div className="grid grid-cols-3 gap-4">
                    <Field>
                      <FieldLabel>Grade</FieldLabel>
                      <Input
                        id="checkout-7j9-card-number-uw1"
                        value={studentData?.grade ?? ""}
                        disabled
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                      Phone Number
                    </FieldLabel>
                    <Input
                      id="checkout-7j9-card-number-uw1"
                      value={studentData?.phonenumber ?? ""}
                      disabled
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                      E-Mails
                    </FieldLabel>
                    {studentData?.emails?.map((email: string) => (
                      <a
                        href={`mailto:${email}`}
                        className="text-primary text-blue-500 underline hover:opacity-80"
                      >
                        {email}
                      </a>
                    ))}
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
            </FieldGroup>
          </form>
        )}
      </div>
    </>
  );
}

export default LookUp;

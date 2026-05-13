import { useEffect, useState } from "react";
import UserDataInput from "../components/custom/UserDataInput";
import { searchStudentID } from "../Function-Box/studentCalls";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { useParams } from "react-router-dom";
import type { searchStudentIDCall } from "../interfaces/UserDataInput.types";

/**
 *
 * @returns This page is used to look up students and display data of them
 */
function LookUp() {
  const [studentIdInput, setStudentIdInput] = useState("");
  const [errorState, setErrorState] = useState(false);
  const defaultErrorState = "Something went wrong, try once more";
  const [errorDescription, setErrorDescription] = useState(defaultErrorState);
  const [wasSuccess, setWasSuccess] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const { studentId } = useParams();

  // Timer to reset the output to normal
  useEffect(() => {
    const timer = setTimeout(() => {
      setWasSuccess(false);
      setErrorState(false);
    }, 3000);
    // Clean up of timer
    return () => clearTimeout(timer);
  }, [wasSuccess]);

  useEffect(() => {
    if (studentId) {
      setStudentIdInput(studentId);
      searchStudentID(studentId); // pass it directly since state may not be set yet
    }
  }, [studentId]);

  return (
    <>
      <UserDataInput
        header={"Student Look Up"}
        subText={"Enter a student ID to look up"}
        buttonText={"Look Up"}
        textboxPlaceholder={"EX: STU001"}
        onChange={(value: string): void => {
          setStudentIdInput(value);
        }}
        actionWanted={async (): Promise<void> => {
          await searchStudentID(studentIdInput).then(
            (result: searchStudentIDCall) => {
              setErrorDescription(result.errorDescription);
              setWasSuccess(result.wasSuccess);
              setErrorState(result.wasError);
              setStudentData(result.studentData);
            },
          );
        }}
        errorStateText={errorDescription}
        success={wasSuccess}
        successText={`Student ${studentIdInput} has been found`}
        errorState={errorState}
        value={studentIdInput}
      />
      <div className="w-full max-w-md">
        {studentData && (
          <form>
            <FieldGroup className="mt-8">
              <FieldSet>
                <FieldLegend>Student Info</FieldLegend>
                <FieldGroup>
                  <FieldGroup className="grid max-w-sm grid-cols-2 text-white">
                    <Field>
                      <FieldLabel>First Name</FieldLabel>
                      <Input
                        className="text-white"
                        value={studentData?.firstname ?? ""}
                        disabled
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Last Name</FieldLabel>
                      <Input value={studentData?.lastname ?? ""} disabled />
                    </Field>
                  </FieldGroup>
                  <div className="grid grid-cols-3 gap-4">
                    <Field>
                      <FieldLabel>Grade</FieldLabel>
                      <Input value={studentData?.grade ?? ""} disabled />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input value={studentData?.phonenumber ?? ""} disabled />
                  </Field>
                  <Field>
                    <FieldLabel>E-Mails</FieldLabel>
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

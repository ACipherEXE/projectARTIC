import { use, useState } from "react";
import { studentClockIn } from "./API/time-entry-calls";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./components/ui/field";
import { Input } from "./components/ui/input";
function App() {
  const [studentID, setStudentID] = useState("");
  const [errorState, setErrorState] = useState(false);
  const defaultErrorState = "Something went wrong, try once more";
  const [errorDescription, setErrorDescription] = useState(defaultErrorState);
  const [wasSuccess, setWasSuccess] = useState(false);

  async function sendStudentClockIn() {
    if (!studentID) {
      console.log("ERROR STATE: Enter a student ID");
      setErrorDescription("Enter a student ID");
      setErrorState(true);
    } else {
      try {
        await studentClockIn(studentID).then((result) => {
          if (!result || Object.keys(result).length === 0) {
            console.log(
              "ERROR STATE: API SENT A NULL so not found or something went wrong",
            );
            setErrorDescription("Student ID not found, try once more");
            setErrorState(true);
            return;
          }
          console.log("PASS STATE: The student has clocked in");
          setErrorDescription(defaultErrorState);
          setErrorState(false);
          return;
        });
      } catch {
        console.log("ERROR STATE: API failed");
        setErrorDescription(defaultErrorState);
        setErrorState(true);
        return;
      }
    }
  }

  return (
    <>
      <div className="main-container flex items-center justify-center min-h-screen w-full">
        <FieldGroup className="object-center">
          <Field>
            <FieldLabel htmlFor="fieldgroup-name" className="text-white">
              Student ID
            </FieldLabel>
            <Input
              className="bg-white"
              id="fieldgroup-name"
              placeholder="EX: STU001"
              onChange={(input) => setStudentID(input.target.value)}
            />
            <FieldDescription>
              {errorState
                ? errorDescription
                : wasSuccess
                  ? `Student ${studentID} has clocked in`
                  : "Enter the students ID here for the timecard system"}
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white px-6"
              type="submit"
              onClick={() => sendStudentClockIn()}
            >
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </div>
    </>
  );
}

export default App;

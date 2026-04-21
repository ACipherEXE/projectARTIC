import { useState } from "react";
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

  async function sendStudentClockIn() {
    if (!studentID) {
      console.log("ERROR STATE: Enter a student ID");
      return false;
    } else {
      try {
        await studentClockIn(studentID).then((result) => {
          if (!result) {
            console.log(
              "ERROR STATE: API SENT A NULL so not fund or something went wrong",
            );
            return false;
          }
          console.log("PASS STATE: The student has clocked in");
          return true;
        });
        return true;
      } catch {
        console.log("ERROR STATE: API failed");
        return false;
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
              Enter the students ID here for the timecard system
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

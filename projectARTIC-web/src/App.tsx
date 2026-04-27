import { useEffect, useState } from "react";
import { studentClockIn } from "./API/time-entry-calls";
import "./App.css";
import UserDataInput from "./components/custom/UserDataInput";

function App() {
  const [studentID, setStudentID] = useState("");
  const [errorState, setErrorState] = useState(false);
  const defaultErrorState = "Something went wrong, try once more";
  const [errorDescription, setErrorDescription] = useState(defaultErrorState);
  const [wasSuccess, setWasSuccess] = useState(false);

  async function sendStudentClockIn() {
    if (!studentID) {
      setErrorDescription("Enter a student ID");
      setErrorState(true);
    } else {
      try {
        await studentClockIn(studentID).then((result) => {
          if (!result || Object.keys(result).length === 0) {
            setErrorDescription("Student ID not found, try once more");
            setWasSuccess(false);
            setErrorState(true);
            return;
          }
          setErrorDescription(defaultErrorState);
          setWasSuccess(true);
          setErrorState(false);
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
        header={"Student ID"}
        subText={"Enter the students ID here for the timecard system"}
        buttonText={"Submit"}
        textboxPlaceholder={"EX: STU001"}
        onChange={(value: string): void => {
          setStudentID(value);
        }}
        actionWanted={(): void => {
          sendStudentClockIn();
        }}
        errorStateText={errorDescription}
        success={wasSuccess}
        successText={`Student ${studentID} has clocked in`}
        errorState={errorState}
      />
    </>
  );
}

export default App;

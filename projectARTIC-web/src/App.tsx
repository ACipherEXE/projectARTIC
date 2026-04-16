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
            />
            <FieldDescription>
              Enter the students ID here for the timecard system
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white px-6"
              type="submit"
              onClick={() => console.log("yeet")}
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

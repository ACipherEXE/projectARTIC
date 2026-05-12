import { getStudentInfo } from "../API/time-entry-calls";

export async function searchStudentID(studentIdPassed) {
  const defaultErrorState = "Something went wrong, try once more";
  try {
    await getStudentInfo(studentIdPassed).then((result) => {
      if (!result || Object.keys(result).length === 0) {
        return {
          errorDescription: "Student ID not found, try once more",
          wasSuccess: false,
          wasError: true,
          studentData: null,
        };
      }
      return {
        errorDescription: defaultErrorState,
        wasSuccess: true,
        wasError: false,
        studentData: result,
      };
    });
  } catch {
    return {
      errorDescription: defaultErrorState,
      wasSuccess: false,
      wasError: true,
      studentData: null,
    };
    return;
  }
}

import { getEntryLogs, getStudentInfo } from "../API/time-entry-calls";
import type { EntryLogResponse } from "../interfaces/UserDataInput.types";

/**
 * This fuunction is used to call a API and return a JSON of the results.
 * @param {string} studentIdPassed - The student ID EX: STU001
 * @returns - A JSON of the students info from the API and other stuff.
 */
export async function searchStudentID(studentIdPassed) {
  const defaultErrorState = "Something went wrong, try once more";
  try {
    return await getStudentInfo(studentIdPassed).then((result) => {
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
  }
}

/**
 * Function used to look up entries of all or one student.
 * @param {number} limit - The limit of entries you want to see per page
 * @param {number} page - The page number you want to display
 * @param {string} studentIdPassed - The passed student ID (Optional)
 * @returns A JSON full of error handleing, student entries and pagination
 */
export async function searchEntriesByStudentID({
  limit,
  page,
  studentIdPassed,
}: {
  limit: number;
  page: number;
  studentIdPassed?: string;
}) {
  const defaultErrorState = "Something went wrong, try once more";
  try {
    return await getEntryLogs({
      limit: limit,
      page: page,
      studentId: studentIdPassed,
    }).then((result: EntryLogResponse) => {
      if (!result || Object.keys(result).length === 0) {
        return {
          errorDescription: "Student ID not found, try once more",
          wasSuccess: false,
          wasError: true,
          studentData: null,
          pagination: null,
          isLoading: false,
        };
      }
      return {
        errorDescription: defaultErrorState,
        wasSuccess: true,
        wasError: false,
        studentData: result.data,
        pagination: result.pagination,
        isLoading: false,
      };
    });
  } catch {
    return {
      errorDescription: defaultErrorState,
      wasSuccess: false,
      wasError: true,
      studentData: null,
      pagination: null,
      isLoading: false,
    };
  }
}

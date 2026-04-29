import type { EntryLogResponse } from "../interfaces/UserDataInput.types";

const localAPIEndpoint = "http://localhost:3001";

//Function will handle multiple endpoints of the API depending on what state we want it
function apiEndpontManager() {
  return localAPIEndpoint;
}
/**
 * This API call is used to clock in the student in the system
 * @param {string} studentId - The students ID you want to pass
 * @returns The reponse from the API
 */
export async function studentClockIn(studentId: string) {
  try {
    return await fetch(
      `${apiEndpontManager()}/time-entry?studentId=${studentId}`,
      {
        method: "POST",
      },
    ).then((response) => (response.status === 200 ? response.json() : {}));
  } catch (error) {
    return {};
  }
}
/**
 * Asks the API a list of student entries
 * @param studentId - (optional) The students ID
 * @param limit - (optional) The amount of entries you want at once
 * @param page - (optional) The page you want to display
 * @returns - JSON of student entries
 */
export async function getEntryLogs({
  studentId,
  limit,
  page,
}: {
  studentId?: string;
  limit?: number;
  page?: number;
} = {}) {
  const params = new URLSearchParams();
  if (limit) params.append("limit", String(limit));
  if (page) params.append("page", String(page));
  try {
    return await fetch(
      `${apiEndpontManager()}/entry-logs${params.toString() ? `?${params.toString()}` : ""}`,
      {
        method: "GET",
      },
    ).then((response) => (response.status === 200 ? response.json() : {}));
  } catch (error) {
    return {};
  }
}
/**
 * Asks the API for student data of the matching student ID
 * @param studentId - The students ID
 * @returns - Returns the students info.
 */
export async function getStudentInfo(studentId: string) {
  try {
    return await fetch(
      `${apiEndpontManager()}/student?studentId=${studentId}`,
      {
        method: "GET",
      },
    ).then((response) =>
      response.status === 200
        ? response.json().then((data) => data[0] ?? {})
        : {},
    );
  } catch (error) {
    return {};
  }
}

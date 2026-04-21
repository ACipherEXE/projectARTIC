const localAPIEndpoint = "http://localhost:3001";

//Function will handle multiple endpoints of the API depending on what state we want it
function apiEndpontManager() {
  return localAPIEndpoint;
}
/**
 * This function is used to clock in the student in the system
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

export async function getEntryLogs(studentId: string) {
  try {
    return await fetch(
      `${apiEndpontManager()}/entry-logs?studentId=${studentId}`,
      {
        method: "POST",
      },
    ).then((response) => (response.status === 200 ? response.json() : {}));
  } catch (error) {
    return {};
  }
}

export async function getStudentInfo(studentId: string) {
  try {
    return await fetch(
      `${apiEndpontManager()}/student?studentId=${studentId}`,
      {
        method: "POST",
      },
    ).then((response) => (response.status === 200 ? response.json() : {}));
  } catch (error) {
    return {};
  }
}

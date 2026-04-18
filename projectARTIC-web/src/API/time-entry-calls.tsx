const localAPIEndpoint = "http://localhost:3001";

//Function will handle multiple endpoints of the API depending on what state we want it
function apiEndpontManager() {
  return localAPIEndpoint;
}

export async function studentClockIn(studentId: string) {
  try {
    return await fetch(
      `${apiEndpontManager()}/time-entry?studentId=${studentId}`,
      {
        method: "POST",
      },
    ).then((response) => response.json());
  } catch (error) {
    return "Something has gone wrong";
  }
}

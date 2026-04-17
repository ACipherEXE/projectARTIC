const localAPIEndpoint = "http://localhost:3001";

//Function will handle multiple endpoints of the API depending on what state we want it
function apiEndpontManager() {
  return localAPIEndpoint;
}

export function studentClockIn(studentId: string) {
  try {
    fetch(`${apiEndpontManager()}/time-entry?studentId=${studentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        return "Entry Recorded Successfully";
      });
  } catch (error) {
    return "Something has gone wrong";
  }
}

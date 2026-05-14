import { useEffect, useState } from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "../components/ui/table";
import type {
  EntryLogResponse,
  Pagination,
  Student,
} from "../interfaces/UserDataInput.types";
import { formatDate, formatTime } from "../Function-Box/time-and-date";
import { Button } from "../components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserDataInput from "../components/custom/UserDataInput";
import { searchEntriesByStudentID } from "../Function-Box/studentCalls";
import { useParams } from "react-router-dom";
import { ButtonGroup } from "../components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

/**
 *
 * @returns A table of student entries
 */
function EntryList() {
  const [currentEntryList, setCurrentEntryList] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(25);
  const [currentPagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentIdInput, setStudentIdInput] = useState("");
  const [errorState, setErrorState] = useState(false);
  const defaultErrorState = "Something went wrong, try once more";
  const [errorDescription, setErrorDescription] = useState(defaultErrorState);
  const [wasSuccess, setWasSuccess] = useState(false);
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (studentId) {
      setStudentIdInput(studentId);
    }
  }, [studentId]);
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setCurrentEntryList(null);
      searchEntriesByStudentID({
        limit: currentLimit,
        page: currentPage,
        studentIdPassed: studentIdInput ? studentIdInput : "",
      }).then((result: EntryLogResponse) => {
        if (result.studentData !== null) {
          setCurrentEntryList(result.studentData);
          setPagination(result.pagination);
          setIsLoading(false);
        }
      });
    }, 700);
    // The user is typing we want to delay the API calls as without this it would call the API evey keystroke, we would like the to give the API some rest XD
    return () => clearTimeout(timeout);
  }, [currentLimit, currentPage, studentIdInput]);

  function changePage(direction: "next" | "prev") {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    if (
      direction === "next" &&
      currentPagination &&
      currentPage < currentPagination.totalPages
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    <>
      <UserDataInput
        header={"Search by Student ID"}
        // subText={"Enter a student ID to look up"}
        buttonText={"Look Up"}
        textboxPlaceholder={"EX: STU001"}
        onChange={(value: string): void => {
          setStudentIdInput(value);
        }}
        errorStateText={"errorDescription"}
        successText={`Student ${studentIdInput} has been found`}
        value={studentIdInput}
        buttonInline={true}
        shouldButtonBeShown={false}
        success={wasSuccess}
        errorState={errorState}
      />

      {!isLoading && currentEntryList.length > 0 && currentPagination ? (
        <>
          <Table>
            <TableCaption>A list of student entries</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Student ID</TableHead>
                <TableHead>Is Late</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEntryList.map((entry, key) => (
                <TableRow key={key}>
                  <TableCell className="cursor-pointer">
                    <ButtonGroup>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="cursor-pointer ">
                            {entry.studentid}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black shadow-md text-white">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              className="cursor-pointer hover:underline"
                              onClick={() =>
                                navigate(`/look-up/${entry.studentid}`)
                              }
                            >
                              Student Info
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer hover:underline"
                              onClick={() =>
                                navigate(`/entry-list/${entry.studentid}`)
                              }
                            >
                              Entries
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell>{entry.is_late ? "Yes" : "No"}</TableCell>
                  <TableCell>{formatTime(entry.time)}</TableCell>
                  <TableCell className="text-right">
                    {formatDate(entry.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Page</TableCell>
                <TableCell className="text-right">{`${currentPagination.currentPage}/${currentPagination.totalPages}`}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="icon"
              aria-label="Last Page"
              disabled={currentPage === 1}
              onClick={() => changePage("prev")}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next Page"
              disabled={currentPage === currentPagination.totalPages}
              onClick={() => changePage("next")}
            >
              <ArrowRightIcon />
            </Button>
          </div>
        </>
      ) : (
        <>{isLoading && <>Loading</>}</>
      )}
    </>
  );
}
export default EntryList;

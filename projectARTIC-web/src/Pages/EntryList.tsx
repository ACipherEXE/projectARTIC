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
import { getEntryLogs } from "../API/time-entry-calls";
import type {
  EntryLogResponse,
  Pagination,
  Student,
} from "../interfaces/UserDataInput.types";

/**
 *
 * @returns A table of student entries
 */
function EntryList() {
  const [currentEntryList, setCurrentState] = useState<Student[]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(25);
  const [currentPagination, setPagination] = useState<Pagination[]>();
  useEffect(() => {
    getEntryLogs({ limit: currentLimit, page: currentPage }).then(
      (result: EntryLogResponse) => {
        setCurrentState(result.data);
        setPagination(result.pagination);
        return;
      },
    );
  }, [currentLimit, currentPage]);

  return (
    <>
      {currentEntryList && (
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
            {currentEntryList.map((entry) => (
              <TableRow>
                <TableCell className="font-medium">{entry.studentid}</TableCell>
                <TableCell>{entry.is_late ? "Yes" : "No"}</TableCell>
                <TableCell>{entry.time}</TableCell>
                <TableCell className="text-right">{entry.date}</TableCell>
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
      )}
    </>
  );
}
export default EntryList;

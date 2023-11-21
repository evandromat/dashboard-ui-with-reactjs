import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";


// const columns = [
//   { id: "id", label: "ID", minWidth: 100, format: "number" },
//   { id: "categoria", label: "CATEGORIA", minWidth: 100 },
//   { id: "actions", label: "Ação", minWidth: 100 },
// ];

// function createData(id, categoria, actions) {
//   return { id, categoria, actions };
// }

// const rows = [
//   createData(
//     "01",
//     "computador",
//     <Box sx={{ display: "flex", gap: 2 }}>
//       <GrUpdate size={20} color="green" style={{ cursor: "pointer" }} />
//       <BiSolidTrash size={24} color="red" style={{ cursor: "pointer" }} />
//     </Box>
//   ),
// ];

export default function StickyHeadTable({widthPaper,columns,rows,linhasPorPagina,rowsPerPageOptions}) {
 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(linhasPorPagina);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: widthPaper + "%",
        overflow: "hidden",
        background: "#29221d",
        margin: "auto",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ background: "#a8a5a6" }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  // align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "#473b33",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ background: "#bdbabb" }}
      />
    </Paper>
  );
}

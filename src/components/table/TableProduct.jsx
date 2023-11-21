import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GrUpdate } from "react-icons/gr";
import { BiSolidTrash } from "react-icons/bi";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const columnsProduct = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "images", label: "FOTOS" },
  { id: "name", label: "PRODUTO" },
  { id: "sku", label: "SKU" },
  { id: "category", label: "CATEGORIA" },
  { id: "brand", label: "MARCA" },
  { id: "color", label: "COR" },
  { id: "sold", label: "DESCONTO" },
  { id: "regularPrice", label: "PREÇO NORMAL" },
  { id: "price", label: "PREÇO" },
  { id: "actions", label: "AÇÕES" },
];

function createData(
  id,
  images,
  name,
  sku,
  category,
  brand,
  color,
  sold,
  regularPrice,
  price,
  actions
) {
  return {
    id,
    images,
    name,
    sku,
    category,
    brand,
    color,
    sold,
    regularPrice,
    price,
    actions,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row, index } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{color:'#fff'}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon  /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sx={{color:'#fff'}} component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>
          <AvatarGroup max={2}>
            {row.images?.map((image, index) => {
              return <Avatar key={index} alt="image product" src={image} />;
            })}
          </AvatarGroup>
        </TableCell>
        <TableCell sx={{color:'#fff',minWidth:'234px'}}>{row.name}</TableCell>
        <TableCell sx={{color:'#fff'}}>{row.sku}</TableCell>
        <TableCell sx={{color:'#fff'}}>{row.category}</TableCell>
        <TableCell sx={{color:'#fff'}}>{row.brand}</TableCell>
        <TableCell sx={{color:'#fff'}}>{row.color}</TableCell>
        <TableCell sx={{color:'#fff'}}>{row.sold}</TableCell>
        <TableCell sx={{color:'#fff'}}>{row.regularPrice}</TableCell>
        <TableCell sx={{color:'#fff'}}>{row.price}</TableCell>

        <TableCell>{row.actions}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Histórico
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell align="right">qtd compras</TableCell>
                    <TableCell align="right">Valor Total (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function TableProduct({ productData }) {
  const rows = productData.map((item, index) => {
    return createData(
      index + 1,
      item.images,
      item.name,
      item.sku,
      item.category,
      item.brand,
      item.color,
      item.sold,
      item.regularPrice,
      item.price,
      <Box key={item._id} sx={{ display: "flex", gap: 2 }}>
        <GrUpdate size={20} color="green" style={{ cursor: "pointer" }} />
        <BiSolidTrash size={24} color="red" style={{ cursor: "pointer" }} />
      </Box>
    );
  });
  return (
    <TableContainer
      sx={{
        backgroundColor: "var(--clr-primar-light)",
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
      elevation={4}
      component={Paper}
    >
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "var(--clr-primary)",fontWeight:600}}>
          <TableRow>
            <TableCell />
            {columnsProduct.map((item, index) => {
              return <TableCell sx={{color:'#fff'}} key={item.id}>{item.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={row._id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

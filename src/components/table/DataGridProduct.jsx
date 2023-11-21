import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { GrUpdate } from "react-icons/gr";
import { BiSolidTrash } from "react-icons/bi";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";


 const upDateProduc = (id) => {

    alert(id);
  };
const columns = [
  {
    field: "id",
    headerClassName: "super-app-theme--header",
    headerName: "ID",
    sortable: false,
    width: 90,
  },
  {
    field: "images",
    headerClassName: "super-app-theme--header",
    headerName: "Fotos",
    sortable: false,
    width: 90,
    renderCell: (params) => (
      <AvatarGroup max={2}>
        {params.value.map((image, index) => {
          return (
            <Avatar
              key={index}
              alt="image product"
              src={image}
              sx={{ "& .MuiAvatar-img:hover": { transform: "scale(1.5)" } }}
            />
          );
        })}
      </AvatarGroup>
    ),
  },
  {
    field: "name",
    headerClassName: "super-app-theme--header",
    headerName: "Producto",
    width: 200,
  },
  {
    field: "sku",
    headerClassName: "super-app-theme--header",
    headerName: "SKU",
    width: 90,
  },
  {
    field: "category",
    headerClassName: "super-app-theme--header",
    headerName: "Categoria",
    sortable: false,
    width: 100,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: "brand",
    headerClassName: "super-app-theme--header",
    headerName: "Marca",
    sortable: false,
    width: 90,
  },
  {
    field: "color",
    headerClassName: "super-app-theme--header",
    headerName: "cor",
    sortable: false,
    width: 90,
  },
  {
    field: "sold",
    headerClassName: "super-app-theme--header",
    headerName: "Desconto(%)",
    sortable: false,
    width: 100,
  },
  {
    field: "regularPrice",
    headerClassName: "super-app-theme--header",
    headerName: "Preço Normal",
    sortable: false,
    width: 90,
  },
  {
    field: "price",
    headerClassName: "super-app-theme--header",
    headerName: "Preço",
    type: "number",
    width: 90,
  },
  {
    field: "actions",
    headerClassName: "super-app-theme--header",
    headerName: "Ações",
    renderCell: (params) => (
      <Box key={params.id} sx={{ display: "flex", gap: 2 }}>
        <GrUpdate
          size={20}
          color="green"
          style={{ cursor: "pointer" }}
          onClick={() => upDateProduc(params.row.id)}
        />
        <BiSolidTrash size={24} color="red" style={{ cursor: "pointer" }} />
      </Box>
    ),
    sortable: false,
    width: 90,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];
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
    //   history: [
    //     {
    //       date: "2020-01-05",
    //       customerId: "11091700",
    //       amount: 3,
    //     },
    //     {
    //       date: "2020-01-02",
    //       customerId: "Anonymous",
    //       amount: 1,
    //     },
    //   ],
  };
}
export default function DataGridProduct({ productData }) {
  const rows = productData.map((item, index) => {
    return createData(
      item._id,
      item.images,
      item.name,
      item.sku,
      item.category,
      item.brand,
      item.color,
      item.sold,
      item.regularPrice,
      item.price,
      item.actions
    );
  });
 
  return (
    <div style={{ height: 450, width: "100%" }}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          color: "#fff",
          fontWeight: 600,
          boxShadow: 2,
          border: 2,
          borderColor: "goldenrod",
          "& .MuiDataGrid-cell:hover": {
            color: "#998d61",
          },
          "& .super-app-theme--header": {
            color: "gold",

            textTransform: "uppercase",
          },
          "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
            {
              color: "goldenrod",
            },
          "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg:":
            {
              backgroundColor: "gray",
            },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },
          "& .MuiDataGrid-row:hover": {
            background: "rgba(0,0,0,0.3)",
          },
          "& .MuiTablePagination-root": {
            color: "gold",
          },
          "& .MuiSvgIcon-root": {
            color: "gold",
          },
          "& .MuiButtonBase-root.MuiButton-root.MuiButton-text": {
            color: "goldenrod",
          },
        }}
      />
    </div>
  );
}

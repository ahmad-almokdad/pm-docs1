import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import {
  useAddMainOperationMutation,
  useGetMainOperationQuery,
  useUpdateMainOperationMutation,
} from "state/api";

const MainOperation = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetMainOperationQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateMainOperation, { data: dataAfterUpdate }] =
    useUpdateMainOperationMutation();
  const [addMainOperation, { data: dataAfterAdd }] =
    useAddMainOperationMutation();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "name",
      flex: 1,
    },

    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setName(params.row.name);

                setId(params.row._id);
                handleOpen();
              }}
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "90%",
    overflow: "scroll",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(null);

  const [id, setId] = useState(null);
  const onEditClicked = async () => {
    await updateMainOperation({ id, name });
  };

  const onAddClicked = async () => {
    await addMainOperation({ name });
  };

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <Box m="1.5rem 2.5rem">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit MainOperation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <TextField
              id="outlined-basic"
              label="Main Operation Name"
              variant="outlined"
              value={name}
              error={name === ""}
              helperText={name === "" ? "Empty field!" : " "}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: "2rem" }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="warning"
            disabled={name === ""}
            onClick={() => {
              onEditClicked();
              setOpen(false);
            }}
          >
            Edit
          </Button>
        </Box>
      </Modal>
      <Header title="MainOperation" subtitle="Entire list of MainOperation" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add MainOperation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <TextField
              id="outlined-basic"
              label="Main Operation Name"
              variant="outlined"
              value={name}
              error={name === ""}
              helperText={name === "" ? "Empty field!" : " "}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: "2rem" }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
            disabled={name === ""}
            onClick={() => {
              onAddClicked();
              setOpenAdd(false);
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>
      <Box p="1rem" width="full" display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setName("");

            setId("");
            setOpenAdd(true);
          }}
        >
          Add New Record
        </Button>
      </Box>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.data) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default MainOperation;

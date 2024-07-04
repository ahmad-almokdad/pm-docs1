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
  useAddBankMutation,
  useGetBanksQuery,
  useUpdateBankMutation,
} from "state/api";

const Banks = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetBanksQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateBank, { data: dataAfterUpdate }] = useUpdateBankMutation();
  const [addBank, { data: dataAfterAdd }] = useAddBankMutation();

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
      field: "swiftCode",
      headerName: "Swift Code",
      flex: 1,
    },
    {
      field: "bankNumber",
      headerName: "Bank Number",
      flex: 1,
      sortable: false,
      renderCell: (params) => params.value.length,
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
                setSwiftCode(params.row.swiftCode);
                setBankNumber(params.row.bankNumber);
                setId(params.row._id);
                handleOpen();
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ ml: 2 }}
              onClick={() => {
                setName(params.row.name);
                setSwiftCode(params.row.swiftCode);
                setBankNumber(params.row.bankNumber);
                setId(params.row._id);
                handleOpenSuspend();
              }}
            >
              Suspend
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

  const [openSuspend, setOpenSuspend] = React.useState(false);
  const handleOpenSuspend = () => setOpenSuspend(true);
  const handleCloseSuspend = () => setOpenSuspend(false);

  const [name, setName] = useState(null);
  const [swiftCode, setSwiftCode] = useState(null);
  const [bankNumber, setBankNumber] = useState(null);
  const [id, setId] = useState(null);
  const onEditClicked = async () => {
    // console.log("dd", { id, name, swiftCode, bankNumber });
    await updateBank({ id, name, swiftCode, bankNumber });
  };
  const onSuspendClicked = async () => {
    // console.log("dd", { id, name, swiftCode, bankNumber });
    await updateBank({ id, suspend: true });
  };

  const onAddClicked = async () => {
    // console.log("dd", { id, name, swiftCode, bankNumber });
    await addBank({ name, swiftCode, bankNumber });
  };

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <Box m="1.5rem 2.5rem">
      <Modal
        open={openSuspend}
        onClose={handleCloseSuspend}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Suspend Bank
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <TextField
              id="outlined-basic"
              label="Bank Name"
              required={true}
              disabled={true}
              variant="outlined"
              value={name}
              error={name === ""}
              helperText={name === "" ? "Empty field!" : " "}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Swift Code"
              required={true}
              disabled={true}
              variant="outlined"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              error={swiftCode === ""}
              helperText={swiftCode === "" ? "Empty field!" : " "}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Bank Number"
              // required={true}
              required
              disabled={true}
              variant="outlined"
              value={bankNumber}
              error={bankNumber === ""}
              helperText={bankNumber === "" ? "Empty field!" : " "}
              onChange={(e) => setBankNumber(e.target.value)}
              sx={{ mb: "2rem" }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="warning"
            //disabled={name === "" || bankNumber === "" || swiftCode === ""}
            onClick={() => {
              // editBank(id, name, swiftCode, bankNumber);

              onSuspendClicked();
              setOpenSuspend(false);
            }}
          >
            Suspend
          </Button>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Bank
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <TextField
              id="outlined-basic"
              label="Bank Name"
              required={true}
              variant="outlined"
              value={name}
              error={name === ""}
              helperText={name === "" ? "Empty field!" : " "}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Swift Code"
              required={true}
              variant="outlined"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              error={swiftCode === ""}
              helperText={swiftCode === "" ? "Empty field!" : " "}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Bank Number"
              // required={true}
              required
              variant="outlined"
              value={bankNumber}
              error={bankNumber === ""}
              helperText={bankNumber === "" ? "Empty field!" : " "}
              onChange={(e) => setBankNumber(e.target.value)}
              sx={{ mb: "2rem" }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="warning"
            disabled={name === "" || bankNumber === "" || swiftCode === ""}
            onClick={() => {
              // editBank(id, name, swiftCode, bankNumber);

              onEditClicked();
              setOpen(false);
            }}
          >
            Edit
          </Button>
        </Box>
      </Modal>
      <Header title="BANKS" subtitle="Entire list of BANKS" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Bank
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <TextField
              id="outlined-basic"
              label="Bank Name"
              required={true}
              variant="outlined"
              value={name}
              error={name === ""}
              helperText={name === "" ? "Empty field!" : " "}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Swift Code"
              required={true}
              variant="outlined"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              error={swiftCode === ""}
              helperText={swiftCode === "" ? "Empty field!" : " "}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Bank Number"
              // required={true}
              required
              variant="outlined"
              value={bankNumber}
              error={bankNumber === ""}
              helperText={bankNumber === "" ? "Empty field!" : " "}
              onChange={(e) => setBankNumber(e.target.value)}
              sx={{ mb: "2rem" }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
            disabled={name === "" || bankNumber === "" || swiftCode === ""}
            onClick={() => {
              // editBank(id, name, swiftCode, bankNumber);
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
            // editBank(id, name, swiftCode, bankNumber);
            setName("");
            setSwiftCode("");
            setBankNumber("");
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

export default Banks;

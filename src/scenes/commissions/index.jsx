import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import {
  useAddCommissionsMutation,
  useGetCommissionsQuery,
  useUpdateCommissionsMutation,
} from "state/api";

const Commissions = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetCommissionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateCommission, { data: dataAfterUpdate }] =
    useUpdateCommissionsMutation();
  const [addCommission, { data: dataAfterAdd }] = useAddCommissionsMutation();

  // const [commissionHolder, setCommissionHolder] = useState("");
  // const [commissionType, setCommissionType] = useState("");
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
  // const [commissionValuePercentage, setCommissionValuePercentage] =
  //   useState("");
  // const [commissionValueAmount, setCommissionValueAmount] = useState("");
  // const [rounded, setRounded] = useState("");
  const columns = [
    {
      field: "commissionHolder",
      headerName: "Commission Holder",
      flex: 1,
    },
    {
      field: "commissionType",
      headerName: "Commission Type",
      flex: 1,
      sortable: false,
    },
    {
      field: "from",
      headerName: "From",
      flex: 1,
      sortable: false,
    },
    {
      field: "to",
      headerName: "To",
      flex: 1,
      sortable: false,
    },
    {
      field: "commissionValuePercentage",
      headerName: "Percentage",
      flex: 1,
      sortable: false,
    },
    {
      field: "commissionValueAmount",
      headerName: "Fixed Value",
      flex: 1,
      sortable: false,
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
                setCommissionHolder(params.row.commissionHolder);
                setCommissionType(params.row.commissionType);
                setFrom(params.row.from);
                setTo(params.row.to);
                setCommissionValuePercentage(
                  params.row.commissionValuePercentage
                );
                setCommissionValueAmount(params.row.commissionValueAmount);
                setRounded(params.row.rounded);
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

  const [commissionHolder, setCommissionHolder] = useState("");
  const [commissionType, setCommissionType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [commissionValuePercentage, setCommissionValuePercentage] =
    useState("");
  const [commissionValueAmount, setCommissionValueAmount] = useState("");
  const [rounded, setRounded] = useState("");
  const [id, setId] = useState("");
  const onEditClicked = async () => {
    await updateCommission({
      id,
      commissionHolder,
      commissionType,
      from,
      to,
      commissionValuePercentage,
      commissionValueAmount,
      rounded,
    });
  };

  const onAddClicked = async () => {
    await addCommission({
      commissionHolder,
      commissionType,
      from,
      to,
      commissionValuePercentage,
      commissionValueAmount,
      rounded,
    });
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
            Edit Commission
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl sx={{ mb: "2rem", gridColumn: "span 4" }} fullWidth>
              <InputLabel id="commissionHolder">
                Select Commission Holder
              </InputLabel>
              <Select
                labelId="commissionHolder"
                name="commissionHolder"
                id="commissionHolder"
                value={commissionHolder}
                onChange={(e) => setCommissionHolder(e.target.value)}
              >
                <MenuItem value="bank">البنك</MenuItem>
                <MenuItem value="agent">الوكيل </MenuItem>
                <MenuItem value="ThirdParty"> طرف ثالث </MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mb: "2rem", gridColumn: "span 4" }} fullWidth>
              <InputLabel id="commissionType">
                Select Commission Type
              </InputLabel>
              <Select
                labelId="commissionType"
                name="commissionType"
                id="commissionType"
                value={commissionType}
                onChange={(e) => setCommissionType(e.target.value)}
              >
                <MenuItem value="range">شرائح</MenuItem>
                <MenuItem value="percentage">نسبة مئؤية </MenuItem>
                <MenuItem value="fixed"> مبلغ ثابت </MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="From"
              variant="outlined"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="To"
              variant="outlined"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Percentage"
              variant="outlined"
              value={commissionValuePercentage}
              onChange={(e) => setCommissionValuePercentage(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Fixed Value"
              variant="outlined"
              value={commissionValueAmount}
              onChange={(e) => setCommissionValueAmount(e.target.value)}
              sx={{ mb: "2rem" }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              onEditClicked();
              setOpen(false);
            }}
          >
            Edit
          </Button>
        </Box>
      </Modal>
      <Header title="Commission" subtitle="Entire list of Commission" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Commission
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl sx={{ mb: "2rem", gridColumn: "span 4" }} fullWidth>
              <InputLabel id="commissionHolder">
                Select Commission Holder
              </InputLabel>
              <Select
                labelId="commissionHolder"
                name="commissionHolder"
                id="commissionHolder"
                value={commissionHolder}
                onChange={(e) => setCommissionHolder(e.target.value)}
              >
                <MenuItem value="bank">البنك</MenuItem>
                <MenuItem value="agent">الوكيل </MenuItem>
                <MenuItem value="ThirdParty"> طرف ثالث </MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mb: "2rem", gridColumn: "span 4" }} fullWidth>
              <InputLabel id="commissionType">
                Select Commission Type
              </InputLabel>
              <Select
                labelId="commissionType"
                name="commissionType"
                id="commissionType"
                value={commissionType}
                onChange={(e) => setCommissionType(e.target.value)}
              >
                <MenuItem value="range">شرائح</MenuItem>
                <MenuItem value="percentage">نسبة مئؤية </MenuItem>
                <MenuItem value="fixed"> مبلغ ثابت </MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="From"
              variant="outlined"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="To"
              variant="outlined"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Percentage"
              variant="outlined"
              value={commissionValuePercentage}
              onChange={(e) => setCommissionValuePercentage(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Fixed Value"
              variant="outlined"
              value={commissionValueAmount}
              onChange={(e) => setCommissionValueAmount(e.target.value)}
              sx={{ mb: "2rem" }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
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
            setCommissionHolder("");
            setCommissionType("");
            setFrom("");
            setTo("");
            setCommissionValuePercentage("");
            setCommissionValueAmount("");
            setRounded("");
            setId("");
            handleOpenAdd();
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

export default Commissions;

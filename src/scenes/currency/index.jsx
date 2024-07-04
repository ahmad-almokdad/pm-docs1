import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
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
  useAddCurrencyMutation,
  useGetCurrencyQuery,
  useUpdateCurrencyMutation,
} from "state/api";
import CurrencyData from "../../utils/currency.json";
const Currency = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetCurrencyQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateCurrency, { data: dataAfterUpdate }] =
    useUpdateCurrencyMutation();
  const [addCurrency, { data: dataAfterAdd }] = useAddCurrencyMutation();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "numberCurrency",
      headerName: "Number Currency",
      flex: 1,
    },
    {
      field: "iso",
      headerName: "Iso Code",
      flex: 1,
    },
    {
      field: "operationCode",
      headerName: "Code Banking Currency Code",
      flex: 1,
    },
    {
      field: "daysOff",
      headerName: "Days Off",
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
                setName(params.row.name);
                setIso(params.row.iso);
                setNumberCurrency(params.row.numberCurrency);
                setOperationCode(params.row.operationCode);
                setDaysOff(params.row.daysOff || []);
                setId(params.row._id);
                handleOpen();
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

  const [codeSelected, setCodeSelected] = useState("");

  useEffect(() => {
    const currency = CurrencyData.find(
      (currency) => currency.CUR_NAME_ARABIC === codeSelected
    );
    console.log("ccc", currency);
    setIso(currency?.CUR_CODE);
    setNumberCurrency(currency?.ISO_CUR_CODE);
    // setcurrencyCodeThree(currency?.Code_3_Digit);
  }, [codeSelected]);

  const [name, setName] = useState(null);
  const [iso, setIso] = useState(null);
  const [numberCurrency, setNumberCurrency] = useState(null);
  const [operationCode, setOperationCode] = useState();
  const [daysOff, setDaysOff] = useState([]);
  const [id, setId] = useState(null);
  const onEditClicked = async () => {
    // console.log("when edit", { id, name, iso, numberCurrency, daysOff });
    await updateCurrency({
      id,
      name,
      iso,
      operationCode,
      numberCurrency,
      daysOff,
    });
  };

  const onAddClicked = async () => {
    await addCurrency({ name, iso, operationCode, numberCurrency, daysOff });
  };

  const days = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ];
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
            Suspend Currency
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="nameLabel">Select currency</InputLabel>
              <Select
                labelId="nameLabel"
                id="name"
                value={name}
                disabled={true}
                onChange={(e) => {
                  setName(e.target.value);
                  setCodeSelected(e.target.value);
                }}
                sx={{ mb: 4 }}
              >
                {CurrencyData?.map((operation) => (
                  <MenuItem
                    key={operation.Code}
                    value={operation.CUR_NAME_ARABIC}
                  >
                    {operation.CUR_NAME_ARABIC +
                      " / " +
                      operation.CUR_NAME_ENGLISH}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Iso Code"
              variant="outlined"
              value={iso}
              disabled={true}
              onChange={(e) => setIso(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Number Currency"
              variant="outlined"
              disabled={true}
              value={numberCurrency}
              onChange={(e) => setNumberCurrency(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Code Banking Currency Code"
              variant="outlined"
              value={operationCode}
              onChange={(e) => setOperationCode(e.target.value)}
              sx={{ mb: "2rem" }}
            />

            <Box sx={{ mb: "2rem" }}>
              {days?.map((day) => (
                <FormControlLabel
                  key={day.value}
                  control={
                    <Checkbox
                      name="daysOff"
                      value={day.value}
                      checked={daysOff?.includes(day.value)}
                      onChange={(e) => {
                        const value = day.value;
                        const isChecked = e.target.checked;
                        setDaysOff(
                          isChecked
                            ? [...daysOff, value]
                            : daysOff.filter((d) => d !== value)
                        );
                      }}
                      color="primary"
                    />
                  }
                  label={day.label}
                  sx={{ gridColumn: "span 2" }}
                />
              ))}
            </Box>
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
            Suspend
          </Button>
        </Box>
      </Modal>
      <Header title="Currency" subtitle="Entire list of Currency" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Currency
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="nameLabel">Select currency</InputLabel>
              <Select
                labelId="nameLabel"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setCodeSelected(e.target.value);
                }}
                sx={{ mb: 4 }}
              >
                {CurrencyData?.map((operation) => (
                  <MenuItem
                    key={operation.Code}
                    value={operation.CUR_NAME_ARABIC}
                  >
                    {operation.CUR_NAME_ARABIC +
                      " / " +
                      operation.CUR_NAME_ENGLISH}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Iso Code"
              variant="outlined"
              value={iso}
              disabled={true}
              onChange={(e) => setIso(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Number Currency"
              variant="outlined"
              value={numberCurrency}
              disabled={true}
              onChange={(e) => setNumberCurrency(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Code Banking Currency Code"
              variant="outlined"
              value={operationCode}
              onChange={(e) => setOperationCode(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <Box sx={{ mb: "2rem" }}>
              {days?.map((day) => (
                <FormControlLabel
                  key={day.value}
                  control={
                    <Checkbox
                      name="daysOff"
                      value={day.value}
                      checked={daysOff?.includes(day.value)}
                      onChange={(e) => {
                        const value = day.value;
                        const isChecked = e.target.checked;
                        setDaysOff(
                          isChecked
                            ? [...daysOff, value]
                            : daysOff.filter((d) => d !== value)
                        );
                      }}
                      color="primary"
                    />
                  }
                  label={day.label}
                  sx={{ gridColumn: "span 2" }}
                />
              ))}
            </Box>
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
            setName("");
            setIso("");
            setNumberCurrency("");
            setDaysOff([]);
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

export default Currency;

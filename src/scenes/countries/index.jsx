import React, { useEffect, useState } from "react";
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
  useAddCountriesMutation,
  useGetCountriesQuery,
  useUpdateCountriesMutation,
} from "state/api";

import CountriesData from "../../utils/countries.json";
// console.log("eee", CountriesData[0]['Code_2_Digit']);

const Countries = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetCountriesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateCountry, { data: dataAfterUpdate }] =
    useUpdateCountriesMutation();
  const [addCountry, { data: dataAfterAdd }] = useAddCountriesMutation();

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
      field: "iso",
      headerName: "Iso Code",
      flex: 1,
    },
    {
      field: "countryCodeTwo",
      headerName: "Country Two Char",
      flex: 1,
      sortable: false,
    },
    {
      field: "countryCodeThree",
      headerName: "Country Three Char",
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
                setCountryCodeTwo(params.row.countryCodeTwo);
                setCountryCodeThree(params.row.countryCodeThree);
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
    const country = CountriesData.find(
      (country) => country.Country_Name_Arabic === codeSelected
    );
    console.log("ccc", country);
    setIso(country?.Code);
    setCountryCodeTwo(country?.Code_2_Digit);
    setCountryCodeThree(country?.Code_3_Digit);
  }, [codeSelected]);

  const [name, setName] = useState(null);
  const [iso, setIso] = useState(null);
  const [countryCodeTwo, setCountryCodeTwo] = useState(null);
  const [countryCodeThree, setCountryCodeThree] = useState(null);
  const [id, setId] = useState(null);
  const onEditClicked = async () => {
    await updateCountry({ id, name, iso, countryCodeTwo, countryCodeThree });
  };

  const onAddClicked = async () => {
    await addCountry({ name, iso, countryCodeTwo, countryCodeThree });
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
            Suspend Country
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="nameLabel">Select Country Name</InputLabel>
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
                {CountriesData?.map((operation) => (
                  <MenuItem
                    key={operation.Code}
                    value={operation.Country_Name_Arabic}
                  >
                    {operation.Country_Name_Arabic +
                      " / " +
                      operation.Country_Name_English}
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
              label="Code Two Char"
              variant="outlined"
              disabled={true}
              value={countryCodeTwo}
              onChange={(e) => setCountryCodeTwo(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Code Three Char"
              variant="outlined"
              disabled={true}
              value={countryCodeThree}
              onChange={(e) => setCountryCodeThree(e.target.value)}
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
            Suspend
          </Button>
        </Box>
      </Modal>
      <Header title="Countries" subtitle="Entire list of Country" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Country
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="nameLabel">Select Country Name</InputLabel>
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
                {CountriesData?.map((operation) => (
                  <MenuItem
                    key={operation.Code}
                    value={operation.Country_Name_Arabic}
                  >
                    {operation.Country_Name_Arabic +
                      " / " +
                      operation.Country_Name_English}
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
              label="Code Two Char"
              variant="outlined"
              disabled={true}
              value={countryCodeTwo}
              onChange={(e) => setCountryCodeTwo(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Code Three Char"
              variant="outlined"
              disabled={true}
              value={countryCodeThree}
              onChange={(e) => setCountryCodeThree(e.target.value)}
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
            setName("");
            setIso("");
            setCountryCodeTwo("");
            setCountryCodeThree("");
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

export default Countries;

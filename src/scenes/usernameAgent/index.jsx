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
  useAddUsernameAgentMutation,
  useGetUsernameAgentQuery,
  useUpdateUsernameAgentMutation,
  useGetAgentsQuery,
} from "state/api";

const UsernameAgent = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetUsernameAgentQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const { data: dataAgent, isLoading: isdataAgentLoading } = useGetAgentsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateUsernameAgent, { data: dataAfterUpdate }] =
    useUpdateUsernameAgentMutation();
  const [addUsernameAgent, { data: dataAfterAdd }] =
    useAddUsernameAgentMutation();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
    },
    {
      field: "agent",
      headerName: "Agent Id",
      flex: 1,
      // sortable: false,
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
                setUsername(params.row.username);
                setPassword(params.row.password);
                setAgent(params.row.agent);
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
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agent, setAgent] = useState("");
  const [id, setId] = useState("");
  const onEditClicked = async () => {
    await updateUsernameAgent({ id, username, password, agent });
  };

  const onAddClicked = async () => {
    await addUsernameAgent({ username, password, agent });
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
            Edit Username Agent
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel id="agentTypeLabel">Select Agent Type</InputLabel>
              <Select
                labelId="agentLabel"
                id="agent"
                value={agent}
                error={agent === ""}
                helperText={agent === "" ? "Empty field!" : " "}
                onChange={(e) => setAgent(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isdataAgentLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgent?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
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
      <Header title="Username Agent" subtitle="Entire list" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Username Agent
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel id="agentTypeLabel">Select Agent Type</InputLabel>
              <Select
                labelId="agentLabel"
                id="agent"
                value={agent}
                error={agent === ""}
                helperText={agent === "" ? "Empty field!" : " "}
                onChange={(e) => setAgent(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isdataAgentLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgent?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
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
            setUsername("");
            setPassword("");
            setAgent("");
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

export default UsernameAgent;

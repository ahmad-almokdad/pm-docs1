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
  useAddAssignClientMutation,
  useGetAssignClientQuery,
  useUpdateAssignClientMutation,
  useGetAgentsQuery,
  useGetAgentClientsQuery,
} from "state/api";

const AssignClientToAgent = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAssignClientQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateAssignClient, { data: dataAfterUpdate }] =
    useUpdateAssignClientMutation();
  const [addAssignClient, { data: dataAfterAdd }] =
    useAddAssignClientMutation();

  const { data: dataAgent, isLoading: isDataAgentLoading } = useGetAgentsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const { data: dataAgentClient, isLoading: isDataAgentClientLoading } =
    useGetAgentClientsQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });

  const columns = [
    {
      field: "agent",
      headerName: "Agent",
      flex: 1,
      renderCell: (params) => {
        console.log("params", params.row);
        return <p>{params.row.agent.nameAr}</p>;
      },
    },
    {
      field: "client",
      headerName: "Client",
      flex: 1,
      renderCell: (params) => {
        console.log("params", params.row);
        return <p>{params.row.client.nameAr}</p>;
      },
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
              color="error"
              onClick={() => {
                setAgent(params.row.agent._id);
                setClient(params.row.client._id);
                setId(params.row._id);
                handleOpen();
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="warning"
              sx={{ ml: 2 }}
              onClick={() => {
                setAgent(params.row.agent._id);
                setClient(params.row.client._id);
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

  const [agent, setAgent] = useState("");
  const [client, setClient] = useState("");
  const [id, setId] = useState(null);
  const onEditClicked = async () => {
    await updateAssignClient({
      id,
      agent,
      client,
    });
  };
  const onSuspendClicked = async () => {
    // console.log("dd", { id, name, swiftCode, bankNumber });
    await updateAssignClient({ id, suspend: true });
  };

  const onAddClicked = async () => {
    await addAssignClient({ agent, client });
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
            Suspend Assignment
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="bankLabel">Select Agent </InputLabel>
              <Select
                labelId="agentLabel"
                id="agent"
                disabled={true}
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataAgentLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgent?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr + "/" + operation.nameEn}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="clientLabel">Select Client </InputLabel>
              <Select
                labelId="clientLabel"
                id="client"
                disabled={true}
                value={client}
                onChange={(e) => setClient(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataAgentClientLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgentClient?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr + "/" + operation.nameEn}
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
            Delete Assignment
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="bankLabel">Select Agent </InputLabel>
              <Select
                labelId="agentLabel"
                id="agent"
                disabled={true}
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataAgentLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgent?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr + "/" + operation.nameEn}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="clientLabel">Select Client </InputLabel>
              <Select
                labelId="clientLabel"
                id="client"
                disabled={true}
                value={client}
                onChange={(e) => setClient(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataAgentClientLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgentClient?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr + "/" + operation.nameEn}
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
              onEditClicked();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
      <Header title="Assignment" subtitle="Entire list of Assignments" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Assignment
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="bankLabel">Select Agent </InputLabel>
              <Select
                labelId="agentLabel"
                id="agent"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataAgentLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgent?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr + "/" + operation.nameEn}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="clientLabel">Select Client </InputLabel>
              <Select
                labelId="clientLabel"
                id="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataAgentClientLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgentClient?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameAr + "/" + operation.nameEn}
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
            setAgent("");
            setClient("");
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

export default AssignClientToAgent;

import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
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
  useAddSubOperationMutation,
  useGetAgentAccountTypesQuery,
  useGetMainOperationQuery,
  useGetSubOperationQuery,
  useUpdateSubOperationMutation,
} from "state/api";

const SubOperation = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetSubOperationQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const { data: dataAgentAccountTypes, isLoading: isAgentAccountTypesLoading } =
    useGetAgentAccountTypesQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });
  const { data: dataMainOperation, isLoading: isMainOperationLoading } =
    useGetMainOperationQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });

  const [updateCountry, { data: dataAfterUpdate }] =
    useUpdateSubOperationMutation();
  const [addCountry, { data: dataAfterAdd }] = useAddSubOperationMutation();

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
      field: "clientType",
      headerName: "Client Type",
      flex: 1,
      sortable: false,
    },
    {
      field: "operationCode",
      headerName: "Operation Code",
      flex: 1,
      sortable: false,
    },
    // {
    //   field: "businessAccounting",
    //   headerName: "Business Accounting",
    //   flex: 1,
    //   sortable: false,
    // },

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
                setPaymentType(params.row.paymentType);
                setMainOperation(params.row.mainOperation);
                setClientType(params.row.clientType || []);
                setOperationCode(params.row.operationCode);
                setBusinessAccounting(params.row.businessAccounting);
                setSendOtp(params.row.sendOtp);
                setCommunicationType(params.row.communicationType);
                setShowAccount(params.row.showAccount);
                setVerifyAccount(params.row.verifyAccount);
                setVerifyStatusAccount(params.row.verifyStatusAccount);
                setVerifyOperationIsCorrect(
                  params.row.verifyOperationIsCorrect
                );
                setVerifyNameIsNotInBlackList(
                  params.row.verifyNameIsNotInBlackList
                );
                setAccounts(params.row.accountingEntries);
                setRows(params.row.accountingEntries);
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

  const [name, setName] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [mainOperation, setMainOperation] = useState("");
  const [clientType, setClientType] = useState([]);
  const [operationCode, setOperationCode] = useState("");
  const [businessAccounting, setBusinessAccounting] = useState("");
  const [sendOtp, setSendOtp] = useState("");
  const [communicationType, setCommunicationType] = useState([]);
  const [showAccount, setShowAccount] = useState("");
  const [verifyAccount, setVerifyAccount] = useState("");
  const [verifyStatusAccount, setVerifyStatusAccount] = useState("");
  const [verifyOperationIsCorrect, setVerifyOperationIsCorrect] = useState("");
  const [verifyNameIsNotInBlackList, setVerifyNameIsNotInBlackList] =
    useState("");
  const [id, setId] = useState("");

  const onEditClicked = async () => {
    await updateCountry({
      id,
      name,
      paymentType,
      mainOperation,
      clientType,
      operationCode,
      businessAccounting,
      sendOtp,
      communicationType,
      showAccount,
      verifyAccount,
      verifyStatusAccount,
      verifyOperationIsCorrect,
      verifyNameIsNotInBlackList,
      accountingEntries: accounts,
    });
  };

  const onAddClicked = async () => {
    await addCountry({
      name,
      paymentType,
      mainOperation,
      clientType,
      operationCode,
      businessAccounting,
      sendOtp,
      communicationType,
      showAccount,
      verifyAccount,
      verifyStatusAccount,
      verifyOperationIsCorrect,
      verifyNameIsNotInBlackList,
      accountingEntries: accounts,
    });
  };

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleTypeChange = (e) => {
    const selectedValues = Array.from(e.target.value);
    setClientType(selectedValues);
  };

  const [accounts, setAccounts] = useState([
    // Initialize with an empty account row
    {
      debtor: "",
      debtorSource: "",
      creditor: "",
      creditorSource: "",
      commission: "",
      typeCommission: "",
    },
  ]);

  const [rows, setRows] = useState([{}]);
  const handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    console.log("tttt", { name, value });
    const updatedRows = [...rows];
    updatedRows[idx] = {
      ...updatedRows[idx],
      [name]: value,
    };
    setRows(updatedRows);

    // Assuming that `accounts` is an array of objects and you want to update the corresponding object
    const updatedAccounts = [...accounts];
    updatedAccounts[idx] = {
      ...updatedAccounts[idx],
      [name]: value,
    };
    setAccounts(updatedAccounts);
  };

  const handleAddRow = () => {
    const newItem = {
      debtor: "",
      debtorSource: "",
      creditor: "",
      creditorSource: "",
      commission: "",
      typeCommission: "",
    };
    setRows([...rows, newItem]);
    // setAccounts([...rows, newItem]);
    setAccounts([...accounts, newItem]);
  };
  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };

  const handleRemoveSpecificRow = (idx) => () => {
    const updatedRows = [...rows];
    updatedRows.splice(idx, 1);
    setRows(updatedRows);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit SubOperation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="mainOperationLabel">
                Select Main Operation
              </InputLabel>
              <Select
                labelId="mainOperationLabel"
                id="mainOperation"
                value={mainOperation}
                error={mainOperation === ""}
                helperText={mainOperation === "" ? "Empty field!" : " "}
                onChange={(e) => setMainOperation(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isMainOperationLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataMainOperation?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="SubOperation Name"
              variant="outlined"
              value={name}
              error={name === ""}
              helperText={name === "" ? "Empty field!" : " "}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <FormControl fullWidth>
              <InputLabel id="paymentTypeLabel">Select Payment Type</InputLabel>
              <Select
                labelId="paymentTypeLabel"
                id="paymentType"
                value={paymentType}
                error={paymentType === ""}
                helperText={paymentType === "" ? "Empty field!" : " "}
                onChange={(e) => setPaymentType(e.target.value)}
                sx={{ mb: 4 }}
              >
                <MenuItem value="out">Out</MenuItem>
                <MenuItem value="in">In</MenuItem>
                <MenuItem value="account-to-account">Account to Account</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Operation Code"
              variant="outlined"
              value={operationCode}
              error={operationCode === ""}
              helperText={operationCode === "" ? "Empty field!" : " "}
              onChange={(e) => setOperationCode(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <FormControl fullWidth>
              <InputLabel id="clientTypesLabel">
                Select Customer Types
              </InputLabel>
              <Select
                labelId="clientTypesLabel"
                id="clientTypes"
                multiple
                value={clientType}
                error={clientType.length === 0}
                helperText={clientType.length === 0 ? "Empty field!" : " "}
                onChange={handleTypeChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {isAgentAccountTypesLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgentAccountTypes?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation.agentType}>
                      {operation.agentType}
                    </MenuItem>
                  ))
                )}

                {/* Add more options as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel id="communicationTypeLabel">
                Select Communication Type
              </InputLabel>
              <Select
                labelId="communicationTypeLabel"
                id="communicationType"
                value={communicationType}
                error={communicationType === ""}
                helperText={communicationType === "" ? "Empty field!" : " "}
                onChange={(e) => setCommunicationType(e.target.value)}
              >
                <MenuItem value="api">واجهة</MenuItem>
                <MenuItem value="interface">من خلال api</MenuItem>

                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <Box sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <div className="container">
                <table
                  className="table table-bordered table-hover"
                  id="tab_logic"
                >
                  <thead>
                    <tr>
                      <th className="text-center"> # </th>
                      <th className="text-center"> debtor </th>
                      <th className="text-center"> Debtor Source </th>
                      <th className="text-center"> creditor </th>
                      <th className="text-center"> Creditor Source </th>
                      <th className="text-center"> commission </th>
                      <th className="text-center"> Type Commission </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="debtor">Select Debtor</InputLabel>
                            <Select
                              labelId="debtor"
                              id="debtor"
                              name="debtor"
                              value={item.debtor}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="main">الحساب الرئيسي</MenuItem>
                              <MenuItem value="sub">الحساب الفرعي </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب وسيط{" "}
                              </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب الزبون{" "}
                              </MenuItem>
                              <MenuItem value="agent">
                                {" "}
                                حساب عمولات الوكيل{" "}
                              </MenuItem>
                              <MenuItem value="bank">
                                {" "}
                                حساب عمولات البنك{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="debtorSource">
                              Select Source
                            </InputLabel>
                            <Select
                              labelId="debtorSource"
                              id="debtorSource"
                              name="debtorSource"
                              value={item.debtorSource}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="agent"> الوكيل </MenuItem>
                              <MenuItem value="client"> الزبون </MenuItem>
                              <MenuItem value="bank"> البنك </MenuItem>
                              <MenuItem value="agentClient">
                                {" "}
                                زبون الوكيل{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="creditor">
                              Select creditor
                            </InputLabel>
                            <Select
                              labelId="creditor"
                              id="creditor"
                              name="creditor"
                              value={item.creditor}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="main">الحساب الرئيسي</MenuItem>
                              <MenuItem value="sub">الحساب الفرعي </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب وسيط{" "}
                              </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب الزبون{" "}
                              </MenuItem>
                              <MenuItem value="agent">
                                {" "}
                                حساب عمولات الوكيل{" "}
                              </MenuItem>
                              <MenuItem value="bank">
                                {" "}
                                حساب عمولات البنك{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="creditorSource">
                              Select Source
                            </InputLabel>
                            <Select
                              labelId="creditorSource"
                              id="creditorSource"
                              name="creditorSource"
                              value={item.creditorSource}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="agent"> الوكيل </MenuItem>
                              <MenuItem value="client"> الزبون </MenuItem>
                              <MenuItem value="bank"> البنك </MenuItem>
                              <MenuItem value="agentClient">
                                {" "}
                                زبون الوكيل{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="commission">
                              Select Commission
                            </InputLabel>
                            <Select
                              labelId="commission"
                              id="commission"
                              name="commission"
                              value={item.commission}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="yes"> YES </MenuItem>
                              <MenuItem value="no"> NO </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl fullWidth sx={{ mb: "2rem", mt: 4 }}>
                            <InputLabel id="typeCommission">
                              Select Commission Type
                            </InputLabel>
                            <Select
                              labelId="typeCommission"
                              id="typeCommission"
                              name="typeCommission"
                              value={item.typeCommission}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="bank"> البنك </MenuItem>
                              <MenuItem value="agent"> الوكيل </MenuItem>
                              <MenuItem value="third"> طرف ثالث </MenuItem>
                            </Select>
                          </FormControl>
                        </td>

                        <td>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleRemoveSpecificRow(idx)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRow}
                  sx={{ marginRight: 1 }}
                >
                  Add Row
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveRow}
                >
                  Delete Last Row
                </Button>
              </div>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              justifyContent="space-evenly"
              flexWrap="wrap"
            >
              {returnRadio("sendOtp", "Send OTP", sendOtp, setSendOtp)}
              {returnRadio(
                "showAccount",
                "Account Can be Overdrawn",
                showAccount,
                setShowAccount
              )}
              {returnRadio(
                "verifyAccount",
                "Verify Account",
                verifyAccount,
                setVerifyAccount
              )}
              {returnRadio(
                "verifyStatusAccount",
                "Verify Account Status",
                verifyStatusAccount,
                setVerifyStatusAccount
              )}
              {returnRadio(
                "verifyOperationIsCorrect",
                "Verify Operation Is Correct",
                verifyOperationIsCorrect,
                setVerifyOperationIsCorrect
              )}
              {returnRadio(
                "verifyNameIsNotInBlackList",
                "Verify Name Is Not In BlackList",
                verifyNameIsNotInBlackList,
                setVerifyNameIsNotInBlackList
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
            disabled={
              mainOperation === "" ||
              name === "" ||
              operationCode === "" ||
              // businessAccounting === "" ||
              // clientType.length === 0 ||
              communicationType === "" ||
              sendOtp === "" ||
              showAccount === "" ||
              verifyAccount === "" ||
              verifyStatusAccount === "" ||
              verifyOperationIsCorrect === "" ||
              verifyNameIsNotInBlackList === ""
            }
            onClick={() => {
              onEditClicked();
              setOpen(false);
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>
      <Header title="SubOperation" subtitle="Entire list of SubOperation" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          overflow: "scroll",
          "& .MuiFormLabel-colorPrimary": { color: "black" },
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add SubOperation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="mainOperationLabel">
                Select Main Operation
              </InputLabel>
              <Select
                labelId="mainOperationLabel"
                id="mainOperation"
                value={mainOperation}
                error={mainOperation === ""}
                helperText={mainOperation === "" ? "Empty field!" : " "}
                onChange={(e) => setMainOperation(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isMainOperationLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataMainOperation?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="SubOperation Name"
              variant="outlined"
              value={name}
              error={name === ""}
              helperText={name === "" ? "Empty field!" : " "}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            <FormControl fullWidth>
              <InputLabel id="paymentTypeLabel">Select Payment Type</InputLabel>
              <Select
                labelId="paymentTypeLabel"
                id="paymentType"
                value={paymentType}
                error={paymentType === ""}
                helperText={paymentType === "" ? "Empty field!" : " "}
                onChange={(e) => setPaymentType(e.target.value)}
                sx={{ mb: 4 }}
              >
                <MenuItem value="out">Out</MenuItem>
                <MenuItem value="in">In</MenuItem>
                <MenuItem value="account-to-account">Account to Account</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Operation Code"
              variant="outlined"
              value={operationCode}
              error={operationCode === ""}
              helperText={operationCode === "" ? "Empty field!" : " "}
              onChange={(e) => setOperationCode(e.target.value)}
              sx={{ mb: "2rem" }}
            />
            {/* <TextField
              id="outlined-basic"
              label="Business Accounting"
              variant="outlined"
              value={businessAccounting}
              error={businessAccounting === ""}
              helperText={businessAccounting === "" ? "Empty field!" : " "}
              onChange={(e) => setBusinessAccounting(e.target.value)}
              sx={{ mb: "2rem" }}
            /> */}
            <FormControl fullWidth>
              <InputLabel id="clientTypesLabel">
                Select Customer Types
              </InputLabel>
              <Select
                labelId="clientTypesLabel"
                id="clientTypes"
                multiple
                value={clientType}
                error={clientType.length === 0}
                helperText={clientType.length === 0 ? "Empty field!" : " "}
                onChange={handleTypeChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {isAgentAccountTypesLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgentAccountTypes?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation.agentType}>
                      {operation.agentType}
                    </MenuItem>
                  ))
                )}

                {/* Add more options as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 4, mb: 4 }}>
              <InputLabel id="communicationTypeLabel">
                Select Communication Type
              </InputLabel>
              <Select
                labelId="communicationTypeLabel"
                id="communicationType"
                value={communicationType}
                error={communicationType === ""}
                helperText={communicationType === "" ? "Empty field!" : " "}
                onChange={(e) => setCommunicationType(e.target.value)}
              >
                <MenuItem value="api">واجهة</MenuItem>
                <MenuItem value="interface">من خلال api</MenuItem>

                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <Box sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <div className="container">
                <table
                  className="table table-bordered table-hover"
                  id="tab_logic"
                >
                  <thead>
                    <tr>
                      <th className="text-center"> # </th>
                      <th className="text-center"> debtor </th>
                      <th className="text-center"> Debtor Source </th>
                      <th className="text-center"> creditor </th>
                      <th className="text-center"> Creditor Source </th>
                      <th className="text-center"> commission </th>
                      <th className="text-center"> Type Commission </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          {/* <TextField
                            type="text"
                            name="Name Account"
                            value={item.name}
                            onChange={handleChange(idx)}
                            className="form-control"
                          /> */}
                          {/* debtor: "",
      debtorSource: "",
      creditor: "",
      creditorSource: "",
      commission: "",
      typeCommission: "", */}
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="debtor">Select Debtor</InputLabel>
                            <Select
                              labelId="debtor"
                              id="debtor"
                              name="debtor"
                              value={item.debtor}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="main">الحساب الرئيسي</MenuItem>
                              <MenuItem value="sub">الحساب الفرعي </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب وسيط{" "}
                              </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب الزبون{" "}
                              </MenuItem>
                              <MenuItem value="agent">
                                {" "}
                                حساب عمولات الوكيل{" "}
                              </MenuItem>
                              <MenuItem value="bank">
                                {" "}
                                حساب عمولات البنك{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="debtorSource">
                              Select Source
                            </InputLabel>
                            <Select
                              labelId="debtorSource"
                              id="debtorSource"
                              name="debtorSource"
                              value={item.debtorSource}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="agent"> الوكيل </MenuItem>
                              <MenuItem value="client"> الزبون </MenuItem>
                              <MenuItem value="bank"> البنك </MenuItem>
                              <MenuItem value="agentClient">
                                {" "}
                                زبون الوكيل{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="creditor">
                              Select creditor
                            </InputLabel>
                            <Select
                              labelId="creditor"
                              id="creditor"
                              name="creditor"
                              value={item.creditor}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="main">الحساب الرئيسي</MenuItem>
                              <MenuItem value="sub">الحساب الفرعي </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب وسيط{" "}
                              </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب الزبون{" "}
                              </MenuItem>
                              <MenuItem value="agent">
                                {" "}
                                حساب عمولات الوكيل{" "}
                              </MenuItem>
                              <MenuItem value="bank">
                                {" "}
                                حساب عمولات البنك{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="creditorSource">
                              Select Source
                            </InputLabel>
                            <Select
                              labelId="creditorSource"
                              id="creditorSource"
                              name="creditorSource"
                              value={item.creditorSource}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="agent"> الوكيل </MenuItem>
                              <MenuItem value="client"> الزبون </MenuItem>
                              <MenuItem value="bank"> البنك </MenuItem>
                              <MenuItem value="agentClient">
                                {" "}
                                زبون الوكيل{" "}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            fullWidth
                            sx={{
                              mb: "2rem",
                              mt: 4,
                              mr: ".5rem",
                              maxWidth: "6rem",
                            }}
                          >
                            <InputLabel id="commission">
                              Select Commission
                            </InputLabel>
                            <Select
                              labelId="commission"
                              id="commission"
                              name="commission"
                              value={item.commission}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="yes"> YES </MenuItem>
                              <MenuItem value="no"> NO </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl fullWidth sx={{ mb: "2rem", mt: 4 }}>
                            <InputLabel id="typeCommission">
                              Select Commission Type
                            </InputLabel>
                            <Select
                              labelId="typeCommission"
                              id="typeCommission"
                              name="typeCommission"
                              value={item.typeCommission}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="bank"> البنك </MenuItem>
                              <MenuItem value="agent"> الوكيل </MenuItem>
                              <MenuItem value="third"> طرف ثالث </MenuItem>
                            </Select>
                          </FormControl>
                        </td>

                        <td>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleRemoveSpecificRow(idx)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRow}
                  sx={{ marginRight: 1 }}
                >
                  Add Row
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveRow}
                >
                  Delete Last Row
                </Button>
              </div>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              justifyContent="space-evenly"
              flexWrap="wrap"
            >
              {returnRadio("sendOtp", "Send OTP", sendOtp, setSendOtp)}
              {returnRadio(
                "showAccount",
                "Account Can be Overdrawn",
                showAccount,
                setShowAccount
              )}
              {returnRadio(
                "verifyAccount",
                "Verify Account",
                verifyAccount,
                setVerifyAccount
              )}
              {returnRadio(
                "verifyStatusAccount",
                "Verify Account Status",
                verifyStatusAccount,
                setVerifyStatusAccount
              )}
              {returnRadio(
                "verifyOperationIsCorrect",
                "Verify Operation Is Correct",
                verifyOperationIsCorrect,
                setVerifyOperationIsCorrect
              )}
              {returnRadio(
                "verifyNameIsNotInBlackList",
                "Verify Name Is Not In BlackList",
                verifyNameIsNotInBlackList,
                setVerifyNameIsNotInBlackList
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
            disabled={
              mainOperation === "" ||
              name === "" ||
              operationCode === "" ||
              // businessAccounting === "" ||
              clientType.length === 0 ||
              communicationType === "" ||
              sendOtp === "" ||
              showAccount === "" ||
              verifyAccount === "" ||
              verifyStatusAccount === "" ||
              verifyOperationIsCorrect === "" ||
              verifyNameIsNotInBlackList === ""
            }
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
            setMainOperation("");
            setClientType([]);
            setOperationCode("");
            setBusinessAccounting("");
            setSendOtp("");
            setCommunicationType("");
            setShowAccount("");
            setVerifyAccount("");
            setVerifyStatusAccount("");
            setVerifyOperationIsCorrect("");
            setVerifyNameIsNotInBlackList("");
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

export default SubOperation;

const returnRadio = (name, fullName, value, setState) => {
  return (
    <FormControl
      component="fieldset"
      sx={{
        mt: 2,
        gridColumn: "1 span",
        "& .MuiFormControl-root": { color: "black" },

        "& .Mui-focused": { color: "black !important" },
        "& .MuiFormLabel-colorPrimary": { color: "black" },
      }}
    >
      <FormLabel
        component="legend"
        sx={{
          color: "black",
          "& .Mui-focused": { color: "black !important" },
          "& .MuiFormLabel-colorPrimary": { color: "black" },
        }}
      >
        {fullName}
      </FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={(e) => setState(e.target.value === "true")}
      >
        <FormControlLabel value={true} control={<Radio />} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
};

import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
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
  useAddAgentsMutation,
  useGetAgentTypesQuery,
  useGetAgentsQuery,
  useUpdateAgentsMutation,
} from "state/api";
import { ImportExport } from "@mui/icons-material";

const Agents = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAgentsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [updateAgent, { data: dataAfterUpdate }] = useUpdateAgentsMutation();
  const [addAgent, { data: dataAfterAdd }] = useAddAgentsMutation();

  const { data: dataAgentType, isLoading: isAgentTypeLoading } =
    useGetAgentTypesQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });

  const columns = [
    {
      field: "agentId",
      headerName: "Agent UUID",
      flex: 1,
    },
    {
      field: "nameAr",
      headerName: "Name Ar",
      flex: 1,
    },

    {
      field: "nameEn",
      headerName: "Name En",
      flex: 1,
      sortable: false,
    },
    {
      field: "cifNum",
      headerName: "CIF",
      flex: 1,
      sortable: false,
    },
    {
      field: "agentStatus",
      headerName: "Agent Status",
      flex: 1,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
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
                setAgentId(params.row.agentId);
                setAgentType(params.row.agentType);
                setNameAr(params.row.nameAr);
                setNameEn(params.row.nameEn);
                setCifNum(params.row.cifNum);
                setAddressAr(params.row.addressAr);
                setAddressEn(params.row.addressEn);
                setPhone(params.row.phone);
                setAgentIp(params.row.agentIp);
                setAgentStatus(params.row.agentStatus);
                setSwiftCode(params.row.swiftCode);
                setMaxSyTranslate(params.row.maxSyTranslate);
                setMaxDoTranslate(params.row.maxDoTranslate);
                setMaxEuTranslate(params.row.maxEuTranslate);
                setAccounts(params.row.accounts);
                setRows(params.row.accounts);

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

  const [agentId, setAgentId] = useState("");
  const [agentType, setAgentType] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [cifNum, setCifNum] = useState("");
  const [addressAr, setAddressAr] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [phone, setPhone] = useState("");
  const [agentIp, setAgentIp] = useState("");
  const [agentStatus, setAgentStatus] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [maxSyTranslate, setMaxSyTranslate] = useState("");
  const [maxDoTranslate, setMaxDoTranslate] = useState("");
  const [maxEuTranslate, setMaxEuTranslate] = useState("");
  const [id, setId] = useState("");

  const onEditClicked = async () => {
    await updateAgent({
      id,
      agentId,
      agentType,
      nameAr,
      nameEn,
      cifNum,
      addressAr,
      addressEn,
      phone,
      agentIp,
      agentStatus,
      swiftCode,
      maxSyTranslate,
      maxDoTranslate,
      maxEuTranslate,
      accounts,
    });
  };

  const onAddClicked = async () => {
    await addAgent({
      agentId,
      agentType,
      nameAr,
      nameEn,
      cifNum,
      addressAr,
      addressEn,
      phone,
      agentIp,
      agentStatus,
      swiftCode,
      maxSyTranslate,
      maxDoTranslate,
      maxEuTranslate,
      accounts,
    });
  };

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [accounts, setAccounts] = useState([
    // Initialize with an empty account row
    {
      nameAccount: "",
      department: "",
      accountCode: "",
      fileNumber: "",
      currency: "",
      sequenceNumber: "",
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
      nameAccount: "",
      department: "",
      accountCode: "",
      fileNumber: "",
      currency: "",
      sequenceNumber: "",
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
            Edit Agent
          </Typography>
          <Box
            display="grid"
            //flexDirection="column"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="10px"
            columnGap="1.33%"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            {returnTextField("Agent UUID", agentId, setAgentId)}

            {returnTextField("Name Ar", nameAr, setNameAr)}

            {returnTextField("Name En", nameEn, setNameEn)}

            {returnTextField("CIF Number", cifNum, setCifNum)}

            {returnTextField("Address Ar", addressAr, setAddressAr)}

            {returnTextField("Address En", addressEn, setAddressEn)}

            {returnTextField("phone", phone, setPhone)}

            {returnTextField("agentIp", agentIp, setAgentIp)}

            <FormControl sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <InputLabel id="agentStatus">Select Agent Status</InputLabel>
              <Select
                labelId="Agent Status"
                name="agentStatus"
                id="agentStatus"
                value={agentStatus}
                onChange={(e) => setAgentStatus(e.target.value)}
              >
                <MenuItem value="active">مفعل</MenuItem>
                <MenuItem value="suspend">مجمد </MenuItem>
                <MenuItem value="inactive"> غير فعال </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel id="agentTypeLabel">Select Agent Type</InputLabel>
              <Select
                labelId="agentTypeLabel"
                id="agentType"
                value={agentType}
                error={agentType === ""}
                helperText={agentType === "" ? "Empty field!" : " "}
                onChange={(e) => setAgentType(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isAgentTypeLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgentType?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            {returnTextField("Swift Code", swiftCode, setSwiftCode)}
            {returnTextField("Max SYP", maxSyTranslate, setMaxSyTranslate)}
            {returnTextField("Max $", maxDoTranslate, setMaxDoTranslate)}
            {returnTextField("Max €  ", maxEuTranslate, setMaxEuTranslate)}

            <Box sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <div className="container">
                <table
                  className="table table-bordered table-hover"
                  id="tab_logic"
                >
                  <thead>
                    <tr>
                      <th className="text-center"> # </th>
                      <th className="text-center"> nameAccount </th>
                      <th className="text-center"> Branch </th>
                      <th className="text-center"> fileNumber </th>
                      <th className="text-center"> currency </th>
                      <th className="text-center"> accountCode </th>
                      <th className="text-center"> sequenceNumber </th>

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
                          <FormControl fullWidth sx={{ mb: "2rem", mt: 4 }}>
                            <InputLabel id="nameAccount">
                              Select Name Account
                            </InputLabel>
                            <Select
                              labelId="nameAccount"
                              id="nameAccount"
                              name="nameAccount"
                              value={item.nameAccount}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="main">الحساب الرئيسي</MenuItem>
                              <MenuItem value="sub">الحساب الفرعي </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب وسيط{" "}
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
                          <TextField
                            type="text"
                            name="department"
                            value={item.department}
                            onChange={handleChange(idx)}
                            onBlur={() => {
                              if (item.department?.length < 4) {
                                const remain = 4 - item.department.length;
                                console.log("re", remain);
                                for (let i = 0; i < remain; i++) {
                                  item.department = "0" + item.department;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  department: item.department,
                                };
                                setRows(updatedRows);
                              }
                            }}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="fileNumber"
                            value={item.fileNumber}
                            onChange={handleChange(idx)}
                            className="form-control"
                            onBlur={() => {
                              if (item.fileNumber?.length < 7) {
                                const remain = 7 - item.fileNumber.length;
                                for (let i = 0; i < remain; i++) {
                                  item.fileNumber = "0" + item.fileNumber;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  fileNumber: item.fileNumber,
                                };
                                setRows(updatedRows);
                              }
                            }}
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="currency"
                            value={item.currency}
                            onChange={handleChange(idx)}
                            onBlur={() => {
                              if (item.currency?.length < 3) {
                                const remain = 3 - item.currency.length;
                                for (let i = 0; i < remain; i++) {
                                  item.currency = "0" + item.currency;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  currency: item.currency,
                                };
                                setRows(updatedRows);
                              }
                            }}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="accountCode"
                            value={item.accountCode}
                            onChange={handleChange(idx)}
                            className="form-control"
                            onBlur={() => {
                              if (item.accountCode?.length < 4) {
                                const remain = 4 - item.accountCode.length;
                                for (let i = 0; i < remain; i++) {
                                  item.accountCode = "0" + item.accountCode;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  accountCode: item.accountCode,
                                };
                                setRows(updatedRows);
                              }
                            }}
                          />
                        </td>

                        <td>
                          <TextField
                            type="text"
                            name="sequenceNumber"
                            value={item.sequenceNumber}
                            onChange={handleChange(idx)}
                            className="form-control"
                            onBlur={() => {
                              if (item.sequenceNumber?.length < 3) {
                                const remain = 3 - item.sequenceNumber.length;
                                for (let i = 0; i < remain; i++) {
                                  item.sequenceNumber =
                                    "0" + item.sequenceNumber;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  sequenceNumber: item.sequenceNumber,
                                };
                                setRows(updatedRows);
                              }
                            }}
                          />
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
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
            disabled={
              agentId === "" ||
              nameAr === "" ||
              nameEn === "" ||
              cifNum === "" ||
              addressAr === "" ||
              addressEn === "" ||
              phone === "" ||
              agentIp === "" ||
              agentStatus === "" ||
              swiftCode === "" ||
              maxSyTranslate === "" ||
              maxDoTranslate === "" ||
              maxEuTranslate === ""
            }
            onClick={() => {
              onEditClicked();
              setOpen(false);
            }}
          >
            Edit
          </Button>
        </Box>
      </Modal>
      <Header title="Agents" subtitle="Entire list of Agents" />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={
          {
            // overflow: "scroll",
            // height: "80%",
            // transform: "translate(0%, 50%)",
            // zIndex: "1000",
            // position: "absolute"
          }
        }
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Agent
          </Typography>
          <Box
            display="grid"
            //flexDirection="column"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="10px"
            columnGap="1.33%"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            {returnTextField("Agent UUID", agentId, setAgentId)}

            {returnTextField("Name Ar", nameAr, setNameAr)}

            {returnTextField("Name En", nameEn, setNameEn)}

            {returnTextField("CIF Number", cifNum, setCifNum)}

            {returnTextField("Address Ar", addressAr, setAddressAr)}

            {returnTextField("Address En", addressEn, setAddressEn)}

            {returnTextField("phone", phone, setPhone)}

            {returnTextField("agentIp", agentIp, setAgentIp)}

            <FormControl sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <InputLabel id="agentStatus">Select Agent Status</InputLabel>
              <Select
                labelId="Agent Status"
                name="agentStatus"
                id="agentStatus"
                value={agentStatus}
                onChange={(e) => setAgentStatus(e.target.value)}
              >
                <MenuItem value="active">مفعل</MenuItem>
                <MenuItem value="suspend">مجمد </MenuItem>
                <MenuItem value="inactive"> غير فعال </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel id="agentTypeLabel">Select Agent Type</InputLabel>
              <Select
                labelId="agentTypeLabel"
                id="agentType"
                value={agentType}
                error={agentType === ""}
                helperText={agentType === "" ? "Empty field!" : " "}
                onChange={(e) => setAgentType(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isAgentTypeLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgentType?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            {returnTextField("Swift Code", swiftCode, setSwiftCode)}
            {returnTextField("Max SYP", maxSyTranslate, setMaxSyTranslate)}
            {returnTextField("Max $", maxDoTranslate, setMaxDoTranslate)}
            {returnTextField("Max €  ", maxEuTranslate, setMaxEuTranslate)}

            <Box sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <div className="container">
                <table
                  className="table table-bordered table-hover"
                  id="tab_logic"
                >
                  <thead>
                    <tr>
                      <th className="text-center"> # </th>
                      <th className="text-center"> nameAccount </th>
                      <th className="text-center"> Branch </th>
                      <th className="text-center"> fileNumber </th>
                      <th className="text-center"> currency </th>
                      <th className="text-center"> accountCode </th>
                      <th className="text-center"> sequenceNumber </th>

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
                          <FormControl fullWidth sx={{ mb: "2rem", mt: 4 }}>
                            <InputLabel id="nameAccount">
                              Select Name Account
                            </InputLabel>
                            <Select
                              labelId="nameAccount"
                              id="nameAccount"
                              name="nameAccount"
                              value={item.nameAccount}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="main">الحساب الرئيسي</MenuItem>
                              <MenuItem value="sub">الحساب الفرعي </MenuItem>
                              <MenuItem value="intermediate">
                                {" "}
                                حساب وسيط{" "}
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
                          <TextField
                            type="text"
                            name="department"
                            value={item.department}
                            onChange={handleChange(idx)}
                            onBlur={() => {
                              if (item.department?.length < 4) {
                                const remain = 4 - item.department.length;
                                console.log("re", remain);
                                for (let i = 0; i < remain; i++) {
                                  item.department = "0" + item.department;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  department: item.department,
                                };
                                setRows(updatedRows);
                              }
                            }}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="fileNumber"
                            value={item.fileNumber}
                            onChange={handleChange(idx)}
                            className="form-control"
                            onBlur={() => {
                              if (item.fileNumber?.length < 7) {
                                const remain = 7 - item.fileNumber.length;
                                for (let i = 0; i < remain; i++) {
                                  item.fileNumber = "0" + item.fileNumber;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  fileNumber: item.fileNumber,
                                };
                                setRows(updatedRows);
                              }
                            }}
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="currency"
                            value={item.currency}
                            onChange={handleChange(idx)}
                            onBlur={() => {
                              if (item.currency?.length < 3) {
                                const remain = 3 - item.currency.length;
                                for (let i = 0; i < remain; i++) {
                                  item.currency = "0" + item.currency;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  currency: item.currency,
                                };
                                setRows(updatedRows);
                              }
                            }}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="accountCode"
                            value={item.accountCode}
                            onChange={handleChange(idx)}
                            className="form-control"
                            onBlur={() => {
                              if (item.accountCode?.length < 4) {
                                const remain = 4 - item.accountCode.length;
                                for (let i = 0; i < remain; i++) {
                                  item.accountCode = "0" + item.accountCode;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  accountCode: item.accountCode,
                                };
                                setRows(updatedRows);
                              }
                            }}
                          />
                        </td>

                        <td>
                          <TextField
                            type="text"
                            name="sequenceNumber"
                            value={item.sequenceNumber}
                            onChange={handleChange(idx)}
                            className="form-control"
                            onBlur={() => {
                              if (item.sequenceNumber?.length < 3) {
                                const remain = 3 - item.sequenceNumber.length;
                                for (let i = 0; i < remain; i++) {
                                  item.sequenceNumber =
                                    "0" + item.sequenceNumber;
                                }
                                const updatedRows = [...rows];
                                updatedRows[idx] = {
                                  ...updatedRows[idx],
                                  sequenceNumber: item.sequenceNumber,
                                };
                                setRows(updatedRows);
                              }
                            }}
                          />
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
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
            disabled={
              agentId === "" ||
              nameAr === "" ||
              nameEn === "" ||
              cifNum === "" ||
              addressAr === "" ||
              addressEn === "" ||
              phone === "" ||
              agentIp === "" ||
              agentStatus === "" ||
              swiftCode === "" ||
              maxSyTranslate === "" ||
              maxDoTranslate === "" ||
              maxEuTranslate === ""
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
            setAgentId("");
            setAgentType("");
            setNameAr("");
            setNameEn("");
            setCifNum("");
            setAddressAr("");
            setAddressEn("");
            setPhone("");
            setAgentIp("");
            setAgentStatus("");
            setSwiftCode("");
            setMaxSyTranslate("");
            setMaxDoTranslate("");
            setMaxEuTranslate("");
            setAccounts([{}]);
            setRows([{}]);

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

export default Agents;

const returnRadio = (name, fullName, value, setState) => {
  return (
    <FormControl component="fieldset" sx={{ mt: 2, gridColumn: "1 span" }}>
      <FormLabel component="legend">{fullName}</FormLabel>
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

const returnTextField = (fullName, value, setState) => {
  return (
    <TextField
      id="outlined-basic"
      label={fullName}
      variant="outlined"
      value={value}
      error={value === ""}
      helperText={value === "" ? "Empty field!" : " "}
      onChange={(e) => setState(e.target.value)}
      sx={{ mb: "2rem", gridColumn: "span 2" }}
    />
  );
};

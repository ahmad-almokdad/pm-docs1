import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
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
  listItemClasses,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import {
  useAddAgentOperationMutation,
  useGetAgentOperationQuery,
  useUpdateAgentOperationMutation,
  useGetAgentsQuery,
  useGetSubOperationQuery,
  useGetCurrencyQuery,
  useDeleteAgentOperationMutation,
  useGetAllowedLgQuery,
} from "state/api";

const AgentOperation = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAgentOperationQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const { data: dataAllowedLg, isLoading: isAllowedLgLoading } =
    useGetAllowedLgQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });

  const [updateAgentOperation, { data: dataAfterUpdate }] =
    useUpdateAgentOperationMutation();
  const [deleteAgentOperation, { data: dataAfterDelete }] =
    useDeleteAgentOperationMutation();
  const [addAgentOperation, { data: dataAfterAdd }] =
    useAddAgentOperationMutation();

  const { data: dataAgent, isLoading: isDataAgentLoading } = useGetAgentsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const { data: dataSubOperation, isLoading: isDataSubOperationLoading } =
    useGetSubOperationQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });
  const { data: dataCurrency, isLoading: isDataCurrencyLoading } =
    useGetCurrencyQuery({
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
        // console.log("params", params.row);
        return (
          <p>{params.row.agent.nameEn + " / " + params.row.agent.nameAr}</p>
        );
      },
    },
    {
      field: "subOperation",
      headerName: "SubOperation",
      flex: 1,
      renderCell: (params) => {
        // console.log("params", params.row);
        return <p>{params.row.subOperation.name}</p>;
      },
    },
    {
      field: "currency",
      headerName: "Currency",
      flex: 1,
      renderCell: (params) => {
        // console.log("params", params.row);
        return <p>{params.row.currency.name}</p>;
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
                setSubOperation(params.row.subOperation._id);
                setCurrency(params.row.currency._id);
                setRows(params.row.maximumFinancial);
                setMaximumFinancial(params.row.maximumFinancial);
                setId(params.row._id);
                setDaysOff(params.row.daysOff || []);
                handleOpenDelete();
              }}
            >
              Delete
            </Button>
            <Button
              sx={{ ml: "1rem" }}
              variant="contained"
              color="warning"
              onClick={() => {
                setAgent(params.row.agent._id);
                setSubOperation(params.row.subOperation._id);
                setChargesType(params.row.chargesType);
                setCurrency(params.row.currency._id);
                setRows(params.row.maximumFinancial);
                setMaximumFinancial(params.row.maximumFinancial);
                setCommission(params.row.agentCommission);
                setRowsCommission(params.row.agentCommission);
                setAllowedLg(params.row.allowedLg || []);
                setId(params.row._id);
                setDaysOff(params.row.daysOff || []);
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

  const [agent, setAgent] = useState("");
  const [chargesType, setChargesType] = useState("");
  const [subOperation, setSubOperation] = useState("");
  const [currency, setCurrency] = useState("");
  const [allowedLg, setAllowedLg] = useState([]);
  const [maximumFinancial, setMaximumFinancial] = useState([
    {
      source: "",
      currency: "",
      maximumType: "",
      operationNumber: "",
      financialValue: "",
    },
  ]);
  const [daysOff, setDaysOff] = useState([]);
  const [id, setId] = useState(null);
  const [rows, setRows] = useState([{}]);
  const handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    // console.log("tttt", { name, value });
    const updatedRows = [...rows];
    updatedRows[idx] = {
      ...updatedRows[idx],
      [name]: value,
    };
    setRows(updatedRows);

    // Assuming that `accounts` is an array of objects and you want to update the corresponding object
    const updatedMaximumFinancial = [...maximumFinancial];
    updatedMaximumFinancial[idx] = {
      ...updatedMaximumFinancial[idx],
      [name]: value,
    };
    setMaximumFinancial(updatedMaximumFinancial);
  };

  const handleAddRow = () => {
    const newItem = {
      source: "",
      currency: "",
      maximumType: "",
      operationNumber: "",
      financialValue: "",
    };
    setRows([...rows, newItem]);
    // setAccounts([...rows, newItem]);
    setMaximumFinancial([...maximumFinancial, newItem]);
  };
  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
    setMaximumFinancial(maximumFinancial.slice(0, -1));
  };

  const handleRemoveSpecificRow = (idx) => () => {
    const updatedRows = [...rows];
    updatedRows.splice(idx, 1);
    setRows(updatedRows);

    const updatedMaximumFinancial = [...maximumFinancial];
    updatedMaximumFinancial.splice(idx, 1);
    setMaximumFinancial(updatedMaximumFinancial);
  };

  const onEditClicked = async () => {
    await updateAgentOperation({
      id,
      agent,
      chargesType,
      subOperation,
      currency,
      maximumFinancial,
      agentCommission: commission,
      allowedLg,
      daysOff,
    });
  };
  const onDeleteClicked = async () => {
    await deleteAgentOperation({
      id,
    });
  };

  const onAddClicked = async () => {
    await addAgentOperation({
      agent,
      subOperation,
      chargesType,
      currency,
      maximumFinancial,
      agentCommission: commission,
      daysOff,
      allowedLg,
    });
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
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleTypeChange = (e) => {
    const selectedValues = Array.from(e.target.value);
    setAllowedLg(selectedValues);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // ! start rows commission
  const [commission, setCommission] = useState([
    // Initialize with an empty account row
    {
      commissionHolder: "",
      commissionType: "",
      from: "",
      to: "",
      commissionValuePercentage: "",
      commissionValueAmount: "",
      rounded: "",
    },
  ]);

  const [rowsCommission, setRowsCommission] = useState([{}]);
  const handleCommissionChange = (idx) => (e) => {
    const { name, value } = e.target;
    // console.log("tttt", { name, value });
    const updatedRows = [...rowsCommission];
    updatedRows[idx] = {
      ...updatedRows[idx],
      [name]: value,
    };
    setRowsCommission(updatedRows);

    // Assuming that `accounts` is an array of objects and you want to update the corresponding object
    const updatedAccounts = [...commission];
    updatedAccounts[idx] = {
      ...updatedAccounts[idx],
      [name]: value,
    };
    setCommission(updatedAccounts);
  };

  const handleAddRowCommission = () => {
    const newItem = {
      commissionHolder: "",
      commissionType: "",
      from: "",
      to: "",
      commissionValuePercentage: "",
      commissionValueAmount: "",
      rounded: "",
    };
    setRowsCommission([...rowsCommission, newItem]);
    // setAccounts([...rows, newItem]);
    setCommission([...commission, newItem]);
  };
  const handleRemoveRowCommission = () => {
    setRowsCommission(rowsCommission.slice(0, -1));
    setCommission(commission.slice(0, -1));
  };

  const handleRemoveSpecificRowCommission = (idx) => () => {
    const updatedRows = [...rowsCommission];
    updatedRows.splice(idx, 1);
    setRowsCommission(updatedRows);

    const updatedCommissions = [...commission];
    updatedCommissions.splice(idx, 1);
    setCommission(updatedCommissions);
  };
  // ! end rows Commission

  return (
    <Box m="1.5rem 2.5rem">
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Agent Operation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="agentLabel">Select Agent</InputLabel>
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
                      {operation.nameEn + " / " + operation.nameAr}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="subOperationLabel">
                Select SubOperation
              </InputLabel>
              <Select
                labelId="subOperationLabel"
                id="subOperation"
                disabled={true}
                value={subOperation}
                onChange={(e) => setSubOperation(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataSubOperationLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataSubOperation?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="currencyLabel">Select Currency</InputLabel>
              <Select
                labelId="currencyLabel"
                id="currency"
                disabled={true}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataCurrencyLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataCurrency?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
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
              onDeleteClicked();
              setOpenDelete(false);
            }}
          >
            Delete
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
            Edit Agent Operation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="agentLabel">Select Agent</InputLabel>
              <Select
                labelId="agentLabel"
                id="agent"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                error={agent === ""}
                helperText={agent === "" ? "Empty field!" : " "}
                sx={{ mb: 4 }}
              >
                {isDataAgentLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgent?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameEn + " / " + operation.nameAr}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="chargesTypeLabel">Select Charge Type</InputLabel>
              <Select
                labelId="chargesTypeLabel"
                id="chargesType"
                value={chargesType}
                error={chargesType === ""}
                helperText={chargesType === "" ? "Empty field!" : " "}
                onChange={(e) => setChargesType(e.target.value)}
                sx={{ mb: 4 }}
              >
                <MenuItem value="on-sender">On Sender</MenuItem>
                <MenuItem value="on-receiver">On Receiver</MenuItem>
                <MenuItem value="account-to-account">Share</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="subOperationLabel">
                Select SubOperation
              </InputLabel>
              <Select
                labelId="subOperationLabel"
                id="subOperation"
                value={subOperation}
                error={subOperation === ""}
                helperText={subOperation === "" ? "Empty field!" : " "}
                onChange={(e) => setSubOperation(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataSubOperationLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataSubOperation?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="currencyLabel">Select Currency</InputLabel>
              <Select
                labelId="currencyLabel"
                id="currency"
                value={currency}
                error={currency === ""}
                helperText={currency === "" ? "Empty field!" : " "}
                onChange={(e) => setCurrency(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataCurrencyLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataCurrency?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="allowedLgLabel">Select Customer Types</InputLabel>
              <Select
                labelId="allowedLgLabel"
                id="allowedLg"
                multiple
                value={allowedLg}
                error={allowedLg.length === 0}
                helperText={allowedLg.length === 0 ? "Empty field!" : " "}
                onChange={handleTypeChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {isAllowedLgLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAllowedLg?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation.lgNum}>
                      {operation.lgNum + "/" + operation.description}
                    </MenuItem>
                  ))
                )}

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
                      <th className="text-center" style={{ width: "4rem" }}>
                        {" "}
                        #{" "}
                      </th>
                      <th className="text-center"> Source </th>
                      <th className="text-center"> Currency </th>
                      <th className="text-center"> maximumType </th>
                      <th className="text-center"> operationNumber </th>
                      <th className="text-center"> financialValue </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <FormControl
                            // sx={{ mb: "2rem", gridColumn: "span 4" }}
                            fullWidth
                          >
                            <InputLabel id="source">Select Source</InputLabel>
                            <Select
                              labelId="Source"
                              name="source"
                              id="source"
                              value={item.source}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="agent">وكيل</MenuItem>
                              <MenuItem value="client">زبون </MenuItem>
                              <MenuItem value="operation"> عملية </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl fullWidth>
                            <InputLabel id="currencyLabel">
                              Select Currency
                            </InputLabel>
                            <Select
                              labelId="currencyLabel"
                              id="currency"
                              name="currency"
                              value={item.currency}
                              onChange={handleChange(idx)}
                            >
                              {isDataCurrencyLoading ? (
                                <MenuItem value="">Loading...</MenuItem>
                              ) : (
                                dataCurrency?.data?.map((operation) => (
                                  <MenuItem
                                    key={operation._id}
                                    value={operation.name}
                                  >
                                    {operation.name}
                                  </MenuItem>
                                ))
                              )}
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            // sx={{ mb: "2rem", gridColumn: "span 4" }}
                            fullWidth
                          >
                            <InputLabel id="maximumType">
                              Select MaximumType
                            </InputLabel>
                            <Select
                              labelId="maximumType"
                              name="maximumType"
                              id="maximumType"
                              value={item.maximumType}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="max">
                                الحد الأعلى لمجموع العمليات
                              </MenuItem>
                              <MenuItem value="min">
                                الحد الأعلى للعملية الواحدة{" "}
                              </MenuItem>
                              <MenuItem value="number"> عدد الحركات </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="operationNumber"
                            value={item.operationNumber}
                            onChange={handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="financialValue"
                            value={item.financialValue}
                            onChange={handleChange(idx)}
                            className="form-control"
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
                  sx={{ marginRight: 1, marginLeft: "4rem", mt: "0.5rem" }}
                >
                  Add Row
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveRow}
                  sx={{ marginRight: 1, mt: "0.5rem" }}
                >
                  Delete Last Row
                </Button>
              </div>
            </Box>
            <Box sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <div className="container">
                <div className="container">
                  {/* header */}
                  <Box display="flex" gap="2rem">
                    <div className="cell">#</div>
                    <div className="cell">CommissionHolder</div>
                    <div className="cell">CommissionType</div>
                    <div className="cell">From</div>
                    <div className="cell">To</div>
                    <div className="cell">Percentage</div>
                    <div className="cell">Fixed Value</div>
                    <div className="cell"></div>
                  </Box>
                  {/* body */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    className="body"
                  >
                    {rowsCommission.map((item, idx) => (
                      <>
                        <Box display="flex" className="row" key={idx}>
                          <div style={{marginRight:".5rem"}} className="cell">{idx + 1}</div>
                          <div className="cell">
                            {/* CommissionHolder Select */}
                            <FormControl fullWidth>
                              <InputLabel id={`commissionHolder-${idx}`}>
                                Select Commission Holder
                              </InputLabel>
                              <Select
                                labelId={`commissionHolder-${idx}`}
                                id={`commissionHolder-${idx}`}
                                name="commissionHolder"
                                value={item.commissionHolder}
                                onChange={handleCommissionChange(idx)}
                              >
                                <MenuItem value="bank">البنك</MenuItem>
                                <MenuItem value="agent">الوكيل </MenuItem>
                                <MenuItem value="ThirdParty">طرف ثالث</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="cell">
                            {/* CommissionType Select */}
                            <FormControl fullWidth>
                              <InputLabel id={`commissionType-${idx}`}>
                                Select Commission Type
                              </InputLabel>
                              <Select
                                labelId={`commissionType-${idx}`}
                                id={`commissionType-${idx}`}
                                name="commissionType"
                                value={item.commissionType}
                                onChange={handleCommissionChange(idx)}
                              >
                                <MenuItem value="range">شرائح</MenuItem>
                                <MenuItem value="percentage">
                                  نسبة مئؤية
                                </MenuItem>
                                <MenuItem value="fixed">مبلغ ثابت</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="cell">
                            {/* From TextField */}
                            <TextField
                              type="text"
                              name="from"
                              value={item.from}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* To TextField */}
                            <TextField
                              type="text"
                              name="to"
                              value={item.to}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* Percentage TextField */}
                            <TextField
                              type="text"
                              name="commissionValuePercentage"
                              value={item.commissionValuePercentage}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* Fixed Value TextField */}
                            <TextField
                              type="text"
                              name="commissionValueAmount"
                              value={item.commissionValueAmount}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* Remove Button */}
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={handleRemoveSpecificRowCommission(idx)}
                              sx={{ml:".5rem"}}
                            >
                              Remove
                            </Button>
                          </div>
                        </Box>
                        {/* rounded */}
                        <Box display="flex" className="cell">
                          {/* Rounded RadioGroup */}
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Rounded</FormLabel>
                            <RadioGroup
                              aria-label="rounded"
                              name="rounded"
                              value={item.rounded}
                              onChange={handleCommissionChange(idx)}
                            >
                              <Box>
                                <FormControlLabel
                                  value={"1000"}
                                  control={<Radio />}
                                  label="1000"
                                />
                                <FormControlLabel
                                  value={"100"}
                                  control={<Radio />}
                                  label="100"
                                />
                                <FormControlLabel
                                  value={"10"}
                                  control={<Radio />}
                                  label="10"
                                />
                              </Box>
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </>
                    ))}
                  </Box>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRowCommission}
                  sx={{ marginRight: 1 }}
                >
                  Add Row
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveRowCommission}
                >
                  Delete Last Row
                </Button>
              </div>
            </Box>
            <Box sx={{ mb: "2rem" }}>
              <Typography variant="h4">DaysOFF</Typography>
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
            Edit
          </Button>
        </Box>
      </Modal>
      <Header
        title="Agent Operation"
        subtitle="Entire list of Agent Operation"
      />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Agent Operation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel id="agentLabel">Select Agent</InputLabel>
              <Select
                labelId="agentLabel"
                id="agent"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                error={agent === ""}
                helperText={agent === "" ? "Empty field!" : " "}
                sx={{ mb: 4 }}
              >
                {isDataAgentLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAgent?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.nameEn + " / " + operation.nameAr}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="chargesTypeLabel">Select Charges Type</InputLabel>
              <Select
                labelId="chargesTypeLabel"
                id="chargesType"
                value={chargesType}
                error={chargesType === ""}
                helperText={chargesType === "" ? "Empty field!" : " "}
                onChange={(e) => setChargesType(e.target.value)}
                sx={{ mb: 4 }}
              >
               <MenuItem value="on-sender">On Sender</MenuItem>
                <MenuItem value="on-receiver">On Receiver</MenuItem>
                <MenuItem value="account-to-account">Share</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="subOperationLabel">
                Select SubOperation
              </InputLabel>
              <Select
                labelId="subOperationLabel"
                id="subOperation"
                value={subOperation}
                error={subOperation === ""}
                helperText={subOperation === "" ? "Empty field!" : " "}
                onChange={(e) => setSubOperation(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataSubOperationLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataSubOperation?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="currencyLabel">Select Currency</InputLabel>
              <Select
                labelId="currencyLabel"
                id="currency"
                value={currency}
                error={currency === ""}
                helperText={currency === "" ? "Empty field!" : " "}
                onChange={(e) => setCurrency(e.target.value)}
                sx={{ mb: 4 }}
              >
                {isDataCurrencyLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataCurrency?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation._id}>
                      {operation.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="allowedLgsLabel">
                Select Customer Types
              </InputLabel>
              <Select
                labelId="allowedLgsLabel"
                id="allowedLgs"
                multiple
                value={allowedLg}
                error={allowedLg.length === 0}
                helperText={allowedLg.length === 0 ? "Empty field!" : " "}
                onChange={handleTypeChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {isAllowedLgLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  dataAllowedLg?.data?.map((operation) => (
                    <MenuItem key={operation._id} value={operation.lgNum}>
                      {operation.lgNum + "/" + operation.description}
                    </MenuItem>
                  ))
                )}

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
                      <th className="text-center" style={{ width: "4rem" }}>
                        {" "}
                        #{" "}
                      </th>
                      <th className="text-center"> Source </th>
                      <th className="text-center"> Currency </th>
                      <th className="text-center"> maximumType </th>
                      <th className="text-center"> operationNumber </th>
                      <th className="text-center"> financialValue </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <FormControl
                            // sx={{ mb: "2rem", gridColumn: "span 4" }}
                            fullWidth
                          >
                            <InputLabel id="source">Select Source</InputLabel>
                            <Select
                              labelId="Source"
                              name="source"
                              id="source"
                              value={item.source}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="agent">وكيل</MenuItem>
                              <MenuItem value="client">زبون </MenuItem>
                              <MenuItem value="operation"> عملية </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl fullWidth>
                            <InputLabel id="currencyLabel">
                              Select Currency
                            </InputLabel>
                            <Select
                              labelId="currencyLabel"
                              id="currency"
                              name="currency"
                              value={item.currency}
                              onChange={handleChange(idx)}
                            >
                              {isDataCurrencyLoading ? (
                                <MenuItem value="">Loading...</MenuItem>
                              ) : (
                                dataCurrency?.data?.map((operation) => (
                                  <MenuItem
                                    key={operation._id}
                                    value={operation.name}
                                  >
                                    {operation.name}
                                  </MenuItem>
                                ))
                              )}
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <FormControl
                            // sx={{ mb: "2rem", gridColumn: "span 4" }}
                            fullWidth
                          >
                            <InputLabel id="maximumType">
                              Select MaximumType
                            </InputLabel>
                            <Select
                              labelId="maximumType"
                              name="maximumType"
                              id="maximumType"
                              value={item.maximumType}
                              onChange={handleChange(idx)}
                            >
                              <MenuItem value="max">
                                الحد الأعلى لمجموع العمليات
                              </MenuItem>
                              <MenuItem value="min">
                                الحد الأعلى للعملية الواحدة{" "}
                              </MenuItem>
                              <MenuItem value="number"> عدد الحركات </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="operationNumber"
                            value={item.operationNumber}
                            onChange={handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TextField
                            type="text"
                            name="financialValue"
                            value={item.financialValue}
                            onChange={handleChange(idx)}
                            className="form-control"
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
                  sx={{ marginRight: 1, marginLeft: "4rem", mt: "0.5rem" }}
                >
                  Add Row
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveRow}
                  sx={{ marginRight: 1, mt: "0.5rem" }}
                >
                  Delete Last Row
                </Button>
              </div>
            </Box>
            <Box sx={{ mb: "2rem", gridColumn: "span 4" }}>
              <div className="container">
                <div className="container">
                  {/* header */}
                  <Box display="flex" gap="2rem">
                    <div className="cell">#</div>
                    <div className="cell">CommissionHolder</div>
                    <div className="cell">CommissionType</div>
                    <div className="cell">From</div>
                    <div className="cell">To</div>
                    <div className="cell">Percentage</div>
                    <div className="cell">Fixed Value</div>
                    <div className="cell"></div>
                  </Box>
                  {/* body */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    className="body"
                  >
                    {rowsCommission.map((item, idx) => (
                      <>
                        <Box display="flex" className="row" key={idx}>
                          <div style={{marginRight:".5rem"}} className="cell">{idx + 1}</div>
                          <div className="cell">
                            {/* CommissionHolder Select */}
                            <FormControl fullWidth>
                              <InputLabel id={`commissionHolder-${idx}`}>
                                Select Commission Holder
                              </InputLabel>
                              <Select
                                labelId={`commissionHolder-${idx}`}
                                id={`commissionHolder-${idx}`}
                                name="commissionHolder"
                                value={item.commissionHolder}
                                onChange={handleCommissionChange(idx)}
                              >
                                <MenuItem value="bank">البنك</MenuItem>
                                <MenuItem value="agent">الوكيل </MenuItem>
                                <MenuItem value="ThirdParty">طرف ثالث</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="cell">
                            {/* CommissionType Select */}
                            <FormControl fullWidth>
                              <InputLabel id={`commissionType-${idx}`}>
                                Select Commission Type
                              </InputLabel>
                              <Select
                                labelId={`commissionType-${idx}`}
                                id={`commissionType-${idx}`}
                                name="commissionType"
                                value={item.commissionType}
                                onChange={handleCommissionChange(idx)}
                              >
                                <MenuItem value="range">شرائح</MenuItem>
                                <MenuItem value="percentage">
                                  نسبة مئؤية
                                </MenuItem>
                                <MenuItem value="fixed">مبلغ ثابت</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="cell">
                            {/* From TextField */}
                            <TextField
                              type="text"
                              name="from"
                              value={item.from}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* To TextField */}
                            <TextField
                              type="text"
                              name="to"
                              value={item.to}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* Percentage TextField */}
                            <TextField
                              type="text"
                              name="commissionValuePercentage"
                              value={item.commissionValuePercentage}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* Fixed Value TextField */}
                            <TextField
                              type="text"
                              name="commissionValueAmount"
                              value={item.commissionValueAmount}
                              onChange={handleCommissionChange(idx)}
                              className="form-control"
                            />
                          </div>
                          <div className="cell">
                            {/* Remove Button */}
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={handleRemoveSpecificRowCommission(idx)}
                              sx={{ml:".5rem"}}
                            >
                              Remove
                            </Button>
                          </div>
                        </Box>
                        {/* rounded */}
                        <Box display="flex" className="cell">
                          {/* Rounded RadioGroup */}
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Rounded</FormLabel>
                            <RadioGroup
                              aria-label="rounded"
                              name="rounded"
                              value={item.rounded}
                              onChange={handleCommissionChange(idx)}
                            >
                              <Box>
                                <FormControlLabel
                                  value={"1000"}
                                  control={<Radio />}
                                  label="1000"
                                />
                                <FormControlLabel
                                  value={"100"}
                                  control={<Radio />}
                                  label="100"
                                />
                                <FormControlLabel
                                  value={"10"}
                                  control={<Radio />}
                                  label="10"
                                />
                              </Box>
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </>
                    ))}
                  </Box>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRowCommission}
                  sx={{ marginRight: 1 }}
                >
                  Add Row
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveRowCommission}
                >
                  Delete Last Row
                </Button>
              </div>
            </Box>
            <Box sx={{ mb: "2rem" }}>
              <Typography variant="h4">DaysOFF</Typography>
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
            disabled={agent === "" || subOperation === "" || currency === ""}
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
            setSubOperation("");
            setCurrency("");
            setRows([{}]);
            setMaximumFinancial([{}]);
            setCommission([{}]);
            setRowsCommission([{}]);
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

export default AgentOperation;

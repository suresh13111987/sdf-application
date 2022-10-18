import { useState, useCallback, useEffect, useRef } from "react";
import { toast} from "react-toastify";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import "../css/Maincomponent.css";
import { YearlytotalVolumes } from "./YearlytotalVolumes";
import { TimeFilters } from "./TimeFilters";
import { FilterByforecast } from "./FilterByforecast";
import { Demandvolumeforecast } from "./DemandVolumeforecastgraph";
import { YearMonthtablecomponent } from "./yearMonthtable";
import { Tablegrouping } from "./Tablegrouping";
import {
  actionAppendDFUTableData,
  actionGetTableData,
  actionChangeSubmitAddDFUField,
  actionSubmitAddDFU,
  actionExportDfuTable,
  actionUpdateTableData,
  actionGgetClickedCell,
} from "../redux/Actions/QuickFilterData";
import {
  columnFields,
  defaultActions,
  defaultColDef,
  defaultSDFActions,
  defaultTake,
} from "../Utils/agGridUtils";
import KPI from "./KPIComponent";
import {
  actionDownloadDFUTable,
  actionSaveDFUTable,
} from "../redux/Actions/FinalSubmission";
import { actionUpdatePlotData } from "../redux/Actions/PlotData";
import AddRowModal from "./Common/AddRowModal";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Holcimuimaincomponent = () => {
  const dispatch = useDispatch();
  const [selectedTableColumns, setSelectedTableColumns] = useState(
    columnFields.filter((e) => e.value !== "quantity")
  );
  const {
    demandFilterData,
    foreCastFilterData,
    tableData,
    filterData,
    plotData,
    defaultData,
    dates,
    dfuTableCols,
    dfuTableTotalCount,
    dfuAddRowData,
    sdfTableKys,
    savePlotDataTableRows,
    sdfTableTotalSum,
    addDfuDropDownOption,
    tableDataCopy,
    clickedCell,
    state,
  } = useSelector(
    (state) => ({
      demandFilterData: state.quickFilterData.demandFilterData,
      foreCastFilterData: state.quickFilterData.foreCastFilterData,
      tableData: state.quickFilterData.tableData,
      getDataplot: state.plotDataReducer ?? [],
      filterData: state.quickFilterData.quickFilterData,
      plotData: state.plotData.plotData,
      defaultData: state.quickFilterData.quickFilterDefaultData,
      dates: state.quickFilterData.quickFilterDates,
      dfuTableCols: state.quickFilterData.dfuTableCols,
      dfuTableTotalCount: state.quickFilterData.dfuTableTotalCount,
      dfuAddRowData: state.quickFilterData.dfuAddRowData,
      sdfTableKys: state.plotData.sdfTableKys,
      savePlotDataTableRows: state.plotData.savePlotDataTableRows,
      sdfTableTotalSum: state.plotData.sdfTableTotalSum,
      addDfuDropDownOption: state.quickFilterData.addDfuDropDownOption,
      tableDataCopy: state.quickFilterData.tableDataCopy,
      clickedCell: state.quickFilterData.clickedCell,
      state: state,
    }),
    shallowEqual
  );
  const tableRef = useRef();
  const [dfuTableApi, setDfuTableApi] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [tempDfuTable, setTempDfuTable] = useState([]);
  const tt = useRef([]);
  const dfuTableRef = useRef([]);

  console.log({ state });

  const handleSelectChange = useCallback((e) => {
    setSelectedTableColumns(e);
  }, []);

  const submitSelection = (e) => {
    e.preventDefault();
    const body = {
      excludedColumns: selectedTableColumns.map((e) => e?.value),
      Dates: dates,
    };
    dispatch(actionGetTableData(body));
  };

  const downloadTableData = () => {
    dispatch(actionDownloadDFUTable(toast));
  };

  const saveDfuTable = (e) => {
    e.preventDefault();
    dispatch(actionSaveDFUTable(tt.current, dfuTableRef.current, toast));
    tt.current = [];
    dfuTableRef.current = [];
    // dispatch(actionSaveDFUTable(tempDfuTable, toast));
  };

  const temperoryTableSave = () => {
    // const temp = cloneDeep(tableData);
    if (tt.current.length) {
      tt.current.forEach((item) => {
        dispatch(actionUpdatePlotData(item));
      });
    }
    // console.log(tt.current);
  };
  const handleDFUPagination = () => {
    const body = {
      excludedColumns: selectedTableColumns.map((e) => e?.value),
      Dates: dates,
    };
    dispatch(actionAppendDFUTableData(body));
  };

  const onGridReady = useCallback((params) => {
    setDfuTableApi(params.api);
  }, []);

  const handleAddModalClose = useCallback(() => {
    setShowAddModal((prev) => !prev);
  }, [showAddModal]);

  const submitDfuForm = (e) => {
    e.preventDefault();
    dispatch(actionSubmitAddDFU(dfuAddRowData, dates));
  };
  const handleFieldChange = useCallback((e) => {
    const { name, value } = e.target;

    // if (tt.current) {
    //   clearTimeout(tt.current);
    // }
    // tt.current = setTimeout(() => {
    //   dispatch(actionChangeSubmitAddDFUField(name, value));
    // }, 200);
    dispatch(actionChangeSubmitAddDFUField(name, value));
  }, []);

  const exportDfuTable = () => {
    const body = {
      excludedColumns: selectedTableColumns.map((e) => e?.value),
      Dates: dates,
    };
    dispatch(actionExportDfuTable(body, toast));
  };

  const handleSdfTableChange = (e) => {
    const dfuExist = dfuTableRef.current.findIndex(
      (f) => f.colDef.field === e.colDef.field
    );
    if (dfuExist === -1) {
      dfuTableRef.current = [...dfuTableRef.current, e];
    } else {
      dfuTableRef.current[dfuExist] = e;
    }

    dispatch(actionUpdateTableData(e));
  };

  const handleCellChange = (e) => {
    // dispatch(actionUpdatePlotData(e));
    // setTempDfuTable((prev) => [...prev, e]);
    // if (!rowExist) {
    // if (tt.current?.length) {
    //   tt.current = tt.current.map((item) =>
    //     item.rowIndex === e.rowIndex ? e : item
    //   );
    // } else {
    //   tt.current = [...tt.current, e];
    // }
    [e].forEach((item, i) => {
      const rowExist =
        tableDataCopy[item.rowIndex][item.colDef.field] === item.newValue;
      if (rowExist && tt.current.length) {
        tt.current.splice(tt.current.indexOf(e.colDef.field), 1);
      } else {
        tt.current = [...tt.current, e];
      }
    });
  };
  const undoAgGridCell = (e) => {
    e.preventDefault();
    dfuTableApi.undoCellEditing();
  };
  const redoAgGridCell = (e) => {
    e.preventDefault();
    dfuTableApi.redoCellEditing();
  };

  const cellClicked = (param) => {
    const col = param.colDef.field;
    dispatch(actionGgetClickedCell(col));
  };
  const handleFilter = (params) => {
    console.log(params);
  };

  return (
    <div className="container-fluid">
      <KPI
        filterData={filterData.kpis}
        volumes={filterData.yearlyTotalVolume}
        timeFilterDates={state?.quickFilterData?.timeFilterDates}
        {...defaultData}
      />
      <TimeFilters
        {...defaultData}
        {...state}
        dates={dates}
        demandFilterData={demandFilterData}
        foreCastFilterData={foreCastFilterData}
        totalSum={sdfTableTotalSum}
      />
      {/* <FilterByforecast {...defaultData} /> */}

      {/* <Demandvolumeforecast
        timeFilterData={plotData}
        updatePlotData={updatePlotData}
      />

      <YearMonthtablecomponent
        rowData={plotData}
        defaultColDef={defaultColDef}
        tableCols={sdfTableKys}
        defaultActions={defaultSDFActions}
      /> */}

      <Row>
        <Col sm={6} md={6}>
          <Demandvolumeforecast
            sdfTableKys={sdfTableKys}
            timeFilterData={plotData}
          />
        </Col>
        <Col sm={6} md={6}>
          <YearMonthtablecomponent
            rowData={plotData}
            defaultColDef={defaultColDef}
            tableCols={sdfTableKys}
            defaultActions={defaultSDFActions}
            total={sdfTableTotalSum}
            handleCellChange={handleSdfTableChange}
            cellClicked={cellClicked}
            clickedCell={clickedCell}
          />
        </Col>
      </Row>

      <AddRowModal
        addDfuDropDownOption={addDfuDropDownOption}
        dfuAddRowData={dfuAddRowData}
        show={showAddModal}
        heading="Add New DFU"
        handleClose={handleAddModalClose}
        handleSubmit={submitDfuForm}
        handleChange={handleFieldChange}
      />
      <Tablegrouping
        handleSelectChange={handleSelectChange}
        downloadTableData={downloadTableData}
        submitSelection={submitSelection}
        saveDfuTable={saveDfuTable}
        rowData={tableData}
        defaultColDef={defaultColDef}
        value={selectedTableColumns}
        defaultActions={defaultActions}
        tableRef={tableRef}
        tableCols={dfuTableCols}
        submitBtnDisabled={selectedTableColumns.length === 0}
        tempSave={temperoryTableSave}
        handleNextPagination={handleDFUPagination}
        gridReady={onGridReady}
        dfuTableTotalCount={dfuTableTotalCount}
        setShowAddModal={setShowAddModal}
        exportDfu={exportDfuTable}
        handleCellChange={handleCellChange}
        undo={undoAgGridCell}
        redo={redoAgGridCell}
        cellClicked={cellClicked}
        clickedCell={clickedCell}
        handleFilter={handleFilter}
      />
    </div>
  );
};
export default Holcimuimaincomponent;

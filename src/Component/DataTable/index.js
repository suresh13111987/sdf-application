import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/ag-grid-community.cjs.js";
const DataTable = (props) => {
  const {
    rowData,
    defaultColDef,
    defaultActions,
    tableCols,
    gridReady,
    handleCellChange,
    cellClicked,
    clickedCell,
  } = props;
  return (
    <div className="ag-theme-alpine w-100 mt-4" style={defaultActions.style}>
      <AgGridReact
        rowData={rowData} // Row Data for Rows
        // columnDefs={tableCols} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        {...defaultActions}
        enableRangeSelection
        enableFillHandle
        undoRedoCellEditing
        enableCellChangeFlash
        undoRedoCellEditingLimit={20}
        onGridReady={gridReady}
        minHight={300}
        onCellValueChanged={handleCellChange}
      >
        {tableCols.map((e, i) => (
          // <Fragment key={i}>
          <AgGridColumn
            onCellClicked={cellClicked}
            key={i}
            suppressSizeToFit
            minWidth={150}
            headerName={e?.label}
            editable={(params) => {
              return (
                !e?.text &&
                e.value === clickedCell &&
                params?.data?.name?.toLowerCase() === "sdf modified forecast"
              );
            }}
            field={e?.value}
          />
          // </Fragment>
        ))}
      </AgGridReact>
    </div>
  );
};

export default DataTable;

import DfuDropDownComponent from "../Component/Common/CustomTableDropDown/dfuTableDropDown";
import SdfDropDownComponent from "../Component/Common/CustomTableDropDown/sdfTableDropDown";

export const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  floatingFilter: true,
  floatingFilterComponent: DfuDropDownComponent,
  floatingFilterComponentParams: {
    suppressFilterButton: true,
  },
  resizable: true,
  alwaysShowHorizontalScroll: true,
  tooltipValueGetter: (params) => {
    return params.value;
  },
};
export const defaultSDFTbleColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  floatingFilter: true,
  floatingFilterComponent: SdfDropDownComponent,
  floatingFilterComponentParams: {
    suppressFilterButton: true,
  },
  resizable: true,
  alwaysShowHorizontalScroll: true,
  tooltipValueGetter: (params) => {
    return params.value;
  },
};

export const defaultTake = 150;

export const defaultActions = {
  pagination: true,
  style: { height: "70%", width: "100%" },
  animateRows: true,
  editType: "fullRow",
  rowSelection: "multiple",
  paginationPageSize: 10,
};

export const defaultSDFActions = {
  pagination: true,
  style: { height: 250, width: 1100 },
  animateRows: true,
  editType: "fullRow",
  rowSelection: "multiple",
  paginationPageSize: 3,
};

export const columnFields = [
  { text: false, value: "quantity", label: "Quantity", editable: false },
  // { text: true, value: "name", label: "Name", editable: false },

  // {
  //   text: true,
  //   value: "material_code",
  //   label: "Material Code",
  //   editable: false,
  // },
  {
    text: true,
    value: "customer_name",
    label: "Customer Name",
    editable: false,
  },
  ,
  {
    text: true,
    value: "ship_to_name",
    label: "Ship to name",
    editable: false,
  },
  ,
  {
    text: true,
    value: "material_name",
    label: "Material Name",
    editable: false,
  },
  ,
  {
    text: true,
    value: "segment",
    label: "Segment",
    editable: false,
    select: true,
  },
  {
    text: true,
    value: "channel",
    label: "Channel",
    editable: false,
    select: true,
  },

  // { text: true, value: "total", label: "Total", editable: false },
  {
    text: true,
    value: "package",
    label: "Package",
    editable: false,
    select: true,
    option: "pkg",
  },
  {
    text: true,
    value: "region",
    label: "Region",
    editable: false,
    select: true,
  },
  {
    text: true,
    value: "plant",
    label: "Plant",
    editable: false,
    select: true,
  },
  {
    text: true,
    value: "del_new",
    label: "Del new",
    editable: false,
    select: true,
  },
  ,
  {
    text: true,
    value: "sales_rep_name",
    label: "Sales rep name",
    editable: false,
  },
];

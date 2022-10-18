import { Button, Col, Row } from "react-bootstrap";

import "../css/Tablegrouping.css";
import { columnFields } from "../Utils/agGridUtils";
import MainSelect from "./Common/MainSelect";
import DataTable from "./DataTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";

// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

export const Tablegrouping = ({
  handleSelectChange,
  downloadTableData,
  submitSelection,
  tempSave,
  saveDfuTable,
  tableRef,
  submitBtnDisabled,
  ...rest
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(window.sessionStorage.getItem("language"));
  }, []);

  return (
    <>
      <Row className="mb-5">
        <Col sm={12} md={12} className="mt-4">
          <span className="table-grouping-heading">{t("TABLE GROUPING")}</span>
        </Col>

        <Col sm={12} md={12} className="px-4">
          <Row className="border shadow p-4">
            <Col sm={12} md={12} className="addcolumnDatainsideborder">
              {t("COLUMNS TO INCLUDE / EXCLUDE")}
            </Col>

            <Stack direction="horizontal" gap={2}>
              <div style={{ width: "100%" }}>
                <MainSelect
                  options={columnFields.filter((e) => e.text)}
                  onChange={handleSelectChange}
                  isMulti
                  allowSelectAll
                  {...rest}
                />
              </div>

              <div className="ms-auto">
                <Button
                  disabled={submitBtnDisabled}
                  onClick={submitSelection}
                  variant="info"
                >
                  {t("Submit")}
                </Button>
              </div>
            </Stack>

            <Col sm={12} md={12} style={{ marginTop: "4em" }}>
              <Stack direction="horizontal" gap={2}>
                <div className="table-grouping-heading">{t("DFUS TABLE")}</div>
                <div className="ms-auto">
                  <Button
                    variant="info"
                    disabled={!rest.rowData.length}
                    onClick={() => rest.exportDfu()}
                  >
                    {t("Export")}
                  </Button>
                </div>

                <div>
                  <Button
                    variant="info"
                    disabled={!rest.rowData.length}
                    onClick={rest?.undo}
                  >
                    {" "}
                    {t("Undo Changes")}
                  </Button>
                </div>

                <div>
                  <Button
                    variant="info"
                    disabled={!rest.rowData.length}
                    onClick={rest?.redo}
                  >
                    {" "}
                    {t("Redo Changes")}
                  </Button>
                </div>

                <div>
                  <Button
                    variant="info"
                    disabled={
                      !rest.rowData.length ||
                      rest.dfuTableTotalCount === rest.rowData.length
                    }
                    onClick={() => rest.handleNextPagination()}
                  >
                    {t("Load More")}
                  </Button>
                </div>
              </Stack>
            </Col>

            <Col sm={12} md={12} style={{ minHeight: "50em" }}>
              <DataTable {...rest} />

              <Row>
                <Col sm={12} md={12} className="mt-2">
                  <Stack direction="horizontal" gap={2}>
                    <div>
                      <Button variant="info" onClick={tempSave}>
                        {t("Save Changes")}
                      </Button>
                    </div>

                    <div>
                      <Button variant="info" onClick={saveDfuTable}>
                        {t("Publish Changes")}
                      </Button>
                    </div>

                    <div>
                      <Button variant="info" onClick={downloadTableData}>
                        {t("Download Client Format Table")}
                      </Button>
                    </div>

                    <div>
                      <Button
                        disabled={!rest.rowData.length}
                        variant="info"
                        onClick={() => rest.setShowAddModal(true)}
                      >
                        {t("Add DFU")}
                      </Button>
                    </div>
                  </Stack>
                </Col>

                <Col sm={12} md={12}>
                  <Row className="mt-4">
                    <Col sm={12} md={12} className="tableGroupingfontcolor">
                      {t("Last save was made 117 minutes ago")}
                    </Col>

                    <Col sm={12} md={12} className="mt-2">
                      <span className="addDFUfontstyle">*DFU</span>
                      <span>
                        {t(
                          "=Demand Forecasting Unit - the unique identifier to forecast.It is composed by a unique combination of the following fields:material_codeshipto_code."
                        )}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <div className="row addmarginTopfortablegrouping">
        <div className="col-sm-12">
          <div className="row tablGroupingfontcriteria allFontcolor">
            {t("TABLE GROUPING")}
          </div>
          <div className="row border shadow addmargintopforcolumnseperation ">
            <div className="addingColumnspacebetween">
              <div className="row addcolumnDatainsideborder">
                {t("COLUMNS TO INCLUDE / EXCLUDE")}
              </div>
              <Row className="addMarginfordropdown">
                <Col sm={10}>
                  <MainSelect
                    options={columnFields.filter((e) => e.text)}
                    onChange={handleSelectChange}
                    isMulti
                    allowSelectAll
                    {...rest}
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    disabled={submitBtnDisabled}
                    onClick={submitSelection}
                    style={{ background: "rgba(4, 187, 241, 1) " }}
                  >
                    {t("Submit")}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6  addAttributetomargintopData allFontcolor">
              {t("DFUS TABLE")}
            </div>
            <div
              className="col-sm-6 text-end addAttributetomargintopData"
              style={{ paddingBottom: "12px" }}
            >
              <button
                disabled={!rest.rowData.length}
                onClick={() => rest.exportDfu()}
                className="btn buttonClr refreData"
              >
                {t("Export")}
              </button>
              <button
                disabled={!rest.rowData.length}
                onClick={() => tableRef?.current?.api?.undoCellEditing()}
                className="btn buttonClr refreData"
              >
                {t("Undo Changes")}
              </button>
              <button
                disabled={!rest.rowData.length}
                onClick={() => tableRef?.current?.api?.redoCellEditing()}
                className="btn buttonClr refreData"
              >
                {t("Redo Changes")}
              </button>
              <button
                disabled={
                  !rest.rowData.length ||
                  rest.dfuTableTotalCount === rest.rowData.length
                }
                onClick={() => rest.handleNextPagination()}
                className="btn buttonClr refreData"
              >
                {t("Load More")}
              </button>
            </div>
          </div>

          <DataTable tableRef={tableRef} {...rest} />

          <div className="row addfooterPaddingleft">
            <div className="col-sm-9">
              <button onClick={tempSave} className="btn buttonClr saveChanges ">
                Save Changes
              </button>
              <button
                onClick={saveDfuTable}
                className="btn buttonClr saveChanges "
              >
                Publish Changes
              </button>
              <button
                onClick={downloadTableData}
                className="btn buttonClr downloadCli"
              >
                Download Client Format Table
              </button>

              <button
                disabled={!rest.rowData.length}
                onClick={() => rest.setShowAddModal(true)}
                className="btn buttonClr addDfu"
              >
                {t("Add DFU")}
              </button>
            </div>
          </div>
          <div className="row addMargintopforbottomTable">
            <div className=" col-sm-8  tableGroupingfontcolor">
              {t("Last save was made 117 minutes ago")}
            </div>
          </div>
          <div className="row addfooterPaddingleft addDemandmargintop">
            <div className="col-sm-12">
              <span className="addDFUfontstyle">*DFU</span>
              <span>
                {t(
                  "=Demand Forecasting Unit - the unique identifier to forecast.It is composed by a unique combination of the following fields:material_codeshipto_code."
                )}
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

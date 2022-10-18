import moment from "moment/moment";
import { columnFields } from "./agGridUtils";

export const CurrentDateValue = new Date().toDateString().split(" ");

export const tableRequestBody = (selectedData) => {
  const excludedColumns = selectedData
    .filter((e) => e.text)
    .map((textItem) => textItem?.value);

  const Dates = columnFields
    .filter((e) => !e.text)
    .map((dateItem) => dateItem?.value);
  return { excludedColumns, Dates };
};

export const getMonthNumber = (month) => {
  if (month.toLowerCase().startsWith("jan")) {
    return "01";
  } else if (month.toLowerCase().startsWith("feb")) {
    return "02";
  } else if (month.toLowerCase().startsWith("mar")) {
    return "03";
  } else if (month.toLowerCase().startsWith("apr")) {
    return "04";
  } else if (month.toLowerCase().startsWith("may")) {
    return "05";
  } else if (month.toLowerCase().startsWith("jun")) {
    return "06";
  } else if (month.toLowerCase().startsWith("jul")) {
    return "07";
  } else if (month.toLowerCase().startsWith("aug")) {
    return "08";
  } else if (month.toLowerCase().startsWith("sep")) {
    return "09";
  } else if (month.toLowerCase().startsWith("oct")) {
    return "10";
  } else if (month.toLowerCase().startsWith("nov")) {
    return "11";
  } else if (month.toLowerCase().startsWith("dec")) {
    return "12";
  }
};

export const getMonthName = (month) => {
  switch (month.toString()) {
    case "01":
      return "Jan";
    case "02":
      return "Feb";
    case "03":
      return "Mar";
    case "04":
      return "Apr";
    case "05":
      return "May";
    case "06":
      return "Jun";
    case "07":
      return "Jul";
    case "08":
      return "Aug";
    case "09":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    case "12":
      return "Dec";
  }
};

export const demandDefaultRange = [
  "",
  "May-18",
  "Jun-18",
  "Jul-18",
  "Aug-18",
  "Sep-18",
  "Oct-18",
  "Nov-18",
  "Dec-18",
  "Jan-19",
  "Feb-19",
  "Mar-19",
  "Apr-19",
  "May-19",
  "Jun-19",
  "Jul-19",
  "Aug-19",
  "Sep-19",
  "Oct-19",
  "Nov-19",
  "Dec-19",
  "Jan-20",
  "Feb-20",
  "Mar-20",
  "Apr-20",
  "May-20",
  "Jun-20",
  "Jul-20",
  "Aug-20",
  "Sep-20",
  "Oct-20",
  "Nov-20",
  "Dec-20",
  "Jan-21",
  "Feb-21",
  "Mar-21",
  "Apr-21",
];

export const forecastDefaultRange = [
  "",
  "May-21",
  "Jun-21",
  "Jul-21",
  "Aug-21",
  "Sep-21",
  "Oct-21",
  "Nov-21",
  "Dec-21",
  "Jan-22",
  "Feb-22",
  "Mar-22",
  "Apr-22",
];

export const getPlotData = (filterName, data) => {
  switch (filterName) {
    case "YTD":
      return data?.TimePeriod?.flat();
    case "forecastNext6M":
      return data?.Forecast_TimePeriod?.flat();
    case "demandLast12M":
      return data?.Demand_TimePeriod?.flat();
  }
};

export const submitDaterangeRequestBody = (name, range) => {
  return {
    timefilters: {
      [name]: { Dates: range },
    },
  };
};

export const setAgGrid = (grid) => {
  return grid.map((e) => {
    const [a, b] = forecastDefaultRange[1].split("-");
    const formattedDate = `20${b}-0${getMonthNumber(a)}`;
    return {
      ...e,
      field: e.value,
      suppressSizeToFit: true,
      minWidth: 150,
      headerName: e.label,
    };
  });
};

export const getFormattedDate = (date) => {
  const [a, b] = date.split("-");
  const formattedDate = `${getMonthName(b)} ${a}`;
  return formattedDate;
};

export const getNumberedDate = (date) => {
  const [a, b] = date.split(" ");
  const formattedDate = `${b}-${getMonthNumber(a)}`;
  return formattedDate;
};

export const totalMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getYTDInputDates = {
  currentYear: new Date().getFullYear(),
  startDate:
    totalMonths[new Date().getMonth()] + " " + new Date().getFullYear(),
  endDate: totalMonths[totalMonths.length - 1] + " " + new Date().getFullYear(),
  filter: {
    YTD: totalMonths[new Date().getMonth()] + " " + new Date().getFullYear(),
  },
};

export const getDemandInputDates = (dmndEnd) => ({
  currentYear: new Date().getFullYear(),
  startDate:
    totalMonths[new Date().getMonth()] + " " + (new Date().getFullYear() - 1),
  endDate: totalMonths[new Date().getMonth()] + " " + new Date().getFullYear(),
  filter: {
    demandLast12M: moment(dmndEnd).format("MMM YYYY"),
  },
});

const getNext6Months = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
  const nextDate = d.toLocaleDateString().split("/");
  return nextDate;
};

export const getFcDemandInputDates = {
  currentYear: new Date().getFullYear(),
  startDate:
    totalMonths[new Date().getMonth()] + " " + new Date().getFullYear(),
  endDate:
    totalMonths[getNext6Months()[0]] +
    " " +
    getNext6Months()[getNext6Months().length - 1],
  // filter: {
  //   forecastNext6M:
  //     totalMonths[getNext6Months()[0]] +
  //     " " +
  //     getNext6Months()[getNext6Months().length - 1],
  // },
  filter: {
    forecastNext6M:
      totalMonths[new Date().getMonth()] + " " + new Date().getFullYear(),
  },
};

export const getTimeFilterSelectedDates = (dates, range) => {
  const arr = [];
  for (
    let i = dates.indexOf(range["startDate"]);
    i < dates.indexOf(range["endDate"]) + 1;
    i++
  ) {
    arr.push(dates[i].split("-").join(" "));
  }
  console.log("arrr-->", arr);
  return arr;
};

export const convertToMillion = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
    : Math.abs(Number(labelValue)).toFixed(2);
};

export const getTotalSdftableSum = (data) => {
  return data
    .reduce((acc, curr) => {
      const check = curr?.name?.toLowerCase() !== "sdf forecast";
      if (check) {
        return acc + parseFloat(curr.total);
      }
      return acc;
    }, 0)
    .toFixed(2);
};

export const getDateRange = (start, end) => {
  const dateStart = moment(moment(start).format("YYYY-M-DD"));
  const dateEnd = moment(moment(end).format("YYYY-M-DD"));
  const timeValues = [];
  while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
    timeValues.push(dateStart.format("MMM YYYY"));
    dateStart.add(1, "month");
  }
  return timeValues;
};

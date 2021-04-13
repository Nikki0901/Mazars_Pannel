//change date format

const changeFormateDate = (oldDate) => {
  console.log("date", oldDate);
  if (oldDate == null) {
    return null;
  }
  return oldDate.toString().split("-").reverse().join("-");
};

//remove time with date
const removeTime = (oldDate) => {
  console.log("RemoveTime - ", oldDate);

  if (oldDate == null) {
    return null;
  }
  return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
};

export default {
  changeFormateDate,
  removeTime,
};

// var updatedate = oldDate.split(" ")[0];
// var updatedate = oldDate.slice(0, 10);

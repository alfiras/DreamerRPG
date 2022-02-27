const BetterLog = (text = "DreamerRPG") => {
  console.log(
    "%c" + text,
    "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;"
  );
};

export default BetterLog;

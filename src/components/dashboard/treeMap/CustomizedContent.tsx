const CustomizedContent = (props: any) => {
  const {
    depth,
    x,
    y,
    width,
    height,
    index,
    selectedIndexs,
    onClickHandler,
    loading,
    data,
    sumOfData
  } = props;

  const percent = +(
    ((data?.[index]?.ips?.length || 0) / sumOfData) *
    100
  ).toFixed(1);

  const fontSize = (percent: number) => {
    if (percent < 2) return percent / 1.3 + "rem";
    if (percent < 5) return percent / 2.2 + "rem";
    if (percent < 10) return percent / 4.5 + "rem";
    if (percent < 20) return percent / 5.1 + "rem";
    if (percent < 30) return percent / 5.8 + "rem";
    else return percent / 7.5 + "rem";
  };

  return (
    <g
      onClick={() => {
        onClickHandler(index);
      }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          transition: "all .2s linear",
          fill: loading
            ? "transparent"
            : selectedIndexs?.length > 0
            ? selectedIndexs.some(
                (searchingIndex: number) => searchingIndex === index
              )
              ? "#7160B4"
              : "#B2CADF"
            : "#608DB4",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10)
        }}
      >
        <title style={{ color: "white" }}>Tooltip text goes here</title>
      </rect>
      {percent > 0.3 && (
        <text
          fontSize={fontSize(percent)}
          opacity=".8"
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(70, ${x + width / 2}, ${y + height / 2})`}
        >
          {percent}%
        </text>
      )}
    </g>
  );
};

export default CustomizedContent;

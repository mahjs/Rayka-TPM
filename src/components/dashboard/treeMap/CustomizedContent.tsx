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

  const name = data?.[index]?.name;

  const fontSize = (percent: number) => {
    if (percent < 2) return percent / 1.1 + "rem";
    if (percent < 5) return percent / 2.8 + "rem";
    if (percent < 10) return percent / 4.8 + "rem";
    if (percent < 20) return percent / 5.9 + "rem";
    if (percent < 30) return percent / 6.5 + "rem";
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
          fontSize={fontSize(percent/2.5)}
          opacity=".4"
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${width > 3 * height ? 0 : 70}, ${
            x + width / 2
          }, ${y + height / 2})`}
        >
          {name}
        </text>
      )}
    </g>
  );
};

export default CustomizedContent;

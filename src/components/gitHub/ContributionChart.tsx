import { parseISO } from "date-fns";
// import format from "date-fns/format";
import {
  createContainer,
  VictoryBrushContainer,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

import { useWindowSize } from "./useWindowResize.tsx";
import { useZoom } from "./useZoom.tsx";

const CONTRIBUTION_COUNT_LINE_COLOR = "#E879F9"; // Purple gradient color

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

const labelPresenter = ({ datum }: any) => `
Date: ${(new Date(datum.date), "dd/MM/yyyy")} 
Contributions: ${datum.contributionCount}
`;

function formatter(timeSeries: any) {
  return timeSeries.map((t: any) => ({
    ...t,
    date: parseISO(t.date),
  }));
}

const ContributionChart = ({ contributionDays }: any) => {
  const {
    zoomDomain,
    selectedZoomDomain,
    setSelectedZoomDomain,
    setZoomDomain,
  } = useZoom();

  const formattedTimeSeries = formatter(contributionDays);

  const { width, height } = useWindowSize();

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "20px auto",
        padding: "24px",
        // borderRadius: "16px",
        // background: "rgba(255, 255, 255, 0.1)",
        // backdropFilter: "blur(10px)",
        // border: "1px solid rgba(255, 255, 255, 0.2)",
        // boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        width: "100%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "white",
          marginBottom: "24px",
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Contributions Over Time
      </h2>

      {/* Main Chart Container */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "16px",
        }}
      >
        <VictoryChart
          width={width - 40}
          height={height / 2}
          theme={VictoryTheme.grayscale}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomVoronoiContainer
              responsive={false}
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={setSelectedZoomDomain}
            />
          }
          style={{
            background: { fill: "transparent" },
          }}
        >
          <VictoryGroup>
            <VictoryLine
              style={{
                data: {
                  stroke: CONTRIBUTION_COUNT_LINE_COLOR,
                  strokeWidth: 3,
                  filter: "drop-shadow(0 2px 4px rgba(232, 121, 249, 0.3))",
                },
                parent: { border: "1px solid rgba(255, 255, 255, 0.1)" },
              }}
              x="date"
              y="contributionCount"
              labels={labelPresenter}
              labelComponent={
                <VictoryTooltip
                  style={{
                    fill: "white",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                  flyoutStyle={{
                    fill: "rgba(139, 69, 193, 0.95)",
                    stroke: "rgba(255, 255, 255, 0.3)",
                    strokeWidth: 1,
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                  }}
                />
              }
              data={formattedTimeSeries}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>

      {/* Brush Chart Container */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <VictoryChart
          width={width - 40}
          height={90}
          scale={{ x: "time" }}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushDomain={selectedZoomDomain}
              onBrushDomainChange={setZoomDomain}
              brushStyle={{
                fill: "rgba(232, 121, 249, 0.2)",
                stroke: "#E879F9",
                strokeWidth: 2,
              }}
            />
          }
          style={{
            background: { fill: "transparent" },
          }}
        >
          {/* <VictoryAxis tickFormat={(x) => format(x, "yyyy-MM-dd")} /> */}
          <VictoryLine
            style={{
              data: {
                stroke: CONTRIBUTION_COUNT_LINE_COLOR,
                strokeWidth: 2,
                opacity: 0.8,
              },
            }}
            x="date"
            y="contributionCount"
            data={formattedTimeSeries}
          />
        </VictoryChart>
      </div>

      {/* Chart Legend/Info */}
      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          background: "rgba(232, 121, 249, 0.1)",
          borderRadius: "8px",
          border: "1px solid rgba(232, 121, 249, 0.3)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.9rem",
            margin: "0",
            fontWeight: "500",
          }}
        >
          💡 Drag on the bottom chart to zoom, hover on the main chart for
          details
        </p>
      </div>
    </div>
  );
};

export default ContributionChart;

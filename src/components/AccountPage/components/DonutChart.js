import React from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';
import { withTheme } from 'styled-components';

const LINE_WIDTH = 50;
const START_ANGLE = -90;

/** Util function to calculate the percentage value corresponding to the specified value. */
const getPercentValue = (value, total) => {
  if (value <= 0 || total <= 0) {
    return 0;
  }
  return (value * 100) / total;
};

/** Basic Donut chart, to display a percentage value. You may think of it as a circular progress bar */
export const DonutChart = withTheme(({ value, total, theme }) => {
  const percentValue = getPercentValue(value, total);

  return (
    <PieChart
      data={[
        { value: percentValue, color: theme.chartHighlightColor },
        { value: 100 - percentValue, color: theme.chartDisabledColor },
      ]}
      lineWidth={LINE_WIDTH}
      startAngle={START_ANGLE}
    />
  );
});

DonutChart.defaultProps = {
  value: 0,
  total: 100,
};

DonutChart.propTypes = {
  /**
   * Value corresponding to the highlighted section of the chart.
   * Will be represented proportionally to 'total'.
   * */
  value: PropTypes.number,
  /** Total value represented by the chart. */
  total: PropTypes.number,
};

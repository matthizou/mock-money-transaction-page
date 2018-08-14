import { css } from 'styled-components';

export const DEVICE_SIZE = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

/**
 * Helper tagged template literal, for media queries, to use in styled-components.
 * Read more at: https://www.styled-components.com/docs/advanced#media-templates
 */
export const media = Object.keys(DEVICE_SIZE).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${DEVICE_SIZE[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

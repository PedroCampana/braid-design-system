import { style } from '@vanilla-extract/css';
import { braidDarkModeClass } from '../../css/atoms/sprinkles.css';
import { vars } from '../../themes/vars.css';

export const lightModeStarColor = style({
  selectors: {
    [`html:not(.${braidDarkModeClass}) &`]: {
      color: vars.foregroundColor.rating,
    },
  },
});

export const darkModeStarColor = style({
  selectors: {
    [`html.${braidDarkModeClass} &`]: {
      color: vars.foregroundColor.rating,
    },
  },
});

export const starSpacing = style({
  paddingRight: '1px',
});

export const textSpacing = style({
  paddingLeft: '0.4em',
});

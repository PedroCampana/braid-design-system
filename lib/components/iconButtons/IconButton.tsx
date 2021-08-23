import React, { AllHTMLAttributes, ReactNode, forwardRef } from 'react';
import { Box } from '../Box/Box';
import { Overlay } from '../private/Overlay/Overlay';
import buildDataAttributes, {
  DataAttributeMap,
} from '../private/buildDataAttributes';
import { iconSize, iconContainerSize, UseIconProps } from '../../hooks/useIcon';
import { virtualTouchable } from '../private/touchable/virtualTouchable';
import {
  useBackground,
  useBackgroundLightness,
} from '../Box/BackgroundContext';
import * as styles from './IconButton.css';

type NativeButtonProps = AllHTMLAttributes<HTMLButtonElement>;
export interface IconButtonProps {
  label: string;
  children: (props: UseIconProps) => ReactNode;
  onClick?: NativeButtonProps['onClick'];
  onMouseDown?: NativeButtonProps['onMouseDown'];
  onKeyUp?: NativeButtonProps['onKeyUp'];
  onKeyDown?: NativeButtonProps['onKeyDown'];
  'aria-haspopup'?: NativeButtonProps['aria-haspopup'];
  'aria-expanded'?: NativeButtonProps['aria-expanded'];
  tabIndex?: NativeButtonProps['tabIndex'];
  active?: boolean;
  tone?: 'neutral' | 'secondary';
  data?: DataAttributeMap;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      label,
      onClick,
      onMouseDown,
      onKeyUp,
      onKeyDown,
      'aria-haspopup': ariaHasPopUp,
      'aria-expanded': ariaExpanded,
      tabIndex,
      active = false,
      tone = 'secondary',
      data,
      children,
    },
    forwardedRef,
  ) => {
    const background = useBackground();
    const backgroundLightness = useBackgroundLightness();

    return (
      <Box
        component="button"
        type="button"
        ref={forwardedRef}
        cursor="pointer"
        outline="none"
        className={[styles.button, virtualTouchable()]}
        zIndex={0}
        aria-label={label}
        aria-haspopup={ariaHasPopUp}
        aria-expanded={ariaExpanded}
        title={label}
        onClick={onClick}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        transform={{ active: 'touchable' }}
        transition="touchable"
        tabIndex={tabIndex}
        {...(data ? buildDataAttributes(data) : undefined)}
      >
        <Box
          position="relative"
          display="flex"
          className={iconContainerSize()}
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          <Overlay
            background={
              background === 'body' ||
              background === 'card' ||
              background === 'input'
                ? 'neutralLight'
                : 'card'
            }
            transition="fast"
            borderRadius="full"
            className={[
              styles.hoverOverlay,
              active && styles.forceActive,
              backgroundLightness === 'dark' && styles.darkBackground,
            ]}
          />
          <Overlay
            boxShadow="outlineFocus"
            transition="fast"
            borderRadius="full"
            className={styles.focusOverlay}
            onlyVisibleForKeyboardNavigation
          />
          <Box position="relative" className={iconSize()}>
            {children({ size: 'fill', tone })}
          </Box>
        </Box>
      </Box>
    );
  },
);

import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import type { ButtonState } from './Button.types';

/**
 * The useButton hook processes the Button state.
 * @param state - Button state to mutate.
 */
export const useButtonState = (state: ButtonState): ButtonState => {
  const { as, children, disabled, disabledFocusable, icon, onClick, onKeyDown: onKeyDownCallback } = state;

  const receivedChildren = !!children;
  const receivedIcon = !!icon?.children;
  state.iconOnly = receivedIcon && !receivedChildren;

  const onNonAnchorOrButtonKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    onKeyDownCallback?.(ev);

    const key = ev.key;
    if (!ev.defaultPrevented && onClick && (key === Enter || key === Space)) {
      // Translate the keydown enter/space to a click.
      ev.preventDefault();
      ev.stopPropagation();

      onClick((ev as unknown) as React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>);
    }
  };

  // Adjust props depending on the root type.
  if (typeof as === 'string') {
    // Add 'role=button' and 'tabIndex=0' for all non-button elements.
    if (as !== 'button') {
      state.role = 'button';
      state.tabIndex = disabled && !disabledFocusable ? undefined : 0;

      // Add keydown event handler for all other non-anchor elements.
      if (as !== 'a') {
        state.onKeyDown = onNonAnchorOrButtonKeyDown;
      }
    }
  }
  // Add keydown event handler, 'role=button' and 'tabIndex=0' for all other elements.
  else {
    state.onKeyDown = onNonAnchorOrButtonKeyDown;
    state.role = 'button';
    state.tabIndex = disabled && !disabledFocusable ? undefined : 0;
  }

  // Disallow click event when component is disabled and eat events when disabledFocusable is set to true.
  state.onClick = (ev: React.MouseEvent<HTMLElement>) => {
    if (disabled || disabledFocusable) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  };

  // Disallow keydown event when component is disabled and eat events when disabledFocusable is set to true.
  const { onKeyDown } = state;
  state.onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    const key = ev.key;
    if ((disabled || disabledFocusable) && (key === Enter || key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDown?.(ev);
    }
  };

  // Set the aria-disabled and disabled props correctly.
  state.disabled = as === 'button' ? disabled && !disabledFocusable : undefined;
  state['aria-disabled'] = disabled && !state.disabled;

  return state;
};

## API Report File for "@fluentui/react-image"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { ComponentProps } from '@fluentui/react-utilities';
import type { ComponentState } from '@fluentui/react-utilities';
import type { IntrinsicShorthandProps } from '@fluentui/react-utilities';
import * as React_2 from 'react';

// @public
const Image_2: React_2.ForwardRefExoticComponent<ImageProps & React_2.RefAttributes<HTMLImageElement>>;
export { Image_2 as Image }

// @public (undocumented)
export type ImageCommons = {
    bordered?: boolean;
    fit?: 'none' | 'center' | 'contain' | 'cover';
    fluid?: boolean;
    circular?: boolean;
    rounded?: boolean;
};

// @public (undocumented)
export interface ImageProps extends ComponentProps<ImageSlots>, Partial<ImageCommons> {
}

// @public (undocumented)
export const imageShorthandProps: Array<keyof ImageSlots>;

// @public (undocumented)
export type ImageSlots = {
    root: IntrinsicShorthandProps<'img'>;
};

// @public (undocumented)
export interface ImageState extends ComponentState<ImageSlots>, ImageCommons {
}

// @public
export const renderImage: (state: ImageState) => JSX.Element;

// @public
export const useImage: (props: ImageProps, ref: React_2.Ref<HTMLImageElement>) => ImageState;

// @public (undocumented)
export const useImageStyles: (state: ImageState) => void;

// (No @packageDocumentation comment for this package)

```

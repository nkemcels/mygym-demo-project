import React, { ReactNode } from 'react';
import * as CSS from 'csstype';

type Props = {
  children: ReactNode;
  flexOne: boolean;
  flex: number;
  className: string;
  matchParent: boolean;
  textAlign: CSS.Property.TextAlign;
  textAlignCenter: boolean;
  style: CSS.Properties;
  width: number | string;
  height: number | string;
  padding: number | string;
  margin: number | string;
  position: CSS.Property.Position;
  insetsZero: boolean;
  scroll: boolean;
  inline: boolean;
};

const Block = ({
  children,
  flexOne,
  flex,
  matchParent,
  textAlign,
  textAlignCenter,
  style,
  width,
  height,
  padding,
  margin,
  position,
  insetsZero,
  scroll,
  inline,
  ...restProps
}: Partial<Props>) => (
  <div
    style={{
      display: inline ? 'inline-block' : 'block',
      flex: flexOne ? 1 : flex,

      textAlign: textAlignCenter ? 'center' : textAlign,
      ...(matchParent ? { width: '100%', height: '100%' } : {}),
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
      ...(padding ? { padding } : {}),
      ...(margin ? { margin } : {}),
      ...(position ? { position } : {}),
      ...(insetsZero ? { top: 0, bottom: 0, left: 0, right: 0 } : {}),
      ...(scroll ? { overflowX: 'auto', overflowY: 'auto' } : {}),
      ...style,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
  >
    {children}
  </div>
);

export default Block;

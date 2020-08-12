import React, { ReactNode } from 'react';
import CSS from 'csstype';

type Props = {
  children: ReactNode;
  flexOne: boolean;
  flex: number;
  column: boolean;
  className: string;
  wrap: boolean;
  justifyCenter: boolean;
  justifyContent: CSS.Property.JustifyContent;
  alignCenter: boolean;
  alignItems: CSS.Property.AlignItems;
  matchParent: boolean;
  textAlign: CSS.Property.TextAlign;
  textAlignCenter: boolean;
  style: CSS.Properties;
  width: number | string;
  height: number | string;
  padding: number | string;
  margin: number | string;
  inline: boolean;
};

const FlexBlock = ({
  column,
  justifyCenter,
  justifyContent,
  alignCenter,
  alignItems,
  children,
  matchParent,
  flexOne,
  flex,
  wrap,
  style,
  width,
  height,
  padding,
  margin,
  ...restProps
}: Partial<Props>) => (
  <div
    style={{
      display: 'flex',
      flexDirection: column ? 'column' : 'row',
      justifyContent: justifyCenter ? 'center' : justifyContent,
      alignItems: alignCenter ? 'center' : alignItems,
      flex: flexOne ? 1 : flex,
      flexWrap: wrap ? 'wrap' : undefined,
      ...(matchParent ? { width: '100%', height: '100%' } : {}),
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
      ...(padding ? { padding } : {}),
      ...(margin ? { margin } : {}),
      ...style,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
  >
    {children}
  </div>
);

export default FlexBlock;

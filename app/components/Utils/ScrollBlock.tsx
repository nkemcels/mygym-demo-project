import React, {ReactNode} from "react";
import CSS from "csstype"

type Props = {
    children: ReactNode,
    flexOne: boolean,
    flex: number,
    className: string,
    vScroll: boolean,
    matchParent: boolean,
    textAlign: CSS.TextAlignProperty,
    textAlignCenter: boolean,
    style :CSS.Properties,
    width: number | string,
    height: number | string,
    padding: number | string,
    margin: number | string,
    inline: boolean
}

export const ScrollBlock = ({
    children,
    flexOne,
    flex,
    matchParent,
    textAlign,
    textAlignCenter,
    vScroll,
    width,
    height,
    style,
    ...restProps
}:Partial<Props>) => (
    <div style={{
        position: "relative",
        display:"block", 
        flex:flexOne?1:flex,
        textAlign: textAlignCenter? "center": textAlign,
        ...(matchParent?{width:"100%", height:"100%"}:{}),
        ...(width?{width}:{}),
        ...(height?{height}:{}),
        ...style
    }} 
    {...restProps}>
        <div style={{position:"absolute", top:0, left:0, bottom:0, right:0, overflowY:"auto", overflowX:vScroll?"auto":undefined}}>
            {children}
        </div>
    </div>
)

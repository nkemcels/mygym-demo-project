import React from 'react';
import Block from '../Utils/Block';
import { BankOutlined, ReloadOutlined } from '@ant-design/icons';
import FlexBlock from '../Utils/FlexBlock';
import { Button } from 'antd';

type Props = {
    onRefreshDevices: () => void;
}

const Header = ({onRefreshDevices}:Props) => {
  return (
    <FlexBlock className="header" justifyContent="space-between">
      <Block>
        <h2 className="app-name">
          <BankOutlined style={{ fontSize: 25, marginRight: 5 }} /> MyGYM
        </h2>
      </Block>
      <Block>
        <Button danger onClick={onRefreshDevices}>
          <ReloadOutlined /> Refresh Webcam List
        </Button>
      </Block>
    </FlexBlock>
  );
};

export default Header;

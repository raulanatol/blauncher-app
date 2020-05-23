import React, { FC, useState } from 'react';
import { Treebeard } from 'react-treebeard';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 100%;
`;

const INITIAL_DATA = {
  toggled: true,
  children: [
    {
      name: 'Slack',
      children: [
        { name: 'Enter focus mode' },
        { name: 'Exit focus mode' },
        { name: 'Do not disturb' },
        { name: 'Exit do not disturb' }
      ]
    },
    {
      name: 'Zoom',
      children: [
        { name: 'Create meeting' }
      ]
    }
  ]
};

export const ActionTree: FC = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [cursor, setCursor] = useState<any>();

  const handleOnToggle = (node, toggled) => {
    console.log('>>>', node, toggled);
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data));
  };

  return <Container>
    <Treebeard data={data} onToggle={handleOnToggle}/>
  </Container>;
};

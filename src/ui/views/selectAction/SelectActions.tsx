import React, { FC, useState } from 'react';
import { Heading, SimpleGrid } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { ActionGrid } from '../board/components/ActionGrid';
import { useStoreContext } from '../../state/AppContextProvider';

const Container = styled.div`
  margin: 10px;
  text-align: center;
`;

const Body = styled.div`
  display: flex;
`;

const LeftColumn = styled.div`
  margin: 10px;
  width: 80px;

  & > ul {
    vertical-align: middle;
    padding: 10px;
    list-style: none;
  }
`;

export interface ActionDefinition {
  id: number;
  title: string;
  group: string;
  description: string;
}

interface SelectActions {
  [key: number]: ActionDefinition;
}

const ACTIONS: SelectActions = {
  10: { id: 10, group: 'Slack', title: 'Enter focus mode', description: '' },
  11: { id: 11, group: 'Slack', title: 'Exit focus mode', description: '' },
  12: { id: 12, group: 'Slack', title: 'Do not disturb', description: '' },
  13: { id: 13, group: 'Slack', title: 'Exit do not disturb', description: '' },
  20: { id: 20, group: 'Zoom', title: 'Create meeting', description: '' }
};

const ACTION_GROUPS: string[] = Array.from(new Set(Object.values(ACTIONS).map(action => action.group)));

const byGroup = (group: string) => action => action.group === group;

export const SelectAction: FC = () => {
  const [currentActions, setCurrentActions] = useState<ActionDefinition[]>();

  const store = useStoreContext();

  const selectAction = group => () => setCurrentActions(Object.values(ACTIONS).filter(byGroup(group)));

  const handleOnSelectActionItem = (item: ActionDefinition) => store.assignActionToCurrentKey(item);

  return <Container>
    <Heading>Select an action for the current key...</Heading>
    <Body>
      <LeftColumn>
        <ul>
          {ACTION_GROUPS.map(group => <li key={group} onClick={selectAction(group)}>{group}</li>)}
        </ul>
      </LeftColumn>
      <SimpleGrid>
        {currentActions && <ActionGrid actions={currentActions} onSelectAction={handleOnSelectActionItem}/>}
      </SimpleGrid>
    </Body>
  </Container>;
};

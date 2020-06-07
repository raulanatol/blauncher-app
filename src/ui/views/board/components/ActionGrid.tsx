import React, { FC } from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { ActionItem } from './ActionItem';
import { ActionDefinition } from '../../selectAction/SelectActions';

interface ActionGridProps {
  actions: ActionDefinition[];
  onSelectAction: (actionItem: ActionDefinition) => void;
}

export const ActionGrid: FC<ActionGridProps> = ({ actions, onSelectAction }) => {
  return <div>
    <SimpleGrid spacing={5} columns={3}>
      {actions.map(action => <ActionItem key={action.id} action={action} onClick={onSelectAction}/>)}
    </SimpleGrid>
  </div>;
};

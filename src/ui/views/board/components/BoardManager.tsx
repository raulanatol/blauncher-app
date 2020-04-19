import React, { FC } from 'react';
import boardImage from './board.png';
import styled from '@emotion/styled';
import { Area } from './Area';
import { SelectedArea } from './SelectedArea';

const Container = styled.div`
  width: 500px;
  height: 299px;
  position:absolute;
`;

const Image = styled.img`
  position: absolute;
  top:0;
  left: 0;
  user-select: none;
`;

const INITIAL_AREA = [47, 52];
const BUTTON_SIZE = [38, 38];
const GAP = [14, 14];
const AREAS = generateAreas(8, 4);

function generateAreas(columns: number, rows: number) {
  let xCounter = INITIAL_AREA[0];
  let yCounter = INITIAL_AREA[1];
  let areaId = 0;
  const areas = {};
  for (let row = 0; row < rows; row++) {
    xCounter = INITIAL_AREA[0];
    for (let col = 0; col < columns; col++) {
      areas[areaId] = [xCounter, yCounter, xCounter + BUTTON_SIZE[0], yCounter + BUTTON_SIZE[1]].join(',');
      xCounter += BUTTON_SIZE[0] + GAP[0];
      areaId++;
    }
    yCounter += BUTTON_SIZE[1] + GAP[1];
  }
  return areas;
}


export const BoardManager: FC = () => {

  const handleClick = number => {
    console.log('>', number);
  };

  return <Container>
    <map name="map">
      <SelectedArea areas={AREAS}/>
      {Object.keys(AREAS).map(areaId => <Area key={areaId} keyValue={areaId} coords={AREAS[areaId]} onClick={handleClick}/>)}
    </map>
    <Image alt="board" width={500} height={299} src={boardImage} useMap="#map"/>
  </Container>;
};

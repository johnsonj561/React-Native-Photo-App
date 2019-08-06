import { TextInput as PaperTextInput, Card } from 'react-native-paper';
import styled from 'styled-components';

export const TextInput = styled(PaperTextInput)`
  background-color: white;
`;

export const CardContainer = styled(Card)`
  flex-direction: row;
  padding: 15px 5px;
`;

export const CardButtonGroup = styled(Card.Actions)`
  margin-top: 10px;
  justify-content: space-evenly;
`;

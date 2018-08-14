import React from 'react';
import styled from 'styled-components';
import { SendMoneyForm } from '../SendMoneyForm';
import { AccountPage } from '../AccountPage';
import { media } from '../../style/media';

const Main = styled.main`
  display: flex;
  align-items: stretch;
  text-align: left;
  padding-top: 4.75em; /* 76px / 16px */
  min-width: 20em;
  ${media.phone`flex-direction: column;`};
`;

const LeftSection = styled.section`
  flex: 1;
  border-right: 1px solid ${props => props.theme.verticalSeparatorColor};
  ${media.phone`
    border-right-width: 0;
    border-bottom: 1px solid ${props => props.theme.verticalSeparatorColor};
    padding-bottom: 2em;
  `};
`;
const RightSection = styled.section`
  flex: 1;
  ${media.phone`margin-top: 2em;`};
`;
const InnerSection = styled.div`
  width: 67.1875%;
  margin: auto;
`;

/** Top level component */
export const App = () => (
  <Main>
    <LeftSection>
      <InnerSection>
        <SendMoneyForm />
      </InnerSection>
    </LeftSection>
    <RightSection>
      <InnerSection>
        <AccountPage />
      </InnerSection>
    </RightSection>
  </Main>
);

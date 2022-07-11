import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';

import FilterCard from '../ui/filterCard';
import FilterBottomTab from '../ui/FilterBottomTab';
import ExcludeIncludeFilterCard from '../ui/excludeIncludeFilterCard';

import globalApeFilter from '../../utils/globalFilter';
import eventBus from '../../utils/eventBus';
import KodaAdvancedFilterModal from './koda_advanced';



const AdvancedCard = styled.div`
  font-family: 'Chakra Petch';
  font-style: normal;
  background: #1A1A1A;
  border-radius: 12px;
  border:  ${props => props.active ? '1px solid rgba(255, 255, 255, 1)': '1px solid transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 21px 19px 9px 19px;
  margin: 4px;
  user-select: none; /* Standard */

`;

const CardDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 11px 24px 11px 16px;
  background: #1A1A1A;
  border-radius: 12px;
  margin: 6px;
`;

const Title = styled.div`
  font-family: 'Chakra Petch';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: #FFFFFF;
  justify-content: center;
`;

const Subtitle = styled.div`
  font-family: 'Chakra Petch';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: rgba(255, 255, 255, 0.4);

`;

/*
    5 items to be filterd, need  getter and setter for all 5
    Using props.xyz instead of direct names because too many params :(
        Params:
        - sediment_tier
        - sediment
        - category
        - tier
        - enviorment
 */



export const clearKodaFilters = () => {
    globalApeFilter.clearFilter('Koda', 'in');
    globalApeFilter.clearFilter('Koda', 'include');
    globalApeFilter.clearFilter('Koda', 'exclude');
    globalApeFilter.clearFilter('KodaAdvanced', 'or');
    globalApeFilter.clearFilter('Weapon', 'include');
    globalApeFilter.clearFilter('Clothing', 'include');
    globalApeFilter.clearFilter('Mega', 'include');
    globalApeFilter.applyFilter();
    eventBus.dispatch('filter-applied',{});
};


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
export default function KodaFilterModal(props: any) {   
    const forceUpdate = useForceUpdate();
    const [showAdvanced, setShowAdvanced] = useState(false);

    const clearFilters = () => {
        clearKodaFilters();
        forceUpdate();
    };


    const applyFilters = () => {
        
    };


    const Card = ({title, subtitle}: any) => {
        return (
            <CardDesign>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </CardDesign>
        );
    }

    return (
        <ModalContainer>
            {(!showAdvanced) && (<>
                <FilterSectionTitle>Koda</FilterSectionTitle>

                <div style={{display: 'flex', marginTop: 8, marginBottom: 8, marginLeft: -6, marginRight: -6}}>
                    <ExcludeIncludeFilterCard
                        mainElemName="Koda"
                        title="Kodas Only"
                        eTitle="Exclude Kodas"
                        showExclude={true}
                    >
                    </ExcludeIncludeFilterCard>
                </div>
                <div style={{display: 'flex', marginTop: 8, marginBottom: 8, marginLeft: -6, marginRight: -6}}>
                    <ExcludeIncludeFilterCard
                        mainElemName="Mega"
                        title="Mega Koda"
                    >
                    </ExcludeIncludeFilterCard>
                    <ExcludeIncludeFilterCard
                        mainElemName="Weapon"
                        title="Weapons Koda"
                    >
                    </ExcludeIncludeFilterCard>
                    <ExcludeIncludeFilterCard
                        mainElemName="Clothing"
                        title="Clothed Koda"
                    >
                    </ExcludeIncludeFilterCard>
                    <AdvancedCard className='hover border-hover'
                                  onClick={()=> setShowAdvanced(true)} >
                        <Title style={{marginTop: 0}}>
                            Advanced Filter
                        </Title>
                    </AdvancedCard>
                </div>
            </>
            )}
            {(showAdvanced) && (
                <KodaAdvancedFilterModal
                    setShowAdvanced={setShowAdvanced} />
            )}
            <FilterBottomTab clearFilters={clearFilters}/>


        </ModalContainer>
    );
}

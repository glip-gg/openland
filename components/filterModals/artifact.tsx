import {useState} from  'react';
import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import ChipList from '../ui/chipList';
import FilterBottomTab from '../ui/FilterBottomTab';

import ExcludeIncludeFilterCard from '../ui/excludeIncludeFilterCard';

import {
    Input, 
} from '@nextui-org/react';
import { on } from 'events';

import eventBus from '../../utils/eventBus';
import globalApeFilter from '../../utils/globalFilter';  

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

    color: #FFFFFF;
    justify-content: flex-start;
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


const type_data: Array<String> = ['Ancient Coin', 'Anthony', 'Archway', 'Archway Keystone', 'Banana Peel', 'Blade of Eternum', 'Blue Orb', 'Camp Fire', 'Card from a Deck', 'Celestial Egg', 'Celestial Heart', 'Celestial Orb', 'Celestial Tear', 'Chest of Holding', 'Chomps', 'Cryptid', 'Daniel', 'Fairy in a Jar', 'Fire Sale Scroll', 'Foretelling Scroll', 'Forged Axe', 'Forged Hammer', 'Forged Pickaxe', 'Forged Shovel', 'Glass Eye', 'Green Obelisk', 'Jar of Koda Farts', 'Jules', "Knight's Pail", 'Koda Axe', 'Koda Hammer', 'Koda Pickaxe', 'Koda Shovel', 'Lapis', 'Leo', 'Lovans', 'Magic Powder', 'Marcin', 'Mecha Piece', 'Mia', 'Mirror Mirror', 'Monkey Barrel', 'Mystery Potion', 'Mystic Triangles', 'Mystical Crown', "Pandora's Box", 'Portal Piece', 'Raven', 'Red Obelisk', 'Red Orb', 'Relic Book Page', 'Relic Card', 'Romain', 'Rugged Axe', 'Rugged Hammer', 'Rugged Pickaxe', 'Rugged Shovel', 'Sands of Time', 'Santiago', 'Slime Juice', 'Sloth Juice', 'Sooper Box', 'Sticky Cauldron', 'Sword of Chosen', 'Tavo', 'Tazer', 'Toto', 'Unknown Map', 'Vivec', 'Whale Statue', 'Whim', 'Yellow Obelisk', 'Yellow Orb', 'Z'];


const type_cards = type_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

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


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export const clearArtifactFilters = () => {
    globalApeFilter.clearFilter('Artifact', 'in');
    globalApeFilter.clearFilter('Artifact', 'include');
    globalApeFilter.clearFilter('Artifact', 'exclude');
    globalApeFilter.applyFilter();
    eventBus.dispatch('filter-applied',{});
};

export default function ArtifactFilterModal(props: any) {    
    const forceUpdate = useForceUpdate();
    const [filteredCards, setFilteredCards] = useState(type_data);
    
    const [name, setName] = useState('');
    
        
    const clearFilters = () => {
        clearArtifactFilters();
        forceUpdate();
    };


    const applyFilters = () => {
        
    };

    const textFilter = (e: any) => {
        const keyword = e.target.value;
        
        if (keyword !== '') {
            const results = type_data.filter((user) => {
                return user.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFilteredCards(results);
        } else {
            setFilteredCards(type_data);
            // If the text field is empty, show all users
        }
        
        setName(keyword);
    };

    const setFilters = (name:string, val:string|number, active:boolean) => {
        if(active){
            globalApeFilter.addFilter(name, [val], 'in');
        }
        else{
            globalApeFilter.removeFilter(name, [val], 'in');
        }
    };

    const type_cards = filteredCards.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${item}`} mainElemName="Artifact" title={item}
                                                                          onChange={setFilters} active={false}/>);
    
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
            <FilterSectionTitle>Artifacts</FilterSectionTitle>
            <Input
                clearable
                onChange={textFilter}
                value={name}
                contentRightStyling={false}
                placeholder="Search"
            />

            <div style={{
                display: 'flex', marginTop: 8,
                marginBottom: 8, marginLeft: -6, marginRight: -6}}>
                <ExcludeIncludeFilterCard
                    mainElemName="Artifact"
                    title="Artifacts Only"
                    eTitle="Exclude Artifacts"
                    showExclude={true}
                >
                </ExcludeIncludeFilterCard>
            </div>


            <FlexWrapWrapper type={'card'}>

                <ChipList data={filteredCards}
                          mainElemName="Artifact"></ChipList>
            </FlexWrapWrapper>


            <FilterBottomTab clearFilters={clearFilters} />


        </ModalContainer>
    );
}

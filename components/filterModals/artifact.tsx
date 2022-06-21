import {useState} from  'react';
import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';
import {
    Input, 
  } from '@nextui-org/react';
import { on } from 'events';
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


const type_data: Array<String> = ["Forged Pickaxe","Red Orb","Rugged Pickaxe","Fire Sale Scroll","Celestial Tear","Whim","Cryptid","Forged Hammer","Vivec","Banana Peel","Rugged Hammer","Mystic Triangles","Koda Hammer","Glass Eye","Ancient Coin","Rugged Shovel","Jar of Koda Farts","Sticky Cauldron","Koda Axe","Sooper Box","Monkey Barrel","Rugged Axe","Sands of Time","Knight's Pail","Sloth Juice","Mystical Crown","Slime Juice","Card from a Deck","Relic Card","Whale Statue","Daniel","Tazer","Camp Fire","Celestial Orb","Celestial Heart","Blue Orb","Chomps","Tavo","Anthony","Magic Powder","Toto","Santiago","Z","Marcin","Forged Shovel","Forged Axe","Koda Shovel","Fairy in a Jar","Lovans","Chest of Holding","Koda Pickaxe","Unknown Map","Lapis","Yellow Orb","Leo","Mia","Yellow Obelisk","Romain","Jules","Mecha Piece","Raven","Pandora's Box","Mirror Mirror","Sword of Chosen","Portal Piece","Foretelling Scroll","Relic Book Page","Red Obelisk","Green Obelisk","Blade of Eternum","Archway","Celestial Egg","Mystery Potion","Archway Keystone"];

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

export default function ArtifactFilterModal(props: any) {    

    const [filteredCards, setFilteredCards] = useState(type_data);
    
    const [name, setName] = useState('');
    
    const clearFilters = () => {

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

          <div style={{display: 'flex', marginTop: 8, marginBottom: 8, marginLeft: -6, marginRight: -6}}>
            <Card className='hover' title={'Artifacts only'} subtitle={'4.34Ξ (4,000)'} />
            <Card className='hover' title={'Exclude artifacts'} subtitle={'4.34Ξ (4,000)'} />
          </div>


          <FlexWrapWrapper type={'card'}>
            {type_cards}
          </FlexWrapWrapper>


          <FilterBottomTab />


        </ModalContainer>
    );
}

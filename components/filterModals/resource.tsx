import styled from 'styled-components';
import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import ModalContainer from './ModalContainer';
import ChipList from '../ui/chipList';
import FilterSectionTitle from '../ui/FilterSectionTitle';
import FlexWrapWrapper from '../ui/FlexWrapWrapper';
import Chip from '../ui/chip';
import FilterBottomTab from '../ui/FilterBottomTab';
import {
    Input, 
  } from '@nextui-org/react';


const direction_data: Array<String> = ['All', 'S', 'W', 'E', 'N'];
const direction_chips = direction_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

const tier_data: Array<String> = ['All', '1', '2', '3'];
const tier_chips = tier_data.map((item: any, index: any) => <Chip key={`sediment-tier-chip-${index}`} title={item} active={false}/>);

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
const resource_data: Array<String> = ['All', "Whisper","Bonestone","Spikeweed","Lunarian","Lumileaf","Oblivion","Nether","Duskia","Runa","Coralia","Brimstone","Luster","Chlorocite","Psychosilk","Tantalite","Moldium","Petrified","Fossica","Luminite","Kinsoul","Durinia","Ragnarock","Stonecrop","Sulfirica","Fortuna","Glowpod","Steppesalt","Degradia","Mossmoon","Fragmentia","Amberskull","Omni","Hollowcine","Thermodite","Etheria","Bubonium","Gloomia","Opalia","Sporicite","Galactica","Shatterfrost","Tanglevine","Claymer","Slushia","Maltosia","Slaglia","Void","Scumbria","Element 115","Vaporhaze","Spiritseep","Nocturna","Nebula","Rotworth","Scholara","Prysmatica","Abyssia","Onyx","Aurelian","Magentia","Pyrum","Geopillar","Dimensional","Pricklia","Senticybia","Entropy","Mallo","Nucleod","Obsilica","Brineslime","Chroma","Entradium","Lapidite","Phantom"];



export default function ResourceFilterModal(props: any) {

    const [filteredCards, setFilteredCards] = useState(resource_data);
    const [name, setName] = useState('');
    
    const clearFilters = () => {};
    const applyFilters = () => {};

    const textFilter = (e: any) => {
        const keyword = e.target.value;
        
        if (keyword !== '') {
            const results = resource_data.filter((user) => {
                return user.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFilteredCards(results);
        } else {
            setFilteredCards(resource_data);
            // If the text field is empty, show all users
        }
        
        setName(keyword);
    };

    const type_chips = filteredCards.map((item: any, index: any) => <Chip key={`resource-tier-chip-${item}`} title={item} active={false}/>);
    
    return (
        <ModalContainer>

          <FilterSectionTitle>Resources</FilterSectionTitle>

          <Input
              clearable
              onChange={textFilter}
              value={name}
              contentRightStyling={false}
              placeholder="Search"                
          />

          <FilterSectionTitle>Direction</FilterSectionTitle>
          <FlexWrapWrapper type={'chip'}>
            <ChipList data={direction_data}
                      mainElemName="Direction"></ChipList>
          </FlexWrapWrapper>
          <FilterSectionTitle>Tier</FilterSectionTitle>
          <FlexWrapWrapper type={'chip'}>
            {tier_chips}
          </FlexWrapWrapper>
          <FilterSectionTitle>Type</FilterSectionTitle>
          <FlexWrapWrapper type={'card'}>
            {type_chips}
          </FlexWrapWrapper>


          <FilterBottomTab />


        </ModalContainer>
    );
}

import styled from 'styled-components';
import { useState } from 'react';
import { Dropdown } from "rsuite";


export default function SortingDropDown({filters}: any) {
    const [title, setTitle] = useState('ENDING SOON');
    const [active, setActive] = useState('ending');

    const selectedComponent = (title: any, active: any) => {
        setTitle(title);
        setActive(active);
    }
    
    const dropdownItems = filters.map((item: any, index: any) => <Dropdown.Item key={`sortingdropdown-${index}`}>{item}</Dropdown.Item> );

    return (
        <Dropdown
            style={{background: 'transparent', color: '#fff'}}
            trigger="click"
            title={title}
            placement="bottomEnd">
            <Dropdown.Item onSelect={() => set} className={'dropdown-item'} active={active == 'recent'} key={`sortingdropdown-recent`}>RECENTLY LISTED</Dropdown.Item>
            <Dropdown.Item className={'dropdown-item'} active={active == 'ending'} key={`sortingdropdown-ending`}>ENDING SOON</Dropdown.Item>
            <Dropdown.Item className={'dropdown-item'} active={active == 'lth'} key={`sortingdropdown-lth`}>PRICE: LOW TO HIGH</Dropdown.Item>
            <Dropdown.Item className={'dropdown-item'} active={active == 'htl'} key={`sortingdropdown-htl`}>PRICE: HIGH TO LOW</Dropdown.Item>
            <Dropdown.Item className={'dropdown-item'} active={active == 'highest'} key={`sortingdropdown-highest`}>HIGHEST LAST SALE</Dropdown.Item>
        </Dropdown>
    );
}

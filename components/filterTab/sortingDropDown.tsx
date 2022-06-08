import styled from 'styled-components';
import { useState } from 'react';
import { Dropdown } from "rsuite";


export default function SortingDropDown() {
    const [title, setTitle] = useState('ENDING SOON');
    const [active, setActive] = useState('ending');

    const selectedComponent = (title: any, active: any) => {
        setTitle(title);
        setActive(active);
    }    

    return (
        <Dropdown
                style={{background: 'transparent', color: '#fff'}}
                trigger="click"
                title={title}
                placement="bottomEnd">
            <Dropdown.Item onSelect={() => selectedComponent('RECENTLY LISTED', 'recent')} className={'dropdown-item'} active={active == 'recent'} key={`sortingdropdown-recent`}>RECENTLY LISTED</Dropdown.Item>
            <Dropdown.Item onSelect={() => selectedComponent('ENDING SOON', 'ending')} className={'dropdown-item'} active={active == 'ending'} key={`sortingdropdown-ending`}>ENDING SOON</Dropdown.Item>
            <Dropdown.Item onSelect={() => selectedComponent('PRICE: LOW TO HIGH', 'lth')} className={'dropdown-item'} active={active == 'lth'} key={`sortingdropdown-lth`}>PRICE: LOW TO HIGH</Dropdown.Item>
            <Dropdown.Item onSelect={() => selectedComponent('PRICE: HIGH TO LOW', 'htl')} className={'dropdown-item'} active={active == 'htl'} key={`sortingdropdown-htl`}>PRICE: HIGH TO LOW</Dropdown.Item>
            <Dropdown.Item onSelect={() => selectedComponent('HIGHEST LAST SALE', 'highest')} className={'dropdown-item'} active={active == 'highest'} key={`sortingdropdown-highest`}>HIGHEST LAST SALE</Dropdown.Item>
        </Dropdown>
    );
}

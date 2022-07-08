import styled from 'styled-components';
import { useState } from 'react';
import { Dropdown } from "rsuite";
import { SORTING_OPTIONS } from '../../utils/apeDeedsModelManager';
import { event } from "nextjs-google-analytics";

export default function SortingDropDown(props:any) {
    const [title, setTitle] = useState(Object.values(props.sortingOption)[0]);
    const [active, setActive] = useState(Object.keys(props.sortingOption)[0]);

    const selectedComponent = (title: any, active: any, sortingOption:any) => {
        setTitle(title);
        setActive(active);
        props.setSortingOption(sortingOption)
        event("sorting_changed", {
            category: title,
        });
    }    

    return (
        <Dropdown
            style={{background: 'transparent', color: '#fff'}}
            menuStyle={{backgroundColor:'black'}}
            trigger="click"
            title={title}
            placement="bottomEnd">
          {SORTING_OPTIONS.map(function(d, idx){
              return (<Dropdown.Item onSelect={() => selectedComponent(Object.values(d)[0] , Object.keys(d)[0], d)} className={'dropdown-item'} active={active == 'recent'} key={`sortingdropdown-${Object.keys(d)[0]}`}>{Object.values(d)[0]}</Dropdown.Item>)
          })}
        </Dropdown>
    );
}

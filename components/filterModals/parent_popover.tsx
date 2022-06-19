import React from 'react';
import { Popover } from 'rsuite'
import ArtifactFilterModal from './artifact';
import ResourceFilterModal from './resource';
import LandFilterModal from './land';
import KodaFilterModal from './koda';
import KodaAdvancedFilterModal from './koda_advanced';
import RankFilterModal from './rank';
import PriceFilterModal from './price';

// eslint-disable-next-line react/display-name
export const DefaultPopover = React.forwardRef(({ type, title, ...props }: any, ref) => {
    let content: any;
    if(type == 'land') content = LandFilterModal;
    if(type == 'resource') content = ResourceFilterModal;
    if(type == 'artifact') content = ArtifactFilterModal;
    if(type == 'price') content = PriceFilterModal;
    if(type == 'rank') content = RankFilterModal;
    if(type == 'koda') content = KodaFilterModal;
    if(type == 'koda_advanced') content = KodaAdvancedFilterModal;
    console.log(content);

    return (
        <Popover
            arrow={false}
            style={{background: 'black', color: '#fff', zIndex:999}}
            ref={ref} {...props}>
          {content()}
        </Popover>
    );
});

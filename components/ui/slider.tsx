
import { Spacer } from '@nextui-org/react';
import { RangeSlider, InputGroup, InputNumber } from 'rsuite'

/*
    4 params
        Params:
        - icon
        - title
        - subtitle
        - active
        # no redux so onclick function will be a param mostly
 */

export default function Slider({start, end, min, max, setValue, setValueWrapper}: any) {
    
    
    
    const cardClick = () => {
        // setChipActive(!chipActive);
    };

    return (
        <div>
            <RangeSlider
                className='rs-theme-dark'
                min={min}
                max={max}
                defaultValue={[start, end]}                
                constraint={([start, end]) => start >= min && end <= max}
                onChangeCommitted={value => {
                    console.log('wow value', value)
                    setValueWrapper(value);
                }}
                onChange={value => {
                    setValue(value);
                }}
                value={[start, end]}
            />
            <Spacer y={1} />
            <InputGroup className='rs-theme-dark'>
                <InputNumber
                    className='rs-theme-dark'
                    min={min}
                    max={max}
                    value={start}
                    onChange={nextValue => {
                        if (nextValue > end) {
                            return;
                        }
                        setValueWrapper([nextValue, end]);
                    }}
                />
                <InputGroup.Addon className='rs-theme-dark'>-</InputGroup.Addon>
                <InputNumber
                    className='rs-theme-dark'
                    min={min}
                    max={max}
                    value={end}
                    onChange={nextValue => {
                        if (start > nextValue) {
                            return;
                        }
                        setValueWrapper([start, nextValue]);
                    }}
                />
            </InputGroup>
        </div>
    );
}

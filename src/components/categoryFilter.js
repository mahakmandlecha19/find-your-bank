import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export const CategoryFilter = ({ column , isChanged}) => {
    
    const { filterValue, setFilter } = column;
    const [ value, setValue ] = useState(filterValue);
    
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined )
    }, 1000)
const clearAll =  () => {
    if(value!=null)
        setValue("");
}
    return(
        <span>
            <input value={value || ''} 
                placeholder='Search'
                onChange = {(e) => {
                    onChange(undefined);
                    
                    setValue(e.target.value);
                    onChange(e.target.value);  
                    
                }}         
            />
        </span>
    )
}
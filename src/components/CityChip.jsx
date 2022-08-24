import React, {useState} from 'react';
import {Chip, Stack} from "@mui/material";

const CityChip = () => {
    const [chipData, setChipData] = useState([
        {key: 0, label: 'Kiev'},
        {key: 1, label: 'Zaporizhzhia'},
        {key: 3, label: 'Kiev'},
        {key: 4, label: 'Odessa'},
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            {chipData.map((data) => {
                return (
                    <Chip
                        key={data.key}
                        label={data.label}
                        color="success"
                        onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                    />
                );
            })}
        </Stack>
    );
};

export default CityChip;
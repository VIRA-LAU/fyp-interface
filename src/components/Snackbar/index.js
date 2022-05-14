import React from 'react';
import Button from '@mui/material/Button';
import {useSnackbar} from 'notistack';

function CustomSnackBar() {
    const {enqueueSnackbar} = useSnackbar();

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('Player Has Been Assigned!', {variant});
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
        </React.Fragment>
    );
}

export default CustomSnackBar


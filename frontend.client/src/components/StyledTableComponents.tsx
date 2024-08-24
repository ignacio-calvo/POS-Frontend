import { TableCell, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableContainer = styled(TableContainer)({
    minWidth: 650,
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
}));

export const StyledTableHeaderCell = styled(StyledTableCell)({
    fontWeight: 'bold',
    backgroundColor: theme => theme.palette.primary.main,
    color: theme => theme.palette.primary.contrastText,
});

import { TableCell, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles/createTheme';

export const StyledTableContainer = styled(TableContainer)({
    minWidth: 650,
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
}));

const boldFontWeight = 'bold';

export const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }: { theme: Theme }) => ({
    fontWeight: boldFontWeight,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

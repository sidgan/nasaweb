import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'iau', label: 'IAU Number', minWidth: 100 },
  {
    id: 'total',
    label: 'Total Number',
    minWidth: 170,
  },
];

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '67vh',
    marginTop: '100px',
    marginBottom: '175px',
    marginLeft: '250px',
    top: '50px',
  },
  container: {
    maxHeight: 600,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    let newRows = [];

    let names = [];
    props.markers.forEach((m) => {
      if (m.type === 'meteor' && m.iau !== 0) {
        // Count the occurences
        var num = props.markers.reduce(function (n, person) {
          return n + (person.iau === m.iau);
        }, 0);

        let object = {
          name: m.name,
          iau: m.iau,
          total: num,
        };

        // Check existing listings for object
        if (newRows.some((obj) => obj.name === m.name)) {
          console.log('Already recorded');
        } else {
          names.push(m.name);
          // Append to existing rows
          newRows.push(object);
        }
      }
    });

    setRows([...newRows]);
  }, [props.markers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid
      container
      color="secondary"
      className={classes.root}
      variant="outlined"
    >
      <Grid item xs={12}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: '#474E74',
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        padding: '5px',
                        fontSize: '15px',
                        lineHeight: '18.5px',
                        color: 'textPrimary',
                      }}
                    >
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.iau}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Typography
                              variant="h6"
                              style={{
                                padding: '5px',
                                fontSize: '12px',
                                lineHeight: '18.5px',
                                color: 'textPrimary',
                              }}
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}

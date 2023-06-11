import React, { FC } from "react";
import {
  TextField,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableSortLabel,
  TableHead,
  TableFooter,
  TablePagination,
  TableBody,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";

type Sort = ["asc" | "desc", string];

type UseSortingLabelProps = {
  onChange: (sort: Sort | null) => void;
};

const useSortingLabel = ({ onChange }: UseSortingLabelProps) => {
  const [sort, _setSort] = React.useState<Sort | null>(null);
  const [direction = null, field = null] = sort ?? [];

  const setSort = (newSort: Sort | null) => {
    onChange(newSort);
    _setSort(newSort);
  };

  const handleLabelClick = (fieldName: string) => {
    if (field !== fieldName) {
      return setSort(["desc", fieldName]);
    }

    if (direction === "desc") {
      return setSort(["asc", fieldName]);
    }

    if (direction === "asc") {
      return setSort(null);
    }
  };

  return {
    handleLabelClick,
    activeItem: field,
    direction,
  };
};

const data = [
  {
    id: "12312",
    onCreated: new Date().toISOString(),
    channelId: "123123123123",
    member: "Shampinon",
    message: "Meesafgwewq",
  },
  {
    id: "12313",
    onCreated: new Date().toISOString(),
    channelId: "123123121233123",
    member: "Shampinon2",
    message: "Meesafgwe12312wq",
  },
  {
    id: "12314",
    onCreated: new Date().toISOString(),
    channelId: "123123123123",
    member: "Shampinsadon",
    message: "Meesafgwew12312q",
  },
];

export const Logs: FC = () => {
  const formik = useFormik({
    initialValues: {
      channelId: "",
      memberId: "",
      message: "",
      page: 0,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const { activeItem, direction, handleLabelClick } = useSortingLabel({
    onChange: (sort) => formik.setFieldValue("sort", sort),
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ verticalAlign: "bottom" }}>
              <TableSortLabel
                active={activeItem === "onCreated"}
                direction={activeItem === "onCreated" ? direction : "desc"}
                onClick={() => handleLabelClick("onCreated")}
                sx={{ pb: 0.55 }}
              >
                Time
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TextField
                label="Member"
                name="memberId"
                onChange={formik.handleChange}
                value={formik.values.memberId}
                autoComplete="off"
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Channel"
                name="channelId"
                onChange={formik.handleChange}
                value={formik.values.channelId}
                autoComplete="off"
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Message"
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
                autoComplete="off"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {moment(item.onCreated).format("DD-MM-YY")}
              </TableCell>
              <TableCell>{item.member}</TableCell>
              <TableCell>{item.channelId}</TableCell>
              <TableCell>{item.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPage={10}
              count={data.length}
              page={formik.values.page}
              onPageChange={(_, page: number) =>
                formik.setFieldValue("page", page)
              }
              rowsPerPageOptions={[]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

/*      <form onSubmit={formik.handleSubmit}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </form>
    */

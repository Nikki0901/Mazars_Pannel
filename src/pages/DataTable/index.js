import React, { useEffect, useState, useMemo } from "react";
import Header from "../../components/DataTable/Header";
import { TableHeader, Pagination, Search } from "components/DataTable";
import useFullPageLoader from "hooks/useFullPageLoader";
import ExternalInfo from "components/ExternalInfo";
import AppConfig from "App.config";


const DataTable = () => {
    const [comments, setComments] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 50;

    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Comment", field: "body", sortable: false }
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

            fetch("https://jsonplaceholder.typicode.com/comments")
                .then(response => response.json())
                .then(json => {
                    hideLoader();
                    setComments(json);
                    console.log(json);
                });
        };

        getData();
    }, []);

    const commentsData = useMemo(() => {
        let computedComments = comments;

        // if (search) {
        //     computedComments = computedComments.filter(
        //         comment =>
        //             comment.name.toLowerCase().includes(search.toLowerCase()) ||
        //             comment.email.toLowerCase().includes(search.toLowerCase())
        //     );
        // }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);

    return (
        <>
            <Header title="Building a data table in react" />

            {/* <ExternalInfo page="datatable" /> */}

            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    {/* <div className="row">
                        <div className="col-md-6">
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div> */}

                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {commentsData.map(comment => (
                                <tr>
                                    <th scope="row" key={comment.id}>
                                        {comment.id}
                                    </th>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {loader}
        </>
    );
};

export default DataTable;




// const headers = [
//   { name: "S.No", field: "id", sortable: false },
//   { name: "Name", field: "name", sortable: true },
//   { name: "Category", field: "parent_id", sortable: true },
//   { name: "Sub Category", field: "cat_name", sortable: true },
//   { name: "Email", field: "email", sortable: true },
//   { name: "Phone No.", field: "name", sortable: true },
// ];


// {commentsData.map((p) => (
//     <tr>
//       <th scope="row" key={p.id}>
//         {p.id}
//       </th>
//       <td>{p.name}</td>
//       <td>{p.parent_id}</td>
//       <td>{p.cat_name}</td>
//       <td>{p.email}</td>
//       <td>{p.phone}</td>
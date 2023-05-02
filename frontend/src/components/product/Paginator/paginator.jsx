import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styles from "./paginator.module.css";

const Paginator = ({ prod }) => {
  console.log("HOLA: " + prod);
  // const [currentItems, setCurrentItems] = useState([]);
  // const [pageCount, setpageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const itemsPerPage = 6;

  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(prod.slice(itemOffset,endOffset));
  //   setpageCount(Math.ceil(prod.length / itemsPerPage));
  // },[itemOffset, itemsPerPage,prod]);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % prod.length;
  //   setItemOffset(newOffset);
  // }

  return (
    <>
      {/* <div>
            {currentItems.map(p => {
                return(
                    <div>
                        <li>{p.title}</li>
                    </div>
                )
            })}
        </div> */}
      <ReactPaginate
        containerClassName={styles.pagination}
        breakLabel="..."
        nextLabel="next >"
        //   onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        //   pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Paginator;

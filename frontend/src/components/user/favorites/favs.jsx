import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styles from "../../user/products/products.module.css";
import Images from "../products/Image/Images";
import { Link } from "react-router-dom";
import { updateProduct } from "../../../utils/apiProducts";
import { getFavorites } from "../../../utils/apiFavorites";

const Favs = () => {

  const { data } = useQuery("fav-prods", getFavorites)
  console.log("los favoritos del user", data)

  return (
    <>
      <h1>mis favoritos</h1>
    </>
  );
};

export default Favs;

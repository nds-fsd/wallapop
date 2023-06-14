import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styles from "../../user/products/products.module.css";
import Images from "../products/Image/Images";
import { Link } from "react-router-dom";
import { getFavs } from "../../../utils/apiFavorites";

const Favs = () => {

  const { data } = useQuery("fav-prods", getFavs)
  console.log("los favoritos del user", data)

  return (
    <>
      <h1>mis favoritos</h1>
    </>
  );
};

export default Favs;

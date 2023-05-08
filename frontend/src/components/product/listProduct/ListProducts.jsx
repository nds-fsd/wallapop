import styles from "./listProducts.module.css";
import { api } from "../../../utils/apiProducts";
import { useQuery, useQueryClient } from "react-query";
import Product from "../product/Product";

const productos = [
  {
    id: 1,
    title: "Audi A1 Sportback Adrenalin 30 TFSI 110 CV",
    description: "Audi Sarsa Granollers, somos Concesionario oficial Audi, (Grupo MOVENTO). Vehículo revisado y con garantía Audi hasta el 27-04-2025. Precio al contado, con el cambio de nombre incluido y con la posibilidad de financiarlo. Puedes visitarnos en la Ctra. de La Roca, km17 o contactar conmigo a través del 667101987. Audi A1 en Granollers. Audi A1 en Granollers",
    category: "Coches",
    price: "24.990 EUR",
    photo: "storage/defecto.webp",
    status: "",
  },
  {
    id: 2,
    title: "Iphone SE",
    description: "Esta en perfectas condiciones, tiene 2 años, lleva protector y regalo varias fundas. Precio negociable.",
    category: "Móviles y Telefonía",
    price: "270 EUR",
    photo: "storage/defecto.webp",
    status: "",
  },
  {
    id: 3,
    title: "LG SMART TV 43 UM71006",
    description: "Televisor LG de 43 pulgadas, como nueva, funciona perfectamente. Vendo por haber comprado una más grande",
    category: "TV, Audio y Foto",
    price: "200 EUR",
    photo: "storage/defecto.webp",
    status: "",
  },
];

const ListProducts = () => {
  //   const { data: categories, isLoading } = useQuery("categories", async () => {
  //     const res = await api.get("/category");
  //     return res.data;
  //   });
  console.log("PRODUCT:: " + productos);
  return (
    <div className={styles.container}>
      {productos.map((prod) => {
        return <Product className={styles.menu} key={prod.id} prod={prod} />;
      })}
    </div>
  );
};

export default ListProducts;

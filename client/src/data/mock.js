// TODO: reemplazar por fetch al back
export const categories = [
  { id: "bebidas", name: "Bebidas" },
  { id: "golosinas", name: "Golosinas" },
  { id: "snacks", name: "Snacks" },
  { id: "cigarrillos", name: "Cigarrillos" },
  { id: "limpieza", name: "Limpieza" },
  { id: "desayuno", name: "Desayuno" },
  { id: "mascotas", name: "Mascotas" },
  { id: "recargas", name: "Recargas" },
];

export const products = [
  {
    id: "cola-225",
    title: "Gaseosa Cola 2.25L",
    price: 1250,
    categoryId: "bebidas",
    image: "/img/cola.jpg", // poné tus imágenes en public/img/*
    badge: "Oferta",
  },
  {
    id: "papas-clasicas",
    title: "Papas Fritas Clásicas",
    price: 980,
    categoryId: "snacks",
    image: "/img/papas.jpg",
  },
  {
    id: "alfajor-choco",
    title: "Alfajor de Chocolate",
    price: 750,
    categoryId: "golosinas",
    image: "/img/alfajor.jpg",
  },
];
import React from "react";
import { Grid } from "@material-ui/core";
import AddCard, { Props as AddCardProps } from "../Layout/CallToAction/Card";

type Seed = Array<AddCardProps>;

const seed: Seed = [
  {
    title: "Dodaj ulice",
    url: "street",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqKPB1d7wzKUOGEcwTe96-plAnzuWvBwYymiwRkuZYUJLqcVcW"
  },
  {
    title: "Dodaj dom",
    url: "house",
    image:
      "https://pracownia-projekty.dom.pl/images/444/32604_wizualizacje1_dl_jaskolka_2_z_garazem_ce.jpg"
  },
  {
    title: "Dodaj ministranta",
    url: "acolyte",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Messdienergruppe_-001-.jpg/299px-Messdienergruppe_-001-.jpg"
  },
  {
    title: "Dodaj księdza",
    url: "priest",
    image:
      "https://g1.gazetaprawna.pl/p/_wspolne/pliki/1407000/1407069-lemanskiksiadzhoser.jpg"
  }
];

export const addRoutePaths: Array<String> = seed.map(({ url }) => url);

const Add: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {seed.map(props => (
        <Grid item xs={12} sm={6} md={4}>
          <AddCard {...props} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Add;

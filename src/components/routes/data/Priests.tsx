import * as React from "react";
import DataTemplate, { UpdateHandler } from "../../Layout/DataTable/DataTable";
import request from "../../../utils/request";

interface Props {}

interface Priest {
  name: string;
}

export const Acolites: React.FC<Props> = props => {
  const [items, setItems] = React.useState<Priest[]>([]);

  React.useEffect(() => {
    request(
      `query{
      priests{
        name
      }
    }`,
      { useAuthorizationToken: true }
    ).then(res => setItems(res.data.priests));
  }, []);
  const handleAddition = (data: any) => {
    setItems([...items, data]);
  };

  const handleChange: UpdateHandler = index => update => {
    setItems([
      ...items.slice(0, index),
      { ...items[index], ...update },
      ...items.slice(index + 1)
    ]);
  };

  const handleDelete = (index: number) => {
    const tItems = [...items];
    tItems.splice(index, 1);
    setItems(tItems);
  };

  return (
    <DataTemplate<Priest>
      items={items}
      title={"Księża"}
      config={{
        name: {
          label: "Nazwa:",
          index: 0,
          form: { type: "TEXT" }
        }
      }}
      deleteItem={handleDelete}
      addItem={handleAddition}
      editItem={handleChange}
    />
  );
};

export default Acolites;

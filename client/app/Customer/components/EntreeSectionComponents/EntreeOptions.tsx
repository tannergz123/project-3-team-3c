import React from "react";
import { Grid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { setEntreeQuantity } from "../../../store/slices/currentSelectionSlice";
import ItemCard from "../ItemCard";
import { ITEM_REQUIREMENTS } from "../../../Cashier/components/CurrentItemDisplay";

const EntreeOptions: React.FC = () => {
  const dispatch = useDispatch();

  // Selectors for entrees and current selections from Redux
  const items = useSelector((state: RootState) => state.items.items);
  const entreeQuantities = useSelector((state: RootState) => state.currentSelection.entrees);
  const selectedSize = useSelector((state: RootState) => state.currentSelection.selectedSize);

  // Filter the items to get only entrees
  const entreeList = items.filter((item) => item.item_type === "Entree");
  const requirements = ITEM_REQUIREMENTS[selectedSize || ""] || { entrees: 0 };

  // Calculate total entrees selected
  const totalEntrees = Object.values(entreeQuantities).reduce((sum, count) => sum + count, 0);
  const maxReached = totalEntrees >= requirements.entrees;

  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)", // 2 columns on small screens
        md: "repeat(3, 1fr)", // 3 columns on medium screens
        lg: "repeat(4, 1fr)", // 4 columns on large screens
      }}
      gap={6}
    >
      {entreeList.map((entree) => {
        const isSelected = entreeQuantities[entree.item_name] > 0;
        const isDisabled = maxReached && !isSelected;

        return (
          <ItemCard
            key={entree.item_name}
            item={{
              name: entree.item_name,
              image: `/menu_images/${entree.item_name.toLowerCase().replace(/ /g, "_")}.png`,
              type: "Entree",
            }}
            quantity={entreeQuantities[entree.item_name] || 0}
            isIncrementDisabled={maxReached}
            isDisabled={isDisabled} // Disable only if max reached and not already selected
            onIncrement={() =>
              dispatch(
                setEntreeQuantity({
                  name: entree.item_name,
                  quantity: (entreeQuantities[entree.item_name] || 0) + 1,
                })
              )
            }
            onDecrement={() =>
              dispatch(
                setEntreeQuantity({
                  name: entree.item_name,
                  quantity: Math.max((entreeQuantities[entree.item_name] || 0) - 1, 0),
                })
              )
            }
          />
        );
      })}
    </Grid>
  );
};

export default EntreeOptions;

import React from "react";
import { Grid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { setSideQuantity } from "../../../store/slices/currentSelectionSlice";
import ItemCard from "../ItemCard";
import { ITEM_REQUIREMENTS } from "../../../Cashier/components/CurrentItemDisplay";

const SideOptions: React.FC = () => {
  const dispatch = useDispatch();

  // Selectors for current selection and items from Redux
  const sideQuantities = useSelector((state: RootState) => state.currentSelection.sides);
  const selectedSize = useSelector((state: RootState) => state.currentSelection.selectedSize);
  const items = useSelector((state: RootState) => state.items.items);

  // Filter items to get only sides
  const sideList = items.filter((item) => item.item_type === "Side");

  const requirements = ITEM_REQUIREMENTS[selectedSize || ""] || { sides: 0 };

  // Calculate the total number of sides currently selected
  const totalSides = Object.values(sideQuantities).reduce((sum, count) => sum + count, 0);
  const maxSidesReached = totalSides >= requirements.sides;

  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)", // 2 columns on small screens
        md: "repeat(3, 1fr)", // 3 columns on medium screens
        lg: "repeat(4, 1fr)", // 4 columns on large screens
      }}
      gap={6}
    >
      {sideList.map((side) => {
        const isSelected = sideQuantities[side.item_name] > 0;
        const isDisabled = maxSidesReached && !isSelected; // Disable if max reached and not selected
        const isIncrementDisabled = maxSidesReached;

        return (
          <ItemCard
            key={side.item_name}
            item={{
              name: side.item_name,
              image: `/menu_images/${side.item_name.toLowerCase().replace(/ /g, "_")}.png`,
              type: "Side",
            }}
            quantity={sideQuantities[side.item_name] || 0}
            isIncrementDisabled={isIncrementDisabled}
            isDisabled={isDisabled} // Disable entire card if not selected and max is reached
            onIncrement={() =>
              dispatch(
                setSideQuantity({
                  name: side.item_name,
                  quantity: (sideQuantities[side.item_name] || 0) + 1,
                })
              )
            }
            onDecrement={() =>
              dispatch(
                setSideQuantity({
                  name: side.item_name,
                  quantity: Math.max((sideQuantities[side.item_name] || 0) - 1, 0),
                })
              )
            }
          />
        );
      })}
    </Grid>
  );
};

export default SideOptions;
